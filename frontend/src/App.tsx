import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ApplicationForm } from './components/ApplicationForm';
import { ApplicantLayout } from './components/ApplicantLayout';
import { AdminLayout } from './components/AdminLayout';
import { ApplicantDashboardHome } from './components/pages/ApplicantDashboardHome';
import { ApplicantApplicationsPage } from './components/pages/ApplicantApplicationsPage';
import { ApplicantProfilePage } from './components/pages/ApplicantProfilePage';
import { AdminDashboardHome } from './components/pages/AdminDashboardHome';
import { AdminApplicationsPage } from './components/pages/AdminApplicationsPage';
import { AdminAnalyticsPage } from './components/pages/AdminAnalyticsPage';
import { AdminSettingsPage } from './components/pages/AdminSettingsPage';
import { AdminCreateApplicationPage } from './components/pages/AdminCreateApplicationPage';
import { Toaster } from './components/ui/sonner';

type AuthPage = 'login' | 'register';
type ApplicantPage = 'dashboard' | 'applications' | 'profile' | 'new-application';
type AdminPage = 'dashboard' | 'applications' | 'analytics' | 'settings' | 'create-application';
type UserRole = 'applicant' | 'admin' | null;

export default function App() {
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [applicantPage, setApplicantPage] = useState<ApplicantPage>('dashboard');
  const [adminPage, setAdminPage] = useState<AdminPage>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.user_type);
        setIsAuthenticated(true);
        if (user.user_type === 'admin') {
          setAdminPage('dashboard');
        } else {
          setApplicantPage('dashboard');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (role: 'applicant' | 'admin') => {
    setUserRole(role);
    setIsAuthenticated(true);
    if (role === 'admin') {
      setAdminPage('dashboard');
    } else {
      setApplicantPage('dashboard');
    }
  };

  const handleLogout = async () => {
    const { authAPI } = await import('./services/api');
    await authAPI.logout();
    setUserRole(null);
    setIsAuthenticated(false);
    setAuthPage('login');
    setApplicantPage('dashboard');
    setAdminPage('dashboard');
  };

  const handleRegisterSuccess = () => {
    setAuthPage('login');
  };

  const handleApplicationSubmit = () => {
    setApplicantPage('applications');
  };

  // Render authentication pages
  if (!isAuthenticated) {
    if (authPage === 'register') {
      return (
        <>
          <Register 
            onSuccess={handleRegisterSuccess}
            onBackToLogin={() => setAuthPage('login')}
          />
          <Toaster position="top-right" />
        </>
      );
    }
    return (
      <>
        <Login 
          onLogin={handleLogin}
          onRegisterClick={() => setAuthPage('register')}
        />
        <Toaster position="top-right" />
      </>
    );
  }

  // Render applicant pages
  if (userRole === 'applicant') {
    if (applicantPage === 'new-application') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <ApplicationForm 
            onSubmit={handleApplicationSubmit}
            onBack={() => setApplicantPage('dashboard')}
          />
          <Toaster position="top-right" />
        </div>
      );
    }

    return (
      <>
        <ApplicantLayout
          currentPage={applicantPage}
          onNavigate={(page) => setApplicantPage(page as ApplicantPage)}
          onLogout={handleLogout}
        >
          {applicantPage === 'dashboard' && (
            <ApplicantDashboardHome onNavigate={(page) => setApplicantPage(page as ApplicantPage)} />
          )}
          {applicantPage === 'applications' && <ApplicantApplicationsPage />}
          {applicantPage === 'profile' && <ApplicantProfilePage />}
        </ApplicantLayout>
        <Toaster position="top-right" />
      </>
    );
  }

  // Render admin pages
  if (userRole === 'admin') {
    // Show create application page outside of layout
    if (adminPage === 'create-application') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-purple-50">
          <AdminCreateApplicationPage 
            onBack={() => setAdminPage('applications')}
          />
          <Toaster position="top-right" />
        </div>
      );
    }

    return (
      <>
        <AdminLayout
          currentPage={adminPage}
          onNavigate={(page) => setAdminPage(page as AdminPage)}
          onLogout={handleLogout}
        >
          {adminPage === 'dashboard' && <AdminDashboardHome />}
          {adminPage === 'applications' && <AdminApplicationsPage />}
          {adminPage === 'analytics' && <AdminAnalyticsPage />}
          {adminPage === 'settings' && <AdminSettingsPage />}
        </AdminLayout>
        <Toaster position="top-right" />
      </>
    );
  }

  return null;
}
