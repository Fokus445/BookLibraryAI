# TODO: change this in production
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.exceptions import NotFound
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from books_api.settings.local import DEFAULT_FROM_EMAIL


from .models import Profile
from .pagination import ProfilePagination
from .renderers import ProfileJSONRenderer, ProfilesJSONRenderer
from .serializers import ProfileSerializer, UpdateProfileSerializer


from core_apps.books.models import Book
from core_apps.ratings.models import Rating
from core_apps.books.serializers import DisplayBooksSerializer
from core_apps.ratings.serializers import RatingSerializer


User = get_user_model()


class ProfileListAPIView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    pagination_class = ProfilePagination
    renderer_classes = [ProfilesJSONRenderer]


class ProfileDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    renderer_classes = [ProfileJSONRenderer]

    def get_queryset(self):
        queryset = Profile.objects.select_related("user")
        return queryset

    def get_object(self):
        user = self.request.user
        try:
            profile = self.get_queryset().get(user=user)
            return profile
        except Profile.DoesNotExist:
            raise NotFound("Profile does not exist for this user.")



class CreateProfileAPIView(generics.CreateAPIView):
    serializer_class = UpdateProfileSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = [ProfileJSONRenderer]

    def create(self, request, *args, **kwargs):
        if self.request.user.profile:
            return Response({"message": "Profile already exists for this user."}, 
                status=status.HTTP_400_BAD_REQUEST)
        profile = Profile.objects.create(user=request.user)

        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_OK)


class UpdateProfileAPIView(generics.RetrieveAPIView):
    serializer_class = UpdateProfileSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = [ProfileJSONRenderer,]

    def get_object(self):
        profile = self.request.user.profile
        return profile

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)



class SearchedBookListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        try:
            profile = Profile.objects.get(user=request.user)
            searched_books = profile.searched_books.all()

            serializer = DisplayBooksSerializer(searched_books, many=True)
            formatted_response = {
                "status_code": status.HTTP_200_OK,
                "following_count": searched_books.count(),
                "books_i_searched": reversed(serializer.data),
            }
            return Response(formatted_response, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response(status=404)
        

class RatedBookListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            profile = Profile.objects.get(user=request.user)
            rated_books = Rating.objects.filter(profile=profile)

            serializer = RatingSerializer(rated_books, many=True)
            formatted_response = {
                "status_code": status.HTTP_200_OK,
                "rating_count": rated_books.count(),
                "books_i_rated": serializer.data,
            }
            return Response(formatted_response, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response(status=404)

