import { useState } from 'react';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function UploadReceipt() {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload();
  };

  const handleFileUpload = () => {
    setIsAnalyzing(true);
    setIsComplete(false);

    // Simulate OCR extraction
    setTimeout(() => {
      setExtractedData({
        date: '2025-11-03',
        vendor: 'Tech Solutions Inc',
        amount: '2,450.00',
        category: 'IT',
        description: 'Software licenses and cloud services',
        confidence: 95
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleSubmit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsComplete(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">Upload Expense Document</h2>
          <p className="text-sm text-muted-foreground mt-1">AI-powered OCR will extract data automatically</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Area */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground">Document Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer
                ${isDragging 
                  ? 'border-blue-400 bg-blue-500/10' 
                  : 'border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/5'
                }
              `}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-foreground">Drag & drop your receipt here</p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10" onClick={() => document.getElementById('file-upload')?.click()}>
                  Select File
                </Button>
                <p className="text-xs text-muted-foreground opacity-70">Supports: JPG, PNG, PDF (Max 10MB)</p>
              </div>
            </div>

            {isAnalyzing && (
              <div className="flex items-center justify-center gap-3 p-6 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                <span className="text-blue-400">Analyzing with AI...</span>
              </div>
            )}

            {isComplete && (
              <div className="flex items-center justify-center gap-3 p-6 rounded-lg bg-green-500/10 border border-green-500/30">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">Successfully submitted for verification!</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* OCR Extraction Preview */}
        <Card className="bg-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5" />
              OCR Extraction Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!extractedData && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Upload a document to see extracted data</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
                <p className="text-blue-400">Processing document...</p>
              </div>
            )}

            {extractedData && !isAnalyzing && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">
                    Extraction Confidence: {extractedData.confidence}%
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Date</Label>
                    <Input
                      value={extractedData.date}
                      className="mt-1 bg-input-background border-blue-500/30 text-foreground"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground">Vendor</Label>
                    <Input
                      value={extractedData.vendor}
                      className="mt-1 bg-input-background border-blue-500/30 text-foreground"
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground">Amount (USD)</Label>
                    <Input
                      value={extractedData.amount}
                      className="mt-1 bg-input-background border-blue-500/30 text-foreground"
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground">Category</Label>
                    <Select defaultValue={extractedData.category}>
                      <SelectTrigger className="mt-1 bg-input-background border-blue-500/30 text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-blue-500/30">
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Misc">Miscellaneous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-muted-foreground">Description</Label>
                    <Input
                      value={extractedData.description}
                      className="mt-1 bg-input-background border-blue-500/30 text-foreground"
                    />
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    disabled={isComplete}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black"
                  >
                    {isComplete ? 'Submitted' : 'Submit for Verification'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Flow */}
      <Card className="bg-card border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground">AI Processing Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: 'OCR Extraction', icon: FileText, status: extractedData ? 'complete' : 'pending' },
              { step: 'Data Cleaning', icon: CheckCircle, status: extractedData ? 'complete' : 'pending' },
              { step: 'NLP Classification', icon: CheckCircle, status: extractedData ? 'complete' : 'pending' },
              { step: 'Fraud Detection', icon: AlertCircle, status: isComplete ? 'complete' : 'pending' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`
                    p-4 rounded-lg border text-center transition-all
                    ${item.status === 'complete'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-muted/50 border-border'
                    }
                  `}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${item.status === 'complete' ? 'text-green-400' : 'text-muted-foreground'}`} />
                  <p className={`text-sm ${item.status === 'complete' ? 'text-green-400' : 'text-muted-foreground'}`}>
                    {item.step}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

