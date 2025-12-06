from rest_framework import serializers
from .models import Application, StatusHistory, Department, Position, Activity
from users.serializers import UserSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    applicant = UserSerializer(read_only=True)
    resume_url = serializers.SerializerMethodField()
    status_history = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = ['id', 'applicant', 'position', 'department', 'experience',
                  'current_company', 'current_salary', 'expected_salary',
                  'notice_period', 'availability', 'education', 'university',
                  'graduation_year', 'skills', 'linkedin_url', 'portfolio_url',
                  'cover_letter', 'referral', 'resume', 'resume_url', 'status',
                  'interview_date', 'notes', 'applied_date', 'last_updated',
                  'status_history']
        read_only_fields = ['id', 'applied_date', 'last_updated']

    def get_resume_url(self, obj):
        if obj.resume:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.resume.url)
            return obj.resume.url
        return None

    def get_status_history(self, obj):
        history = obj.status_history.all()[:10]  # Last 10 status changes
        return StatusHistorySerializer(history, many=True).data


class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['position', 'department', 'experience', 'current_company',
                  'current_salary', 'expected_salary', 'notice_period',
                  'availability', 'education', 'university', 'graduation_year',
                  'skills', 'linkedin_url', 'portfolio_url', 'cover_letter',
                  'referral', 'resume']


class StatusHistorySerializer(serializers.ModelSerializer):
    changed_by_name = serializers.SerializerMethodField()

    class Meta:
        model = StatusHistory
        fields = ['id', 'status', 'changed_by', 'changed_by_name', 
                  'changed_at', 'comment']

    def get_changed_by_name(self, obj):
        if obj.changed_by:
            return obj.changed_by.full_name
        return "System"


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description']


class PositionSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True
    )

    class Meta:
        model = Position
        fields = ['id', 'title', 'department', 'department_id', 'description',
                  'requirements', 'is_active', 'created_at', 'updated_at']


class ActivitySerializer(serializers.ModelSerializer):
    applicant_name = serializers.SerializerMethodField()
    changed_by_name = serializers.SerializerMethodField()
    applicant_data = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ['id', 'action', 'description', 'applicant', 'applicant_name', 'applicant_data',
                  'application', 'changed_by', 'changed_by_name', 'timestamp',
                  'metadata']

    def get_applicant_name(self, obj):
        if obj.applicant:
            return obj.applicant.full_name
        return None

    def get_applicant_data(self, obj):
        if obj.applicant:
            return {
                'first_name': obj.applicant.first_name,
                'last_name': obj.applicant.last_name,
                'email': obj.applicant.email
            }
        return None

    def get_changed_by_name(self, obj):
        if obj.changed_by:
            return obj.changed_by.full_name
        return None

