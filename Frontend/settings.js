import { useState } from 'react';
import { Building2, Key, Bell, Palette, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Settings() {
  const [anomalyDetection, setAnomalyDetection] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoApproval, setAutoApproval] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-black">Settings</h2>
        <p className="text-sm text-black/60 mt-1">Configure system preferences and organization settings</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-blue-500/30">
          <TabsTrigger value="profile" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-black">
            Profile
          </TabsTrigger>
          <TabsTrigger value="organization" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-black">
            Organization
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-black">
            AI Settings
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-black">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="bg-white border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-black">User Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black">Full Name</Label>
                  <Input id="name" defaultValue="John Smith" className="bg-white border-blue-500/30 text-black" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.smith@example.com" className="bg-white border-blue-500/30 text-black" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-black">Department</Label>
                <Input id="department" defaultValue="Finance" className="bg-white border-blue-500/30 text-black" />
              </div>

              <Separator className="bg-blue-500/30" />

              <div className="space-y-4">
                <h3 className="text-black">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-black">Current Password</Label>
                  <Input id="current-password" type="password" className="bg-white border-blue-500/30 text-black" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-black">New Password</Label>
                  <Input id="new-password" type="password" className="bg-white border-blue-500/30 text-black" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-black">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="bg-white border-blue-500/30 text-black" />
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="mt-6">
          <Card className="bg-white border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Organization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="org-name" className="text-black">Organization Name</Label>
                <Input id="org-name" defaultValue="Tech Innovations Inc" className="bg-white border-blue-500/30 text-black" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="org-logo" className="text-black">Organization Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-black" />
                  </div>
                  <Button variant="outline" className="border-blue-500/30 text-blue-500">
                    Upload New Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="policy" className="text-black">Company Policy & Guidelines</Label>
                <Textarea 
                  id="policy" 
                  placeholder="Enter company expense policies..."
                  className="bg-white border-blue-500/30 text-black min-h-32"
                  defaultValue="All expenses must be submitted within 30 days. Receipts are required for all expenses over $50. Travel expenses require pre-approval for amounts exceeding $1,000."
                />
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
                <Save className="w-4 h-4" />
                Save Organization Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <Card className="bg-white border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Key className="w-5 h-5" />
                AI & API Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-blue-500/20">
                  <div className="flex-1">
                    <h4 className="text-black">Enable Anomaly Detection</h4>
                    <p className="text-sm text-black/60 mt-1">AI will automatically flag suspicious transactions</p>
                  </div>
                  <Switch checked={anomalyDetection} onCheckedChange={setAnomalyDetection} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-blue-500/20">
                  <div className="flex-1">
                    <h4 className="text-black">Auto-Approval for Low-Risk Expenses</h4>
                    <p className="text-sm text-black/60 mt-1">Automatically approve expenses under $100 with high confidence scores</p>
                  </div>
                  <Switch checked={autoApproval} onCheckedChange={setAutoApproval} />
                </div>
              </div>

              <Separator className="bg-blue-500/30" />

              <div className="space-y-4">
                <h3 className="text-black">OCR API Configuration</h3>
                <div className="space-y-2">
                  <Label htmlFor="ocr-provider" className="text-black">OCR Provider</Label>
                  <Input id="ocr-provider" defaultValue="PaddleOCR" className="bg-white border-blue-500/30 text-black" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key" className="text-black">API Key</Label>
                  <Input id="api-key" type="password" defaultValue="••••••••••••••••" className="bg-white border-blue-500/30 text-black" />
                </div>
              </div>

              <Separator className="bg-blue-500/30" />

              <div className="space-y-4">
                <h3 className="text-black">Model Configuration</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div>
                    <h4 className="text-black">Current Model Version</h4>
                    <p className="text-sm text-black/60 mt-1">v2.3.1 - Last updated: Oct 15, 2025</p>
                  </div>
                  <Button variant="outline" className="border-blue-500/30 text-blue-500">
                    Check for Updates
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-gray-50 border border-blue-500/20">
                    <p className="text-sm text-black/60">Detection Accuracy</p>
                    <p className="text-2xl text-black mt-1">94.8%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 border border-blue-500/20">
                    <p className="text-sm text-black/60">Confidence Threshold</p>
                    <p className="text-2xl text-black mt-1">85%</p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
                <Save className="w-4 h-4" />
                Save AI Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-white border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-blue-500/20">
                  <div className="flex-1">
                    <h4 className="text-black">Email Notifications</h4>
                    <p className="text-sm text-black/60 mt-1">Receive email alerts for important events</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="pl-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm text-black">Expense approved</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm text-black">Expense flagged by AI</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm text-black">New user added</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm text-black">Weekly summary report</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="bg-blue-500/30" />

              <div className="space-y-4">
                <h3 className="text-black">In-App Notifications</h3>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm text-black">Browser notifications</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm text-black">Sound alerts</span>
                  <Switch />
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black gap-2">
                <Save className="w-4 h-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Support Section */}
      <Card className="bg-white border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-black">Support & Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-black/70">Need assistance? Contact our support team or check our documentation.</p>
          <div className="flex gap-4">
            <Button variant="outline" className="border-blue-500/30 text-blue-500">
              View Documentation
            </Button>
            <Button variant="outline" className="border-blue-500/30 text-blue-500">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

