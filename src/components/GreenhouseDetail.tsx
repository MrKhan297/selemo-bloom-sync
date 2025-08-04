import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, User, Wrench, Calendar, TrendingDown, AlertTriangle } from "lucide-react";

interface GreenhouseDetailProps {
  stage: string;
  onBack: () => void;
}

const GreenhouseDetail = ({ stage, onBack }: GreenhouseDetailProps) => {
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);

  const greenhouseData = {
    C1: {
      name: "Greenhouse C1",
      size: "500 sqm",
      availableSpace: "420 sqm",
      plannedVolume: "2,500 stems",
      variety: "White Premium Chrysanthemum",
      dateOfAction: "2024-02-01",
      projectedYield: "2,400 stems",
      actualVolume: "2,300 stems",
      supervisor: "John Makena",
      team: ["Sarah Mthembu", "Peter Ndaba", "Mary Khumalo"],
      maintenance: "David Sibeko",
      yieldDropCauses: [
        { cause: "Aphid infestation", impact: "5% yield loss", value: "R 1,250", mitigation: "Biological pest control", cost: "R 450" },
        { cause: "Temperature fluctuation", impact: "3% yield loss", value: "R 750", mitigation: "Climate control upgrade", cost: "R 2,800" }
      ]
    },
    C2: {
      name: "Greenhouse C2", 
      size: "450 sqm",
      availableSpace: "380 sqm",
      plannedVolume: "2,200 stems",
      variety: "Yellow Standard Chrysanthemum",
      dateOfAction: "2024-02-05",
      projectedYield: "2,100 stems",
      actualVolume: "2,000 stems",
      supervisor: "Lisa Mokoena",
      team: ["James Dlamini", "Grace Sithole"],
      maintenance: "Michael Zulu",
      yieldDropCauses: [
        { cause: "Nutrient deficiency", impact: "4% yield loss", value: "R 800", mitigation: "Soil amendment", cost: "R 600" }
      ]
    }
  };

  const getStageInfo = () => {
    switch (stage) {
      case "Planting":
        return { duration: "Initial stage", color: "text-blue-600" };
      case "Growing":
        return { duration: "12 weeks", color: "text-green-600" };
      case "Harvest":
        return { duration: "Harvest period", color: "text-amber-600" };
      default:
        return { duration: "Unknown", color: "text-gray-600" };
    }
  };

  const stageInfo = getStageInfo();

  if (selectedHouse) {
    const house = greenhouseData[selectedHouse as keyof typeof greenhouseData];
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setSelectedHouse(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Houses
          </Button>
          <h2 className="text-2xl font-bold">{house.name} - {stage} Details</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>House Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Size</span>
                <span className="font-medium">{house.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Space</span>
                <span className="font-medium">{house.availableSpace}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variety</span>
                <span className="font-medium">{house.variety}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date of {stage}</span>
                <span className="font-medium">{house.dateOfAction}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volume & Yield</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Planned Volume</span>
                <span className="font-medium">{house.plannedVolume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projected Yield</span>
                <span className="font-medium">{house.projectedYield}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actual Volume</span>
                <span className="font-medium">{house.actualVolume}</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Yield Performance</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Supervisor:</span>
                <span className="font-medium">{house.supervisor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Maintenance:</span>
                <span className="font-medium">{house.maintenance}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Team Members:</p>
                <div className="space-y-1">
                  {house.team.map((member, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-1">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Loss Tracking & Mitigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {house.yieldDropCauses.map((loss, index) => (
                  <div key={index} className="border-l-4 border-warning pl-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{loss.cause}</h4>
                      <Badge variant="destructive">{loss.impact}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Financial Loss</p>
                        <p className="font-medium text-destructive">{loss.value}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mitigation Cost</p>
                        <p className="font-medium">{loss.cost}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Mitigation</p>
                      <p className="text-sm font-medium">{loss.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{stage} Management</h2>
          <p className="text-muted-foreground">Duration: {stageInfo.duration}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(greenhouseData).map(([key, house]) => (
          <Card 
            key={key} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedHouse(key)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {house.name}
                <Badge className={stageInfo.color}>{stage}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size</span>
                <span className="font-medium">{house.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variety</span>
                <span className="font-medium">{house.variety}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projected Yield</span>
                <span className="font-medium">{house.projectedYield}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Supervisor</span>
                <span className="font-medium">{house.supervisor}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GreenhouseDetail;