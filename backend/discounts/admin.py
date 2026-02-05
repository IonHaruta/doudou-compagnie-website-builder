from django.contrib import admin
from .models import Coupon


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'active', 'discount_percent', 'status_display', 'valid_from', 'valid_until', 'created_at']
    list_filter = ['active', 'created_at', 'valid_from', 'valid_until']
    search_fields = ['code']
    list_editable = ['active']
