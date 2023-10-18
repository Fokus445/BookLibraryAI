from django.contrib import ***REMOVED***

from .models import Profile


class ProfileAdmin(***REMOVED***.ModelAdmin):
    list_display = ["id", "uuid", "user", "gender"]
    list_display_links = ["id", "uuid", "user"]
    list_filter = ["id", "uuid"]


***REMOVED***.site.register(Profile, ProfileAdmin)
