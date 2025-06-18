from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Page, UserPagePermission
from .serializers import PageSerializer
from .permissions import HasPagePermission

class PageListView(generics.ListCreateAPIView):
    serializer_class = PageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Page.objects.all()
            
        # Get pages where user has at least view permission
        return Page.objects.filter(
            permissions__user=user,
            permissions__permission='view'
        ).distinct()

    def get_permissions(self):
        if self.request.method == 'POST':
            # For creation, user needs create permission on any page
            if not self.request.user.is_superuser and not UserPagePermission.objects.filter(
                user=self.request.user,
                permission='create'
            ).exists():
                self.permission_classes = [permissions.IsAuthenticated, HasPagePermission.using('create')]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save()

class PageDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Page.objects.all()
            
        # User must have at least view permission to see the page
        return Page.objects.filter(
            permissions__user=user,
            permissions__permission='view'
        ).distinct()

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH']:
            return [permissions.IsAuthenticated, HasPagePermission.using('edit')]
        elif self.request.method == 'DELETE':
            return [permissions.IsAuthenticated, HasPagePermission.using('delete')]
        return [permissions.IsAuthenticated, HasPagePermission.using('view')]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        
        # Add permission info to response
        if not request.user.is_superuser:
            permissions = UserPagePermission.objects.filter(
                user=request.user,
                page=instance
            ).values_list('permission', flat=True)
            data = serializer.data
            data['user_permissions'] = list(permissions)
            return Response(data)
        return Response(serializer.data)