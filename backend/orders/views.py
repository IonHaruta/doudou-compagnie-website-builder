from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from django.db.models import Q
from .models import Order
from .serializers import OrderCreateSerializer, OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Order.
    - Public: Create orders (guest checkout)
    - Admin: List and manage all orders
    """
    queryset = Order.objects.all().prefetch_related('items__product')
    permission_classes = [AllowAny]  # Allow public order creation
    
    def get_serializer_class(self):
        """Use different serializers for create vs read."""
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer
    
    def get_permissions(self):
        """Override permissions: create is public, list/retrieve/update/delete are admin-only."""
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]
    
    def get_queryset(self):
        """Filter queryset based on user."""
        if self.request.user.is_authenticated and self.request.user.is_admin:
            # Admin can see all orders
            return super().get_queryset()
        elif self.request.user.is_authenticated:
            # Regular users can see only their orders
            return super().get_queryset().filter(user=self.request.user)
        # Unauthenticated users cannot list orders
        return Order.objects.none()
    
    def create(self, request, *args, **kwargs):
        """Create a new order (public endpoint)."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Set user if authenticated
        if request.user.is_authenticated:
            serializer.validated_data['user'] = request.user
        
        order = serializer.save()
        
        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED
        )
