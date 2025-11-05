import { FileText, Download, Eye, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { recentExpenses } from '../data/mock-data';
import { auditTrailData } from '../data/user-data';

export function AuditorDashboard() {
  const complianceData = [
    { category: 'Fully Compliant', count: 156, color: '#10B981' },
    { category: 'Minor Issues', count: 12, color: '#F59E0B' },
    { category: 'Major Issues', count: 4, color: '#EF4444' },
  ];

  const reviewStats = [
    { month: 'Jul', approved: 42, rejected: 3 },
    { month: 'Aug', approved: 51, rejected: 2 },
    { month: 'Sep', approved: 48, rejected: 5 },
    { month: 'Oct', approved: 55, rejected: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">Auditor Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive oversight and compliance verification</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
          <Download className="w-4 h-4" />
          Export Audit Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Transactions</CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">172</div>
            <p className="text-xs text-muted-foreground mt-1">
              This audit period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">90.7%</div>
            <p className="text-xs text-green-400 mt-1">
              +2.3% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">AI Flags Reviewed</CardTitle>
            <Eye className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">16</div>
            <p className="text-xs text-muted-foreground mt-1">
              Anomalies verified
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Policy Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">4</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Compliance Overview */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Compliance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {complianceData.map((entry, index) => (
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

        {/* Review Statistics */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Admin Review Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reviewStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
                <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
                <YAxis stroke="currentColor" className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
                />
                <Bar dataKey="approved" fill="#10B981" radius={[8, 8, 0, 0]} name="Approved" />
                <Bar dataKey="rejected" fill="#EF4444" radius={[8, 8, 0, 0]} name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* All Transactions (Read-only) */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">All Transactions (Read-only Access)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Vendor</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">AI Flag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentExpenses.map((expense) => (
                <TableRow key={expense.id} className="border-blue-500/20 hover:bg-blue-500/5">
                  <TableCell className="text-muted-foreground">{expense.date}</TableCell>
                  <TableCell className="text-muted-foreground">User {expense.id}</TableCell>
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
                    {expense.flagged ? (
                      <Badge variant="outline" className="border-red-400 text-red-400">
                        Flagged
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        Clean
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Audit Trail */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Audit Trail Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditTrailData.slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-blue-500/20">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">{entry.user}</span>
                    <Badge variant="outline" className="border-blue-400 text-blue-400 text-xs">
                      {entry.action}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{entry.details}</p>
                  <p className="text-xs text-muted-foreground opacity-70 mt-1">{entry.timestamp} • {entry.ipAddress}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardContent className="pt-6 text-center">
            <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-foreground">Documentation Quality</h3>
            <p className="text-2xl text-blue-400 mt-2">89%</p>
            <p className="text-sm text-muted-foreground mt-1">Meets standards</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-foreground">AI Accuracy</h3>
            <p className="text-2xl text-green-400 mt-2">94.8%</p>
            <p className="text-sm text-muted-foreground mt-1">Detection rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border-cyan-400/30">
          <CardContent className="pt-6 text-center">
            <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <h3 className="text-foreground">Avg Resolution Time</h3>
            <p className="text-2xl text-cyan-400 mt-2">2.3 days</p>
            <p className="text-sm text-muted-foreground mt-1">For flagged items</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

