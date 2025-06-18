from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request, format=None):
    return Response({
        'name': 'Super Admin Dashboard API',
        'description': 'Welcome to the Super Admin Dashboard API',
        'endpoints': {
            'admin': {
                'url': reverse('admin:index', request=request, format=format),
                'description': 'Django admin interface'
            },
            'auth': {
                'login': reverse('login', request=request, format=format),
                'refresh': reverse('token_refresh', request=request, format=format),
                'register': reverse('register', request=request, format=format),
            },
            'users': reverse('user-list', request=request, format=format),
            'pages': reverse('page-list', request=request, format=format),
            'documentation': {
                'swagger': reverse('schema-swagger-ui', request=request, format=format),
                'redoc': reverse('schema-redoc', request=request, format=format),
            }
        },
        'version': '1.0.0',
        'authentication': 'JWT'
    })