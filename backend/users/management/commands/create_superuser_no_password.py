from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    help = 'Create a superuser with default credentials (no password prompt)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--email',
            type=str,
            default='admin@example.com',
            help='Email for the superuser (default: admin@example.com)',
        )
        parser.add_argument(
            '--first-name',
            type=str,
            default='Admin',
            help='First name for the superuser (default: Admin)',
        )
        parser.add_argument(
            '--last-name',
            type=str,
            default='User',
            help='Last name for the superuser (default: User)',
        )
        parser.add_argument(
            '--phone',
            type=str,
            default='0000000000',
            help='Phone number for the superuser (default: 0000000000)',
        )
        parser.add_argument(
            '--password',
            type=str,
            default='admin',
            help='Password for the superuser (default: admin)',
        )

    def handle(self, *args, **options):
        email = options['email']
        first_name = options['first_name']
        last_name = options['last_name']
        phone = options['phone']
        password = options['password']

        # Check if user already exists
        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.WARNING(f'User with email {email} already exists.'))
            user = User.objects.get(email=email)
            if not user.is_superuser:
                user.is_superuser = True
                user.is_staff = True
                user.user_type = 'admin'
                user.is_verified = True
                user.set_password(password)
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Updated existing user {email} to superuser.'))
            else:
                self.stdout.write(self.style.SUCCESS(f'User {email} is already a superuser.'))
            return

        # Create new superuser
        try:
            user = User.objects.create_superuser(
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                phone=phone,
                user_type='admin',
                is_verified=True
            )
            self.stdout.write(self.style.SUCCESS(f'Superuser created successfully!'))
            self.stdout.write(f'  Email: {email}')
            self.stdout.write(f'  Password: {password}')
            self.stdout.write(self.style.WARNING('\n⚠️  Please change the password after first login!'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error creating superuser: {str(e)}'))

