import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Search,
  Eye,
  Mail,
  Download,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { adminAPI, commonAPI } from '../../services/api';

interface Application {
  id: number;
  applicant: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  position: string;
  department: string;
  experience?: string;
  expected_salary?: string;
  applied_date: string;
  status: string;
  skills?: string;
  education?: string;
  resume?: string;
  interview_date?: string;
  notes?: string;
}

export function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appsRes, deptsRes] = await Promise.all([
          adminAPI.getApplications(),
          commonAPI.getDepartments()
        ]);

        if (appsRes.success) {
          setApplications(appsRes.results || appsRes.data || []);
        }
        if (deptsRes.success) {
          const deptNames = (deptsRes.data || []).map((d: any) => d.name);
          setDepartments(deptNames);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to load applications');
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
            Interview
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

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await adminAPI.updateApplicationStatus(id, { status: newStatus });
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleViewDetails = async (application: Application) => {
    try {
      const res = await adminAPI.getApplication(application.id);
      if (res.success) {
        setSelectedApplication(res.data);
        setIsDetailModalOpen(true);
      }
    } catch (error) {
      toast.error('Failed to load application details');
    }
  };

  const filteredApplications = applications.filter(app => {
    const fullName = `${app.applicant.first_name} ${app.applicant.last_name}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      app.applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || app.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Applications</h1>
        <p className="text-gray-600">View, filter, and manage candidate applications</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or position..."
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
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Applications ({filteredApplications.length})</CardTitle>
              <CardDescription>Manage candidate applications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {filteredApplications.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No applications found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{app.applicant.first_name} {app.applicant.last_name}</p>
                          <p className="text-sm text-gray-600">{app.applicant.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{app.position}</TableCell>
                      <TableCell>{app.department}</TableCell>
                      <TableCell>{new Date(app.applied_date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(app)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Select
                            value={app.status}
                            onValueChange={(value) => handleStatusChange(app.id, value)}
                          >
                            <SelectTrigger className="w-[140px] h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-review">Under Review</SelectItem>
                              <SelectItem value="interview-scheduled">Interview</SelectItem>
                              <SelectItem value="accepted">Accept</SelectItem>
                              <SelectItem value="rejected">Reject</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>Complete candidate information</DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Candidate Name</Label>
                  <p className="text-gray-900">{selectedApplication.applicant.first_name} {selectedApplication.applicant.last_name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-gray-900">{selectedApplication.applicant.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-gray-900">{selectedApplication.applicant.phone}</p>
                </div>
                <div>
                  <Label>Position</Label>
                  <p className="text-gray-900">{selectedApplication.position}</p>
                </div>
                <div>
                  <Label>Department</Label>
                  <p className="text-gray-900">{selectedApplication.department}</p>
                </div>
                <div>
                  <Label>Experience</Label>
                  <p className="text-gray-900">{selectedApplication.experience || 'N/A'}</p>
                </div>
                <div>
                  <Label>Expected Salary</Label>
                  <p className="text-gray-900">{selectedApplication.expected_salary || 'N/A'}</p>
                </div>
                <div>
                  <Label>Applied Date</Label>
                  <p className="text-gray-900">{new Date(selectedApplication.applied_date).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedApplication.education && (
                <div>
                  <Label>Education</Label>
                  <p className="text-gray-900">{selectedApplication.education}</p>
                </div>
              )}

              {selectedApplication.skills && (
                <div>
                  <Label>Skills</Label>
                  <p className="text-gray-900">{selectedApplication.skills}</p>
                </div>
              )}

              <div>
                <Label>Current Status</Label>
                <div className="mt-2">{getStatusBadge(selectedApplication.status)}</div>
              </div>

              {selectedApplication.resume && (
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (selectedApplication.resume) {
                        window.open(selectedApplication.resume, '_blank');
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
