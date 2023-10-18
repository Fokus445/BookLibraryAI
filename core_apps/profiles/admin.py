from django.contrib import ***REMOVED***

from .models import Profile


class ProfileAdmin(***REMOVED***.ModelAdmin):
    list_display = ["pkid", "id", "user", "gender"]
    list_display_links = ["pkid", "id", "user"]
    list_filter = ["pkid", "id"]


***REMOVED***.site.register(Profile, ProfileAdmin)
