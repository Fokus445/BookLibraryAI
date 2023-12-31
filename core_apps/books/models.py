from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator


from core_apps.common.models import TimeStampedModel


User = get_user_model()


class Author(TimeStampedModel):
    first_name = models.CharField(max_length=50, verbose_name=_("first name"))
    last_name = models.CharField(max_length=50, verbose_name=_("last name"))

    class Meta:
        ordering = ["first_name","last_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    

class Publisher(TimeStampedModel):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Book(TimeStampedModel):
    isbn = models.CharField(max_length=17, unique=True, verbose_name="isbn")
    title = models.CharField(verbose_name=_("book title"), max_length=200)
    description = models.CharField(verbose_name=_("description"), max_length=255, blank=True)
    author = models.ForeignKey(Author, related_name="books",verbose_name=_("author"),
        on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, related_name="published_books", 
        verbose_name=_("publisher"), on_delete=models.DO_NOTHING, null=True, blank=True)
    release_year = models.IntegerField(
        verbose_name=_("release_year"),
        blank=True,
        null=True,
        validators=[
            MinValueValidator(1000),
            MaxValueValidator(9999)
        ])
    cover_image = models.CharField(max_length=200)
    average_rating=models.DecimalField(default=0, max_digits=3, decimal_places=1,
        verbose_name=_("average rating"))

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title
    


