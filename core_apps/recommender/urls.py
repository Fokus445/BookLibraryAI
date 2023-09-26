from django.urls import path

from .views import RecommendBooksView


urlpatterns = [
    path("", RecommendBooksView.as_view(), name="recommend_book")
]