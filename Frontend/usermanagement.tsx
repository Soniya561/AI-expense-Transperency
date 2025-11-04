import { useState } from 'react';
import { UserPlus, Search, MoreVertical, Shield, User as UserIcon, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { organizationUsers } from '../data/user-data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(organizationUsers);

  const roleStats = {
    admin: users.filter(u => u.role === 'admin').length,
    user: users.filter(u => u.role === 'user').length,
    auditor: users.filter(u => u.role === 'auditor').length,
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">User Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage organization members and their permissions</p>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black transition-colors cursor-pointer border-none">
            <UserPlus className="w-4 h-4" />
            Add New User
          </DialogTrigger>
          <DialogContent className="bg-card border-blue-500/30">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New User</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Create a new user account and assign appropriate permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="bg-input-background border-blue-500/30 text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-input-background border-blue-500/30 text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-foreground">Department</Label>
                <Select>
                  <SelectTrigger className="bg-input-background border-blue-500/30 text-foreground">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-blue-500/30">
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground">Role</Label>
                <Select>
                  <SelectTrigger className="bg-input-background border-blue-500/30 text-foreground">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-blue-500/30">
                    <SelectItem value="user">User (Staff/Employee)</SelectItem>
                    <SelectItem value="admin">Admin (Manager)</SelectItem>
                    <SelectItem value="auditor">Auditor (Reviewer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-blue-500/30 text-muted-foreground">Cancel</Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-black">Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Admin Users</p>
                <p className="text-3xl text-foreground mt-2">{roleStats.admin}</p>
              </div>
              <Shield className="w-10 h-10 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Staff/Employees</p>
                <p className="text-3xl text-foreground mt-2">{roleStats.user}</p>
              </div>
              <UserIcon className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border-cyan-400/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auditors</p>
                <p className="text-3xl text-foreground mt-2">{roleStats.auditor}</p>
              </div>
              <Eye className="w-10 h-10 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-card border-blue-500/30">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input-background border-blue-500/30 text-foreground"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">Organization Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Department</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Joined Date</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-blue-500/20 hover:bg-blue-500/5">
                  <TableCell className="text-foreground">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="text-muted-foreground">{user.department}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        user.role === 'admin' ? 'border-blue-500 text-blue-400' :
                        user.role === 'auditor' ? 'border-cyan-400 text-cyan-400' :
                        'border-green-500 text-green-400'
                      }
                    >
                      {user.role === 'admin' ? 'Admin' : user.role === 'auditor' ? 'Auditor' : 'User'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        user.status === 'active' ? 'border-green-400 text-green-400' : 'border-gray-500 text-gray-400'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.joinedDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md p-2 hover:bg-blue-500/10 transition-colors cursor-pointer border-none bg-transparent text-muted-foreground hover:text-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-blue-500/30">
                        <DropdownMenuItem className="text-foreground hover:bg-blue-500/10">
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground hover:bg-blue-500/10">
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground hover:bg-blue-500/10">
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Permissions Info */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">Role Permissions Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="text-foreground">Admin</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• View all expenses organization-wide</li>
                <li>• Approve/reject flagged transactions</li>
                <li>• Manage users and roles</li>
                <li>• Generate and export reports</li>
                <li>• Configure system settings</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center gap-2 mb-3">
                <UserIcon className="w-5 h-5 text-green-400" />
                <h3 className="text-foreground">User (Staff/Employee)</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Upload expense receipts</li>
                <li>• View personal expense history</li>
                <li>• Edit own uploaded expenses</li>
                <li>• Track approval status</li>
                <li>• View personal analytics</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h3 className="text-foreground">Auditor</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Read-only access to all data</li>
                <li>• View AI decisions and reasons</li>
                <li>• Access audit trail logs</li>
                <li>• Generate compliance reports</li>
                <li>• Verify transparency</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
