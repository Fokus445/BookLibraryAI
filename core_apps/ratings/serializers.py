from rest_framework import serializers
from django.db.models import Avg
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    book_id = serializers.CharField(source="book.id", read_only=True)
    book_cover_image = serializers.CharField(source="book.cover_image", read_only=True)
    book_title = serializers.CharField(source="book.title", read_only=True)
    book_author = serializers.CharField(source="book.author", read_only=True)

    class Meta:
        model = Rating
        fields = ["id", "book_id", "rating", 'book_cover_image', 'book_title', 'book_author']

    def save(self, **kwargs):
        instance = super().save(**kwargs)

        # Calculate average rating and trigger the signal
        book = instance.book
        avg_rating = Rating.objects.filter(book=book).aggregate(Avg('rating'))['rating__avg']
        book.average_rating = avg_rating
        book.save()

        return instance


class RatingCheckSerializer(serializers.ModelSerializer):
    book_id = serializers.CharField(source="book.id", read_only=True)
    rating = serializers.IntegerField(source='get_rating_display', read_only=True)

    class Meta:
        model = Rating
        fields = ["id","book_id", "rating"]
