from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model


User = get_user_model()


class Author(models.Model):
    first_name = models.CharField(max_length=30, verbose_name=_("first name"))
    last_name = models.CharField(max_length=30, verbose_name=_("last name"))

    class Meta:
        ordering = ["first_name","last_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Publisher(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Book(models.Model):
    isbn = models.BigIntegerField(max_length=13)
    title = models.CharField(verbose_name=_("book title"), max_length=200)
    description = models.CharField(verbose_name=_("description"), max_length=255)
    author = models.ForeignKey(Author, related_name="books",verbose_name=_("author"),
        on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, related_name="published_books", 
        verbose_name=_("publisher"), on_delete=models.DO_NOTHING, blank=True)
    release_date = models.DateTimeField(verbose_name=_("release date"))
    cover_image = models.CharField(max_length=200)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title

