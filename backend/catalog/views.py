from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, ProductListSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Category - read-only public API.
    """
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['ordering', 'name']
    ordering = ['ordering', 'name']


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Product - read-only public API.
    """
    queryset = Product.objects.filter(status='active').select_related('category').prefetch_related('images')
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status', 'is_new']
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'price', 'name']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """Use lightweight serializer for list, full serializer for detail."""
        if self.action == 'list':
            return ProductListSerializer
        return ProductSerializer
