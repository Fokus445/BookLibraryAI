from django.urls import path
from .views import RatingCreateView, RatingListView

urlpatterns = [
    path("rate_book/<uuid:book_id>/", RatingCreateView.as_view(), name="rating-create"),
    path("", RatingListView.as_view(), name="rating-list"),
]
