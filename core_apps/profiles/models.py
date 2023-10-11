from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _




from core_apps.common.models import TimeStampedModel
from core_apps.recommender.models import Book

User = get_user_model()


class Profile(TimeStampedModel):
    class Gender(models.TextChoices):
        MALE = (
            "M",
            _("Male"),
        )

        FEMALE = (
            "F",
            _("Female"),
        )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    gender = models.CharField(
        verbose_name=_("gender"),
        choices=Gender.choices,
        default="Not set",
        max_length=20,
    )
    year_born = models.PositiveIntegerField(blank=True, null=True, 
        verbose_name=_("Birth Year"))
    searched_books = models.ManyToManyField(
        'recommender.Book', symmetrical=False, related_name="searched", blank=True
    ) 

    def __str__(self):
        return f"{self.user.first_name}'s Profile"
    
    def add_searched_book(self, book):
        self.searched_books.add(book)

