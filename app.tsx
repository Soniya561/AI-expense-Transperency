import { useState } from 'react';
import { LoginPage } from './components/loginpage';
import { Dashboard } from './components/dashboard';
import { UserDashboard } from './components/userdashboard';
import { AdminDashboard } from './components/admindashboard';
import { AuditorDashboard } from './components/auditordashboard';
import { UploadReceipt } from './components/UploadReceipt';
import { Reports } from './components/Reports';
import { ExpenseCategories } from './components/ExpenseCategories';
import { AnomalyDetection } from './components/AnomalyDetection';
import { UserManagement } from './components/UserManagement';
import { Settings } from './components/Settings';
import { AuditTrail } from './components/AuditTrail';
import { AIInsights } from './components/AIInsights';

import { ChatbotPage } from './components/ChatbotPage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AIAssistant } from './components/AIAssistant';
import { ThemeProvider } from './components/ThemeProvider';
import { UserRole } from './data/user-data';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [activePage, setActivePage] = useState('dashboard');

  const handleLogin = (role?: UserRole) => {
    setIsLoggedIn(true);
    if (role) {
      setUserRole(role);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <LoginPage onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'auditor':
        return <AuditorDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar onLogout={handleLogout} />
        <Sidebar 
          activePage={activePage} 
          onNavigate={setActivePage} 
          onLogout={handleLogout}
          userRole={userRole}
        />
        
        <main className="ml-64 mt-16 p-8">
          {activePage === 'dashboard' && renderDashboard()}
          {activePage === 'upload' && <UploadReceipt />}
          {activePage === 'categories' && <ExpenseCategories />}
          {activePage === 'anomaly' && <AnomalyDetection />}
          {activePage === 'reports' && <Reports />}
          {activePage === 'users' && userRole === 'admin' && <UserManagement />}
          {activePage === 'settings' && <Settings />}
          {activePage === 'audit' && <AuditTrail />}
          {activePage === 'insights' && <AIInsights />}
          {activePage === 'chatbot' && <ChatbotPage />}
        </main>

        <AIAssistant />
      </div>
    </ThemeProvider>
  );
}
