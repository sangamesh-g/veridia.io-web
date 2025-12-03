import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  Search,
  Filter
} from 'lucide-react';

const mockApplications = [
  {
    id: 1,
    position: 'Software Engineer',
    department: 'Engineering',
    appliedDate: '2025-11-15',
    status: 'under-review',
    lastUpdate: '2025-11-28',
  },
  {
    id: 2,
    position: 'Senior Developer',
    department: 'Engineering',
    appliedDate: '2025-10-20',
    status: 'interview-scheduled',
    lastUpdate: '2025-11-20',
    interviewDate: '2025-12-05',
  },
  {
    id: 3,
    position: 'Product Manager',
    department: 'Product',
    appliedDate: '2025-09-10',
    status: 'rejected',
    lastUpdate: '2025-10-01',
  },
];

export function ApplicantApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under-review':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'interview-scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Calendar className="w-3 h-3 mr-1" />
            Interview Scheduled
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'accepted':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = 
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-indigo-900 mb-2">My Applications</h1>
        <p className="text-gray-600">Track and manage all your job applications</p>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0 mb-6">
        <CardHeader>
          <CardTitle>Filter Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by position or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <Card className="shadow-lg border-0">
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-600">No applications found</p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((application) => (
            <Card key={application.id} className="shadow-lg border-0 border-l-4 border-l-indigo-600">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-gray-900 mb-1">{application.position}</h3>
                        <p className="text-gray-600">{application.department}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>Applied: {application.appliedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span>Updated: {application.lastUpdate}</span>
                      </div>
                    </div>
                    {application.interviewDate && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-900">
                          <strong>Interview scheduled:</strong> {application.interviewDate}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      <Card className="shadow-lg border-0 mt-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-1">Total</p>
              <h3 className="text-gray-900">{mockApplications.length}</h3>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-gray-600 mb-1">Pending</p>
              <h3 className="text-yellow-900">
                {mockApplications.filter(a => a.status === 'under-review').length}
              </h3>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600 mb-1">Interviews</p>
              <h3 className="text-blue-900">
                {mockApplications.filter(a => a.status === 'interview-scheduled').length}
              </h3>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-gray-600 mb-1">Rejected</p>
              <h3 className="text-red-900">
                {mockApplications.filter(a => a.status === 'rejected').length}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
