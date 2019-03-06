from django_filters import rest_framework as filters
from django_filters import CharFilter, NumberFilter
from ..models import  User

class UserFilter(filters.FilterSet):
	
	class Meta:
		model = User
		fields = ('id','username','email',)