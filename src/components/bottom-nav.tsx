"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, ShoppingBag, BarChart2, Activity, User, ListChecks } from "lucide-react";

export function BottomNav() {
  const navItems = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-[#FFD700]" />, // Amour Yellow
      href: "/",
    },
    {
      title: "Marketplace",
      icon: <ShoppingBag className="h-full w-full text-[#FFD700]" />,
      href: "/marketplace",
    },
    {
      title: "My Listings",
      icon: <ListChecks className="h-full w-full text-[#FFD700]" />,
      href: "/my-listings",
    },
    {
      title: "Activity",
      icon: <Activity className="h-full w-full text-[#FFD700]" />,
      href: "/activity",
    },
    {
      title: "Analytics",
      icon: <BarChart2 className="h-full w-full text-[#FFD700]" />,
      href: "/analytics",
    },
    {
      title: "Profile",
      icon: <User className="h-full w-full text-[#FFD700]" />,
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50  bg-[#1E1E24 ] flex justify-center">
      <FloatingDock
        items={navItems}
        desktopClassName="shadow-lg border border-border/40 bg-[#1E1E24 ] rounded-xl" // Raisin Black
        mobileClassName="fixed bottom-4 right-4 shadow-lg border border-border/40 bg-[#1E1E24 ] rounded-xl"
      />
    </div>
  );
}
// export default BottomNav;