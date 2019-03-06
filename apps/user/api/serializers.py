try:
    from allauth.account import app_settings as allauth_settings
    from allauth.utils import (email_address_exists,
                               get_username_max_length)
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
except ImportError:
    raise ImportError('allauth needs to be added to INSTALLED_APPS.')

from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import ugettext_lazy as _
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import JWTSerializer, LoginSerializer
from rest_framework import serializers

from apps.core.models import Base64ImageField
from ..models import User


class UserModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        exclude = ('last_login',
                    'date_joined',
                    'password',
                    'groups',
                    'is_superuser',
                    'is_staff',
                    'is_active'
                    )


class UserPutModelSerializer(serializers.ModelSerializer):
    #roles = RoleModelSerializer(many=True)
    profile_picture = Base64ImageField(
        max_length=None, use_url=True, required=False, allow_empty_file=True,
    )
    class Meta:
        model = User
        fields = ('first_name','last_name','profile_picture')

class CustomJWTSerializer(JWTSerializer):
    user = UserModelSerializer()


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=False, max_length=30)
    last_name = serializers.CharField(required=False, max_length=30)
    profile_picture = Base64ImageField(
        max_length=None, use_url=True, required=False, allow_empty_file=True,
    )
    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', '')
        }

    def save(self, request):
        user = super(CustomRegisterSerializer, self).save(request)
        try:
            user.profile_picture = self.validated_data.get('profile_picture', '')
        except Exception as e:
            print("Error: " ,e)
            pass

        user.save()
        return user

class CustomLoginSerializer(LoginSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user = self._validate_username(username, password)
        if user:
            if not user.is_active:
                msg = _('La cuenta del usuario no esta habilitada')
                raise serializers.ValidationError(msg)
        else:
            msg = _('Datos de autenticacion invalidos.')
            raise serializers.ValidationError(msg)

        attrs['user'] = user

        return attrs

class UserWebModelSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    profile_picture = Base64ImageField(
        max_length=None, use_url=True, required=False, allow_empty_file=True,
    )
     
    class Meta:
        model = User
        exclude = ('last_login',
                    'date_joined',
                    'password',
                    'is_superuser',
                    'is_staff',
                    'is_active')
