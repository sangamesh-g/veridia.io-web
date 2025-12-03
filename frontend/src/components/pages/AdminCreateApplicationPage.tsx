import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Save,
  X,
  Upload,
  UserPlus
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminCreateApplicationPageProps {
  editData?: any;
  onBack: () => void;
}

export function AdminCreateApplicationPage({ editData, onBack }: AdminCreateApplicationPageProps) {
  const [formData, setFormData] = useState(editData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    experience: '',
    expectedSalary: '',
    education: '',
    skills: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    status: 'under-review',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editData ? 'Application updated successfully!' : 'New application created successfully!');
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-2">
              {editData ? 'Edit Application' : 'Create New Application'}
            </h1>
            <p className="text-gray-600">
              {editData ? 'Modify candidate application details' : 'Add a new candidate to the system'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onBack}
            className="hover:bg-violet-50"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="border-0 shadow-xl shadow-violet-100/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription className="text-white/90">Basic candidate details</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john.doe@example.com"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Position Details */}
        <Card className="border-0 shadow-xl shadow-violet-100/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white">
            <CardTitle>Position Details</CardTitle>
            <CardDescription className="text-white/90">Job application information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger className="border-violet-200 focus:border-violet-500">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                    <SelectItem value="Senior Developer">Senior Developer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                    <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                    <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger className="border-violet-200 focus:border-violet-500">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g., 5 years"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedSalary">Expected Salary</Label>
                <Input
                  id="expectedSalary"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  placeholder="e.g., $90,000"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>
            </div>

            {editData && (
              <div className="space-y-2">
                <Label htmlFor="status">Application Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="border-violet-200 focus:border-violet-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Professional Background */}
        <Card className="border-0 shadow-xl shadow-violet-100/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">
            <CardTitle>Professional Background</CardTitle>
            <CardDescription className="text-white/90">Education and skills</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g., Bachelor's Degree in Computer Science"
                className="border-violet-200 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={3}
                placeholder="e.g., React, TypeScript, Node.js, Python..."
                className="border-violet-200 focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                <Input
                  id="linkedIn"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/johndoe"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio URL</Label>
                <Input
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="www.johndoe.com"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="border-0 shadow-xl shadow-violet-100/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            <CardTitle>Additional Information</CardTitle>
            <CardDescription className="text-white/90">Cover letter and documents</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={5}
                placeholder="Write your cover letter here..."
                className="border-violet-200 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume/CV</Label>
              <div className="border-2 border-dashed border-violet-300 rounded-lg p-8 text-center hover:border-violet-500 transition-colors cursor-pointer bg-violet-50/50">
                <Upload className="w-12 h-12 mx-auto mb-3 text-violet-400" />
                <p className="text-gray-700 mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-600">PDF, DOC, DOCX (max. 5MB)</p>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="hover:bg-violet-50"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-200"
          >
            {editData ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Application
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Create Application
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
