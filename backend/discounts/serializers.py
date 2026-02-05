from rest_framework import serializers
from .models import Coupon


class CouponSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(read_only=True)

    class Meta:
        model = Coupon
        fields = ['id', 'code', 'discount_percent', 'active', 'status_display', 'valid_from', 'valid_until', 'created_at']
