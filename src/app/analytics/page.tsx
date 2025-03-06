
import React from 'react';
import EnergyChart from '@/components/EnergyChart';

const Analytics = () => {
  // Mock data for power sold chart
  const powerSoldData = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 25 },
    { name: "Wed", value: 20 },
    { name: "Thu", value: 35 },
    { name: "Fri", value: 40 },
    { name: "Sat", value: 38 },
    { name: "Sun", value: 32 }
  ];
  
  // Mock data for power consumed chart
  const powerConsumedData = [
    { name: "Mon", value: 20 },
    { name: "Tue", value: 30 },
    { name: "Wed", value: 25 },
    { name: "Thu", value: 15 },
    { name: "Fri", value: 25 },
    { name: "Sat", value: 35 },
    { name: "Sun", value: 28 }
  ];
  
  // Mock data for average price chart
  const averagePriceData = [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 14 },
    { name: "Wed", value: 13 },
    { name: "Thu", value: 15 },
    { name: "Fri", value: 14 },
    { name: "Sat", value: 12 },
    { name: "Sun", value: 13 }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your energy generation and consumption</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <EnergyChart 
          data={powerSoldData} 
          title="Power Sold (kWh)" 
          color="#4ADE80" 
        />
        
        <EnergyChart 
          data={powerConsumedData} 
          title="Power Consumed (kWh)" 
          color="#F472B6" 
        />
        
        <EnergyChart 
          data={averagePriceData} 
          title="Average Price (μPT)" 
          color="#60A5FA" 
        />
      </div>
    </div>
  );
};

export default Analytics;
