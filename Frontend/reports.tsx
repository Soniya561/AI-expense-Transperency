import { Download, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { trendData, fraudStats, categoryData } from '../data/mock-data';

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">Expense Reports and Insights</h2>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive analysis of spending patterns and anomalies</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
          <Download className="w-4 h-4" />
          Download Report (PDF)
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-blue-500/30">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
              </label>
              <Select defaultValue="6months">
                <SelectTrigger className="bg-input-background border-blue-500/30 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-blue-500/30">
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Department
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-input-background border-blue-500/30 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-blue-500/30">
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-input-background border-blue-500/30 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-blue-500/30">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="misc">Miscellaneous</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expense Trend Line Chart */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">Expense Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
              <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
              <YAxis stroke="currentColor" className="text-muted-foreground" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
              />
              <Legend wrapperStyle={{ color: 'hsl(var(--muted-foreground))' }} />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 5 }}
                name="Total Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="fraud" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', r: 5 }}
                name="Flagged Amount"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category-Wise Comparison */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Category-Wise Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
                <XAxis type="number" stroke="currentColor" className="text-muted-foreground" />
                <YAxis dataKey="name" type="category" stroke="currentColor" className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 8, 8, 0]}>
                  {categoryData.map((entry, index) => (
                    <rect key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fraud Detection Statistics */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Fraud Detection Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fraudStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
                <XAxis dataKey="category" stroke="currentColor" className="text-muted-foreground" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="currentColor" className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
                />
                <Bar dataKey="count" fill="url(#fraudGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={1} />
                    <stop offset="100%" stopColor="#F97316" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Analyzed</p>
              <p className="text-3xl text-foreground mt-2">172</p>
              <p className="text-xs text-blue-400 mt-1">Transactions</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Clean Rate</p>
              <p className="text-3xl text-foreground mt-2">97.7%</p>
              <p className="text-xs text-green-400 mt-1">No issues detected</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Flagged Amount</p>
              <p className="text-3xl text-foreground mt-2">$11.2K</p>
              <p className="text-xs text-yellow-400 mt-1">Under review</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg Resolution</p>
              <p className="text-3xl text-foreground mt-2">2.3</p>
              <p className="text-xs text-red-400 mt-1">Days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Insights */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">AI-Generated Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <h4 className="text-foreground mb-2">📊 Spending Pattern</h4>
              <p className="text-sm text-muted-foreground">
                Travel expenses have increased by 23% compared to last quarter. This aligns with the Q4 conference season. IT spending remains consistent with budget allocations.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <h4 className="text-foreground mb-2">⚠️ Anomaly Alert</h4>
              <p className="text-sm text-muted-foreground">
                2 duplicate transactions detected in October. Our AI flagged these for manual review. Average resolution time for similar cases is 1.8 days.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <h4 className="text-foreground mb-2">✅ Compliance Status</h4>
              <p className="text-sm text-muted-foreground">
                89% of expenses include proper documentation. Policy compliance score improved by 4% from last month. Employee training has shown positive results.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
              <h4 className="text-foreground mb-2">💡 Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                Consider implementing automated vendor verification for amounts over $1,000 to reduce manual review time by an estimated 40%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
