"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-2xl font-bold">
              WS
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">User Profile</h1>
              <p className="text-muted-foreground">0x1234...5678</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-muted rounded-full text-sm">Energy Producer</span>
                <span className="px-3 py-1 bg-muted rounded-full text-sm">Verified</span>
                <span className="px-3 py-1 bg-muted rounded-full text-sm">Premium</span>
              </div>
            </div>
            <div>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Energy Assets</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Solar Panels</span>
                <span className="font-medium">5 kW capacity</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Battery Storage</span>
                <span className="font-medium">13.5 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Smart Meter</span>
                <span className="font-medium">Installed</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Account Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Member Since</span>
                <span className="font-medium">March 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Transactions</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Reputation Score</span>
                <span className="font-medium">4.8/5.0</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
              <span>Notifications</span>
              <button className="w-10 h-5 bg-primary rounded-full relative">
                <span className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
              <span>Auto-trading</span>
              <button className="w-10 h-5 bg-muted rounded-full relative">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
              <span>Two-factor Authentication</span>
              <button className="w-10 h-5 bg-primary rounded-full relative">
                <span className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
              <span>Dark Mode</span>
              <button 
                onClick={toggleTheme}
                className={`w-10 h-5 ${mounted && theme === "dark" ? "bg-primary" : "bg-muted"} rounded-full relative transition-colors`}
              >
                <span 
                  className={`absolute ${mounted && theme === "dark" ? "right-1" : "left-1"} top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-all`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}