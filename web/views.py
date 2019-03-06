from django.http import HttpResponse, HttpResponseForbidden, HttpResponseRedirect
from django.views.generic import View, TemplateView
from django.core.exceptions import ObjectDoesNotExist
from apps.user.api.serializers import UserModelSerializer
from apps.user.permissions import has_permission_webApp
from django.urls import reverse
import json


class DashboardTemplateView(TemplateView):
    template_name = 'base_2.html'
    def get_context_data(self, **kwargs):
        ctxt = super(DashboardTemplateView, self).get_context_data(**kwargs)
        ctxt['user'] = json.dumps(UserModelSerializer(instance=self.request.user).data)
        return ctxt

    def dispatch(self, request, *args, **kwargs):
        try:
            if has_permission_webApp(request):
                return super(DashboardTemplateView, self).dispatch(request, *args, **kwargs)
        except ObjectDoesNotExist:
            pass
        return HttpResponseForbidden()

