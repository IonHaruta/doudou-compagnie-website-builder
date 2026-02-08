from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Sum, Count
from rest_framework.authtoken.models import Token

from catalog.models import Product, Category
from orders.models import Order
from .models import User


class AdminLoginView(APIView):
    """POST email + password → returns token and user (email, role)."""
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '')

        if not email or not password:
            return Response(
                {'detail': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email).first()
        if user is None or not user.check_password(password):
            return Response(
                {'detail': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_staff:
            return Response(
                {'detail': 'You do not have permission to access the admin panel.'},
                status=status.HTTP_403_FORBIDDEN
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'email': user.email,
                'role': getattr(user, 'role', 'ADMIN') or 'ADMIN',
            },
        }, status=status.HTTP_200_OK)


class AdminDashboardStatsView(APIView):
    """GET dashboard stats (products, orders, categories, revenue). Staff only."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_staff:
            return Response(
                {'detail': 'Permission denied.'},
                status=status.HTTP_403_FORBIDDEN
            )

        total_products = Product.objects.count()
        active_products = Product.objects.filter(is_active=True).count()
        total_orders = Order.objects.count()
        total_categories = Category.objects.count()

        orders_by_status = Order.objects.values('status').annotate(count=Count('id'))
        status_counts = {s['status']: s['count'] for s in orders_by_status}
        # Map Django status to frontend keys
        orders_by_status_mapped = {
            'new': status_counts.get('PENDING', 0),
            'processing': status_counts.get('PROCESSING', 0),
            'completed': status_counts.get('COMPLETED', 0),
            'cancelled': status_counts.get('CANCELLED', 0),
        }

        total_revenue = Order.objects.filter(status='COMPLETED').aggregate(
            total=Sum('total')
        )['total'] or 0

        return Response({
            'totalProducts': total_products,
            'activeProducts': active_products,
            'totalOrders': total_orders,
            'totalCategories': total_categories,
            'ordersByStatus': orders_by_status_mapped,
            'totalRevenue': float(total_revenue),
        }, status=status.HTTP_200_OK)
