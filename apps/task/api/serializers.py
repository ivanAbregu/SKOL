
from rest_framework import serializers
from ..models import Task

class TaskSerializer(serializers.ModelSerializer):
	owner_full_name = serializers.SerializerMethodField(read_only= True) 

	def get_owner_full_name(self, obj): 
		return obj.owner.first_name+" "+obj.owner.last_name

	class Meta:
		model = Task
		fields = ('id',
					'name',
					'owner_full_name',
					'description',
					'done',
					'end_date',
				)