from __future__ import unicode_literals

from allauth.account.auth_backends import AuthenticationBackend
from django.core.exceptions import ObjectDoesNotExist


class CustomAuthenticationBackend(AuthenticationBackend):

    def authenticate(self, **credentials):
        user = super(CustomAuthenticationBackend, self).authenticate(**credentials)
        try:
            if user and user.roles.all().exists():
                return user
        except ObjectDoesNotExist:
            pass

        return None