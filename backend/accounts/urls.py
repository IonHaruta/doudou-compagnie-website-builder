from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.AdminLoginView.as_view(), name='admin-login'),
    path('dashboard-stats/', views.AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
]
