import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, User, Wrench, Calendar, TrendingDown, AlertTriangle, History, MessageCircle } from "lucide-react";

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
      plantedDate: "2024-01-15",
      volumePlanted: "2,500 cuttings",
      varietiesPlanted: ["White Premium", "White Standard"],
      projectedHarvestDate: "2024-04-10",
      projectedYield: "2,400 stems",
      actualVolume: "2,300 stems",
      supervisor: "John Makena",
      team: ["Sarah Mthembu", "Peter Ndaba", "Mary Khumalo"],
      maintenance: "David Sibeko",
      rootingStaff: [
        { name: "Alice Nkomo", type: "Permanent", count: 1 },
        { name: "Ben Molefe", type: "Casual", count: 1 }
      ],
      plantingFarmhands: [
        { name: "Sarah Mthembu", type: "Permanent", count: 1 },
        { name: "Peter Ndaba", type: "Permanent", count: 1 },
        { name: "Mary Khumalo", type: "Casual", count: 1 }
      ],
      harvestingFarmhands: [
        { name: "Joseph Tema", type: "Permanent", count: 1 },
        { name: "Grace Mbeki", type: "Casual", count: 1 },
        { name: "Lucky Mnguni", type: "Casual", count: 1 }
      ],
      historicalSuccess: "92% avg yield over 6 cycles",
      previousCycles: [
        { cycle: "2023-Q4", yield: "94%", volume: "2,350 stems" },
        { cycle: "2023-Q3", yield: "89%", volume: "2,225 stems" },
        { cycle: "2023-Q2", yield: "96%", volume: "2,400 stems" }
      ],
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
      plantedDate: "2024-01-20",
      volumePlanted: "2,200 cuttings",
      varietiesPlanted: ["Yellow Standard", "Yellow Premium"],
      projectedHarvestDate: "2024-04-15",
      projectedYield: "2,100 stems",
      actualVolume: "2,000 stems",
      supervisor: "Lisa Mokoena",
      team: ["James Dlamini", "Grace Sithole"],
      maintenance: "Michael Zulu",
      rootingStaff: [
        { name: "Carol Zwane", type: "Permanent", count: 1 }
      ],
      plantingFarmhands: [
        { name: "James Dlamini", type: "Permanent", count: 1 },
        { name: "Grace Sithole", type: "Casual", count: 1 }
      ],
      harvestingFarmhands: [
        { name: "Simon Radebe", type: "Permanent", count: 1 },
        { name: "Thabo Letsie", type: "Casual", count: 1 }
      ],
      historicalSuccess: "88% avg yield over 4 cycles",
      previousCycles: [
        { cycle: "2023-Q4", yield: "91%", volume: "2,002 stems" },
        { cycle: "2023-Q3", yield: "85%", volume: "1,870 stems" },
        { cycle: "2023-Q2", yield: "88%", volume: "1,936 stems" }
      ],
      yieldDropCauses: [
        { cause: "Nutrient deficiency", impact: "4% yield loss", value: "R 800", mitigation: "Soil amendment", cost: "R 600" }
      ]
    }
  };

  const getStageInfo = () => {
    switch (stage) {
      case "Rooting":
        return { duration: "2 weeks", color: "text-purple-600" };
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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <span className="text-muted-foreground">Planted Date</span>
                <span className="font-medium">{house.plantedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume Planted</span>
                <span className="font-medium">{house.volumePlanted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Varieties Planted</span>
                <span className="font-medium">{house.varietiesPlanted.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projected Harvest</span>
                <span className="font-medium">{house.projectedHarvestDate}</span>
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
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Assignment
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const message = `${stage} update needed for ${house.name}. Please check your assigned tasks.`;
                    const phoneNumber = "+27123456789"; // Dynamic based on supervisor
                    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
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
                <History className="h-5 w-5" />
                Historical Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Overall Success Rate</span>
                <span className="font-bold text-lg text-success">{house.historicalSuccess}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Previous Cycles:</p>
                <div className="space-y-2">
                  {house.previousCycles.map((cycle, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{cycle.cycle}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">{cycle.yield}</Badge>
                        <span className="text-muted-foreground">{cycle.volume}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Stage-Specific Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Rooting Staff ({house.rootingStaff.length})</h4>
                <div className="space-y-1">
                  {house.rootingStaff.map((staff, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{staff.name}</span>
                      <Badge variant={staff.type === "Permanent" ? "default" : "secondary"}>
                        {staff.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Planting Farmhands ({house.plantingFarmhands.length})</h4>
                <div className="space-y-1">
                  {house.plantingFarmhands.map((staff, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{staff.name}</span>
                      <Badge variant={staff.type === "Permanent" ? "default" : "secondary"}>
                        {staff.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Harvesting Farmhands ({house.harvestingFarmhands.length})</h4>
                <div className="space-y-1">
                  {house.harvestingFarmhands.map((staff, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{staff.name}</span>
                      <Badge variant={staff.type === "Permanent" ? "default" : "secondary"}>
                        {staff.type}
                      </Badge>
                    </div>
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