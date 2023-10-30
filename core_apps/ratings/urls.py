from django.urls import path
from .views import RatingCreateView, RatingListView, RatingDeleteView, rating_check

urlpatterns = [
    path("rate_book/<uuid:book_id>/", RatingCreateView.as_view(), name="rating-create"),
    path("", RatingListView.as_view(), name="rating-list"),
    path("check_rating/<uuid:book_id>/", rating_check, name="rating-check"),
    path("remove_rating/<uuid:rating_id>/", RatingDeleteView.as_view(), 
        name="rating-delete"),
]
