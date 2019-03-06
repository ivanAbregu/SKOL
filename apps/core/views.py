from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ApiDummy


@api_view(['GET'])
def api_dummy(request, *args, **kwargs):
    if kwargs.get('slug'):
        try:
            ad = ApiDummy.objects.get(slug=kwargs['slug'])
            if ad.json_response:
                return Response(ad.json_response)
                #elif ad.html_response:
                #    return HttpResponse(ad.html_response)
        except ApiDummy.DoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


