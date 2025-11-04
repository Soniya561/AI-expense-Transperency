import { AlertTriangle, CheckCircle, XCircle, Eye, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { anomalyAlerts } from '../data/mock-data';

export function AnomalyDetection() {
  const flaggedTransactions = [
    { id: '1', date: '2025-11-03', user: 'Mike Chen', vendor: 'Global Airlines', amount: 8900, category: 'Travel', reason: 'Duplicate Receipt', severity: 'high', aiConfidence: 97 },
    { id: '2', date: '2025-11-02', user: 'Sarah Johnson', vendor: 'ABC Taxi Service', amount: 2500, category: 'Travel', reason: 'Excessive Amount', severity: 'medium', aiConfidence: 89 },
    { id: '3', date: '2025-11-01', user: 'Robert Brown', vendor: 'Unknown Store XYZ', amount: 780, category: 'Misc', reason: 'Unusual Vendor', severity: 'low', aiConfidence: 76 },
    { id: '4', date: '2025-10-30', user: 'Lisa Anderson', vendor: 'Cash Payment', amount: 1200, category: 'Office', reason: 'Missing Receipt', severity: 'high', aiConfidence: 100 },
    { id: '5', date: '2025-10-28', user: 'David Wilson', vendor: 'Restaurant XYZ', amount: 950, category: 'Food', reason: 'Date Mismatch', severity: 'medium', aiConfidence: 82 },
    { id: '6', date: '2025-10-25', user: 'Mike Chen', vendor: 'Hotel Chain', amount: 450, category: 'Travel', reason: 'Unusual Pattern', severity: 'low', aiConfidence: 71 },
  ];

  const anomalyTrend = [
    { month: 'May', anomalies: 8 },
    { month: 'Jun', anomalies: 12 },
    { month: 'Jul', anomalies: 7 },
    { month: 'Aug', anomalies: 10 },
    { month: 'Sep', anomalies: 6 },
    { month: 'Oct', anomalies: 8 },
  ];

  const reasonDistribution = [
    { name: 'Duplicate', value: 25, color: '#EF4444' },
    { name: 'Excessive Amount', value: 20, color: '#F59E0B' },
    { name: 'Missing Receipt', value: 30, color: '#DC2626' },
    { name: 'Unusual Vendor', value: 15, color: '#FBBF24' },
    { name: 'Others', value: 10, color: '#9CA3AF' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">Anomaly Detection</h2>
          <p className="text-sm text-muted-foreground mt-1">AI-powered fraud and suspicious transaction monitoring</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48 bg-input-background border-blue-500/30 text-foreground">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-blue-500/30">
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="high">High Severity</SelectItem>
            <SelectItem value="medium">Medium Severity</SelectItem>
            <SelectItem value="low">Low Severity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Flagged</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{flaggedTransactions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Reviews</CardTitle>
            <Eye className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">4</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting admin action
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Approved After Review</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              False positives
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">AI Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">94.8%</div>
            <p className="text-xs text-green-400 mt-1">
              Detection accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Anomalies Over Time */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Anomalies Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={anomalyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
                <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
                <YAxis stroke="currentColor" className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="anomalies" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reason Distribution */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Anomaly Reason Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reasonDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reasonDistribution.map((entry, index) => (
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
      </div>

      {/* Flagged Transactions Table */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Flagged Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Vendor</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Reason</TableHead>
                <TableHead className="text-muted-foreground">Severity</TableHead>
                <TableHead className="text-muted-foreground">AI Confidence</TableHead>
                <TableHead className="text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flaggedTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-blue-500/20 hover:bg-blue-500/5">
                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                  <TableCell className="text-foreground">{transaction.user}</TableCell>
                  <TableCell className="text-foreground">{transaction.vendor}</TableCell>
                  <TableCell className="text-foreground">${transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-400 text-blue-400">
                      {transaction.reason}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        transaction.severity === 'high' ? 'border-red-500 text-red-400' :
                        transaction.severity === 'medium' ? 'border-yellow-500 text-yellow-400' :
                        'border-blue-500 text-blue-400'
                      }
                    >
                      {transaction.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{transaction.aiConfidence}%</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Valid
                      </Button>
                      <Button size="sm" className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">
                        <XCircle className="w-3 h-3 mr-1" />
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

      {/* AI Explainability Section */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">AI Explainability - Recent Flags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-foreground">Global Airlines - $8,900</h4>
                    <Badge variant="outline" className="border-red-500 text-red-400">HIGH</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-red-400">Duplicate Receipt Detected:</span> Two identical receipts for $8,900 were submitted on the same day by the same user. Receipt numbers match, suggesting potential double-billing.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">97% confidence</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-foreground">ABC Taxi Service - $2,500</h4>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">MEDIUM</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-yellow-400">Excessive Amount:</span> This taxi expense is 340% above the average for this category ($735). The amount is 3.4 standard deviations from the mean, triggering our anomaly detection.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">89% confidence</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-foreground">Unknown Store XYZ - $780</h4>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">LOW</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-blue-400">Unusual Vendor:</span> This vendor has no previous transaction history in our system. While not necessarily fraudulent, it requires verification to ensure legitimacy.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">76% confidence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
