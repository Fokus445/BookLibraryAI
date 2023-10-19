from django.urls import path

from .views import RecommendBooksView, DisplayBooksView, BookDetailView


urlpatterns = [
    path("recommend/", RecommendBooksView.as_view(), name="recommend-book"),
    path("books/", DisplayBooksView.as_view(), name="book-list"),
    path("books/<slug:id>/", BookDetailView.as_view(), name="book-details")
]