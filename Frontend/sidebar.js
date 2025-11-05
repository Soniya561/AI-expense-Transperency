import { LayoutDashboard, Upload, PieChart, AlertTriangle, FileText, Settings, LogOut, Users, History, Brain, Bot } from 'lucide-react';
import { cn } from './ui/utils';
import { UserRole } from '../data/user-data';

const getMenuItems = (role) => {
  const commonItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Overview' },
  ];

  const userItems = [
    { id: 'upload', icon: Upload, label: 'Upload Receipt' },
    { id: 'categories', icon: PieChart, label: 'My Expenses' },
    { id: 'chatbot', icon: Bot, label: 'AI Assistant' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const adminItems = [
    { id: 'upload', icon: Upload, label: 'Upload Receipt' },
    { id: 'categories', icon: PieChart, label: 'Expense Categories' },
    { id: 'anomaly', icon: AlertTriangle, label: 'Anomaly Detection' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'insights', icon: Brain, label: 'AI Insights' },
    { id: 'chatbot', icon: Bot, label: 'AI Assistant' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const auditorItems = [
    { id: 'categories', icon: PieChart, label: 'All Expenses' },
    { id: 'anomaly', icon: AlertTriangle, label: 'Anomaly Review' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'audit', icon: History, label: 'Audit Trail' },
    { id: 'insights', icon: Brain, label: 'AI Insights' },
    { id: 'chatbot', icon: Bot, label: 'AI Assistant' },
  ];

  if (role === 'admin') {
    return [...commonItems, ...adminItems];
  } else if (role === 'auditor') {
    return [...commonItems, ...auditorItems];
  } else {
    return [...commonItems, ...userItems];
  }
};

export function Sidebar({ activePage, onNavigate, onLogout, userRole }) {
  const menuItems = getMenuItems(userRole);
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-blue-500/30 overflow-y-auto">
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-black shadow-lg shadow-blue-500/50" 
                  : "text-muted-foreground hover:text-foreground hover:bg-blue-500/10"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
        
        <div className="pt-4 mt-4 border-t border-blue-500/30">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

