from rest_framework import permissions
from .models import UserPagePermission

class HasPagePermission(permissions.BasePermission):
    """
    Custom permission to check if user has specific access to a page
    """
    
    def __init__(self, permission_type='view'):
        self.permission_type = permission_type
    
    def has_permission(self, request, view):
        # Super admins have full access
        if request.user.is_superuser:
            return True
            
        # For list/create views, check if user has any page access
        if view.action in ['list', 'create']:
            return UserPagePermission.objects.filter(
                user=request.user
            ).exists()
            
        return True  # Object-level permission checked in has_object_permission
    
    def has_object_permission(self, request, view, obj):
        # Super admins have full access
        if request.user.is_superuser:
            return True
            
        # Check if user has the required permission for this specific page
        return UserPagePermission.objects.filter(
            user=request.user,
            page=obj,
            permission=self.permission_type
        ).exists()

    @classmethod
    def using(cls, permission_type):
        """Helper method to create permission with specific access type"""
        return lambda: cls(permission_type)