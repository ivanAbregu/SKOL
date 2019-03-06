from des import urls as des_urls
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from rest_auth.registration.views import RegisterView
from rest_auth.views import LogoutView, LoginView
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny
from .views import DashboardTemplateView

from apps.user.api.api_rest import UserViewSet
from apps.task.api.api_rest import TaskViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'task', TaskViewSet)

routerPublic = routers.DefaultRouter()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^django-des/', include(des_urls)),

    # API
    url(r'^api/accounts/login/$', LoginView.as_view(), name='login'),
    url(r'^api/accounts/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/accounts/register/$', RegisterView.as_view(), name='logout'),
    url(r'^api/', include(router.urls)),
    url(r'^api/public/', include(routerPublic.urls)),

    url(r'^docs/', include_docs_urls(title='API Doc skol', description="Status code: http://www.django-rest-framework.org/api-guide/status-codes/", public=True, permission_classes=[AllowAny])),


    url(r'', login_required(DashboardTemplateView.as_view())),
]

if settings.DEBUG:
    urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + urlpatterns