import joblib
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

from django.core import serializers

from rest_framework import filters, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,  AllowAny
from rest_framework.pagination import PageNumberPagination


from core_apps.profiles.models import Profile
from .models import Book
from .serializers import RecommendBooksSerializer, DisplayBooksSerializer, BookDetailSerializer



# Load the model from the file
model_filename = 'cosine_similarity_model.pkl'
book_pivot = joblib.load(model_filename)
similarity_scores = cosine_similarity(book_pivot)


class RecommendBooksView(APIView):
    serializer_class = RecommendBooksSerializer
    permission_classes = [AllowAny]

    def recommend_books(self, book_title):
        """Recommend books based on book title"""
        # index fetch
        index = np.where(book_pivot.index==book_title)[0][0]
        similar_items = sorted(list(enumerate(similarity_scores[index])),
            key=lambda x:x[1],reverse=True)[1:5]
        
        data = []
        for book in similar_items:
            data.append(Book.objects.filter(title=book_pivot.index[book[0]]).first())

        return data
    
    def check_if_book_exists(self, book_title):
        return Book.objects.filter(title=book_title).exists()
    
    def post(self, request, format=None):
        """Return recommended books based on liked book"""
        serializer = RecommendBooksSerializer(data=request.data)

        if serializer.is_valid():
            title = serializer.validated_data['title']
            if self.check_if_book_exists(title):
                recommended_books = self.recommend_books(title)
            else:
                return Response({'detail': "Book not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = DisplayBooksSerializer(recommended_books, many=True)
        return Response({'books': serializer.data}, status=status.HTTP_200_OK)
    

class DisplayBooksView(generics.ListAPIView):
    """Display all books by page"""
    queryset = Book.objects.all()
    serializer_class = DisplayBooksSerializer
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        return Book.objects.filter(title__icontains=query)
    

class BookDetailView(generics.RetrieveAPIView):
    """Display single book details"""
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]

    def retrieve(self, request, *args, **kwargs):
        book_to_add = self.get_object()

        if request.user.is_authenticated:
            user_profile = Profile.objects.get(user=request.user)
            user_profile.add_searched_book(book_to_add)

        return super().retrieve(request, *args, **kwargs)


