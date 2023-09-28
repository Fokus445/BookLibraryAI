from rest_framework import serializers

from .models import Book

class RecommendBooksSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['title']