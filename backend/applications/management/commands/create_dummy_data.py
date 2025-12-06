import csv
import os
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
from users.models import User
from applications.models import Department, Position, Application, Activity, StatusHistory


class Command(BaseCommand):
    help = 'Load dummy data from CSV files into the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before loading',
        )

    def handle(self, *args, **options):
        self.stdout.write('Loading dummy data from CSV files...')
        
        # Get the fixtures directory path
        fixtures_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            'fixtures'
        )

        if options['clear']:
            self.stdout.write(self.style.WARNING('Clearing existing data...'))
            Application.objects.all().delete()
            Position.objects.all().delete()
            Department.objects.all().delete()
            User.objects.filter(user_type='applicant').delete()
            Activity.objects.all().delete()
            StatusHistory.objects.all().delete()

        # Load departments
        departments = self.load_departments(fixtures_dir)
        
        # Load positions
        positions = self.load_positions(fixtures_dir, departments)
        
        # Load applicants
        applicants = self.load_applicants(fixtures_dir)
        
        # Load applications
        self.load_applications(fixtures_dir, applicants)

        # Summary
        self.stdout.write(self.style.SUCCESS('\n' + '='*60))
        self.stdout.write(self.style.SUCCESS('Dummy data loaded successfully!'))
        self.stdout.write(self.style.SUCCESS('='*60))
        self.stdout.write(f'\nSummary:')
        self.stdout.write(f'  - Departments: {Department.objects.count()}')
        self.stdout.write(f'  - Positions: {Position.objects.count()}')
        self.stdout.write(f'  - Applicants: {User.objects.filter(user_type="applicant").count()}')
        self.stdout.write(f'  - Applications: {Application.objects.count()}')
        self.stdout.write(f'  - Activities: {Activity.objects.count()}')
        self.stdout.write(f'  - Status History Records: {StatusHistory.objects.count()}')
        self.stdout.write(self.style.SUCCESS('\nYou can view and manage this data in Django Admin'))

    def load_departments(self, fixtures_dir):
        """Load departments from CSV"""
        departments = {}
        csv_path = os.path.join(fixtures_dir, 'departments.csv')
        
        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f'CSV file not found: {csv_path}'))
            return departments

        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                dept, created = Department.objects.get_or_create(
                    name=row['name'],
                    defaults={'description': row.get('description', '')}
                )
                departments[row['name']] = dept
                if created:
                    self.stdout.write(self.style.SUCCESS(f'Created department: {row["name"]}'))
                else:
                    self.stdout.write(f'Department already exists: {row["name"]}')

        return departments

    def load_positions(self, fixtures_dir, departments):
        """Load positions from CSV"""
        positions = {}
        csv_path = os.path.join(fixtures_dir, 'positions.csv')
        
        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f'CSV file not found: {csv_path}'))
            return positions

        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                dept_name = row['department']
                if dept_name not in departments:
                    self.stdout.write(self.style.ERROR(f'Department not found: {dept_name}'))
                    continue

                is_active = row.get('is_active', 'True').lower() == 'true'
                pos, created = Position.objects.get_or_create(
                    title=row['title'],
                    department=departments[dept_name],
                    defaults={
                        'description': row.get('description', ''),
                        'is_active': is_active
                    }
                )
                positions[row['title']] = pos
                if created:
                    self.stdout.write(self.style.SUCCESS(f'Created position: {row["title"]}'))
                else:
                    self.stdout.write(f'Position already exists: {row["title"]}')

        return positions

    def load_applicants(self, fixtures_dir):
        """Load applicants from CSV"""
        applicants = {}
        csv_path = os.path.join(fixtures_dir, 'applicants.csv')
        
        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f'CSV file not found: {csv_path}'))
            return applicants

        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                is_verified = row.get('is_verified', 'True').lower() == 'true'
                user, created = User.objects.get_or_create(
                    email=row['email'],
                    defaults={
                        'first_name': row['first_name'],
                        'last_name': row['last_name'],
                        'phone': row['phone'],
                        'user_type': row.get('user_type', 'applicant'),
                        'is_verified': is_verified,
                    }
                )
                if created:
                    user.set_password('password123')
                    user.save()
                    self.stdout.write(self.style.SUCCESS(f'Created applicant: {row["email"]}'))
                else:
                    self.stdout.write(f'Applicant already exists: {row["email"]}')
                applicants[row['email']] = user

        return applicants

    def load_applications(self, fixtures_dir, applicants):
        """Load applications from CSV"""
        csv_path = os.path.join(fixtures_dir, 'applications.csv')
        
        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f'CSV file not found: {csv_path}'))
            return

        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                applicant_email = row['applicant_email']
                if applicant_email not in applicants:
                    self.stdout.write(self.style.ERROR(f'Applicant not found: {applicant_email}'))
                    continue

                # Parse interview_date if provided
                interview_date = None
                if row.get('interview_date') and row['interview_date'].strip():
                    try:
                        days_offset = int(row['interview_date'])
                        interview_date = timezone.now() + timedelta(days=days_offset)
                    except ValueError:
                        pass

                # Create application
                application_data = {
                    'applicant': applicants[applicant_email],
                    'position': row['position'],
                    'department': row['department'],
                    'status': row['status'],
                    'experience': row.get('experience', ''),
                    'expected_salary': row.get('expected_salary', ''),
                    'skills': row.get('skills', ''),
                    'education': row.get('education', ''),
                    'resume': f'resumes/{applicant_email.replace("@", "_")}_resume.pdf',
                }

                if interview_date:
                    application_data['interview_date'] = interview_date

                application, created = Application.objects.get_or_create(
                    applicant=applicants[applicant_email],
                    position=row['position'],
                    defaults=application_data
                )

                if created:
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
                        applicant=application.applicant,
                        application=application
                    )
                    
                    self.stdout.write(self.style.SUCCESS(
                        f'Created application: {application.applicant.first_name} - {application.position}'
                    ))
                else:
                    self.stdout.write(f'Application already exists: {applicant_email} - {row["position"]}')
