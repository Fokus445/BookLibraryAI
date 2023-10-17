from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from .serializers import RatingSerializer
# Create your views here.
class BookRatings(CreateAPIView):
    serializer_class = RatingSerializer
