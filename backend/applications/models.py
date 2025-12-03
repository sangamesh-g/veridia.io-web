from django.db import models
from django.utils import timezone
from users.models import User


class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'departments'


class Position(models.Model):
    title = models.CharField(max_length=200)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    description = models.TextField()
    requirements = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.department.name}"

    class Meta:
        db_table = 'positions'


class Application(models.Model):
    STATUS_CHOICES = [
        ('under-review', 'Under Review'),
        ('interview-scheduled', 'Interview Scheduled'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    position = models.CharField(max_length=200)
    department = models.CharField(max_length=100)
    experience = models.CharField(max_length=50, null=True, blank=True)
    current_company = models.CharField(max_length=200, null=True, blank=True)
    current_salary = models.CharField(max_length=50, null=True, blank=True)
    expected_salary = models.CharField(max_length=50, null=True, blank=True)
    notice_period = models.CharField(max_length=50, null=True, blank=True)
    availability = models.CharField(max_length=100, null=True, blank=True)
    education = models.CharField(max_length=200, null=True, blank=True)
    university = models.CharField(max_length=200, null=True, blank=True)
    graduation_year = models.CharField(max_length=10, null=True, blank=True)
    skills = models.TextField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    portfolio_url = models.URLField(null=True, blank=True)
    cover_letter = models.TextField(null=True, blank=True)
    referral = models.CharField(max_length=100, null=True, blank=True)
    resume = models.FileField(upload_to='resumes/')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='under-review')
    interview_date = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    applied_date = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.applicant.full_name} - {self.position}"

    class Meta:
        db_table = 'applications'
        ordering = ['-applied_date']


class StatusHistory(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='status_history')
    status = models.CharField(max_length=50)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    changed_at = models.DateTimeField(default=timezone.now)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.application} - {self.status} ({self.changed_at})"

    class Meta:
        db_table = 'status_history'
        ordering = ['-changed_at']


class Activity(models.Model):
    action = models.CharField(max_length=100)
    description = models.TextField()
    applicant = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='activities')
    application = models.ForeignKey(Application, on_delete=models.SET_NULL, null=True, blank=True)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='changed_activities')
    timestamp = models.DateTimeField(default=timezone.now)
    metadata = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.action} - {self.timestamp}"

    class Meta:
        db_table = 'activities'
        ordering = ['-timestamp']

