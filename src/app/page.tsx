"use client";

import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import SlidingNumber from "@/components/motion-primitives/sliding-number";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const words = [{ text: "IntelliGrid-india-south", className: "text-[#77DD77] dark:text-[#77DD77]" }];

  const [walletBalance, setWalletBalance] = useState(0);
  const [energyInBank, setEnergyInBank] = useState(0);
  const [totalCapacity, setTotalCapacity] = useState(0);

  useEffect(() => {
    const duration = 2000; // 4 seconds total duration
    const steps = duration / 50; // 50ms per step
    const walletIncrement = 20.2 / steps;
    const energyIncrement = 27 / steps;
    const capacityIncrement = 50 / steps;
  
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setWalletBalance((prev) => (counter < steps ? prev + walletIncrement : 20.2));
      setEnergyInBank((prev) => (counter < steps ? prev + energyIncrement : 27));
      setTotalCapacity((prev) => (counter < steps ? prev + capacityIncrement : 50));
  
      if (counter >= steps) clearInterval(interval);
    }, 50);
  
    return () => clearInterval(interval);
  }, []);
  
  const handleNavigate = (path: string) => router.push(path);

  return (
<<<<<<< HEAD
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to<span className="font-gothic font-[#FFB400] text-transparent bg-clip-text bg-gradient-to-r from-[#FFB400] to-[#F0C419]"> WattSwap</span></h1>
        <p className="text-lg mb-8">
          The decentralized marketplace for energy trading
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Energy Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Available Energy</span>
                <span className="font-medium">20.2 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Energy Capacity</span>
                <span className="font-medium">50 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Current Rate</span>
                <span className="font-medium">0.12 ETH/kWh</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-primary text-primary-foreground p-3 rounded-md hover:opacity-90 transition-opacity">
                Buy Energy
              </button>
              <button className="bg-secondary text-secondary-foreground p-3 rounded-md hover:opacity-90 transition-opacity">
                Sell Energy
              </button>
              <a href="/my-listings" className="bg-muted text-muted-foreground p-3 rounded-md hover:opacity-90 transition-opacity text-center">
                My Listings
              </a>
              <a href="/analytics" className="bg-muted text-muted-foreground p-3 rounded-md hover:opacity-90 transition-opacity text-center">
                Analytics
              </a>
            </div>
          </div>
=======
    <div className="container mx-auto px-6 py-12 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white">
          Welcome to <span className="text-[#FFB400]">Jhyenth</span>
        </h1>
        <div className="text-xl font-medium mt-2 flex justify-center">
          <span>Connected to </span>
          <span className="inline-block ml-2">
            <TypewriterEffect words={words} />
          </span>
>>>>>>> frontend
        </div>
      </div>

      {/* Wallet & Energy Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center w-full max-w-4xl">
        {[
          { value: walletBalance, label: "Wallet Balance", unit: "APT" },
          { value: energyInBank, label: "Energy in Bank", unit: "kWh" },
          { value: totalCapacity, label: "Total Capacity", unit: "kWh" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.0002 }}
            className="bg-[#1E1E24] p-8 rounded-xl shadow-lg flex flex-col items-center justify-center"
          >
            <div className="text-3xl font-bold text-[#FFB400] flex items-center">
              <SlidingNumber value={parseFloat(item.value.toFixed(1))} /> <span className="ml-1">{item.unit}</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">{item.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-8">
  {["Card 1", "Card 2", "Card 3"].map((title, index) => (
    <SpotlightCard 
      key={index} 
      className="[#1E1E24] w-64 h-64 md:w-72 md:h-72 flex flex-col items-center justify-center gap-4 rounded-xl shadow-lg"
      spotlightColor="rgba(255, 191, 0, 0.25)" // Amber Yellow Effect
      // spotlightColor="rgba(255, 255, 255, 0.25)" // White Effect
    >
      <h2 className="text-white text-xl font-bold">{title}</h2>
      <button className="px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition">
        Click Me
      </button>
    </SpotlightCard>
  ))}
</div>
    </div>
  );
}
