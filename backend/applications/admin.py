from django.contrib import admin
from .models import Application, StatusHistory, Department, Position, Activity


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'is_active', 'created_at']
    list_filter = ['department', 'is_active', 'created_at']
    search_fields = ['title', 'description']


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['applicant', 'position', 'department', 'status', 'applied_date']
    list_filter = ['status', 'department', 'applied_date']
    search_fields = ['applicant__email', 'applicant__first_name', 'applicant__last_name', 'position']
    readonly_fields = ['applied_date', 'last_updated']
    date_hierarchy = 'applied_date'


@admin.register(StatusHistory)
class StatusHistoryAdmin(admin.ModelAdmin):
    list_display = ['application', 'status', 'changed_by', 'changed_at']
    list_filter = ['status', 'changed_at']
    readonly_fields = ['changed_at']
    date_hierarchy = 'changed_at'


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['action', 'applicant', 'timestamp']
    list_filter = ['action', 'timestamp']
    readonly_fields = ['timestamp']
    date_hierarchy = 'timestamp'

