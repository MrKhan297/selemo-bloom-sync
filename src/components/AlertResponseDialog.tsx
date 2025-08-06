import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
  Camera,
  FileText
} from "lucide-react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  time: string;
  response?: {
    status: "pending" | "attended" | "escalated" | "resolved";
    respondedBy?: string;
    responseTime?: string;
    notes?: string;
    proofFiles?: File[];
  };
}

interface AlertResponseDialogProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitResponse: (alertId: string, response: any) => void;
}

export const AlertResponseDialog = ({
  alert,
  isOpen,
  onClose,
  onSubmitResponse,
}: AlertResponseDialogProps) => {
  const [responseStatus, setResponseStatus] = useState<"attended" | "escalated" | "resolved">("attended");
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!alert) return;

    const response = {
      status: responseStatus,
      respondedBy: "Current User", // This would come from auth context
      responseTime: new Date().toISOString(),
      notes,
      proofFiles: uploadedFiles,
    };

    onSubmitResponse(alert.id, response);
    
    toast({
      title: "Response Submitted",
      description: `Alert marked as ${responseStatus} with ${uploadedFiles.length} proof files.`,
    });

    // Reset form
    setNotes("");
    setUploadedFiles([]);
    setResponseStatus("attended");
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "attended": return "bg-success text-white";
      case "escalated": return "bg-warning text-foreground";
      case "resolved": return "bg-primary text-primary-foreground";
      default: return "bg-muted";
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-danger text-white";
      case "warning": return "bg-warning text-foreground";
      case "info": return "bg-success text-white";
      default: return "bg-muted";
    }
  };

  if (!alert) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Alert Response
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Details */}
          <div className="p-4 rounded-lg border bg-muted/50">
            <div className="flex items-start gap-3 mb-3">
              <div className={`h-3 w-3 rounded-full ${getAlertTypeColor(alert.type)} mt-1`} />
              <div className="flex-1">
                <p className="font-medium text-foreground">{alert.message}</p>
                <p className="text-sm text-muted-foreground">{alert.time}</p>
              </div>
              <Badge className={getAlertTypeColor(alert.type)}>
                {alert.type}
              </Badge>
            </div>
          </div>

          {/* Response Status */}
          <div>
            <Label className="text-base font-medium">Response Status</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["attended", "escalated", "resolved"].map((status) => (
                <Button
                  key={status}
                  variant={responseStatus === status ? "default" : "outline"}
                  onClick={() => setResponseStatus(status as any)}
                  className="flex items-center gap-2 h-auto py-3"
                >
                  {status === "attended" && <CheckCircle className="h-4 w-4" />}
                  {status === "escalated" && <AlertTriangle className="h-4 w-4" />}
                  {status === "resolved" && <CheckCircle className="h-4 w-4" />}
                  <span className="capitalize">{status}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Response Notes */}
          <div>
            <Label htmlFor="response-notes">Response Notes</Label>
            <Textarea
              id="response-notes"
              placeholder="Describe the action taken, observations, or reasons for escalation..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
          </div>

          {/* File Upload */}
          <div>
            <Label className="text-base font-medium">Upload Proof/Evidence</Label>
            <div className="mt-2 space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="font-medium text-primary">Click to upload</span>
                      <span className="text-muted-foreground"> or drag and drop</span>
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Photos, documents, or videos (Max 10MB each)
                    </p>
                  </div>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Submit Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};