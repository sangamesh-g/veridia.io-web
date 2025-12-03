import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
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
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

const mockApplicationsData = [
  {
    id: 1,
    candidateName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    position: 'Software Engineer',
    department: 'Engineering',
    experience: '5 years',
    expectedSalary: '$90,000',
    appliedDate: '2025-11-15',
    status: 'under-review',
    skills: 'React, TypeScript, Node.js, Python',
    education: "Bachelor's Degree",
    resume: 'john_doe_resume.pdf',
  },
  {
    id: 2,
    candidateName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678',
    position: 'Senior Developer',
    department: 'Engineering',
    experience: '8 years',
    expectedSalary: '$120,000',
    appliedDate: '2025-11-20',
    status: 'interview-scheduled',
    skills: 'Java, Spring Boot, AWS, Docker',
    education: "Master's Degree",
    resume: 'jane_smith_resume.pdf',
  },
  {
    id: 3,
    candidateName: 'Mike Johnson',
    email: 'mike.j@example.com',
    phone: '+1 (555) 345-6789',
    position: 'UI/UX Designer',
    department: 'Design',
    experience: '4 years',
    expectedSalary: '$75,000',
    appliedDate: '2025-11-18',
    status: 'under-review',
    skills: 'Figma, Adobe XD, Sketch, Prototyping',
    education: "Bachelor's Degree",
    resume: 'mike_johnson_resume.pdf',
  },
  {
    id: 4,
    candidateName: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '+1 (555) 456-7890',
    position: 'Product Manager',
    department: 'Product',
    experience: '6 years',
    expectedSalary: '$110,000',
    appliedDate: '2025-11-10',
    status: 'accepted',
    skills: 'Agile, Product Strategy, Analytics',
    education: "Master's Degree",
    resume: 'sarah_williams_resume.pdf',
  },
  {
    id: 5,
    candidateName: 'Tom Brown',
    email: 'tom.brown@example.com',
    phone: '+1 (555) 567-8901',
    position: 'Data Analyst',
    department: 'Engineering',
    experience: '3 years',
    expectedSalary: '$70,000',
    appliedDate: '2025-11-05',
    status: 'rejected',
    skills: 'SQL, Python, Tableau, Statistics',
    education: "Bachelor's Degree",
    resume: 'tom_brown_resume.pdf',
  },
];

export function AdminApplicationsPage() {
  const [applications, setApplications] = useState(mockApplicationsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplicationsData[0] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
            Interview
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

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    toast.success('Status updated! Email notification sent to candidate.');
  };

  const handleViewDetails = (application: typeof mockApplicationsData[0]) => {
    setSelectedApplication(application);
    setIsDetailModalOpen(true);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || app.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-purple-900 mb-2">All Applications</h1>
        <p className="text-gray-600">View, filter, and manage candidate applications</p>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0 mb-6">
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
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="shadow-lg border-0">
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
                        <p className="text-gray-900">{app.candidateName}</p>
                        <p className="text-gray-600">{app.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>{app.department}</TableCell>
                    <TableCell>{app.appliedDate}</TableCell>
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
                  <p className="text-gray-900">{selectedApplication.candidateName}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-gray-900">{selectedApplication.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-gray-900">{selectedApplication.phone}</p>
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
                  <p className="text-gray-900">{selectedApplication.experience}</p>
                </div>
                <div>
                  <Label>Expected Salary</Label>
                  <p className="text-gray-900">{selectedApplication.expectedSalary}</p>
                </div>
                <div>
                  <Label>Applied Date</Label>
                  <p className="text-gray-900">{selectedApplication.appliedDate}</p>
                </div>
              </div>

              <div>
                <Label>Education</Label>
                <p className="text-gray-900">{selectedApplication.education}</p>
              </div>

              <div>
                <Label>Skills</Label>
                <p className="text-gray-900">{selectedApplication.skills}</p>
              </div>

              <div>
                <Label>Current Status</Label>
                <div className="mt-2">{getStatusBadge(selectedApplication.status)}</div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => toast.success('Email sent to candidate')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.success('Resume downloaded')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 mb-1">{children}</p>;
}
