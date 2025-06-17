from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    is_superadmin = models.BooleanField(
        _('superadmin status'),
        default=False,
        help_text=_('Designates whether the user can access admin dashboard.')
    )
    
    email = models.EmailField(
        _('email address'),
        unique=True,
        help_text=_('Required for login and notifications.')
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')