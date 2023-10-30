from django.urls import path

from .views import BookRecommendView, BookListView, BookDetailView


urlpatterns = [
    path("recommend/", BookRecommendView.as_view(), name="recommend-book"),
    path("", BookListView.as_view(), name="book-list"),
    path("<slug:id>/", BookDetailView.as_view(), name="book-details")
]