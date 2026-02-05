from rest_framework import serializers
from .models import Order, OrderItem
from catalog.models import Product


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for OrderItem."""
    product_name = serializers.CharField(source='product.name', read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price_at_purchase', 'subtotal']
        read_only_fields = ['id', 'price_at_purchase', 'subtotal']


class OrderCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating orders (public API)."""
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'guest_email', 'guest_name', 'items', 'total_price', 'status', 'created_at']
        read_only_fields = ['id', 'total_price', 'status', 'created_at']
    
    def validate_items(self, value):
        """Validate that items list is not empty."""
        if not value:
            raise serializers.ValidationError("Order must have at least one item.")
        return value
    
    def validate(self, data):
        """Validate guest information if user is not provided."""
        if not data.get('user') and not data.get('guest_email'):
            raise serializers.ValidationError("Either user or guest_email must be provided.")
        return data
    
    def create(self, validated_data):
        """Create order with items."""
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            
            # Check stock availability
            if product.stock_quantity < quantity:
                raise serializers.ValidationError(
                    f"Insufficient stock for {product.name}. Available: {product.stock_quantity}"
                )
            
            # Use current price (promo if active)
            price_at_purchase = product.current_price
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price_at_purchase=price_at_purchase
            )
            
            # Update stock
            product.stock_quantity -= quantity
            product.save()
        
        # Recalculate total
        order.calculate_total()
        order.save()
        
        return order


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for Order (read-only for detail view)."""
    items = OrderItemSerializer(many=True, read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'user_email', 'guest_email', 'guest_name',
            'status', 'total_price', 'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
