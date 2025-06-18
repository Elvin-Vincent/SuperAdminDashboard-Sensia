from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Define constants at the module level
PAGE_CHOICES = [
    ('products', 'Products List'),
    ('marketing', 'Marketing List'),
    ('orders', 'Order List'),
    ('media', 'Media Plans'),
    ('offers', 'Offer Pricing SKUs'),
    ('clients', 'Clients'),
    ('suppliers', 'Suppliers'),
    ('support', 'Customer Support'),
    ('sales', 'Sales Reports'),
    ('finance', 'Finance & Accounting'),
]

PERMISSION_TYPES = [
    ('view', 'View'),
    ('edit', 'Edit'),
    ('create', 'Create'),
    ('delete', 'Delete'),
]

class Page(models.Model):
    name = models.CharField(max_length=100, unique=True, choices=PAGE_CHOICES)
    slug = models.SlugField(max_length=100, unique=True)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.get_name_display()

    def save(self, *args, **kwargs):
        # Automatically set slug if not provided
        if not self.slug:
            self.slug = self.name.lower().replace(' ', '-')
        super().save(*args, **kwargs)

class UserPagePermission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='page_permissions')
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='permissions')
    permission = models.CharField(max_length=10, choices=PERMISSION_TYPES)
    
    class Meta:
        unique_together = ('user', 'page', 'permission')
        verbose_name = 'User Page Permission'
        verbose_name_plural = 'User Page Permissions'
        ordering = ['user', 'page', 'permission']

    def __str__(self):
        return f"{self.user.email} - {self.page.name} ({self.get_permission_display()})"