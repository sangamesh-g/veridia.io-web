from rest_framework import status, viewsets, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count
from django.utils import timezone
from datetime import timedelta

from .models import Application, StatusHistory, Department, Position, Activity
from .serializers import (
    ApplicationSerializer, ApplicationCreateSerializer,
    StatusHistorySerializer, DepartmentSerializer, PositionSerializer,
    ActivitySerializer
)
from users.models import User
from notifications.tasks import send_application_confirmation, send_status_update_email


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'department', 'position']
    search_fields = ['applicant__first_name', 'applicant__last_name', 'applicant__email']
    ordering_fields = ['applied_date', 'last_updated', 'status']
    ordering = ['-applied_date']

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'admin':
            return Application.objects.all()
        return Application.objects.filter(applicant=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return ApplicationCreateSerializer
        return ApplicationSerializer

    def perform_create(self, serializer):
        application = serializer.save(applicant=self.request.user)
        # Create status history
        StatusHistory.objects.create(
            application=application,
            status=application.status,
            changed_by=None,
            comment="Application submitted"
        )
        # Create activity
        Activity.objects.create(
            action='application_submitted',
            description=f'New application received for {application.position}',
            applicant=self.request.user,
            application=application
        )
        # Send emails
        try:
            send_application_confirmation(application.id)
        except:
            pass

    def perform_update(self, serializer):
        old_status = self.get_object().status
        application = serializer.save()
        new_status = application.status

        if old_status != new_status:
            StatusHistory.objects.create(
                application=application,
                status=new_status,
                changed_by=self.request.user,
                comment=serializer.validated_data.get('notes', '')
            )
            # Send status update email
            try:
                send_status_update_email(application.id, new_status)
            except:
                pass

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        application = self.get_object()
        new_status = request.data.get('status')
        interview_date = request.data.get('interview_date')
        notes = request.data.get('notes', '')
        comment = request.data.get('comment', '')

        if new_status:
            old_status = application.status
            application.status = new_status
            if interview_date:
                application.interview_date = interview_date
            if notes:
                application.notes = notes
            application.save()

            StatusHistory.objects.create(
                application=application,
                status=new_status,
                changed_by=request.user,
                comment=comment or notes
            )

            # Send email
            try:
                send_status_update_email(application.id, new_status)
            except:
                pass

            return Response({
                'success': True,
                'message': 'Application status updated successfully',
                'data': ApplicationSerializer(application, context={'request': request}).data
            })

        return Response({
            'success': False,
            'error': {'code': 'VALIDATION_ERROR', 'message': 'Status is required'}
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applicant_dashboard_stats(request):
    user = request.user
    applications = Application.objects.filter(applicant=user)
    
    total = applications.count()
    pending = applications.filter(status='under-review').count()
    interviews = applications.filter(status='interview-scheduled').count()
    rejected = applications.filter(status='rejected').count()
    accepted = applications.filter(status='accepted').count()
    
    response_rate = (total - pending) / total * 100 if total > 0 else 0

    return Response({
        'success': True,
        'data': {
            'total_applications': total,
            'pending_review': pending,
            'interviews_scheduled': interviews,
            'rejected': rejected,
            'accepted': accepted,
            'response_rate': round(response_rate, 2)
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard_stats(request):
    if request.user.user_type != 'admin':
        return Response({
            'success': False,
            'error': {'code': 'FORBIDDEN', 'message': 'Admin access required'}
        }, status=status.HTTP_403_FORBIDDEN)

    applications = Application.objects.all()
    
    total = applications.count()
    pending = applications.filter(status='under-review').count()
    interviews = applications.filter(status='interview-scheduled').count()
    accepted = applications.filter(status='accepted').count()
    rejected = applications.filter(status='rejected').count()

    # Department stats
    dept_stats = applications.values('department').annotate(
        count=Count('id')
    ).order_by('-count')

    total_dept = sum(d['count'] for d in dept_stats)
    dept_data = [
        {
            'department': d['department'],
            'count': d['count'],
            'percentage': round(d['count'] / total * 100, 2) if total > 0 else 0
        }
        for d in dept_stats
    ]

    return Response({
        'success': True,
        'data': {
            'total_applications': total,
            'pending_review': pending,
            'interviews_scheduled': interviews,
            'accepted': accepted,
            'rejected': rejected,
            'avg_time_to_hire': 21,  # Placeholder
            'acceptance_rate': round(accepted / total * 100, 2) if total > 0 else 0,
            'interview_conversion_rate': 80,  # Placeholder
            'active_positions': Position.objects.filter(is_active=True).count(),
            'department_stats': dept_data
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_analytics(request):
    if request.user.user_type != 'admin':
        return Response({
            'success': False,
            'error': {'code': 'FORBIDDEN', 'message': 'Admin access required'}
        }, status=status.HTTP_403_FORBIDDEN)

    applications = Application.objects.all()
    
    # Monthly applications
    monthly = applications.extra(
        select={'month': "strftime('%%Y-%%m', applied_date)"}
    ).values('month').annotate(count=Count('id')).order_by('month')

    # Status distribution
    status_dist = applications.values('status').annotate(count=Count('id'))
    status_data = {s['status']: s['count'] for s in status_dist}

    # Department distribution
    dept_dist = applications.values('department').annotate(count=Count('id'))
    dept_data = {d['department']: d['count'] for d in dept_dist}

    # Top positions
    top_positions = applications.values('position').annotate(
        count=Count('id')
    ).order_by('-count')[:5]

    return Response({
        'success': True,
        'data': {
            'overview': {
                'total_applications': applications.count(),
                'total_applicants': User.objects.filter(user_type='applicant').count(),
                'acceptance_rate': round(
                    applications.filter(status='accepted').count() / applications.count() * 100, 2
                ) if applications.count() > 0 else 0,
                'avg_time_to_hire': 21
            },
            'applications_by_month': [
                {'month': m['month'], 'count': m['count']} for m in monthly
            ],
            'applications_by_status': status_data,
            'applications_by_department': dept_data,
            'top_positions': [
                {'position': p['position'], 'count': p['count']} for p in top_positions
            ]
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recent_activity(request):
    if request.user.user_type != 'admin':
        return Response({
            'success': False,
            'error': {'code': 'FORBIDDEN', 'message': 'Admin access required'}
        }, status=status.HTTP_403_FORBIDDEN)

    limit = int(request.query_params.get('limit', 20))
    activities = Activity.objects.all()[:limit]
    
    return Response({
        'success': True,
        'data': ActivitySerializer(activities, many=True).data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def upcoming_interviews(request):
    if request.user.user_type != 'admin':
        return Response({
            'success': False,
            'error': {'code': 'FORBIDDEN', 'message': 'Admin access required'}
        }, status=status.HTTP_403_FORBIDDEN)

    interviews = Application.objects.filter(
        status='interview-scheduled',
        interview_date__gte=timezone.now()
    ).order_by('interview_date')

    data = []
    for app in interviews:
        data.append({
            'interview_id': app.id,
            'application_id': app.id,
            'applicant': {
                'user_id': app.applicant.id,
                'first_name': app.applicant.first_name,
                'last_name': app.applicant.last_name,
                'email': app.applicant.email,
                'phone': app.applicant.phone
            },
            'position': app.position,
            'department': app.department,
            'interview_date': app.interview_date,
            'interview_type': 'technical',  # Placeholder
            'interviewer': 'TBD',  # Placeholder
            'location': 'Office',  # Placeholder
            'notes': app.notes
        })

    return Response({
        'success': True,
        'data': data
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_departments(request):
    departments = Department.objects.all()
    return Response({
        'success': True,
        'data': DepartmentSerializer(departments, many=True).data
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_positions(request):
    positions = Position.objects.filter(is_active=True)
    return Response({
        'success': True,
        'data': PositionSerializer(positions, many=True).data
    })

