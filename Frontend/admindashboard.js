import { Users, DollarSign, AlertTriangle, CheckCircle, TrendingUp, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { recentExpenses, categoryData, monthlyData } from '../data/mock-data';
import { organizationUsers } from '../data/user-data';

export function AdminDashboard() {
  const departmentExpenses = [
    { department: 'Engineering', amount: 15200 },
    { department: 'Marketing', amount: 12800 },
    { department: 'Sales', amount: 9500 },
    { department: 'Operations', amount: 7300 },
    { department: 'HR', amount: 5200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">Organization-wide expense monitoring and management</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
          <FileText className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Organization Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">$50,000</div>
            <p className="text-xs text-green-400 mt-1">
              +12.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border-cyan-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Users</CardTitle>
            <Users className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{organizationUsers.filter(u => u.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of {organizationUsers.length} total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Flagged transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">AI Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">94.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Detection accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department-wise spending */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Department-wise Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentExpenses} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
                <XAxis dataKey="department" stroke="currentColor" className="text-muted-foreground" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="currentColor" className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
                />
                <Bar dataKey="amount" fill="url(#deptGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="deptGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly trend */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Expense Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
                <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
                <YAxis stroke="currentColor" className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* All Expenses Table with Review Actions */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">All Organization Expenses - Pending Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Vendor</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentExpenses.filter(e => e.status === 'Pending' || e.flagged).map((expense) => (
                <TableRow key={expense.id} className="border-blue-500/20 hover:bg-blue-500/5">
                  <TableCell className="text-muted-foreground">
                    {organizationUsers[Math.floor(Math.random() * organizationUsers.length)].name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{expense.date}</TableCell>
                  <TableCell className="text-foreground">{expense.vendor}</TableCell>
                  <TableCell className="text-foreground">${expense.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-400 text-blue-400">
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        expense.status === 'Verified' ? 'border-green-400 text-green-400' :
                        expense.status === 'Pending' ? 'border-yellow-400 text-yellow-400' :
                        'border-red-400 text-red-400'
                      }
                    >
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
                        Approve
                      </Button>
                      <Button size="sm" className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30 cursor-pointer hover:border-blue-400 transition-all">
          <CardContent className="pt-6 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-foreground">Manage Users</h3>
            <p className="text-sm text-muted-foreground mt-1">Add or remove organization members</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border-cyan-400/30 cursor-pointer hover:border-cyan-300 transition-all">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <h3 className="text-foreground">Analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">View detailed spending insights</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30 cursor-pointer hover:border-green-400 transition-all">
          <CardContent className="pt-6 text-center">
            <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-foreground">Export Reports</h3>
            <p className="text-sm text-muted-foreground mt-1">Download audit and compliance reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

