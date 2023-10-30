from rest_framework import serializers

from .models import Book

class BookRecommendSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['title']


class BookSerializer(serializers.ModelSerializer):
    author_full_name = serializers.SerializerMethodField()
     
    class Meta:
        model = Book
        fields = [
            'id',
            'isbn',
            'title',
            'author',
            'cover_image',
            'author_full_name',
        ]
    
    def get_author_full_name(self, obj):
        return obj.author.full_name()
    


class BookDetailSerializer(serializers.ModelSerializer):
    author_full_name = serializers.SerializerMethodField()
    publisher_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Book
        fields = [
            'id',
            'isbn',
            'title',
            'author',
            'publisher',
            'release_year',
            'cover_image',
            'average_rating',
            'author_full_name',
            'publisher_name',
        ]
    
    def get_author_full_name(self, obj):
        return obj.author.full_name()

    def get_publisher_name(self, obj):
        return obj.publisher.name
    


