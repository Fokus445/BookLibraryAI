
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Rating
from core_apps.books.models import Book

from django.db.models import Avg



@receiver(post_save, sender=Rating)
def calculate_average_rating(sender, instance, created, **kwargs):
    if created:
        book = instance.book
        avg_rating = Rating.objects.filter(book=book).aggregate(
            Avg('rating'))['rating__avg']
        book.average_rating = avg_rating
        book.save()