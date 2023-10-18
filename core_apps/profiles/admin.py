from django.contrib import admin

from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
    list_display = ["id", "uuid", "user", "gender"]
    list_display_links = ["id", "uuid", "user"]
    list_filter = ["id", "uuid"]


admin.site.register(Profile, ProfileAdmin)
