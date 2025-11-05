"use client";

import React from "react";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { aiInsights } from '../data/user-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AIInsights() {
  const topSpendingCategories = [
    { category: 'Travel', amount: 15200, percentage: 38 },
    { category: 'IT', amount: 8900, percentage: 22 },
    { category: 'Misc', amount: 6700, percentage: 17 },
    { category: 'Office', amount: 5800, percentage: 14 },
    { category: 'Food', amount: 3400, percentage: 9 },
  ];

  const savingsOpportunities = [
    { area: 'Office Supplies', potential: 420, method: 'Bulk ordering' },
    { area: 'Travel Bookings', potential: 850, method: 'Advance booking discounts' },
    { area: 'IT Subscriptions', potential: 320, method: 'Annual vs monthly plans' },
    { area: 'Catering Services', potential: 180, method: 'Preferred vendor program' },
  ];

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'warning': return 'from-yellow-500/10 to-yellow-500/5 border-yellow-500/30';
      case 'success': return 'from-green-500/10 to-green-500/5 border-green-500/30';
      default: return 'from-blue-500/10 to-blue-500/5 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-black flex items-center gap-2">
            <Brain className="w-7 h-7 text-blue-400" />
            AI Insights
          </h2>
          <p className="text-sm text-black/60 mt-1">AI-generated financial insights and recommendations</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-400 text-black border-0 gap-1">
          <Sparkles className="w-3 h-3" />
          Powered by AI
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white border-green-500/30">
          <CardContent className="pt-6">
            <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
            <p className="text-sm text-black/60">Potential Monthly Savings</p>
            <p className="text-3xl text-black mt-2">$1,770</p>
            <p className="text-xs text-green-500 mt-1">Through AI recommendations</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-500/30">
          <CardContent className="pt-6">
            <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
            <p className="text-sm text-black/60">Compliance Score</p>
            <p className="text-3xl text-black mt-2">89%</p>
            <p className="text-xs text-blue-500 mt-1">+4% improvement</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-cyan-500/30">
          <CardContent className="pt-6">
            <Brain className="w-8 h-8 text-cyan-500 mb-3" />
            <p className="text-sm text-black/60">AI Analysis Score</p>
            <p className="text-3xl text-black mt-2">94.8%</p>
            <p className="text-xs text-cyan-500 mt-1">Detection accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* AI‑Generated Insights */}
      <Card className="bg-white border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-black">Latest AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <Card key={insight.id} className={`bg-gradient-to-br ${getSeverityColor(insight.severity)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(insight.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-black">{insight.title}</h3>
                        <Badge variant="outline" className="border-blue-400 text-blue-400 text-xs">
                          {insight.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-black/70 mb-2">{insight.description}</p>
                      <p className="text-xs text-black/50">{insight.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Spending Categories */}
      <Card className="bg-white border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-black">Top 3 Spending Categories This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSpendingCategories.slice(0, 3).map((cat, index) => (
              <div key={cat.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      'bg-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-black">{cat.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-black">${cat.amount.toLocaleString()}</p>
                    <p className="text-xs text-black/60">{cat.percentage}% of total</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Savings Opportunities */}
        <Card className="bg-white border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              AI‑Detected Savings Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savingsOpportunities.map((opp, index) => (
                <div key={index} className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-black">{opp.area}</h4>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      ${opp.potential}/mo
                    </Badge>
                  </div>
                  <p className="text-sm text-black/70">
                    <span className="text-green-500">Recommendation:</span> {opp.method}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <p className="text-black">Total Potential Savings</p>
              <p className="text-3xl text-green-500 mt-1">
                ${savingsOpportunities.reduce((sum, opp) => sum + opp.potential, 0)}/month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Spending Analysis */}
        <Card className="bg-white border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-black">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topSpendingCategories}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px' }}
                  labelStyle={{ color: '#000' }}
                />
                <Bar dataKey="amount" fill="url(#categoryGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="categoryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Behavioral Insights */}
      <Card className="bg-white border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-black">Behavioral Insights & Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <h4 className="text-black mb-2">📅 Peak Expense Days</h4>
              <p className="text-sm text-black/70">
                Most expenses are submitted on <span className="text-blue-500">Fridays (32%)</span> and <span className="text-blue-500">end of month (28%)</span>. 
                Consider setting reminders earlier in the week to distribute workload.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <h4 className="text-black mb-2">🏢 Department Trends</h4>
              <p className="text-sm text-black/70">
                Engineering department shows <span className="text-cyan-500">23% increase</span> in IT expenses due to new project tools. This aligns with Q4 development sprint.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <h4 className="text-black mb-2">✅ Compliance Improvement</h4>
              <p className="text-sm text-black/70">
                Receipt documentation rate improved to <span className="text-green-500">90%</span> from 86% last month. Employee training program shows positive results.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <h4 className="text-black mb-2">⚡ Quick Insights</h4>
              <p className="text-sm text-black/70">
                Average approval time is <span className="text-yellow-500">2.3 days</span>. Implementing auto‑approval for low‑risk items could reduce this to 0.5 days.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendation */}
      <Card className="bg-white border-blue‑500/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-black">AI Recommendation: Optimize Your Workflow</h3>
              <p className="text-sm text-black/70 mt-1">
                Based on analysis of 172 transactions, implementing automated vendor verification for purchases over $1,000 could reduce manual review time by approximately 40% and improve processing speed by 2.1 days on average.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  Time Savings: 16 hours/month
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Cost Reduction: $640/month
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
