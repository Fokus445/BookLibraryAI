from django.conf import settings
from django.contrib import ***REMOVED***
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from dj_rest_auth.views import PasswordResetConfirmView

from core_apps.users.views import CustomUserDetailsView


schema_view = get_schema_view(
    openapi.Info(
        title="Book Recommender API",
        default_version="v1",
        description="API endpoints for Book Recommender App",
        contact=openapi.Contact(email="***REMOVED***"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path(settings.ADMIN_URL, ***REMOVED***.site.urls),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0)),
    path("api/v1/auth/user/", CustomUserDetailsView.as_view(), name="user_details"),
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "api/v1/auth/password/reset/confirm/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("api/v1/", include("core_apps.recommender.urls")),
    path("api/v1/profiles/", include("core_apps.profiles.urls")),
]


***REMOVED***.site.site_header = "Book Recommender API Admin"

***REMOVED***.site.site_title = "Book Recommender API Admin Portal"

***REMOVED***.site.index_title = "Welcome to Book Recommender API Portal"
