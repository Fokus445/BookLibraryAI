from django.urls import path
from .views import BookRatings

urlpatterns = [
    path("<slug:book_uuid/", BookRatings.as_view()),
]
