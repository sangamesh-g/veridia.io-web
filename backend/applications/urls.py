from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'applications', views.ApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/stats/', views.applicant_dashboard_stats, name='applicant-dashboard-stats'),
]

