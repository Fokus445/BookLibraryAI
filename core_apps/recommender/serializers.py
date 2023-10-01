from rest_framework import serializers

from .models import Book

class RecommendBooksSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['title']


class DisplayBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'