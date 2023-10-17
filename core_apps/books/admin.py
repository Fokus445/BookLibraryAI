from django.contrib import ***REMOVED***

from .models import Book, Author, Publisher
# Register your models here.

class BookAdmin(***REMOVED***.ModelAdmin):
    list_display = ["isbn","title","description"]

***REMOVED***.site.register(Book)
***REMOVED***.site.register(Author)
***REMOVED***.site.register(Publisher)