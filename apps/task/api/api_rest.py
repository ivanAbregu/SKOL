from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from ..models import Task

from .serializers import TaskSerializer

class TaskViewSet(ModelViewSet):
	"""
        retrieve:
        Return the given Task.

        list:
        Return a list of all the existing Tasks.

        create:
        Create a new Task instance.

        update:
        Update a Task instance

        partial_update:
        Partial update a Task instance.

        profile:
        Create a new Task instance associated with the authenticated user
    """

	queryset = Task.objects.all().order_by('-created_at')
	serializer_class = TaskSerializer
	#permission_class = [IsAccountAdminOrReadOnly]
	http_method_names = ['get', 'post', 'put', 'delete']
	#filter_class = EventFilter
	
	def get_queryset(self):
		qs = super(TaskViewSet, self).get_queryset()
		if self.request.user:			
			qs = qs.filter(owner = self.request.user)
		elif not self.request.user.is_superuser:
			qs = qs.none()
		return qs

	def perform_create(self, serializer):
		return serializer.save(owner=self.request.user)