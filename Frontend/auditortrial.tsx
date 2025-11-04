import { useState } from 'react';
import { History, Download, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { auditTrailData } from '../data/user-data';

export function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredData = auditTrailData.filter(entry => {
    const matchesSearch = 
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = actionFilter === 'all' || entry.action.includes(actionFilter);
    
    return matchesSearch && matchesFilter;
  });

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'Uploaded', label: 'Uploads' },
    { value: 'Approved', label: 'Approvals' },
    { value: 'Rejected', label: 'Rejections' },
    { value: 'Flagged', label: 'Flags' },
    { value: 'Generated', label: 'Reports' },
  ];

  const getActionColor = (action: string) => {
    if (action.includes('Approved')) return 'border-green-400 text-green-400';
    if (action.includes('Rejected') || action.includes('Flagged')) return 'border-red-400 text-red-400';
    if (action.includes('Uploaded')) return 'border-blue-400 text-blue-400';
    if (action.includes('Generated') || action.includes('Exported')) return 'border-cyan-400 text-cyan-400';
    return 'border-gray-400 text-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-black flex items-center gap-2">
            <History className="w-7 h-7" />
            Audit Trail
          </h2>
          <p className="text-sm text-black/60 mt-1">Complete history of all system activities and transactions</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
          <Download className="w-4 h-4" />
          Export Audit Log
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-white border-blue-500/30">
          <CardContent className="pt-6">
            <p className="text-sm text-black/60">Total Activities</p>
            <p className="text-3xl text-black mt-2">{auditTrailData.length}</p>
            <p className="text-xs text-black/60 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-green-500/30">
          <CardContent className="pt-6">
            <p className="text-sm text-black/60">Approvals</p>
            <p className="text-3xl text-black mt-2">
              {auditTrailData.filter(e => e.action.includes('Approved')).length}
            </p>
            <p className="text-xs text-black/60 mt-1">Actions completed</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-red-500/30">
          <CardContent className="pt-6">
            <p className="text-sm text-black/60">Flags/Rejections</p>
            <p className="text-3xl text-black mt-2">
              {auditTrailData.filter(e => e.action.includes('Flagged') || e.action.includes('Rejected')).length}
            </p>
            <p className="text-xs text-black/60 mt-1">Security actions</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-cyan-500/30">
          <CardContent className="pt-6">
            <p className="text-sm text-black/60">Reports Generated</p>
            <p className="text-3xl text-black mt-2">
              {auditTrailData.filter(e => e.action.includes('Generated') || e.action.includes('Exported')).length}
            </p>
            <p className="text-xs text-black/60 mt-1">Data exports</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white border-blue-500/30">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search activities by user, action, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-blue-500/30 text-black"
              />
            </div>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="bg-white border-blue-500/30 text-black">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-blue-500/30">
                {actionTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail Table */}
      <Card className="bg-white border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-black">Activity Log ({filteredData.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/30 hover:bg-transparent">
                <TableHead className="text-black/60">Timestamp</TableHead>
                <TableHead className="text-black/60">User</TableHead>
                <TableHead className="text-black/60">Action</TableHead>
                <TableHead className="text-black/60">Details</TableHead>
                <TableHead className="text-black/60">IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((entry) => (
                <TableRow key={entry.id} className="border-blue-500/20 hover:bg-blue-500/5">
                  <TableCell className="text-black/70">{entry.timestamp}</TableCell>
                  <TableCell className="text-black">{entry.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getActionColor(entry.action)}>
                      {entry.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-black/70">{entry.details}</TableCell>
                  <TableCell className="text-black/60 font-mono text-xs">{entry.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Timeline View */}
      <Card className="bg-white border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-black">Recent Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.slice(0, 5).map((entry, index) => (
              <div key={entry.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    entry.action.includes('Approved') ? 'bg-green-500' :
                    entry.action.includes('Rejected') || entry.action.includes('Flagged') ? 'bg-red-500' :
                    entry.action.includes('Uploaded') ? 'bg-blue-500' :
                    'bg-cyan-500'
                  }`}></div>
                  {index < 4 && <div className="w-0.5 h-full bg-blue-500/30 mt-1"></div>}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-black">{entry.user}</span>
                    <span className="text-xs text-black/50">{entry.timestamp}</span>
                  </div>
                  <p className="text-sm text-black/60">
                    <span className={getActionColor(entry.action).replace('border-', 'text-')}>
                      {entry.action}
                    </span> - {entry.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card className="bg-white border-blue-500/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <History className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-black">Audit Trail Integrity</h3>
              <p className="text-sm text-black/70 mt-1">
                All activities are logged with timestamps and IP addresses for complete transparency and accountability. 
                This audit trail is immutable and cannot be modified or deleted, ensuring compliance with financial regulations.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Blockchain Verified
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  Tamper-Proof
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
