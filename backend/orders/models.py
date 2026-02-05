from django.db import models
from django.core.validators import MinValueValidator
from accounts.models import User
from catalog.models import Product


class Order(models.Model):
    """
    Order model.
    """
    STATUS_CHOICES = [
        ('new', 'New'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Guest checkout fields
    guest_email = models.EmailField(blank=True, null=True)
    guest_name = models.CharField(max_length=200, blank=True)
    
    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
        ordering = ['-created_at']
    
    def __str__(self):
        if self.user:
            return f"Order #{self.id} - {self.user.email}"
        return f"Order #{self.id} - Guest ({self.guest_email or 'No email'})"
    
    def calculate_total(self):
        """Calculate total price from order items."""
        total = sum(item.subtotal for item in self.items.all())
        self.total_price = total
        return total
    
    def save(self, *args, **kwargs):
        """Override save to auto-calculate total."""
        if not self.pk:  # New order
            super().save(*args, **kwargs)
        self.calculate_total()
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    """
    Order item model.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'
        ordering = ['created_at']
        unique_together = ['order', 'product']
    
    def __str__(self):
        return f"{self.product.name} x{self.quantity} - Order #{self.order.id}"
    
    @property
    def subtotal(self):
        """Calculate subtotal for this item."""
        return self.quantity * self.price_at_purchase
    
    def save(self, *args, **kwargs):
        """Override save to update order total."""
        super().save(*args, **kwargs)
        self.order.calculate_total()
        self.order.save()
