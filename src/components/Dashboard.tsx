import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package, 
  AlertTriangle,
  Plus,
  UserPlus,
  ShoppingCart,
  Map,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck
} from "lucide-react";

const Dashboard = () => {
  const kpis = [
    {
      title: "Revenue",
      value: "R 245,850",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Net Profit",
      value: "R 98,340",
      change: "+8.2%", 
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Labour Cost %",
      value: "32%",
      change: "-2.1%",
      trend: "down",
      icon: Users,
    },
    {
      title: "Order Pipeline",
      value: "47",
      change: "+15",
      trend: "up",
      icon: Package,
    },
  ];

  const quickActions = [
    { icon: Plus, label: "Add Order", variant: "default" as const },
    { icon: UserPlus, label: "Record Labour", variant: "secondary" as const },
    { icon: ShoppingCart, label: "Log Purchase", variant: "secondary" as const },
    { icon: Map, label: "Farm Map", variant: "outline" as const },
  ];

  const alerts = [
    { type: "critical", message: "Irrigation system maintenance overdue - Block C", time: "2h ago" },
    { type: "warning", message: "Low inventory: Fertilizer NPK 12:12:17", time: "4h ago" },
    { type: "info", message: "Harvest ready: Chrysanthemum Block A", time: "6h ago" },
  ];

  const todaysTasks = [
    { task: "Quality inspection - Block B", status: "pending", time: "09:00" },
    { task: "Delivery to Woolworths", status: "completed", time: "11:30" },
    { task: "Labour shift handover", status: "in-progress", time: "14:00" },
    { task: "Cold room temperature check", status: "pending", time: "16:00" },
  ];

  const getStatusColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-danger text-white";
      case "warning": return "bg-warning text-foreground";
      case "info": return "bg-success text-white";
      default: return "bg-muted";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "in-progress": return "text-warning";
      case "pending": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getTaskIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "in-progress": return Clock;
      case "pending": return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farm Dashboard</h1>
          <p className="text-muted-foreground">Selemo Valley Operations Overview</p>
        </div>
        <Badge variant="outline" className="bg-success text-white border-success">
          All Systems Operational
        </Badge>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className={`text-xs ${kpi.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button 
                key={index}
                variant={action.variant}
                className="h-20 flex flex-col gap-2 hover:shadow-md transition-shadow"
              >
                <action.icon className="h-6 w-6" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Tasks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className={`h-3 w-3 rounded-full ${getStatusColor(alert.type)} mt-1`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysTasks.map((task, index) => {
              const StatusIcon = getTaskIcon(task.status);
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                  <StatusIcon className={`h-4 w-4 ${getTaskStatusColor(task.status)}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{task.task}</p>
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {task.status}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Delivery & Dispatch Schedule */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Delivery & Dispatch Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-foreground">Woolworths - Fresh Chrysanthemums</p>
                <p className="text-sm text-muted-foreground">Order #WW-2024-001 • 2,500 stems</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">Tomorrow 08:00</p>
                <Badge className="bg-success text-white">Ready for Dispatch</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-foreground">Pick n Pay - Mixed Bouquets</p>
                <p className="text-sm text-muted-foreground">Order #PNP-2024-015 • 180 bouquets</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">Tomorrow 14:00</p>
                <Badge variant="outline" className="border-warning text-warning">In Preparation</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;