from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ['product', 'quantity', 'price_at_purchase', 'total']
    can_delete = False
    extra = 0

    def total(self, obj):
        return obj.total
    total.short_description = 'Total'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'guest_email', 'status', 'total', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'guest_email', 'id']
    readonly_fields = ['total', 'created_at', 'updated_at']
    inlines = [OrderItemInline]
    list_editable = ['status']


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'price_at_purchase', 'total']
    list_filter = ['order__status', 'product__category']
    search_fields = ['order__id', 'product__name']
