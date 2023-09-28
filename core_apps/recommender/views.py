import joblib
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework import filters, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,  AllowAny

from .models import Book
from .serializers import RecommendBooksSerializer




model_filename = 'cosine_similarity_model.pkl'

# Load the model from the file
book_pivot = joblib.load(model_filename)

similarity_scores = cosine_similarity(book_pivot)

books = pd.read_csv('data/Books.csv')

def recommend(book_name):
    # index fetch
    index = np.where(book_pivot.index==book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:5]
    
    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == book_pivot.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
        
        data.append(item)
    
    return data

print(recommend('Harry Potter and the Chamber of Secrets (Book 2)'))

print()


class RecommendBooksView(APIView):
    serializer_class = RecommendBooksSerializer
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        """Return recommended books based on liked book"""
        serializer = RecommendBooksSerializer(data=request.data)
        if serializer.is_valid():
            recomended_books = recommend(serializer.validated_data['title'])
            return Response({"data":recomended_books}, status=status.HTTP_200_OK)
    