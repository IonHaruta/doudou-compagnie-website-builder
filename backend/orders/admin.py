from django.contrib import admin
from django.utils.html import format_html
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product', 'quantity', 'price_at_purchase', 'subtotal_display']
    fields = ['product', 'quantity', 'price_at_purchase', 'subtotal_display']
    
    def subtotal_display(self, obj):
        """Display subtotal."""
        return f'€{obj.subtotal:.2f}'
    subtotal_display.short_description = 'Subtotal'
    
    def has_add_permission(self, request, obj=None):
        """Prevent adding items after order is completed/cancelled."""
        if obj and obj.status in ['completed', 'cancelled']:
            return False
        return True
    
    def has_delete_permission(self, request, obj=None):
        """Prevent deleting items after order is completed/cancelled."""
        if obj and obj.status in ['completed', 'cancelled']:
            return False
        return True


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_display', 'status', 'total_price_display', 'item_count', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['id', 'user__email', 'guest_email', 'guest_name']
    readonly_fields = ['total_price', 'created_at', 'updated_at']
    inlines = [OrderItemInline]
    list_editable = ['status']
    
    fieldsets = (
        ('Order Information', {
            'fields': ('user', 'status', 'total_price', 'created_at', 'updated_at')
        }),
        ('Guest Information', {
            'fields': ('guest_email', 'guest_name'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_processing', 'mark_completed', 'mark_cancelled']
    
    def user_display(self, obj):
        """Display user or guest info."""
        if obj.user:
            return format_html('<strong>{}</strong>', obj.user.email)
        return format_html('<em>Guest: {}</em>', obj.guest_email or obj.guest_name or 'No info')
    user_display.short_description = 'Customer'
    
    def total_price_display(self, obj):
        """Display total price with formatting."""
        return format_html('<strong>€{:.2f}</strong>', obj.total_price)
    total_price_display.short_description = 'Total'
    
    def item_count(self, obj):
        """Display number of items."""
        return obj.items.count()
    item_count.short_description = 'Items'
    
    def mark_processing(self, request, queryset):
        """Bulk action to mark orders as processing."""
        queryset.update(status='processing')
        self.message_user(request, f'{queryset.count()} orders marked as processing.')
    mark_processing.short_description = 'Mark selected orders as processing'
    
    def mark_completed(self, request, queryset):
        """Bulk action to mark orders as completed."""
        queryset.update(status='completed')
        self.message_user(request, f'{queryset.count()} orders marked as completed.')
    mark_completed.short_description = 'Mark selected orders as completed'
    
    def mark_cancelled(self, request, queryset):
        """Bulk action to mark orders as cancelled."""
        queryset.update(status='cancelled')
        self.message_user(request, f'{queryset.count()} orders marked as cancelled.')
    mark_cancelled.short_description = 'Mark selected orders as cancelled'


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'price_at_purchase', 'subtotal_display', 'created_at']
    list_filter = ['created_at']
    search_fields = ['order__id', 'product__name']
    readonly_fields = ['subtotal_display']
    
    def subtotal_display(self, obj):
        """Display subtotal."""
        return f'€{obj.subtotal:.2f}'
    subtotal_display.short_description = 'Subtotal'
