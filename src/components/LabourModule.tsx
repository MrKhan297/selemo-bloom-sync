import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HappinessIndicator, TeamHappinessOverview } from "@/components/HappinessIndicator";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  Plus,
  Search,
  Calendar,
  DollarSign,
  UserCheck,
  AlertCircle,
  FileText,
  Camera,
  Heart
} from "lucide-react";

const LabourModule = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const workers = [
    {
      id: "EMP001",
      name: "Thabo Mthembu",
      type: "Permanent",
      supervisor: "John Smith", 
      photo: "/api/placeholder/40/40",
      payRate: "R 180/day",
      status: "active",
      hoursToday: 6.5,
      taskToday: "Greenhouse maintenance - Block A",
      happiness: {
        currentRating: 4,
        lastUpdated: "2024-01-15",
        factors: { workload: 4, supervisor: 5, compensation: 3, workEnvironment: 4 },
        trend: "stable" as const
      }
    },
    {
      id: "EMP002", 
      name: "Sarah Ndlovu",
      type: "Seasonal",
      supervisor: "Mary Johnson",
      photo: "/api/placeholder/40/40", 
      payRate: "R 25/hour",
      status: "active",
      hoursToday: 8,
      taskToday: "Harvesting chrysanthemums",
      happiness: {
        currentRating: 3.5,
        lastUpdated: "2024-01-14",
        factors: { workload: 3, supervisor: 4, compensation: 3, workEnvironment: 4 },
        trend: "declining" as const
      }
    },
    {
      id: "EMP003",
      name: "Michael Zulu",
      type: "Casual",
      supervisor: "John Smith",
      photo: "/api/placeholder/40/40",
      payRate: "R 200/day", 
      status: "absent",
      hoursToday: 0,
      taskToday: "Packaging operations",
      happiness: {
        currentRating: 2.5,
        lastUpdated: "2024-01-10",
        factors: { workload: 2, supervisor: 3, compensation: 2, workEnvironment: 3 },
        trend: "declining" as const
      }
    }
  ];

  const todaysAttendance = [
    { time: "06:00", worker: "Thabo Mthembu", task: "Irrigation check", status: "present" },
    { time: "06:30", worker: "Sarah Ndlovu", task: "Harvest prep", status: "present" },
    { time: "07:00", worker: "Michael Zulu", task: "Packaging", status: "absent" },
    { time: "07:30", worker: "Lisa Molefe", task: "Quality control", status: "present" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": case "present": return "bg-success text-white";
      case "absent": return "bg-danger text-white";
      case "late": return "bg-warning text-foreground";
      default: return "bg-muted";
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">12 Permanent, 8 Seasonal, 4 Casual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-xs text-success">87.5% attendance rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">164</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 4,920</div>
            <p className="text-xs text-muted-foreground">Labour cost today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Happiness</CardTitle>
            <Heart className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3.3/5</div>
            <p className="text-xs text-muted-foreground">Average team morale</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Workers */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Workers Today</CardTitle>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Worker
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workers.map((worker) => (
              <div key={worker.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={worker.photo} alt={worker.name} />
                    <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium text-foreground">{worker.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {worker.id} • {worker.type}</p>
                    <p className="text-sm text-muted-foreground">Supervisor: {worker.supervisor}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getStatusColor(worker.status)}>
                      {worker.status}
                    </Badge>
                    <span className="text-sm font-medium">{worker.payRate}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <HappinessIndicator 
                      worker={{
                        workerId: worker.id,
                        workerName: worker.name,
                        ...worker.happiness
                      }} 
                      isCompact={true} 
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {worker.hoursToday}h today • {worker.taskToday}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Attendance Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Today's Attendance Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaysAttendance.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-primary">{entry.time}</div>
                  <div>
                    <p className="font-medium text-foreground">{entry.worker}</p>
                    <p className="text-sm text-muted-foreground">{entry.task}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(entry.status)}>
                  {entry.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Happiness Overview */}
      <TeamHappinessOverview />
    </div>
  );

  const renderWorkerDetails = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Worker Registry</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input placeholder="Search workers..." className="pl-9 w-64" />
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Worker
          </Button>
        </div>
      </div>

      {/* Worker Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Worker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Details */}
          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Personal Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="idNumber">ID / Passport Number</Label>
                <Input id="idNumber" placeholder="Enter ID number" />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div>
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" placeholder="+27..." />
              </div>
              <div>
                <Label htmlFor="nextOfKin">Next of Kin</Label>
                <Input id="nextOfKin" placeholder="Emergency contact" />
              </div>
              <div>
                <Label htmlFor="bankDetails">Bank Details</Label>
                <Input id="bankDetails" placeholder="Account number" />
              </div>
            </div>
          </div>

          {/* Employment Info */}
          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Employment Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employmentType">Employment Type</Label>
                <select className="w-full p-2 border rounded-md" id="employmentType">
                  <option>Permanent</option>
                  <option>Seasonal</option>
                  <option>Casual</option>
                </select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div>
                <Label htmlFor="supervisor">Assigned Supervisor</Label>
                <select className="w-full p-2 border rounded-md" id="supervisor">
                  <option>John Smith</option>
                  <option>Mary Johnson</option>
                  <option>Peter Williams</option>
                </select>
              </div>
              <div>
                <Label htmlFor="payRate">Pay Rate</Label>
                <Input id="payRate" placeholder="R 180/day or R 25/hour" />
              </div>
            </div>
          </div>

          <Button className="w-full">Register Worker</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderWorkLog = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Daily Work Log</h3>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Log Work Entry
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Record Work Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="worker">Select Worker</Label>
              <select className="w-full p-2 border rounded-md" id="worker">
                <option>Thabo Mthembu (EMP001)</option>
                <option>Sarah Ndlovu (EMP002)</option>
                <option>Michael Zulu (EMP003)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <Label htmlFor="task">Task / Area Worked</Label>
              <Input id="task" placeholder="e.g., Greenhouse maintenance - Block A" />
            </div>
            <div>
              <Label htmlFor="hours">Hours Worked</Label>
              <Input id="hours" type="number" placeholder="8.0" step="0.5" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Additional notes about the work performed..." />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="supervisorSignoff" />
              <Label htmlFor="supervisorSignoff">Supervisor Sign-off</Label>
            </div>
            <Button>Save Work Entry</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Work Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Work Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Thabo Mthembu</p>
                  <p className="text-sm text-muted-foreground">Greenhouse maintenance - Block A</p>
                  <p className="text-xs text-muted-foreground">Today, 8 hours</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Labour & Workforce</h1>
          <p className="text-muted-foreground">Manage workers, attendance, and payroll</p>
        </div>
        <Badge className="bg-primary text-primary-foreground">
          24 Active Workers
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workers">Worker Details</TabsTrigger>
          <TabsTrigger value="worklog">Work Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          {renderOverview()}
        </TabsContent>
        
        <TabsContent value="workers" className="mt-6">
          {renderWorkerDetails()}
        </TabsContent>
        
        <TabsContent value="worklog" className="mt-6">
          {renderWorkLog()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LabourModule;