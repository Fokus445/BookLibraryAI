from django.urls import path



from .views import (
    ProfileDetailAPIView,
    ProfileListAPIView,
    UpdateProfileAPIView,
    CreateProfileAPIView,
    SearchedBookListView
)

urlpatterns = [
    path("all/", ProfileListAPIView.as_view(), name="all-profiles"),
    path("me/", ProfileDetailAPIView.as_view(), name="my-profile"),
    path("me/create/", CreateProfileAPIView.as_view(), name="my-profile"),
    path("me/update/", UpdateProfileAPIView.as_view(), name="update-profile"),
    path("me/searched_books/", SearchedBookListView.as_view(), name="searched_books"),
]
