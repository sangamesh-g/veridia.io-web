from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/stats/', views.admin_dashboard_stats, name='admin-dashboard-stats'),
    path('applications/', views.ApplicationViewSet.as_view({'get': 'list', 'post': 'create'}), name='admin-applications-list'),
    path('applications/<int:pk>/', views.ApplicationViewSet.as_view({
        'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'
    }), name='admin-application-detail'),
    path('applications/<int:pk>/status/', views.ApplicationViewSet.as_view({'patch': 'update_status'}), name='admin-application-status'),
    path('analytics/', views.admin_analytics, name='admin-analytics'),
    path('activity/', views.recent_activity, name='admin-activity'),
    path('interviews/upcoming/', views.upcoming_interviews, name='admin-upcoming-interviews'),
]

