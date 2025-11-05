import { Bell, Settings, User, Shield, Moon, Sun } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useTheme } from './ThemeProvider';

export function Navbar({ onLogout }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background border-b border-blue-500/30 backdrop-blur-sm">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-foreground tracking-tight">AI Expense Transparency</h1>
            <p className="text-xs text-blue-400">Financial Trust Through AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
            <Settings className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-500/10 transition-colors cursor-pointer border-none bg-transparent">
              <Avatar className="h-8 w-8 border-2 border-blue-500">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-black">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-foreground">Admin User</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-blue-500/30">
              <DropdownMenuLabel className="text-blue-400">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-blue-500/30" />
              <DropdownMenuItem className="text-popover-foreground hover:bg-blue-500/10">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground hover:bg-blue-500/10">
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-blue-500/30" />
              <DropdownMenuItem 
                onClick={onLogout}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

