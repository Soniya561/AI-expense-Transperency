import { Upload, DollarSign, FileText, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { categoryData } from '../data/mock-data';

export function UserDashboard() {
  const myExpenses = [
    { id: '1', date: '2025-11-01', vendor: 'Coffee Shop', amount: 45, category: 'Food', status: 'Approved' },
    { id: '2', date: '2025-10-30', vendor: 'Uber', amount: 28, category: 'Travel', status: 'Approved' },
    { id: '3', date: '2025-10-28', vendor: 'Office Depot', amount: 120, category: 'Office', status: 'Pending' },
    { id: '4', date: '2025-10-25', vendor: 'Hotel XYZ', amount: 450, category: 'Travel', status: 'Flagged' },
    { id: '5', date: '2025-10-22', vendor: 'Restaurant', amount: 85, category: 'Food', status: 'Approved' },
  ];

  const myMonthlyTrend = [
    { month: 'Jul', amount: 520 },
    { month: 'Aug', amount: 680 },
    { month: 'Sep', amount: 590 },
    { month: 'Oct', amount: 728 },
  ];

  const totalExpenses = myExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const pendingCount = myExpenses.filter(e => e.status === 'Pending').length;
  const flaggedCount = myExpenses.filter(e => e.status === 'Flagged').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">My Expense Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">Track and manage your personal expenses</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
          <Upload className="w-4 h-4" />
          Upload Receipt
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">My Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">${totalExpenses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Receipts Uploaded</CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{myExpenses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total submissions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{pendingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Flagged Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{flaggedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {flaggedCount > 0 && (
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-foreground">Action Required</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You have {flaggedCount} expense(s) flagged by our AI system. Please review and provide additional documentation if needed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Spending by Category */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">My Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData.slice(0, 3)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.slice(0, 3).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">My Monthly Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={myMonthlyTrend}>
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

      {/* My Recent Expenses */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">My Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Vendor</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myExpenses.map((expense) => (
                <TableRow key={expense.id} className="border-blue-500/20 hover:bg-blue-500/5">
                  <TableCell className="text-muted-foreground">{expense.date}</TableCell>
                  <TableCell className="text-foreground">{expense.vendor}</TableCell>
                  <TableCell className="text-foreground">${expense.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-400 text-blue-400">
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        expense.status === 'Approved' ? 'border-green-400 text-green-400' :
                        expense.status === 'Pending' ? 'border-yellow-400 text-yellow-400' :
                        'border-red-400 text-red-400'
                      }
                    >
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                        View
                      </Button>
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted/50">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border-cyan-400/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-foreground">💡 Tip: Optimize Your Expenses</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your travel expenses are 15% higher than your department average. Consider using company-preferred vendors for better rates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

