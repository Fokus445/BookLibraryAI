import joblib
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework import filters, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,  AllowAny
from rest_framework.pagination import PageNumberPagination

from .models import Book
from core_apps.profiles.models import Profile
from .serializers import RecommendBooksSerializer, DisplayBooksSerializer, BookDetailSerializer

from django.core import serializers



model_filename = 'cosine_similarity_model.pkl'

# Load the model from the file
book_pivot = joblib.load(model_filename)

similarity_scores = cosine_similarity(book_pivot)



class RecommendBooksView(APIView):
    serializer_class = RecommendBooksSerializer
    permission_classes = [AllowAny]

    def recommend(self, book_name):
        # index fetch
        index = np.where(book_pivot.index==book_name)[0][0]
        similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:5]
        
        data = []
        for i in similar_items:
            data.append(Book.objects.filter(title=book_pivot.index[i[0]]))

        return data

    def post(self, request, format=None):
        """Return recommended books     based on liked book"""
        serializer = RecommendBooksSerializer(data=request.data)
        if serializer.is_valid(): 

            recommended_books = self.recommend(serializer.validated_data['title'])
            
        books_data = []

        for queryset in recommended_books:
            books_data.extend(list(queryset))

        # Serialize the extracted objects using your serializer
        serializer = DisplayBooksSerializer(books_data, many=True)

        return Response({'books': serializer.data}, status=status.HTTP_200_OK)
    

class DisplayBooksView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = DisplayBooksSerializer
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        return Book.objects.filter(title__icontains=query)
    

class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    lookup_field = 'isbn'
    permission_classes = [AllowAny]

    def retrieve(self, request, *args, **kwargs):
        book_to_add = self.get_object()

        if request.user.is_authenticated:
            user_profile = Profile.objects.get(user=request.user)
            user_profile.add_searched_book(book_to_add)

        return super().retrieve(request, *args, **kwargs)


