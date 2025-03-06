"use client";

//import { usePathname } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import ShinyText from '@/components/ui/ShinyText';

export function Header() {
 // const pathname = usePathname();
  
  // Function to get the current page title
 

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container flex h-14 items-center justify-between">
    {/* Left Side - Logo */}
    <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Zap className="h-6 w-6 text-yellow-500" />
        <span className="font-bold text-xl">WattSwap</span>
      </Link>
    </div>

    {/* Right Side - Theme Toggle & Connect Wallet */}
    <div className="flex items-center space-x-4">
      <ThemeToggle />
      <ShinyText text="Connect Wallet" disabled={false} speed={2} className="custom-class" />
    </div>
  </div>
</header>

  );
}