from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from users.models import User
from applications.models import Department, Position, Application, Activity, StatusHistory


class Command(BaseCommand):
    help = 'Create dummy data for testing'

    def handle(self, *args, **options):
        self.stdout.write('Creating dummy data...')

        # Create departments
        dept_names = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales']
        departments = {}
        for name in dept_names:
            dept, created = Department.objects.get_or_create(name=name)
            departments[name] = dept
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created department: {name}'))

        # Create positions
        positions_data = [
            {'title': 'Software Engineer', 'department': 'Engineering', 'description': 'Full-stack development'},
            {'title': 'Senior Developer', 'department': 'Engineering', 'description': 'Lead development projects'},
            {'title': 'Product Manager', 'department': 'Product', 'description': 'Manage product roadmap'},
            {'title': 'UI/UX Designer', 'department': 'Design', 'description': 'Design user interfaces'},
            {'title': 'Marketing Manager', 'department': 'Marketing', 'description': 'Lead marketing campaigns'},
            {'title': 'Data Analyst', 'department': 'Engineering', 'description': 'Analyze business data'},
        ]
        
        positions = {}
        for pos_data in positions_data:
            dept = departments[pos_data['department']]
            pos, created = Position.objects.get_or_create(
                title=pos_data['title'],
                department=dept,
                defaults={
                    'description': pos_data['description'],
                    'is_active': True
                }
            )
            positions[pos_data['title']] = pos
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created position: {pos_data["title"]}'))

        # Create applicant users
        applicants = []
        applicant_data = [
            {'email': 'john.doe@example.com', 'first_name': 'John', 'last_name': 'Doe', 'phone': '555-0101'},
            {'email': 'jane.smith@example.com', 'first_name': 'Jane', 'last_name': 'Smith', 'phone': '555-0102'},
            {'email': 'mike.johnson@example.com', 'first_name': 'Mike', 'last_name': 'Johnson', 'phone': '555-0103'},
            {'email': 'sarah.williams@example.com', 'first_name': 'Sarah', 'last_name': 'Williams', 'phone': '555-0104'},
            {'email': 'tom.brown@example.com', 'first_name': 'Tom', 'last_name': 'Brown', 'phone': '555-0105'},
        ]

        for app_data in applicant_data:
            user, created = User.objects.get_or_create(
                email=app_data['email'],
                defaults={
                    'first_name': app_data['first_name'],
                    'last_name': app_data['last_name'],
                    'phone': app_data['phone'],
                    'user_type': 'applicant',
                    'is_verified': True,
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Created applicant: {app_data["email"]}'))
            applicants.append(user)

        # Create applications
        applications_data = [
            {
                'applicant': applicants[0],
                'position': 'Software Engineer',
                'department': 'Engineering',
                'status': 'under-review',
                'experience': '5 years',
                'expected_salary': '$90,000',
                'skills': 'React, TypeScript, Node.js, Python',
                'education': "Bachelor's Degree",
            },
            {
                'applicant': applicants[1],
                'position': 'Senior Developer',
                'department': 'Engineering',
                'status': 'interview-scheduled',
                'experience': '8 years',
                'expected_salary': '$120,000',
                'skills': 'Java, Spring Boot, AWS, Docker',
                'education': "Master's Degree",
                'interview_date': timezone.now() + timedelta(days=5),
            },
            {
                'applicant': applicants[2],
                'position': 'UI/UX Designer',
                'department': 'Design',
                'status': 'under-review',
                'experience': '4 years',
                'expected_salary': '$75,000',
                'skills': 'Figma, Adobe XD, Sketch, Prototyping',
                'education': "Bachelor's Degree",
            },
            {
                'applicant': applicants[3],
                'position': 'Product Manager',
                'department': 'Product',
                'status': 'accepted',
                'experience': '6 years',
                'expected_salary': '$110,000',
                'skills': 'Agile, Product Strategy, Analytics',
                'education': "Master's Degree",
            },
            {
                'applicant': applicants[4],
                'position': 'Data Analyst',
                'department': 'Engineering',
                'status': 'rejected',
                'experience': '3 years',
                'expected_salary': '$70,000',
                'skills': 'SQL, Python, Tableau, Statistics',
                'education': "Bachelor's Degree",
            },
        ]

        for app_data in applications_data:
            # Create a dummy resume file path
            app_data['resume'] = f'resumes/{app_data["applicant"].email.replace("@", "_")}_resume.pdf'
            
            application = Application.objects.create(**app_data)
            
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
            
            self.stdout.write(self.style.SUCCESS(f'Created application: {application.applicant.first_name} - {application.position}'))

        self.stdout.write(self.style.SUCCESS('\nDummy data created successfully!'))
        self.stdout.write(f'Created: {len(departments)} departments, {len(positions)} positions, {len(applicants)} applicants, {len(applications_data)} applications')

