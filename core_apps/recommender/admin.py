from django.contrib import admin

from .models import Book, Author, Publisher
# Register your models here.

class BookAdmin(admin.ModelAdmin):
    list_display = ["isbn","title","description"]

admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Publisher)