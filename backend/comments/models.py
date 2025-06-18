from django.db import models
from pages.models import Page
from django.contrib.auth import get_user_model

User = get_user_model()

class Comment(models.Model):
    page = models.ForeignKey(Page, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.user.email} on {self.page.name}"