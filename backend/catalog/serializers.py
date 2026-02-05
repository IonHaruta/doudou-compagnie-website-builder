from rest_framework import serializers
from .models import Category, Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for ProductImage."""
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'ordering']


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category."""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'is_active', 'ordering']


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for Product (read-only for public API)."""
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    current_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    is_in_stock = serializers.BooleanField(read_only=True)
    stock_status = serializers.CharField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'category',
            'price', 'promo_price', 'promo_start', 'promo_end',
            'current_price', 'stock_quantity', 'stock_status', 'is_in_stock',
            'status', 'is_new', 'images', 'created_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product lists."""
    category = serializers.StringRelatedField()
    current_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    stock_status = serializers.CharField(read_only=True)
    primary_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'current_price',
            'stock_status', 'is_new', 'primary_image'
        ]
    
    def get_primary_image(self, obj):
        """Get the first image ordered by ordering field."""
        first_image = obj.images.order_by('ordering').first()
        if first_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(first_image.image.url)
            return first_image.image.url
        return None
