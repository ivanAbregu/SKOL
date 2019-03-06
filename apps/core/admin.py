from django.contrib import admin

from .models import ApiDummy


class ApiDummyModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'url_endpoint')
    list_display_links = ('id', 'name')

    def url_endpoint(self, obj):
        return '<a href="%s" target="_blank">%s</a>' % (obj.endpoint, obj.endpoint)

    url_endpoint.allow_tags = True
    url_endpoint.short_description = "API url"


admin.site.register(ApiDummy, ApiDummyModelAdmin)
