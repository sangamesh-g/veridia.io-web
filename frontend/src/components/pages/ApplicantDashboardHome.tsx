import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  TrendingUp,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { applicantAPI } from '../../services/api';

interface ApplicantDashboardHomeProps {
  onNavigate: (page: string) => void;
}

interface DashboardStats {
  total_applications: number;
  pending_review: number;
  interviews_scheduled: number;
  rejected: number;
  accepted: number;
  response_rate: number;
}

interface Application {
  id: number;
  position: string;
  department: string;
  applied_date: string;
  status: string;
  interview_date?: string;
}

export function ApplicantDashboardHome({ onNavigate }: ApplicantDashboardHomeProps) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserName(user.first_name || 'User');
        }

        const [statsRes, applicationsRes] = await Promise.all([
          applicantAPI.getDashboardStats(),
          applicantAPI.getApplications({ page_size: 3 })
        ]);

        if (statsRes.success) {
          setStats(statsRes.data);
        }
        if (applicationsRes.success) {
          setRecentApplications(applicationsRes.results || applicationsRes.data || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under-review':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'interview-scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Calendar className="w-3 h-3 mr-1" />
            Interview Scheduled
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'accepted':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600">Unable to load dashboard data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {userName}</h1>
        <p className="text-gray-600">Track and manage your job applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{stats.total_applications}</h2>
            <p className="text-sm text-gray-600">Total Applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{stats.pending_review}</h2>
            <p className="text-sm text-gray-600">Pending Review</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{stats.interviews_scheduled}</h2>
            <p className="text-sm text-gray-600">Interviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{stats.response_rate}%</h2>
            <p className="text-sm text-gray-600">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Your latest job applications</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('applications')}
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplications.length === 0 ? (
              <p className="text-gray-500 text-sm">No applications yet</p>
            ) : (
              recentApplications.map((application) => (
                <Card key={application.id} className="border-l-4 border-l-blue-600">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-gray-900 mb-1">{application.position}</h3>
                        <p className="text-gray-600 text-sm">{application.department}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Applied: {new Date(application.applied_date).toLocaleDateString()}</span>
                    </div>
                    {application.interview_date && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                          <strong>Interview scheduled:</strong> {new Date(application.interview_date).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start"
              onClick={() => onNavigate('new-application')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Submit New Application
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('applications')}
            >
              <FileText className="w-4 h-4 mr-2" />
              View All Applications
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('profile')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
