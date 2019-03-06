from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q

from ..models import User
from .serializers import UserWebModelSerializer

from .filters import UserFilter
from rest_framework.viewsets import ModelViewSet
from ..permissions import AdminAccessPermission

class UserViewSet(ModelViewSet):
    """
        retrieve:
        Return the given user.

        list:
        Return a list of all the existing users.

        create:
        Create a new user instance.
    """
    queryset = User.objects.all()
    serializer_class =  UserWebModelSerializer
    http_method_names = ['get','put','post','delete']
    filter_class = UserFilter
    
    def get_queryset(self):
        qs = super(UserViewSet, self).get_queryset()
        # if self.request.user:            
        #     qs = qs.filter(club = self.request.user.club)
        # elif not self.request.user.is_superuser:
        #     qs = []
        return qs