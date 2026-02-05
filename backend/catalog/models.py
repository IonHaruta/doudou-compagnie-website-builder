from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator


class Category(models.Model):
    """
    Product category model.
    """
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    is_active = models.BooleanField(default=True)
    ordering = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['ordering', 'name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    """
    Product model.
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('hidden', 'Hidden'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    promo_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, validators=[MinValueValidator(0)])
    promo_start = models.DateTimeField(null=True, blank=True)
    promo_end = models.DateTimeField(null=True, blank=True)
    stock_quantity = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    @property
    def current_price(self):
        """Returns the current price (promo if active, otherwise regular price)."""
        from django.utils import timezone
        now = timezone.now()
        if self.promo_price and self.promo_start and self.promo_end:
            if self.promo_start <= now <= self.promo_end:
                return self.promo_price
        return self.price
    
    @property
    def is_in_stock(self):
        """Returns True if product is in stock."""
        return self.stock_quantity > 0
    
    @property
    def stock_status(self):
        """Returns stock status string."""
        if self.stock_quantity == 0:
            return 'out-of-stock'
        elif self.stock_quantity < 10:
            return 'limited'
        return 'in-stock'


class ProductImage(models.Model):
    """
    Product image model.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    ordering = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Product Image'
        verbose_name_plural = 'Product Images'
        ordering = ['ordering', 'created_at']
    
    def __str__(self):
        return f"{self.product.name} - Image {self.ordering}"
