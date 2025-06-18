from django.urls import path
from . import views

urlpatterns = [
    path('pages/<int:page_id>/comments/', views.CommentListCreateView.as_view(), name='comment-list'),
    path('pages/<int:page_id>/comments/<int:pk>/', views.CommentDetailView.as_view(), name='comment-detail'),
]