from django.contrib.postgres.fields import JSONField
from django.db import models
from django.db.models.deletion import ProtectedError
from django.urls import reverse

from .utils import generate_unique_slug

STATUS_CHOICES = (
    ('active', 'Activo'), 
    ('finalized', 'Finalizado')
)

class ExcludeDeletedManager(models.Manager):
    def get_queryset(self):
        return super(ExcludeDeletedManager, self).get_queryset().filter(_deleted=False)


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    _deleted = models.BooleanField(default=False)

    objects = ExcludeDeletedManager()
    admin_manager = models.Manager()

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def delete(self, using=None):
        try:
            super(BaseModel, self).delete(using)
        except ProtectedError:
            self._deleted = True
            self.save()


class Person(BaseModel):
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    sex = models.CharField(max_length=1, choices=(('f', 'Femenino'), ('m', 'Masculino')))
    birthday = models.DateField(null=True)
    address = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    province = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)

    class Meta:
        abstract = True


class ApiDummy(BaseModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(editable=False, unique=True)
    html_response = models.TextField(blank=True, null=True)
    json_response = JSONField(blank=True, null=True)

    @property
    def endpoint(self):
        return reverse('api-dummy', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(ApiDummy, [self.name])

        return super(ApiDummy, self).save(*args, **kwargs)


from rest_framework import serializers
from django.core.files.base import ContentFile
import base64
import six
import uuid
import imghdr

class Base64ImageField(serializers.ImageField):

    def to_internal_value(self, data):

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

