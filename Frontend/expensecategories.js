import { useState } from 'react';
import { Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { categoryData } from '../data/mock-data';

export function ExpenseCategories() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryExpenses = {
    Travel: [
      { id: '1', date: '2025-11-01', vendor: 'Global Airlines', amount: 8900, status: 'Flagged' },
      { id: '2', date: '2025-10-30', vendor: 'ABC Taxi Service', amount: 2500, status: 'Flagged' },
      { id: '3', date: '2025-10-25', vendor: 'Hotel International', amount: 1200, status: 'Verified' },
      { id: '4', date: '2025-10-20', vendor: 'Rental Car Co', amount: 600, status: 'Verified' },
    ],
    Food: [
      { id: '1', date: '2025-11-02', vendor: 'Restaurant Plaza', amount: 450, status: 'Pending' },
      { id: '2', date: '2025-10-28', vendor: 'Coffee Shop', amount: 45, status: 'Verified' },
      { id: '3', date: '2025-10-25', vendor: 'Lunch Bistro', amount: 85, status: 'Verified' },
      { id: '4', date: '2025-10-22', vendor: 'Catering Service', amount: 1200, status: 'Verified' },
    ],
    Office: [
      { id: '1', date: '2025-11-01', vendor: 'Office Depot', amount: 340, status: 'Verified' },
      { id: '2', date: '2025-10-28', vendor: 'Stationery World', amount: 180, status: 'Verified' },
      { id: '3', date: '2025-10-22', vendor: 'Furniture Plus', amount: 2400, status: 'Verified' },
      { id: '4', date: '2025-10-18', vendor: 'Tech Supplies', amount: 680, status: 'Verified' },
    ],
    IT: [
      { id: '1', date: '2025-11-02', vendor: 'Tech Solutions Inc', amount: 2450, status: 'Verified' },
      { id: '2', date: '2025-10-25', vendor: 'Cloud Services Ltd', amount: 1200, status: 'Verified' },
      { id: '3', date: '2025-10-20', vendor: 'Software License Co', amount: 3500, status: 'Verified' },
      { id: '4', date: '2025-10-15', vendor: 'Hardware Store', amount: 1750, status: 'Verified' },
    ],
    Misc: [
      { id: '1', date: '2025-10-30', vendor: 'Conference Center', amount: 5600, status: 'Pending' },
      { id: '2', date: '2025-10-25', vendor: 'Training Materials', amount: 450, status: 'Verified' },
      { id: '3', date: '2025-10-20', vendor: 'Printing Services', amount: 280, status: 'Verified' },
      { id: '4', date: '2025-10-15', vendor: 'Misc Vendor', amount: 370, status: 'Verified' },
    ],
  };

  const categoryTrends = [
    { month: 'Jul', Travel: 12000, Food: 2800, Office: 4500, IT: 7800, Misc: 5200 },
    { month: 'Aug', Travel: 14200, Food: 3200, Office: 5100, IT: 8500, Misc: 6100 },
    { month: 'Sep', Travel: 13500, Food: 3100, Office: 4800, IT: 8200, Misc: 5800 },
    { month: 'Oct', Travel: 15200, Food: 3400, Office: 5800, IT: 8900, Misc: 6700 },
  ];

  const categoryComparison = categoryData.map(cat => {
    const prevValue = cat.value * 0.87; // Simulated previous month
    const change = ((cat.value - prevValue) / prevValue * 100).toFixed(1);
    return { ...cat, prevValue, change: parseFloat(change) };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">Expense Categories</h2>
          <p className="text-sm text-muted-foreground mt-1">Analyze spending patterns across different categories</p>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48 bg-input-background border-blue-500/30 text-foreground">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-blue-500/30">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Office">Office</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="Misc">Miscellaneous</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        {categoryComparison.map((cat) => (
          <Card key={cat.name} className="bg-card border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-muted-foreground">{cat.name}</h3>
                {cat.change > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </div>
              <p className="text-xl text-foreground">${cat.value.toLocaleString()}</p>
              <p className={`text-xs mt-1 ${cat.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {cat.change > 0 ? '+' : ''}{cat.change}% vs last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Spending Chart */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">Category-wise Spending Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categoryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
              <XAxis type="number" stroke="currentColor" className="text-muted-foreground" />
              <YAxis dataKey="name" type="category" stroke="currentColor" className="text-muted-foreground" width={100} />
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

      {/* Category Trends Over Time */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">Category Comparison Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={categoryTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted" opacity={0.2} />
              <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
              <YAxis stroke="currentColor" className="text-muted-foreground" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: 'hsl(var(--card-foreground))' }}
              />
              <Legend wrapperStyle={{ color: 'hsl(var(--muted-foreground))' }} />
              <Line type="monotone" dataKey="Travel" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="Food" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="Office" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="IT" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="Misc" stroke="#EC4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Tabs with Detailed Expenses */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">Detailed Category Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Travel" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted border border-blue-500/30">
              {Object.keys(categoryExpenses).map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-black"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(categoryExpenses).map(([category, expenses]) => (
              <TabsContent key={category} value={category} className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-500/30 hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Date</TableHead>
                      <TableHead className="text-muted-foreground">Vendor</TableHead>
                      <TableHead className="text-muted-foreground">Amount</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id} className="border-blue-500/20 hover:bg-blue-500/5">
                        <TableCell className="text-muted-foreground">{expense.date}</TableCell>
                        <TableCell className="text-foreground">{expense.vendor}</TableCell>
                        <TableCell className="text-foreground">${expense.amount.toLocaleString()}</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

