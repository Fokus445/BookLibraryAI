from django.shortcuts import render
from django.db import IntegrityError
from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from .models import Rating
from .serializers import RatingSerializer

from core_apps.ratings.exceptions import YouhaveAlreadyRated
from core_apps.books.models import Book

class RatingCreateView(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Get the book_id from the URL
        book_id = self.kwargs.get("book_id")
        if book_id:
            try:
                # Retrieve the book with the specified book_id
                book = Book.objects.get(id=book_id)
                # Create a new Rating object associated with the book
                serializer = self.get_serializer(data=request.data)
                if serializer.is_valid():
                    serializer.save(user=self.request.user, book=book)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Book.DoesNotExist:
                return Response({"error": "Invalid book_id provided"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "book_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        

class RatingListView(generics.ListAPIView):
    serializer_class = RatingSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Rating.objects.filter(user=user)
        return queryset