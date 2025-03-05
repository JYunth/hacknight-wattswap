"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  
  // Function to get the current page title
  const getPageTitle = () => {
    if (pathname === "/") return "Home";
    
    // Remove the leading slash and capitalize the first letter
    const title = pathname.substring(1);
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span className="font-bold text-xl">WattSwap</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <span className="text-foreground/60">{getPageTitle()}</span>
          </nav>
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}