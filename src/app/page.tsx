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
