from rest_framework import serializers
from django.db import transaction
from .models import Order, OrderItem
from catalog.models import Product


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price_at_purchase', 'total']

    def get_total(self, obj):
        return obj.total


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_username = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'user_username', 'guest_email', 'guest_name', 'status', 'total', 'items', 'created_at', 'updated_at']

    def get_user_username(self, obj):
        if obj.user:
            return getattr(obj.user, 'email', None) or obj.user.username
        return None


class OrderCreateSerializer(serializers.Serializer):
    items = serializers.ListField(
        child=serializers.DictField()
    )
    guest_email = serializers.EmailField(required=False)
    guest_name = serializers.CharField(max_length=100, required=False)
    user = serializers.IntegerField(required=False)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must have at least one item")
        return value

    def validate(self, data):
        items = data['items']
        total = 0
        for item in items:
            try:
                product = Product.objects.get(id=item['product_id'], is_active=True)
                quantity = item['quantity']
                if quantity > product.stock:
                    raise serializers.ValidationError(f"Insufficient stock for {product.name}")
                total += product.price * quantity
            except Product.DoesNotExist:
                raise serializers.ValidationError(f"Product {item['product_id']} does not exist")
        data['total'] = total
        return data

    @transaction.atomic
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            product = Product.objects.get(id=item_data['product_id'])
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item_data['quantity'],
                price_at_purchase=product.price
            )
            product.stock -= item_data['quantity']
            product.save()

        return order
