from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image', 'ordering']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'ordering', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active', 'ordering']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'current_price_display', 'stock_quantity', 'status', 'is_new', 'created_at']
    list_filter = ['category', 'status', 'is_new', 'created_at']
    search_fields = ['name', 'slug', 'description']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]
    list_editable = ['status', 'is_new']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'description', 'category')
        }),
        ('Pricing', {
            'fields': ('price', 'promo_price', 'promo_start', 'promo_end')
        }),
        ('Inventory', {
            'fields': ('stock_quantity',)
        }),
        ('Status', {
            'fields': ('status', 'is_new')
        }),
    )
    
    actions = ['activate_products', 'deactivate_products', 'set_as_new', 'remove_new_flag']
    
    def current_price_display(self, obj):
        """Display current price with promo indicator."""
        if obj.promo_price and obj.promo_start and obj.promo_end:
            from django.utils import timezone
            now = timezone.now()
            if obj.promo_start <= now <= obj.promo_end:
                return format_html(
                    '<span style="color: red; text-decoration: line-through;">€{}</span> '
                    '<span style="color: green; font-weight: bold;">€{}</span>',
                    obj.price, obj.promo_price
                )
        return f'€{obj.price}'
    current_price_display.short_description = 'Price'
    
    def activate_products(self, request, queryset):
        """Bulk action to activate products."""
        queryset.update(status='active')
        self.message_user(request, f'{queryset.count()} products activated.')
    activate_products.short_description = 'Activate selected products'
    
    def deactivate_products(self, request, queryset):
        """Bulk action to deactivate products."""
        queryset.update(status='hidden')
        self.message_user(request, f'{queryset.count()} products deactivated.')
    deactivate_products.short_description = 'Deactivate selected products'
    
    def set_as_new(self, request, queryset):
        """Bulk action to set products as new."""
        queryset.update(is_new=True)
        self.message_user(request, f'{queryset.count()} products marked as new.')
    set_as_new.short_description = 'Mark selected products as new'
    
    def remove_new_flag(self, request, queryset):
        """Bulk action to remove new flag."""
        queryset.update(is_new=False)
        self.message_user(request, f'{queryset.count()} products unmarked as new.')
    remove_new_flag.short_description = 'Remove new flag from selected products'


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image_preview', 'ordering', 'created_at']
    list_filter = ['created_at']
    search_fields = ['product__name']
    list_editable = ['ordering']
    
    def image_preview(self, obj):
        """Display image preview in admin."""
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" style="object-fit: cover;" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Preview'
