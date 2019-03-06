from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjUserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import User


class UserAdmin(DjUserAdmin):
    fieldsets = (
        (None, {'fields': ('email',
                            'password',
                        )}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'username','profile_picture')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('id', 'email')
    ordering = ('email',)

admin.site.register(User, UserAdmin)