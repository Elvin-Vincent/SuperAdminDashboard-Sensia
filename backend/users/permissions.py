# users/permissions.py
from rest_framework import permissions

class IsSuperAdmin(permissions.BasePermission):
    """
    Allows access only to super admin users.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser


class IsOwnerOrSuperAdmin(permissions.BasePermission):
    """
    Allows access to object owners or super admins.
    """
    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser or obj == request.user