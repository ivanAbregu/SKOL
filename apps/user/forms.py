from django import forms

from .models import User
from allauth.account.forms import SignupForm, LoginForm


class UserProfileForm(forms.ModelForm):


    class Meta:
        fields = ('first_name', 'last_name')
        model = User


class CustomSignupForm(SignupForm):
	nombre = forms.CharField(required=False, max_length=30)
	apellido = forms.CharField(required=False, max_length=30)
	
	def save(self, request):
		
		user = super(CustomSignupForm, self).save(request)
		user.first_name = self.cleaned_data['nombre']
		user.last_name = self.cleaned_data['apellido']
		user.save()
		return user

class CustomLoginForm(LoginForm):
	def __init__(self, *args, **kwargs):
		super(CustomLoginForm, self).__init__(*args, **kwargs)
		"""
		self.fields['password'].widget = forms.PasswordInput()
		print("self.fields",self.fields['login'].widget.max_length)
		self.fields['login'].widget.max_length=3
		"""


