from django.urls import path

from .views import (
    BookListView,
    ProfileDetailAPIView,
    ProfileListAPIView,
    UpdateProfileAPIView,
)

urlpatterns = [
    path("all/", ProfileListAPIView.as_view(), name="all-profiles"),
    path("me/", ProfileDetailAPIView.as_view(), name="my-profile"),
    path("me/update/", UpdateProfileAPIView.as_view(), name="update-profile"),
    path("me/searched_books/", BookListView.as_view(), name="searched_books"),
]
