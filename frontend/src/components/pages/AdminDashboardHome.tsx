import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Calendar,
  Loader2
} from 'lucide-react';
import { adminAPI } from '../../services/api';

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

interface DashboardStats {
  total_applications: number;
  pending_review: number;
  interviews_scheduled: number;
  accepted: number;
  rejected: number;
  avg_time_to_hire: number;
  acceptance_rate: number;
  interview_conversion_rate: number;
  active_positions: number;
  department_stats: Array<{
    department: string;
    count: number;
    percentage: number;
  }>;
}

interface Activity {
  id: number;
  action: string;
  description: string;
  applicant_data?: {
    first_name: string;
    last_name: string;
  };
  application?: {
    position: string;
  };
  timestamp: string;
}

interface Interview {
  applicant: {
    first_name: string;
    last_name: string;
  };
  position: string;
  interview_date: string;
}

export function AdminDashboardHome() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, activityRes, interviewsRes] = await Promise.all([
          adminAPI.getDashboardStats(),
          adminAPI.getRecentActivity(5),
          adminAPI.getUpcomingInterviews()
        ]);

        if (statsRes.success) {
          setStats(statsRes.data);
        }
        if (activityRes.success) {
          setRecentActivity(activityRes.data);
        }
        if (interviewsRes.success) {
          setUpcomingInterviews(interviewsRes.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          {stats.pending_review} applications pending review
        </p>
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
            <p className="text-sm text-gray-600">Interviews Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{stats.accepted}</h2>
            <p className="text-sm text-gray-600">Accepted</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent activity</p>
              ) : (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      {activity.applicant_data && (
                        <p className="text-xs text-gray-600 mt-1">
                          {activity.applicant_data.first_name} {activity.applicant_data.last_name}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Applications across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.department_stats.length === 0 ? (
                <p className="text-gray-500 text-sm">No department data available</p>
              ) : (
                stats.department_stats.map((item) => (
                  <div key={item.department}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-900">{item.department}</span>
                      <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key hiring metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Avg. Time to Hire</p>
                <h3 className="text-lg font-semibold text-gray-900">{stats.avg_time_to_hire} days</h3>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Acceptance Rate</p>
                <h3 className="text-lg font-semibold text-gray-900">{stats.acceptance_rate}%</h3>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Interview Conversion</p>
                <h3 className="text-lg font-semibold text-gray-900">{stats.interview_conversion_rate}%</h3>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Active Positions</p>
                <h3 className="text-lg font-semibold text-gray-900">{stats.active_positions}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Scheduled interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingInterviews.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming interviews</p>
              ) : (
                upcomingInterviews.map((interview, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-900">
                        {interview.applicant.first_name} {interview.applicant.last_name}
                      </p>
                      <p className="text-sm text-gray-600">{interview.position}</p>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(interview.interview_date).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
