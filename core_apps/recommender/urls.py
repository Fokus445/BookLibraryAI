from django.urls import path

from .views import RecommendBooksView, DisplayBooksView


urlpatterns = [
    path("recommend/", RecommendBooksView.as_view(), name="recommend_book"),
    path("books/", DisplayBooksView.as_view(), name="recommend_book"),
]