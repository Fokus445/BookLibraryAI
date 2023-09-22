from django import forms
from django.contrib.auth import forms as ***REMOVED***_forms
from django.contrib.auth import get_user_model

User = get_user_model()


class UserChangeForm(***REMOVED***_forms.UserChangeForm):
    class Meta(***REMOVED***_forms.UserChangeForm.Meta):
        model = User


class UserCreationForm(***REMOVED***_forms.UserCreationForm):
    class Meta(***REMOVED***_forms.UserCreationForm.Meta):
        model = User
        fields = ("first_name", "last_name", "email")

    error_messages = {
        "duplicate_email": "A user with this email already exists.",
    }

    def clean_email(self):
        email = self.cleaned_data["email"]
        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError(self.error_messages["duplicate_email"])
