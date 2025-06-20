from django.urls import path
from . import views

urlpatterns = [
    path('', views.PageListView.as_view(), name='page-list'),
    path('<int:pk>/', views.PageDetailView.as_view(), name='page-detail'),
]