from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from users.models import User
from users.serializers import UserSerializer, UserRegistrationSerializer
from notifications.tasks import send_verification_email


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Send verification email (async in production)
        try:
            send_verification_email(user.id)
        except:
            pass  # Email sending can fail in development
        
        return Response({
            'success': True,
            'message': 'Registration successful. Please check your email for verification.',
            'data': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'error': {
            'code': 'VALIDATION_ERROR',
            'message': 'Invalid input data',
            'details': serializer.errors
        }
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({
            'success': False,
            'error': {
                'code': 'VALIDATION_ERROR',
                'message': 'Email and password are required'
            }
        }, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)
    
    if user is None:
        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                user = None
        except User.DoesNotExist:
            user = None

    if user is None or not user.is_active:
        return Response({
            'success': False,
            'error': {
                'code': 'INVALID_CREDENTIALS',
                'message': 'Invalid email or password'
            }
        }, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    
    user_data = UserSerializer(user).data
    if user.user_type == 'admin':
        user_data['permissions'] = ['view_applications', 'edit_applications', 
                                    'create_applications', 'delete_applications']

    return Response({
        'success': True,
        'message': 'Login successful',
        'data': {
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': user_data
        }
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
    except Exception as e:
        pass  # Token might already be invalid
    
    return Response({
        'success': True,
        'message': 'Logged out successfully'
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def token_refresh(request):
    from rest_framework_simplejwt.tokens import RefreshToken
    
    refresh_token = request.data.get('refresh_token')
    if not refresh_token:
        return Response({
            'success': False,
            'error': {
                'code': 'VALIDATION_ERROR',
                'message': 'Refresh token is required'
            }
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        token = RefreshToken(refresh_token)
        return Response({
            'success': True,
            'access_token': str(token.access_token)
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'success': False,
            'error': {
                'code': 'INVALID_TOKEN',
                'message': 'Invalid or expired refresh token'
            }
        }, status=status.HTTP_401_UNAUTHORIZED)

