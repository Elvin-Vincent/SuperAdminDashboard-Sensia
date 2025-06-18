from django.urls import path
from .views import UserList, UserDetail, RegisterView

urlpatterns = [
    path('', UserList.as_view(), name='user-list'),
    path('<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('register/', RegisterView.as_view(), name='user-register'),
]