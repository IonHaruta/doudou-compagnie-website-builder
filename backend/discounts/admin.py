from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import Coupon


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount_percent', 'status_display', 'valid_from', 'valid_until', 'created_at', 'active']
    list_filter = ['active', 'created_at', 'valid_from', 'valid_until']
    search_fields = ['code']
    list_editable = ['active']
    
    fieldsets = (
        ('Coupon Information', {
            'fields': ('code', 'discount_percent', 'active')
        }),
        ('Validity Period', {
            'fields': ('valid_from', 'valid_until')
        }),
    )
    
    actions = ['activate_coupons', 'deactivate_coupons']
    
    def status_display(self, obj):
        """Display coupon status with color coding."""
        is_valid, message = obj.is_valid()
        if is_valid:
            return format_html('<span style="color: green;">✓ Active</span>')
        elif not obj.active:
            return format_html('<span style="color: red;">✗ Inactive</span>')
        else:
            now = timezone.now()
            if now < obj.valid_from:
                return format_html('<span style="color: orange;">⏳ Not yet valid</span>')
            else:
                return format_html('<span style="color: red;">✗ Expired</span>')
    status_display.short_description = 'Status'
    
    def activate_coupons(self, request, queryset):
        """Bulk action to activate coupons."""
        queryset.update(active=True)
        self.message_user(request, f'{queryset.count()} coupons activated.')
    activate_coupons.short_description = 'Activate selected coupons'
    
    def deactivate_coupons(self, request, queryset):
        """Bulk action to deactivate coupons."""
        queryset.update(active=False)
        self.message_user(request, f'{queryset.count()} coupons deactivated.')
    deactivate_coupons.short_description = 'Deactivate selected coupons'
