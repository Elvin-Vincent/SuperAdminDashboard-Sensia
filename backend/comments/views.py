from rest_framework import generics, permissions
from .models import Comment
from .serializers import CommentSerializer
from pages.models import Page

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        page_id = self.kwargs['page_id']
        return Comment.objects.filter(page_id=page_id)
    
    def perform_create(self, serializer):
        page_id = self.kwargs['page_id']
        page = Page.objects.get(id=page_id)
        serializer.save(user=self.request.user, page=page)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return super().get_queryset().filter(page_id=self.kwargs['page_id'])