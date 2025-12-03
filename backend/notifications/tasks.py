from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from applications.models import Application
from users.models import User


def send_verification_email(user_id):
    """Send email verification to new user"""
    try:
        user = User.objects.get(id=user_id)
        subject = 'Welcome to Veridia - Verify Your Email'
        message = f"""
        Hello {user.first_name},
        
        Thank you for registering with Veridia! Please verify your email address to complete your registration.
        
        Best regards,
        Veridia Team
        """
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
    except Exception as e:
        print(f"Error sending verification email: {e}")


def send_application_confirmation(application_id):
    """Send confirmation email to applicant and notification to HR"""
    try:
        application = Application.objects.get(id=application_id)
        applicant = application.applicant
        
        # Email to applicant
        subject = f'Application Received - {application.position}'
        message = f"""
        Hello {applicant.first_name},
        
        Thank you for your interest in the {application.position} position at Veridia.
        We have received your application and will review it shortly.
        
        Application Details:
        - Position: {application.position}
        - Department: {application.department}
        - Applied Date: {application.applied_date.strftime("%B %d, %Y")}
        
        We will get back to you soon with an update.
        
        Best regards,
        Veridia HR Team
        """
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [applicant.email],
            fail_silently=False,
        )
        
        # Email to HR team (if configured)
        admin_users = User.objects.filter(user_type='admin', is_active=True)
        if admin_users.exists():
            hr_subject = f'New Application Received - {application.position}'
            hr_message = f"""
            A new application has been received:
            
            Applicant: {applicant.full_name}
            Email: {applicant.email}
            Position: {application.position}
            Department: {application.department}
            Applied Date: {application.applied_date.strftime("%B %d, %Y")}
            
            Please review the application in the admin dashboard.
            """
            admin_emails = [admin.email for admin in admin_users]
            send_mail(
                hr_subject,
                hr_message,
                settings.DEFAULT_FROM_EMAIL,
                admin_emails,
                fail_silently=False,
            )
    except Exception as e:
        print(f"Error sending application confirmation: {e}")


def send_status_update_email(application_id, new_status):
    """Send email when application status changes"""
    try:
        application = Application.objects.get(id=application_id)
        applicant = application.applicant
        
        status_messages = {
            'under-review': {
                'subject': f'Application Update - {application.position}',
                'message': f'Your application for {application.position} is currently under review.'
            },
            'interview-scheduled': {
                'subject': f'Interview Invitation - {application.position}',
                'message': f'Congratulations! We would like to invite you for an interview for the {application.position} position.'
            },
            'accepted': {
                'subject': f'Congratulations! Offer Letter - {application.position}',
                'message': f'We are pleased to inform you that you have been selected for the {application.position} position!'
            },
            'rejected': {
                'subject': f'Application Update - {application.position}',
                'message': f'Thank you for your interest. Unfortunately, we have decided to move forward with other candidates for the {application.position} position.'
            }
        }
        
        status_info = status_messages.get(new_status, {
            'subject': f'Application Update - {application.position}',
            'message': f'Your application status has been updated to {new_status}.'
        })
        
        message = f"""
        Hello {applicant.first_name},
        
        {status_info['message']}
        
        Application Details:
        - Position: {application.position}
        - Department: {application.department}
        - Status: {new_status.replace("-", " ").title()}
        """
        
        if new_status == 'interview-scheduled' and application.interview_date:
            message += f"\n- Interview Date: {application.interview_date.strftime('%B %d, %Y at %I:%M %p')}"
        
        message += "\n\nBest regards,\nVeridia HR Team"
        
        send_mail(
            status_info['subject'],
            message,
            settings.DEFAULT_FROM_EMAIL,
            [applicant.email],
            fail_silently=False,
        )
    except Exception as e:
        print(f"Error sending status update email: {e}")

