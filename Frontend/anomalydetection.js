import React from 'react';
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
    React.createElement('div', { className: 'space-y-6' },
      React.createElement('div', { className: 'flex items-center justify-between' },
        React.createElement('div', null,
          React.createElement('h2', { className: 'text-2xl text-foreground' }, 'Anomaly Detection'),
          React.createElement('p', { className: 'text-sm text-muted-foreground mt-1' }, 'AI-powered fraud and suspicious transaction monitoring')
        ),
        React.createElement(Select, { defaultValue: 'all' },
          React.createElement(SelectTrigger, { className: 'w-48 bg-input-background border-blue-500/30 text-foreground' },
            React.createElement(Filter, { className: 'w-4 h-4 mr-2' }),
            React.createElement(SelectValue, null)
          ),
          React.createElement(SelectContent, { className: 'bg-card border-blue-500/30' },
            React.createElement(SelectItem, { value: 'all' }, 'All Severities'),
            React.createElement(SelectItem, { value: 'high' }, 'High Severity'),
            React.createElement(SelectItem, { value: 'medium' }, 'Medium Severity'),
            React.createElement(SelectItem, { value: 'low' }, 'Low Severity')
          )
        )
      ),
      React.createElement('div', { className: 'grid gap-6 md:grid-cols-2 lg:grid-cols-4' },
        React.createElement(Card, { className: 'bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/30' },
          React.createElement(CardHeader, { className: 'flex flex-row items-center justify-between space-y-0 pb-2' },
            React.createElement(CardTitle, { className: 'text-sm text-muted-foreground' }, 'Total Flagged'),
            React.createElement(AlertTriangle, { className: 'h-4 w-4 text-red-400' })
          ),
          React.createElement(CardContent, null,
            React.createElement('div', { className: 'text-2xl text-foreground' }, flaggedTransactions.length),
            React.createElement('p', { className: 'text-xs text-muted-foreground mt-1' }, 'This month')
          )
        ),
        React.createElement(Card, { className: 'bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30' },
          React.createElement(CardHeader, { className: 'flex flex-row items-center justify-between space-y-0 pb-2' },
            React.createElement(CardTitle, { className: 'text-sm text-muted-foreground' }, 'Pending Reviews'),
            React.createElement(Eye, { className: 'h-4 w-4 text-yellow-400' })
          ),
          React.createElement(CardContent, null,
            React.createElement('div', { className: 'text-2xl text-foreground' }, '4'),
            React.createElement('p', { className: 'text-xs text-muted-foreground mt-1' }, 'Awaiting admin action')
          )
        ),
        React.createElement(Card, { className: 'bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30' },
          React.createElement(CardHeader, { className: 'flex flex-row items-center justify-between space-y-0 pb-2' },
            React.createElement(CardTitle, { className: 'text-sm text-muted-foreground' }, 'Approved After Review'),
            React.createElement(CheckCircle, { className: 'h-4 w-4 text-green-400' })
          ),
          React.createElement(CardContent, null,
            React.createElement('div', { className: 'text-2xl text-foreground' }, '12'),
            React.createElement('p', { className: 'text-xs text-muted-foreground mt-1' }, 'False positives')
          )
        ),
        React.createElement(Card, { className: 'bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30' },
          React.createElement(CardHeader, { className: 'flex flex-row items-center justify-between space-y-0 pb-2' },
            React.createElement(CardTitle, { className: 'text-sm text-muted-foreground' }, 'AI Accuracy'),
            React.createElement(CheckCircle, { className: 'h-4 w-4 text-blue-400' })
          ),
          React.createElement(CardContent, null,
            React.createElement('div', { className: 'text-2xl text-foreground' }, '94.8%'),
            React.createElement('p', { className: 'text-xs text-green-400 mt-1' }, 'Detection accuracy')
          )
        )
      ),
      React.createElement('div', { className: 'grid gap-6 lg:grid-cols-2' },
        React.createElement(Card, { className: 'bg-card border-blue-500/30' },
          React.createElement(CardHeader, null,
            React.createElement(CardTitle, { className: 'text-foreground' }, 'Anomalies Over Time')
          ),
          React.createElement(CardContent, null,
            React.createElement(ResponsiveContainer, { width: '100%', height: 300 },
              React.createElement(LineChart, { data: anomalyTrend },
                React.createElement(CartesianGrid, { strokeDasharray: '3 3', stroke: 'currentColor', className: 'text-muted', opacity: 0.2 }),
                React.createElement(XAxis, { dataKey: 'month', stroke: 'currentColor', className: 'text-muted-foreground' }),
                React.createElement(YAxis, { stroke: 'currentColor', className: 'text-muted-foreground' }),
                React.createElement(Tooltip, { contentStyle: { backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' } }),
                React.createElement(Line, { type: 'monotone', dataKey: 'anomalies', stroke: '#EF4444', strokeWidth: 3, dot: { fill: '#EF4444', r: 5 } })
              )
            )
          )
        ),
        React.createElement(Card, { className: 'bg-card border-blue-500/30' },
          React.createElement(CardHeader, null,
            React.createElement(CardTitle, { className: 'text-foreground' }, 'Anomaly Reason Distribution')
          ),
          React.createElement(CardContent, null,
            React.createElement(ResponsiveContainer, { width: '100%', height: 300 },
              React.createElement(PieChart, null,
                React.createElement(Pie, { data: reasonDistribution, cx: '50%', cy: '50%', labelLine: false, label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`, outerRadius: 100, fill: '#8884d8', dataKey: 'value' },
                  reasonDistribution.map((entry, index) => React.createElement(Cell, { key: `cell-${index}`, fill: entry.color }))
                ),
                React.createElement(Tooltip, { contentStyle: { backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' } })
              )
            )
          )
        )
      ),
      React.createElement(Card, { className: 'bg-card border-blue-500/30' },
        React.createElement(CardHeader, null,
          React.createElement(CardTitle, { className: 'text-foreground flex items-center gap-2' },
            React.createElement(AlertTriangle, { className: 'h-5 w-5 text-red-400' }),
            'Flagged Transactions'
          )
        ),
        React.createElement(CardContent, null,
          React.createElement(Table, null,
            React.createElement(TableHeader, null,
              React.createElement(TableRow, { className: 'border-blue-500/30 hover:bg-transparent' },
                React.createElement(TableHead, { className: 'text-muted-foreground' }, 'Date'),
                React.createElement(TableHead, { className: 'text-muted-foreground' }, 'User'),
                React.createElement(TableHead, { className: 'text-muted-foreground' }, 'Vendor'),
                React.createElement(TableHead, { className: 'text-muted-foreground' }, 'Amount'),
                React.createElement(TableHead, { className: 'text-muted-foreground' }, 'Reason'),
                React.createElement(TableHead, { className: 'text-muted-foreground' }, 'Severity'),
                React.createElement(TableHead, { className: 'text-muted-foreground' }, 'AI Confidence'),
                React.createElement(TableHead, { className: 'text-muted-foreground' }, 'Action')
              )
            ),
            React.createElement(TableBody, null,
              flaggedTransactions.map((transaction) => React.createElement(TableRow, { key: transaction.id, className: 'border-blue-500/20 hover:bg-blue-500/5' },
                React.createElement(TableCell, { className: 'text-muted-foreground' }, transaction.date),
                React.createElement(TableCell, { className: 'text-foreground' }, transaction.user),
                React.createElement(TableCell, { className: 'text-foreground' }, transaction.vendor),
                React.createElement(TableCell, { className: 'text-foreground' }, `$${transaction.amount.toLocaleString()}`),
                React.createElement(TableCell, null,
                  React.createElement(Badge, { variant: 'outline', className: 'border-blue-400 text-blue-400' }, transaction.reason)
                ),
                React.createElement(TableCell, null,
                  React.createElement(Badge, { variant: 'outline', className: transaction.severity === 'high' ? 'border-red-500 text-red-400' : transaction.severity === 'medium' ? 'border-yellow-500 text-yellow-400' : 'border-blue-500 text-blue-400' }, transaction.severity)
                ),
                React.createElement(TableCell, { className: 'text-foreground' }, `${transaction.aiConfidence}%`),
                React.createElement(TableCell, null,
                  React.createElement('div', { className: 'flex gap-2' },
                    React.createElement(Button, { size: 'sm', className: 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' },
                      React.createElement(CheckCircle, { className: 'w-3 h-3 mr-1' }),
                      'Valid'
                    ),
                    React.createElement(Button, { size: 'sm', className: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' },
                      React.createElement(XCircle, { className: 'w-3 h-3 mr-1' }),
                      'Reject'
                    )
                  )
                )
              ))
            )
          )
        )
      ),
      React.createElement(Card, { className: 'bg-card border-blue-500/30' },
        React.createElement(CardHeader, null,
          React.createElement(CardTitle, { className: 'text-foreground' }, 'AI Explainability - Recent Flags')
        ),
        React.createElement(CardContent, null,
          React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', { className: 'p-4 rounded-lg bg-red-500/10 border border-red-500/30' },
              React.createElement('div', { className: 'flex items-start gap-3' },
                React.createElement(AlertTriangle, { className: 'w-5 h-5 text-red-400 flex-shrink-0 mt-0.5' }),
                React.createElement('div', { className: 'flex-1' },
                  React.createElement('div', { className: 'flex items-center gap-2 mb-2' },
                    React.createElement('h4', { className: 'text-foreground' }, 'Global Airlines - $8,900'),
                    React.createElement(Badge, { variant: 'outline', className: 'border-red-500 text-red-400' }, 'HIGH')
                  ),
                  React.createElement('p', { className: 'text-sm text-muted-foreground' },
                    React.createElement('span', { className: 'text-red-400' }, 'Duplicate Receipt Detected:'),
                    ' Two identical receipts for $8,900 were submitted on the same day by the same user. Receipt numbers match, suggesting potential double-billing.'
                  ),
                  React.createElement('div', { className: 'mt-3 flex items-center gap-2' },
                    React.createElement('div', { className: 'flex-1 bg-muted rounded-full h-2' },
                      React.createElement('div', { className: 'bg-red-500 h-2 rounded-full', style: { width: '97%' } })
                    ),
                    React.createElement('span', { className: 'text-xs text-muted-foreground' }, '97% confidence')
                  )
                )
              )
            ),
            React.createElement('div', { className: 'p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30' },
              React.createElement('div', { className: 'flex items-start gap-3' },
                React.createElement(AlertTriangle, { className: 'w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5' }),
                React.createElement('div', { className: 'flex-1' },
                  React.createElement('div', { className: 'flex items-center gap-2 mb-2' },
                    React.createElement('h4', { className: 'text-foreground' }, 'ABC Taxi Service - $2,500'),
                    React.createElement(Badge, { variant: 'outline', className: 'border-yellow-500 text-yellow-400' }, 'MEDIUM')
                  ),
                  React.createElement('p', { className: 'text-sm text-muted-foreground' },
                    React.createElement('span', { className: 'text-yellow-400' }, 'Excessive Amount:'),
                    ' This taxi expense is 340% above the average for this category ($735). The amount is 3.4 standard deviations from the mean, triggering our anomaly detection.'
                  ),
                  React.createElement('div', { className: 'mt-3 flex items-center gap-2' },
                    React.createElement('div', { className: 'flex-1 bg-muted rounded-full h-2' },
                      React.createElement('div', { className: 'bg-yellow-500 h-2 rounded-full', style: { width: '89%' } })
                    ),
                    React.createElement('span', { className: 'text-xs text-muted-foreground' }, '89% confidence')
                  )
                )
              )
            ),
            React.createElement('div', { className: 'p-4 rounded-lg bg-blue-500/10 border border-blue-500/30' },
              React.createElement('div', { className: 'flex items-start gap-3' },
                React.createElement(Eye, { className: 'w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5' }),
                React.createElement('div', { className: 'flex-1' },
                  React.createElement('div', { className: 'flex items-center gap-2 mb-2' },
                    React.createElement('h4', { className: 'text-foreground' }, 'Unknown Store XYZ - $780'),
                    React.createElement(Badge, { variant: 'outline', className: 'border-blue-500 text-blue-400' }, 'LOW')
                  ),
                  React.createElement('p', { className: 'text-sm text-muted-foreground' },
                    React.createElement('span', { className: 'text-blue-400' }, 'Unusual Vendor:'),
                    ' This vendor has no previous transaction history in our system. While not necessarily fraudulent, it requires verification to ensure legitimacy.'
                  ),
                  React.createElement('div', { className: 'mt-3 flex items-center gap-2' },
                    React.createElement('div', { className: 'flex-1 bg-muted rounded-full h-2' },
                      React.createElement('div', { className: 'bg-blue-500 h-2 rounded-full', style: { width: '76%' } })
                    ),
                    React.createElement('span', { className: 'text-xs text-muted-foreground' }, '76% confidence')
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

