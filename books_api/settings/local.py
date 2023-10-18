from .base import *
from .base import env


SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="2VaNq5JfQstyjygDuyBhijzk3rspkSHM3tvr-33d5onERGUmBzg",
)

DEBUG = True

CSRF_TRUSTED_ORIGINS = ["http://localhost:8080", "http://localhost:3000", "https://localhost:8080"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000", "http://localhost:8080", "https://localhost:8080"  # Add your React app's origin here
]

ALLOWED_HOSTS = ['*']



EMAIL_BACKEND = "djcelery_email.backends.CeleryEmailBackend"
EMAIL_HOST = env("EMAIL_HOST", default="mailhog")
EMAIL_PORT = env("EMAIL_PORT")
DEFAULT_FROM_EMAIL = "support@edwin.com"
DOMAIN = env("DOMAIN")
SITE_NAME = "Book Recommender"



