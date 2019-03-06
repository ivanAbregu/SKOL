from django.db import models
from apps.core.models import BaseModel


class Task(BaseModel):
	owner = models.ForeignKey('user.User', related_name='task_owner')
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=250, blank=True, null=True)
	done = models.BooleanField(default=False)
	end_date = models.DateTimeField()
	def __str__(self):
		return "%s, name: %s" % (self.id, self.name)
