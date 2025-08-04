import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ProductTabs from "@/components/ProductTabs";
import LabourModule from "@/components/LabourModule";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">Product Lines</h1>
              <p className="text-muted-foreground">Manage cultivation, orders, and sales across all product lines</p>
            </div>
            <ProductTabs />
          </div>
        );
      case "labour":
        return <LabourModule />;
      case "finance":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground">Finance Tracker</h1>
            <p className="text-muted-foreground">Track income, expenses, and cash flow</p>
            <div className="mt-8 text-center text-muted-foreground">
              Finance module coming soon...
            </div>
          </div>
        );
      case "yields":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground">Yield & Alerts</h1>
            <p className="text-muted-foreground">Monitor crop performance and system alerts</p>
            <div className="mt-8 text-center text-muted-foreground">
              Yield tracking module coming soon...
            </div>
          </div>
        );
      case "alerts":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground">System Alerts</h1>
            <p className="text-muted-foreground">Manage and respond to farm alerts</p>
            <div className="mt-8 text-center text-muted-foreground">
              Alert management coming soon...
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 lg:ml-0">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
