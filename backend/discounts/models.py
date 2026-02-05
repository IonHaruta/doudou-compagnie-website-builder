from django.db import models


class Coupon(models.Model):
    code = models.CharField(max_length=20, unique=True)
    discount_percent = models.PositiveIntegerField(help_text="Discount percentage (0-100)")
    active = models.BooleanField(default=True)
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code

    @property
    def status_display(self):
        if not self.active:
            return "Inactive"
        from django.utils import timezone
        now = timezone.now()
        if self.valid_from <= now <= self.valid_until:
            return "Active"
        elif now < self.valid_from:
            return "Not started"
        else:
            return "Expired"
