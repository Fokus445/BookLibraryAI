from .base import *
from .base import env


SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="2VaNq5JfQstyjygDuyBhijzk3rspkSHM3tvr-33d5onERGUmBzg",
)

DEBUG = True

CSRF_TRUSTED_ORIGINS = ["http://localhost:8080"]

EMAIL_BACKEND = "djcelery_email.backends.CeleryEmailBackend"
EMAIL_HOST = env("EMAIL_HOST", default="mailhog")
EMAIL_PORT = env("EMAIL_PORT")
DEFAULT_FROM_EMAIL = "support@edwin.com"
DOMAIN = env("DOMAIN")
SITE_NAME = "Book Recommender"