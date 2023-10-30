from django.shortcuts import render
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from .models import Rating
from .serializers import RatingSerializer, RatingCheckSerializer
from rest_framework.decorators import api_view


from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Rating
from .serializers import RatingSerializer
from core_apps.books.models import Book
from core_apps.profiles.models import Profile
from core_apps.ratings.exceptions import YouhaveAlreadyRated


class RatingCreateView(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        book_id = self.kwargs.get("book_id")

        if book_id:
            try:
                book = Book.objects.get(id=book_id)
            except Book.DoesNotExist:
                return Response({"error": "Invalid book_id provided"}, status=status.HTTP_400_BAD_REQUEST)

            profile = Profile.objects.get(user=self.request.user)

            existing_rating = Rating.objects.filter(profile=profile, book=book).first()

            if existing_rating:
                serializer = RatingSerializer(existing_rating, data=request.data, partial=True)
            else:
                serializer = RatingSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(profile=profile, book=book)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "book_id is required"}, status=status.HTTP_400_BAD_REQUEST)


class RatingDeleteView(generics.DestroyAPIView):
    queryset = Rating.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        rating_id = self.kwargs.get("rating_id")
        try:
            rating = Rating.objects.get(id=rating_id)
        except Rating.DoesNotExist:
            return Response({"error": "Invalid rating_id provided"}, status=status.HTTP_400_BAD_REQUEST)

        if rating.profile == request.user.profile:
            rating.delete()
            return Response({"message": "Rating deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "You do not have permission to delete this rating"}, status=status.HTTP_403_FORBIDDEN)
        

class RatingListView(generics.ListAPIView):
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile = Profile.objects.get(user=self.request.user)
        queryset = Rating.objects.filter(profile=profile)
        return queryset
    
@api_view(['GET'])
def rating_check(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        profile = request.user.profile

        rating = Rating.objects.filter(profile=profile, book=book).first()
        
        if rating:
            serializer = RatingCheckSerializer(rating)
            return Response(serializer.data)
        else:
            return Response({"error":"No rating found"}, status=404)
        
    except Book.DoesNotExist:
        return Response({'error': 'Rating not found'}, status=404)