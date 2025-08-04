import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, AlertCircle, Truck, ArrowLeft } from "lucide-react";

interface PackhouseDetailProps {
  onBack: () => void;
}

const PackhouseDetail = ({ onBack }: PackhouseDetailProps) => {
  const stockData = [
    {
      id: "CHR-B001",
      variety: "White Premium Chrysanthemum",
      quantity: "1,500 stems",
      storageDate: "2024-02-10",
      storageLife: "14 days",
      remainingDays: 8,
      status: "good",
      location: "Cold Room A1"
    },
    {
      id: "CHR-B002", 
      variety: "Yellow Standard Chrysanthemum",
      quantity: "1,200 stems",
      storageDate: "2024-02-08",
      storageLife: "14 days",
      remainingDays: 6,
      status: "warning",
      location: "Cold Room A2"
    },
    {
      id: "CHR-B003",
      variety: "Mixed Colors Premium",
      quantity: "800 stems",
      storageDate: "2024-02-05",
      storageLife: "14 days", 
      remainingDays: 3,
      status: "critical",
      location: "Cold Room B1"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-success text-white";
      case "warning": return "bg-warning text-foreground";
      case "critical": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good": return <Package className="h-4 w-4" />;
      case "warning": return <AlertCircle className="h-4 w-4" />;
      case "critical": return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Packhouse Stock Management</h2>
          <p className="text-muted-foreground">Monitor storage conditions and inventory lifecycle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Stock</p>
              <p className="text-xl font-bold">3,500 stems</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-warning" />
            <div>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
              <p className="text-xl font-bold">800 stems</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Ready to Ship</p>
              <p className="text-xl font-bold">2,700 stems</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Stock Breakdown</h3>
        
        <div className="grid gap-4">
          {stockData.map((batch) => (
            <Card key={batch.id} className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(batch.status)}
                    <span className="font-medium">Batch #{batch.id}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{batch.variety}</p>
                  <p className="text-sm font-medium">{batch.quantity}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Storage Location</p>
                  <p className="font-medium">{batch.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Stored: {batch.storageDate}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Storage Life</p>
                  <p className="font-medium">{batch.storageLife}</p>
                  <p className="text-sm">
                    <span className={batch.remainingDays <= 3 ? "text-destructive font-medium" : 
                                   batch.remainingDays <= 6 ? "text-warning font-medium" : 
                                   "text-success"}>
                      {batch.remainingDays} days remaining
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(batch.status)}>
                    {batch.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackhouseDetail;