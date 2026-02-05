from rest_framework import viewsets
from .models import Coupon
from .serializers import CouponSerializer


class CouponViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Coupon.objects.filter(active=True)
    serializer_class = CouponSerializer
