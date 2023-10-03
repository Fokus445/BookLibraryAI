from rest_framework import serializers

from .models import Book

class RecommendBooksSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['title']


class DisplayBooksSerializer(serializers.ModelSerializer):
    author_full_name = serializers.SerializerMethodField()
    publisher_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Book
        fields = [
            'isbn',
            'title',
            'author',
            'publisher',
            'release_year',
            'cover_image',
            'author_full_name',
            'publisher_name',
        ]
    
    def get_author_full_name(self, obj):
        return obj.author.full_name()

    def get_publisher_name(self, obj):
        return obj.publisher.name