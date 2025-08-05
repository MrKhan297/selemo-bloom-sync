import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import GreenhouseDetail from "./GreenhouseDetail";
import PackhouseDetail from "./PackhouseDetail";
import { 
  Flower, 
  Sprout, 
  Wheat, 
  Package, 
  Plus,
  Eye,
  Calendar,
  Thermometer,
  Droplets,
  TrendingUp,
  MessageCircle
} from "lucide-react";

const ProductTabs = () => {
  const [currentView, setCurrentView] = useState<"overview" | "greenhouse" | "packhouse">("overview");
  const [selectedStage, setSelectedStage] = useState<string>("");

  if (currentView === "greenhouse") {
    return <GreenhouseDetail stage={selectedStage} onBack={() => setCurrentView("overview")} />;
  }

  if (currentView === "packhouse") {
    return <PackhouseDetail onBack={() => setCurrentView("overview")} />;
  }
  const products = [
    {
      id: "chrysanthemum",
      name: "Chrysanthemum",
      icon: Flower,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      id: "vertical",
      name: "Vertical Farming", 
      icon: Sprout,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "traditional",
      name: "Traditional Farming",
      icon: Wheat,
      color: "text-amber-600", 
      bgColor: "bg-amber-50"
    },
    {
      id: "processing",
      name: "Frozen Fries",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  const stemData = {
    chrysanthemum: [
      {
        id: "STM-001",
        dateReceived: "2024-01-20",
        product: "Chrysanthemum",
        variety: "White Premium",
        supplier: "Elite Propagation Ltd",
        quantity: "3,000 cuttings",
        quality: "Grade A",
        status: "processed"
      },
      {
        id: "STM-002", 
        dateReceived: "2024-01-18",
        product: "Chrysanthemum",
        variety: "Yellow Standard",
        supplier: "Premium Stems Co",
        quantity: "2,500 cuttings",
        quality: "Grade A",
        status: "rooting"
      }
    ]
  };

  const orderData = {
    chrysanthemum: [
      { 
        id: "CHR-001", 
        client: "Woolworths", 
        contact: "+27 11 123 4567",
        quantity: "2,500 stems",
        type: "White Premium",
        price: "R 25,000",
        delivery: "2024-02-15",
        status: "confirmed"
      },
      {
        id: "CHR-002",
        client: "Pick n Pay",
        contact: "+27 21 987 6543", 
        quantity: "1,800 stems",
        type: "Mixed Colors",
        price: "R 18,000",
        delivery: "2024-02-18",
        status: "pending"
      }
    ]
  };

  const cultivationData = {
    chrysanthemum: [
      {
        stage: "Rooting",
        progress: 100,
        date: "2024-01-15",
        notes: "All cuttings rooted successfully (2 weeks)",
        status: "completed"
      },
      {
        stage: "Planting", 
        progress: 100,
        date: "2024-01-25",
        notes: "Planted in greenhouse Block A",
        status: "completed"
      },
      {
        stage: "Growing",
        progress: 75,
        date: "Ongoing",
        notes: "Good growth rate, optimal conditions (12 weeks total)",
        status: "in-progress"
      },
      {
        stage: "Harvest",
        progress: 0,
        date: "2024-02-14",
        notes: "Scheduled for harvest",
        status: "pending"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-success text-white";
      case "pending": return "bg-warning text-foreground";
      case "completed": return "bg-success text-white";
      case "in-progress": return "bg-primary text-white";
      default: return "bg-muted";
    }
  };

  const renderStemReceived = (productId: string) => {
    const stems = stemData[productId as keyof typeof stemData] || [];
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Stem Material Received</h3>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Log Receipt
          </Button>
        </div>
        
        <div className="grid gap-4">
          {stems.map((stem) => (
            <Card key={stem.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-medium text-foreground">{stem.supplier}</p>
                  <p className="text-sm text-muted-foreground">{stem.variety}</p>
                  <p className="text-xs text-primary font-medium">Batch #{stem.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Quantity & Quality</p>
                  <p className="font-medium">{stem.quantity}</p>
                  <p className="text-sm text-success">{stem.quality}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Date Received</p>
                  <p className="font-medium">{stem.dateReceived}</p>
                </div>
                
                <div className="flex justify-end">
                  <Badge className={getStatusColor(stem.status)}>
                    {stem.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderOrderIntake = (productId: string) => {
    const orders = orderData[productId as keyof typeof orderData] || [];
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Order Intake</h3>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        </div>
        
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium text-foreground">{order.client}</p>
                  <p className="text-sm text-muted-foreground">{order.contact}</p>
                  <p className="text-xs text-primary font-medium">Order #{order.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Quantity & Type</p>
                  <p className="font-medium">{order.quantity}</p>
                  <p className="text-sm text-muted-foreground">{order.type}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg text-foreground">{order.price}</p>
                    <p className="text-sm text-muted-foreground">Due: {order.delivery}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderCultivationTracker = (productId: string) => {
    const stages = cultivationData[productId as keyof typeof cultivationData] || [];
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Cultivation Progress</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => {
                const message = "Daily farm update needed. Please check your assigned tasks.";
                const phoneNumber = "+27123456789"; // This would be dynamic based on team member
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Send WhatsApp
            </Button>
            {["Rooting", "Planting", "Growing", "Harvest"].map((stage) => (
              <Button
                key={stage}
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  setSelectedStage(stage);
                  setCurrentView("greenhouse");
                }}
              >
                <Eye className="h-4 w-4" />
                View {stage}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid gap-4">
          {stages.map((stage, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">
                  {stage.stage}
                </h4>
                <Badge className={getStatusColor(stage.status)}>
                  {stage.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{stage.progress}%</span>
                  </div>
                  <Progress value={stage.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{stage.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Notes</p>
                    <p className="font-medium">{stage.notes}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderPackhouseTracker = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Packhouse & Storage</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => setCurrentView("packhouse")}
        >
          <Eye className="h-4 w-4" />
          View Packhouse
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Thermometer className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Cold Room Status</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temperature</span>
              <span className="font-medium">2.5°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Humidity</span>
              <span className="font-medium">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Capacity Used</span>
              <span className="font-medium">78%</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Package className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Processing Queue</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending QC</span>
              <Badge variant="outline">12 batches</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ready to Ship</span>
              <Badge className="bg-success text-white">8 batches</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">QC Failed</span>
              <Badge variant="destructive">2 batches</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSalesRecord = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sales Performance</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <h4 className="font-medium">This Month</h4>
          </div>
          <p className="text-2xl font-bold text-foreground">R 187,500</p>
          <p className="text-sm text-success">+15.3% vs last month</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Orders Fulfilled</h4>
          </div>
          <p className="text-2xl font-bold text-foreground">24</p>
          <p className="text-sm text-muted-foreground">Out of 26 orders</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <h4 className="font-medium">Avg. Price/Stem</h4>
          </div>
          <p className="text-2xl font-bold text-foreground">R 10.25</p>
          <p className="text-sm text-success">+R 0.75 premium</p>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <Tabs defaultValue="chrysanthemum" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          {products.map((product) => (
            <TabsTrigger 
              key={product.id} 
              value={product.id}
              className="flex flex-col gap-2 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <product.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{product.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {products.map((product) => (
          <TabsContent key={product.id} value={product.id} className="mt-6">
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${product.bgColor}`}>
                  <product.icon className={`h-6 w-6 ${product.color}`} />
                </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
                <p className="text-muted-foreground">Production & Sales Overview</p>
              </div>
            </div>
            
            {renderStemReceived(product.id)}
            {renderOrderIntake(product.id)}
            {renderCultivationTracker(product.id)}
            {renderPackhouseTracker()}
            {renderSalesRecord()}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductTabs;