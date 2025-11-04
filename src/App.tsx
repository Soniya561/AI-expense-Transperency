import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { LoginPage } from './components/loginpage';
import { UserDashboard } from './components/userdashboard';
import { AdminDashboard } from './components/admindashboard';
import { AuditorDashboard } from './components/auditordashboard';
import type { UserRole } from './types';

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
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'user':
        return <UserDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'auditor':
        return <AuditorDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <ThemeProvider>
      {renderDashboard()}
    </ThemeProvider>
  );
}