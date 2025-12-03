import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { 
  Settings,
  Mail,
  Bell,
  Users,
  Building
} from 'lucide-react';
import { toast } from 'sonner';

export function AdminSettingsPage() {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-purple-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your recruitment portal settings</p>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-600" />
              <CardTitle>Company Information</CardTitle>
            </div>
            <CardDescription>Update your company details</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                defaultValue="Tech Solutions Inc."
                placeholder="Enter company name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  defaultValue="hr@techsolutions.com"
                  placeholder="hr@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Company Phone</Label>
                <Input
                  id="companyPhone"
                  defaultValue="+1 (555) 999-0000"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                defaultValue="123 Tech Street, San Francisco, CA 94105"
                placeholder="Enter company address"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-600" />
              <CardTitle>Email Notifications</CardTitle>
            </div>
            <CardDescription>Configure automated email settings</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900">Application Received</p>
                <p className="text-gray-600">Send confirmation email to applicant</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900">Interview Scheduled</p>
                <p className="text-gray-600">Notify candidate when interview is scheduled</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900">Application Accepted</p>
                <p className="text-gray-600">Send acceptance notification</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900">Application Rejected</p>
                <p className="text-gray-600">Send rejection notification</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900">Admin Notifications</p>
                <p className="text-gray-600">Notify admins of new applications</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Application Settings */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              <CardTitle>Application Settings</CardTitle>
            </div>
            <CardDescription>Configure application form settings</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900">Auto-Reply</p>
                <p className="text-gray-600">Automatically respond to applications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900">Resume Required</p>
                <p className="text-gray-600">Make resume upload mandatory</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900">Cover Letter Required</p>
                <p className="text-gray-600">Make cover letter mandatory</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* HR Team Management */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <CardTitle>HR Team</CardTitle>
            </div>
            <CardDescription>Manage admin users</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3 mb-4">
              {[
                { name: 'Admin User', email: 'admin@company.com', role: 'Super Admin' },
                { name: 'HR Manager', email: 'hr.manager@company.com', role: 'Admin' },
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <span className="text-purple-600">{user.role}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Add New Admin
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
