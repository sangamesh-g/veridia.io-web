import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UserCircle, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { authAPI } from '../services/api';

interface LoginProps {
  onLogin: (role: 'applicant' | 'admin') => void;
  onRegisterClick: () => void;
}

export function Login({ onLogin, onRegisterClick }: LoginProps) {
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPassword, setApplicantPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApplicantLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login(applicantEmail, applicantPassword);
      if (response.success) {
        toast.success('Login successful!');
        onLogin('applicant');
      } else {
        toast.error(response.error?.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login(adminEmail, adminPassword);
      if (response.success) {
        if (response.data.user.user_type === 'admin') {
          toast.success('Admin login successful!');
          onLogin('admin');
        } else {
          toast.error('This account is not an admin account');
        }
      } else {
        toast.error(response.error?.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-indigo-900 mb-2">Veridia Recruitment Portal</h1>
          <p className="text-gray-600">Welcome back! Please login to continue</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your account type to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="applicant" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="applicant" className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4" />
                  Applicant
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  HR Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="applicant">
                <form onSubmit={handleApplicantLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicant-email">Email</Label>
                    <Input
                      id="applicant-email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applicant-password">Password</Label>
                    <Input
                      id="applicant-password"
                      type="password"
                      placeholder="••••••••"
                      value={applicantPassword}
                      onChange={(e) => setApplicantPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In as Applicant'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="hr@veridia.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In as Admin'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={onRegisterClick}
                  className="text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Register here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 mt-6">
          © 2025 Veridia. All rights reserved.
        </p>
      </div>
    </div>
  );
}
