import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  Smile,
  Meh,
  Frown,
  Zap,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  MessageSquare
} from "lucide-react";

interface HappinessData {
  workerId: string;
  workerName: string;
  currentRating: number; // 1-5
  lastUpdated: string;
  factors: {
    workload: number;
    supervisor: number;
    compensation: number;
    workEnvironment: number;
  };
  notes?: string;
  trend: "improving" | "declining" | "stable";
}

interface HappinessIndicatorProps {
  worker?: HappinessData;
  isCompact?: boolean;
  showUpdateForm?: boolean;
}

export const HappinessIndicator = ({ 
  worker, 
  isCompact = false, 
  showUpdateForm = false 
}: HappinessIndicatorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRating, setNewRating] = useState(worker?.currentRating || 3);
  const [updateNotes, setUpdateNotes] = useState("");
  const { toast } = useToast();

  // Default happiness data for demo
  const defaultWorker: HappinessData = {
    workerId: "EMP001",
    workerName: "Thabo Mthembu",
    currentRating: 4,
    lastUpdated: "2024-01-15",
    factors: {
      workload: 4,
      supervisor: 5,
      compensation: 3,
      workEnvironment: 4,
    },
    trend: "stable",
    notes: "Generally satisfied with work conditions"
  };

  const happinessData = worker || defaultWorker;

  const getHappinessIcon = (rating: number) => {
    if (rating >= 4.5) return <Smile className="h-5 w-5 text-success" />;
    if (rating >= 3.5) return <Smile className="h-5 w-5 text-warning" />;
    if (rating >= 2.5) return <Meh className="h-5 w-5 text-warning" />;
    return <Frown className="h-5 w-5 text-danger" />;
  };

  const getHappinessColor = (rating: number) => {
    if (rating >= 4) return "text-success";
    if (rating >= 3) return "text-warning";
    return "text-danger";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 text-success" />;
      case "declining": return <TrendingDown className="h-4 w-4 text-danger" />;
      default: return <span className="h-4 w-4" />;
    }
  };

  const handleUpdateHappiness = () => {
    // Here you would normally save to database/state management
    toast({
      title: "Happiness Updated",
      description: `${happinessData.workerName}'s happiness rating updated to ${newRating}/5`,
    });
    setIsDialogOpen(false);
    setUpdateNotes("");
  };

  const renderCompactView = () => (
    <div className="flex items-center gap-2">
      {getHappinessIcon(happinessData.currentRating)}
      <span className={`text-sm font-medium ${getHappinessColor(happinessData.currentRating)}`}>
        {happinessData.currentRating}/5
      </span>
      {getTrendIcon(happinessData.trend)}
    </div>
  );

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating 
              ? "fill-warning text-warning" 
              : "text-muted-foreground"
          } ${interactive ? "cursor-pointer hover:text-warning" : ""}`}
          onClick={() => interactive && onRate?.(star)}
        />
      ))}
    </div>
  );

  if (isCompact) {
    return renderCompactView();
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Team Happiness
          </CardTitle>
          {showUpdateForm && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Update
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Happiness Rating</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Worker: {happinessData.workerName}</Label>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Overall Happiness</Label>
                    <div className="mt-2">
                      {renderStars(newRating, true, setNewRating)}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="happiness-notes">Notes</Label>
                    <Textarea
                      id="happiness-notes"
                      placeholder="Any specific feedback or observations..."
                      value={updateNotes}
                      onChange={(e) => setUpdateNotes(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={handleUpdateHappiness} className="w-full">
                    Update Happiness Rating
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Rating */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            {getHappinessIcon(happinessData.currentRating)}
            <div>
              <p className="font-medium">{happinessData.workerName}</p>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(happinessData.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getHappinessColor(happinessData.currentRating)}`}>
              {happinessData.currentRating}/5
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {getTrendIcon(happinessData.trend)}
              <span className="capitalize">{happinessData.trend}</span>
            </div>
          </div>
        </div>

        {/* Happiness Factors */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Happiness Factors</Label>
          
          {Object.entries(happinessData.factors).map(([factor, rating]) => (
            <div key={factor} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize font-medium">
                  {factor.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={getHappinessColor(rating)}>{rating}/5</span>
              </div>
              <Progress 
                value={(rating / 5) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        {/* Notes */}
        {happinessData.notes && (
          <div className="p-3 bg-muted/30 rounded-lg">
            <Label className="text-sm font-medium">Latest Notes</Label>
            <p className="text-sm text-muted-foreground mt-1">{happinessData.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Team Happiness Overview Component
export const TeamHappinessOverview = () => {
  const teamHappiness = [
    { department: "Greenhouse", avgRating: 4.2, workers: 8, trend: "improving" },
    { department: "Packhouse", avgRating: 3.8, workers: 6, trend: "stable" },
    { department: "Field Work", avgRating: 3.5, workers: 10, trend: "declining" },
  ];

  const overallAverage = teamHappiness.reduce((sum, dept) => sum + dept.avgRating, 0) / teamHappiness.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Team Happiness Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <div className="text-3xl font-bold text-primary mb-2">
            {overallAverage.toFixed(1)}/5
          </div>
          <p className="text-sm text-muted-foreground">Overall Team Happiness</p>
        </div>

        <div className="space-y-3">
          {teamHappiness.map((dept, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{dept.department}</p>
                <p className="text-sm text-muted-foreground">{dept.workers} workers</p>
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <div className={`font-medium ${dept.avgRating >= 4 ? 'text-success' : dept.avgRating >= 3 ? 'text-warning' : 'text-danger'}`}>
                    {dept.avgRating}/5
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {dept.trend === "improving" && <TrendingUp className="h-3 w-3 text-success" />}
                    {dept.trend === "declining" && <TrendingDown className="h-3 w-3 text-danger" />}
                    <span className="capitalize">{dept.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};