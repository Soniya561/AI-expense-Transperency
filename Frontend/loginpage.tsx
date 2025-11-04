import { useState } from 'react';
import { Shield, Mail, Lock, Receipt, TrendingUp, FileCheck, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UserRole } from './data/user-data';
import { useTheme } from './ThemeProvider';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-50">
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
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Branding and illustration */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 border-r border-blue-500/30">
          <div className="max-w-lg space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Shield className="w-10 h-10 text-black" />
              </div>
              <div>
                <h1 className="text-4xl text-foreground tracking-tight">AI Expense Transparency</h1>
                <p className="text-lg text-blue-400 mt-1">Ensuring Financial Trust Through AI-Driven Verification</p>
              </div>
            </div>

            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Receipt className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-foreground">Smart Receipt Scanning</h3>
                  <p className="text-sm text-muted-foreground mt-1">AI-powered OCR extracts data from receipts automatically</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-cyan-400/5 border border-cyan-400/20">
                <div className="w-12 h-12 rounded-lg bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-foreground">Real-time Fraud Detection</h3>
                  <p className="text-sm text-muted-foreground mt-1">Advanced algorithms identify anomalies and suspicious patterns</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-foreground">Automated Verification</h3>
                  <p className="text-sm text-muted-foreground mt-1">Instant validation and categorization of all expenses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <Card className="w-full max-w-md bg-card/50 border-blue-500/30 backdrop-blur-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl text-foreground">Welcome Back</h2>
              <p className="text-sm text-muted-foreground mt-2">Sign in to access your dashboard</p>
            </div>

            <Tabs defaultValue="admin" className="w-full" onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <TabsList className="grid w-full grid-cols-3 bg-muted border border-blue-500/30">
                <TabsTrigger value="admin" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-black">
                  Admin
                </TabsTrigger>
                <TabsTrigger value="user" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-black">
                  Employee
                </TabsTrigger>
                <TabsTrigger value="auditor" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-black">
                  Auditor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-input-background border-blue-500/30 text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-input-background border-blue-500/30 text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="rounded border-blue-500/30" />
                      Remember me
                    </label>
                    <a href="#" className="text-blue-400 hover:text-blue-300">Forgot Password?</a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black shadow-lg shadow-blue-500/50"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="user" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="emp-email" className="text-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="emp-email"
                        type="email"
                        placeholder="employee@example.com"
                        className="pl-10 bg-input-background border-blue-500/30 text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emp-password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="emp-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-input-background border-blue-500/30 text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="rounded border-blue-500/30" />
                      Remember me
                    </label>
                    <a href="#" className="text-blue-400 hover:text-blue-300">Forgot Password?</a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black shadow-lg shadow-blue-500/50"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="auditor" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="aud-email" className="text-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="aud-email"
                        type="email"
                        placeholder="auditor@example.com"
                        className="pl-10 bg-input-background border-blue-500/30 text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aud-password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="aud-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-input-background border-blue-500/30 text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="rounded border-blue-500/30" />
                      Remember me
                    </label>
                    <a href="#" className="text-blue-400 hover:text-blue-300">Forgot Password?</a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black shadow-lg shadow-blue-500/50"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Sign up</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
