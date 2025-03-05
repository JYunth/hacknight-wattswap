"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, ShoppingBag, BarChart2, Activity, User, ListChecks } from "lucide-react";

export function BottomNav() {
  const navItems = [
    {
      title: "Home",
      icon: <Home className="h-full w-full" />,
      href: "/",
    },
    {
      title: "Marketplace",
      icon: <ShoppingBag className="h-full w-full" />,
      href: "/marketplace",
    },
    {
      title: "My Listings",
      icon: <ListChecks className="h-full w-full" />,
      href: "/my-listings",
    },
    {
      title: "Activity",
      icon: <Activity className="h-full w-full" />,
      href: "/activity",
    },
    {
      title: "Analytics",
      icon: <BarChart2 className="h-full w-full" />,
      href: "/analytics",
    },
    {
      title: "Profile",
      icon: <User className="h-full w-full" />,
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <FloatingDock 
        items={navItems} 
        desktopClassName="shadow-lg border border-border/40"
        mobileClassName="fixed bottom-4 right-4 shadow-lg border border-border/40"
      />
    </div>
  );
}