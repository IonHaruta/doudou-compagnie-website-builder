"""
URL configuration for doudou_ecommerce project.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('catalog/', include('catalog.urls')),
        path('orders/', include('orders.urls')),
        path('discounts/', include('discounts.urls')),
    ])),
]
