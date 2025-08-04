import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Flower,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Menu,
  Settings,
  Bell,
  LogOut,
  User
} from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "products", label: "Product Lines", icon: Flower },
    { id: "labour", label: "Labour & Workforce", icon: Users },
    { id: "finance", label: "Finance Tracker", icon: DollarSign },
    { id: "yields", label: "Yield & Alerts", icon: TrendingUp },
    { id: "alerts", label: "System Alerts", icon: AlertTriangle },
    { id: "admin", label: "Admin Control", icon: Settings },
  ];

  const NavItems = () => (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={activeSection === item.id ? "default" : "ghost"}
          className="w-full justify-start gap-3 mb-2"
          onClick={() => {
            onSectionChange(item.id);
            setIsOpen(false);
          }}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
          {item.id === "alerts" && (
            <Badge variant="destructive" className="ml-auto">3</Badge>
          )}
        </Button>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/1cadcdbc-81cd-4843-ae86-84daa7f0a5d7.png" alt="Danfer Farm" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Danfer Farm</h1>
              <p className="text-sm text-muted-foreground">Farm Management</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <NavItems />
        </nav>
        
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <img src="/lovable-uploads/1cadcdbc-81cd-4843-ae86-84daa7f0a5d7.png" alt="Danfer Farm" className="h-6 w-6" />
          <div>
            <h1 className="text-lg font-bold text-foreground">Danfer Farm</h1>
            <p className="text-xs text-muted-foreground">Farm Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Admin User</h2>
                    <p className="text-sm text-muted-foreground">Farm Manager</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <NavItems />
              </nav>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default Navigation;