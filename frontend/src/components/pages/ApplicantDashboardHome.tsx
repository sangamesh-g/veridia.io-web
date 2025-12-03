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
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

interface ApplicantDashboardHomeProps {
  onNavigate: (page: string) => void;
}

const recentApplications = [
  {
    id: 1,
    position: 'Software Engineer',
    department: 'Engineering',
    appliedDate: '2025-11-15',
    status: 'under-review',
  },
  {
    id: 2,
    position: 'Senior Developer',
    department: 'Engineering',
    appliedDate: '2025-10-20',
    status: 'interview-scheduled',
    interviewDate: '2025-12-05',
  },
];

export function ApplicantDashboardHome({ onNavigate }: ApplicantDashboardHomeProps) {
  const stats = {
    total: 3,
    pending: 1,
    interviews: 1,
    rejected: 1,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under-review':
        return (
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500 border-0">
            <Clock className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'interview-scheduled':
        return (
          <Badge className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white hover:from-blue-500 hover:to-cyan-500 border-0">
            <Calendar className="w-3 h-3 mr-1" />
            Interview Scheduled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">Welcome Back!</span>
          </div>
          <h1 className="mb-4">Hello, John! 👋</h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            You're on track to find your dream job. Keep going!
          </p>
          <Button 
            onClick={() => onNavigate('new-application')}
            className="bg-white text-indigo-600 hover:bg-white/90 shadow-xl"
          >
            <Zap className="w-4 h-4 mr-2" />
            Apply for New Position
          </Button>
        </div>
      </div>

      {/* Stats Grid with modern cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-indigo-100 overflow-hidden relative group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-indigo-600" />
              <span className="text-3xl">📋</span>
            </div>
            <h2 className="text-indigo-900 mb-1">{stats.total}</h2>
            <p className="text-indigo-700">Total Applications</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-100 overflow-hidden relative group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <span className="text-3xl">⏳</span>
            </div>
            <h2 className="text-orange-900 mb-1">{stats.pending}</h2>
            <p className="text-orange-700">Pending Review</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-100 overflow-hidden relative group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-cyan-600" />
              <span className="text-3xl">📅</span>
            </div>
            <h2 className="text-cyan-900 mb-1">{stats.interviews}</h2>
            <p className="text-cyan-700">Interviews</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden relative group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <span className="text-3xl">📈</span>
            </div>
            <h2 className="text-emerald-900 mb-1">67%</h2>
            <p className="text-emerald-700">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <Card className="lg:col-span-2 border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription className="text-white/90">Your latest job applications</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('applications')}
                className="text-white hover:bg-white/20"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {recentApplications.map((application) => (
              <Card key={application.id} className="border-0 shadow-md hover:shadow-xl transition-shadow bg-gradient-to-r from-white to-indigo-50 overflow-hidden">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-gray-900 mb-1">✨ {application.position}</h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                          {application.department}
                        </span>
                      </p>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>Applied: {application.appliedDate}</span>
                  </div>
                  {application.interviewDate && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <p className="text-blue-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <strong>Interview:</strong> {application.interviewDate}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription className="text-white/90">Manage your profile</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            <Button 
              className="w-full justify-start bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
              onClick={() => onNavigate('new-application')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Submit New Application
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-indigo-200 hover:bg-indigo-50"
              onClick={() => onNavigate('applications')}
            >
              <FileText className="w-4 h-4 mr-2" />
              View All Applications
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-purple-200 hover:bg-purple-50"
              onClick={() => onNavigate('profile')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tips Section - Redesigned */}
      <Card className="mt-6 border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            <CardTitle>Application Tips</CardTitle>
          </div>
          <CardDescription className="text-white/90">Boost your chances of success</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📝</div>
              <h4 className="text-indigo-900 mb-2">Complete Your Profile</h4>
              <p className="text-gray-700">Keep your profile updated with latest skills and experience</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">💼</div>
              <h4 className="text-purple-900 mb-2">Tailor Your Resume</h4>
              <p className="text-gray-700">Customize your resume for each position you apply to</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-pink-900 mb-2">Quick Response</h4>
              <p className="text-gray-700">Respond promptly to interview invitations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
