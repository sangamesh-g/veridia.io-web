from django.urls import path
from . import views
from applications import views as app_views

urlpatterns = [
    path('profile/', views.profile, name='user-profile'),
    path('departments/', app_views.get_departments, name='departments'),
    path('positions/', app_views.get_positions, name='positions'),
]

