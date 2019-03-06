from functools import wraps

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseForbidden
from rest_framework import permissions

def has_permission(request, roles):
    user = request.user
    return user.is_authenticated()

def has_permission_webApp(request):
    return request.user.is_authenticated()

def roles_permissions(roles=[]):
    def _my_decorator(view_func):
        def _decorator(request, *args, **kwargs):
            if has_permission(request, roles):
                response = view_func(request, *args, **kwargs)
                return response
            else:
                return HttpResponseForbidden()
        return wraps(view_func)(_decorator)
    return _my_decorator


class AdminAccessPermission(permissions.BasePermission):
    message = "Only admin club role access allowed."

    def has_permission(self, request, view):
        return has_permission(request, ['admin'])

class AnyRoleAccessPermission(permissions.BasePermission):
    message = 'Any role access allowed'

    def has_permission(self, request, view):
        return has_permission(request, ['admin'])