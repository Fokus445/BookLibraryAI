from django.contrib.auth import get_user_model
from django.db import models



from core_apps.common.models import TimeStampedModel
from core_apps.books.models import Book

User = get_user_model()


class Rating(TimeStampedModel):
    RATING_CHOICES = [
        (1, "1"),
        (2, "2"),
        (3, "3"),
        (4, "4"),
        (5, "5"),
        (6, "6"),
        (7, "7"),
        (8, "8"),
        (9, "9"),
        (10, "10"),
    ]
    book = models.ForeignKey(
        Book, related_name="ratings", on_delete=models.CASCADE
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES)

    class Meta:
        unique_together = ("book", "user")
        verbose_name = "Rating"
        verbose_name_plural = "Ratings"

    def __str__(self):
        return f"{self.user.first_name} rated {self.book.title} as {self.get_rating_display()}"
    
