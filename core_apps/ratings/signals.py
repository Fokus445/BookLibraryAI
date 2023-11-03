
from django.db.models.signals import post_delete
from django.dispatch import receiver

from .models import Rating
from core_apps.books.models import Book

from django.db.models import Avg



@receiver(post_delete, sender=Rating)
def calculate_average_rating(sender, instance, **kwargs):
    book = instance.book
    avg_rating = Rating.objects.filter(book=book).aggregate(
        Avg('rating'))['rating__avg']
    
    if avg_rating is None:
        avg_rating = 0

    book.average_rating = avg_rating
    book.save()