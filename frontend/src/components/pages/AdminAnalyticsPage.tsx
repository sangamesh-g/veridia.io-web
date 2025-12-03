import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  BarChart3,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

export function AdminAnalyticsPage() {
  const applications = [
    { status: 'under-review', count: 8 },
    { status: 'interview-scheduled', count: 5 },
    { status: 'accepted', count: 4 },
    { status: 'rejected', count: 8 },
  ];

  const total = applications.reduce((sum, app) => sum + app.count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-purple-900 mb-2">Analytics & Reports</h1>
        <p className="text-gray-600">Insights into your recruitment process</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Applications by Department */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Applications by Department</CardTitle>
            <CardDescription>Distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: 'Engineering', count: 12, percentage: 48 },
                { dept: 'Product', count: 6, percentage: 24 },
                { dept: 'Design', count: 4, percentage: 16 },
                { dept: 'Marketing', count: 3, percentage: 12 },
              ].map(dept => {
                return (
                  <div key={dept.dept}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">{dept.dept}</span>
                      <span className="text-gray-900">{dept.count} applications ({dept.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all"
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Application status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'under-review', label: 'Under Review', color: 'from-yellow-500 to-yellow-600', count: 8 },
                { status: 'interview-scheduled', label: 'Interview Scheduled', color: 'from-blue-500 to-blue-600', count: 5 },
                { status: 'accepted', label: 'Accepted', color: 'from-green-500 to-green-600', count: 4 },
                { status: 'rejected', label: 'Rejected', color: 'from-red-500 to-red-600', count: 8 },
              ].map(({ status, label, color, count }) => {
                const percentage = (count / total) * 100;
                return (
                  <div key={status}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">{label}</span>
                      <span className="text-gray-900">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${color} h-3 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Monthly Application Trends</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: 'November', count: 12, change: '+20%' },
                { month: 'October', count: 10, change: '+10%' },
                { month: 'September', count: 9, change: '+5%' },
                { month: 'August', count: 8, change: '-5%' },
                { month: 'July', count: 11, change: '+15%' },
                { month: 'June', count: 7, change: '+0%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex-1">
                    <span className="text-gray-900">{item.month}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-900">{item.count} applications</span>
                    <span className={`${item.change.startsWith('+') ? 'text-green-600' : item.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Performance Indicators */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Hiring metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-gray-700">Avg. Time to Hire</p>
                    <h3 className="text-purple-900">21 days</h3>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-indigo-600" />
                  <div>
                    <p className="text-gray-700">Acceptance Rate</p>
                    <h3 className="text-indigo-900">16%</h3>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-pink-600" />
                  <div>
                    <p className="text-gray-700">Interview Conversion</p>
                    <h3 className="text-pink-900">80%</h3>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-gray-700">Avg. Experience</p>
                    <h3 className="text-blue-900">5.2 years</h3>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Positions */}
        <Card className="shadow-lg border-0 md:col-span-2">
          <CardHeader>
            <CardTitle>Top Positions</CardTitle>
            <CardDescription>Most applied positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { position: 'Software Engineer', applications: 8, department: 'Engineering' },
                { position: 'Senior Developer', applications: 6, department: 'Engineering' },
                { position: 'UI/UX Designer', applications: 4, department: 'Design' },
                { position: 'Product Manager', applications: 3, department: 'Product' },
                { position: 'Data Analyst', applications: 2, department: 'Engineering' },
                { position: 'Marketing Manager', applications: 2, department: 'Marketing' },
              ].map((item, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="text-gray-900 mb-1">{item.position}</h4>
                  <p className="text-gray-600 mb-2">{item.department}</p>
                  <p className="text-purple-600">{item.applications} applications</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
