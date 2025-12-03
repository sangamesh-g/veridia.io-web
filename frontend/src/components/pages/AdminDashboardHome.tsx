import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Calendar,
  Sparkles,
  Target,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export function AdminDashboardHome() {
  const stats = {
    total: 25,
    pending: 8,
    interviews: 5,
    accepted: 4,
  };

  const recentActivity = [
    { action: 'New application received', candidate: 'John Doe', position: 'Software Engineer', time: '2 hours ago', type: 'new' },
    { action: 'Interview scheduled', candidate: 'Jane Smith', position: 'Senior Developer', time: '5 hours ago', type: 'interview' },
    { action: 'Application accepted', candidate: 'Sarah Williams', position: 'Product Manager', time: '1 day ago', type: 'success' },
    { action: 'Application rejected', candidate: 'Tom Brown', position: 'Data Analyst', time: '2 days ago', type: 'rejected' },
  ];

  const upcomingInterviews = [
    { candidate: 'Jane Smith', position: 'Senior Developer', date: 'Dec 5, 10:00 AM', avatar: '👩‍💼' },
    { candidate: 'Mike Johnson', position: 'UI/UX Designer', date: 'Dec 6, 2:00 PM', avatar: '👨‍🎨' },
    { candidate: 'Emily Davis', position: 'Marketing Manager', date: 'Dec 7, 11:00 AM', avatar: '👩‍💻' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new':
        return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />;
      case 'interview':
        return <div className="w-2 h-2 bg-purple-500 rounded-full" />;
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'rejected':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">Admin Dashboard</span>
          </div>
          <h1 className="mb-4">Welcome Back, Admin! 🎯</h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            {stats.pending} applications need your attention. Let's find the best talent today!
          </p>
          <div className="flex gap-3">
            <Button className="bg-white text-violet-600 hover:bg-white/90 shadow-xl">
              <Users className="w-4 h-4 mr-2" />
              View Applications
            </Button>
            <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30">
              <Target className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid - Modern Design */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-violet-50 to-violet-100 overflow-hidden relative group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-8 h-8 text-violet-600" />
              <div className="px-2 py-1 bg-green-500 text-white rounded-full flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                <span className="text-xs">+12%</span>
              </div>
            </div>
            <h2 className="text-violet-900 mb-1">{stats.total}</h2>
            <p className="text-violet-700">Total Applications</p>
            <p className="text-violet-600 mt-2">From last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden relative group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <Zap className="w-6 h-6 text-orange-500 animate-pulse" />
            </div>
            <h2 className="text-orange-900 mb-1">{stats.pending}</h2>
            <p className="text-orange-700">Pending Review</p>
            <p className="text-orange-600 mt-2">Needs attention</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-100 overflow-hidden relative group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-8 h-8 text-cyan-600" />
              <span className="text-2xl">📅</span>
            </div>
            <h2 className="text-cyan-900 mb-1">{stats.interviews}</h2>
            <p className="text-cyan-700">Interviews Scheduled</p>
            <p className="text-cyan-600 mt-2">This week</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden relative group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl">✅</span>
            </div>
            <h2 className="text-emerald-900 mb-1">{stats.accepted}</h2>
            <p className="text-emerald-700">Accepted</p>
            <p className="text-emerald-600 mt-2">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activity - Redesigned */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-white/90">Latest updates on applications</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-white to-violet-50 rounded-xl hover:shadow-md transition-shadow border border-violet-100">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-700">
                      <strong>{activity.candidate}</strong> - {activity.position}
                    </p>
                    <p className="text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution - Redesigned */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Department Distribution
            </CardTitle>
            <CardDescription className="text-white/90">Applications across departments</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { dept: 'Engineering', count: 12, percentage: 48, color: 'from-blue-500 to-cyan-500' },
                { dept: 'Product', count: 6, percentage: 24, color: 'from-purple-500 to-pink-500' },
                { dept: 'Design', count: 4, percentage: 16, color: 'from-orange-500 to-red-500' },
                { dept: 'Marketing', count: 3, percentage: 12, color: 'from-green-500 to-emerald-500' },
              ].map((item) => (
                <div key={item.dept}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-900">{item.dept}</span>
                    <span className="text-gray-700">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all shadow-md`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription className="text-white/90">Key hiring metrics</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl border border-violet-200">
                <p className="text-gray-700 mb-1">Avg. Time to Hire</p>
                <h3 className="text-violet-900">21 days</h3>
              </div>
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200">
                <p className="text-gray-700 mb-1">Acceptance Rate</p>
                <h3 className="text-indigo-900">16%</h3>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl border border-pink-200">
                <p className="text-gray-700 mb-1">Interview Conversion</p>
                <h3 className="text-pink-900">80%</h3>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <p className="text-gray-700 mb-1">Active Positions</p>
                <h3 className="text-blue-900">8</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Interviews
            </CardTitle>
            <CardDescription className="text-white/90">Scheduled for this week</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {upcomingInterviews.map((interview, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{interview.avatar}</span>
                    <div className="flex-1">
                      <p className="text-blue-900">{interview.candidate}</p>
                      <p className="text-gray-700">{interview.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {interview.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
