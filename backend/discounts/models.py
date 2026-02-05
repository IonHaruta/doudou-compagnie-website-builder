from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Coupon(models.Model):
    """
    Coupon model for discounts.
    Simple coupon validation logic (no stacking).
    """
    code = models.CharField(max_length=50, unique=True)
    discount_percent = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Discount percentage (0-100)"
    )
    active = models.BooleanField(default=True)
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Coupon'
        verbose_name_plural = 'Coupons'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.code} - {self.discount_percent}%"
    
    def is_valid(self):
        """
        Check if coupon is currently valid.
        Returns (is_valid: bool, message: str)
        """
        from django.utils import timezone
        now = timezone.now()
        
        if not self.active:
            return False, "Coupon is not active"
        
        if now < self.valid_from:
            return False, "Coupon is not yet valid"
        
        if now > self.valid_until:
            return False, "Coupon has expired"
        
        return True, "Coupon is valid"
