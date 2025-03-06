'use client'

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityItem from '@/components/ActivityItem';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type ActivityFilter = 'all' | 'buy' | 'sell' | 'dispute';
type TimeFilter = 'day' | 'week' | 'month' | 'year';

const Activity = () => {
  const [filter, setFilter] = useState<ActivityFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const [isLoading, setIsLoading] = useState(false);
  
  // This would be replaced with actual data from the blockchain using the functions
  // from the WattSwap spec sheet like get_swaps_by_buyer and get_swaps_by_seller
  const mockActivities = [
    {
      id: 1,
      date: "2023-11-25",
      time: "14:32:05",
      swapId: "0x7F1ba4eE97123123123123123123123123123125",
      transactionHash: "0x7F1ba4eE97123123123123123123123123123123",
      amount: 10,
      price: 15,
      type: 'buy' as const,
      status: 'completed' as const
    },
    {
      id: 2,
      date: "2023-11-24",
      time: "09:15:30",
      swapId: "0x8A2cb5E98143123123123123123123123123126",
      transactionHash: "0x8A2cb5E98143123123123123123123123123123",
      amount: 5,
      price: 12,
      type: 'sell' as const,
      status: 'completed' as const
    },
    {
      id: 3,
      date: "2023-11-23",
      time: "17:45:22",
      swapId: "0x9B3dc6F10143123123123123123123123123127",
      transactionHash: "0x9B3dc6F10143123123123123123123123123123",
      amount: 7.5,
      price: 18,
      type: 'buy' as const,
      status: 'completed' as const
    },
    {
      id: 4,
      date: "2023-11-22",
      time: "11:20:15",
      swapId: "0x0C4ed7G21143123123123123123123123123128",
      transactionHash: "0x0C4ed7G21143123123123123123123123123123",
      amount: 15,
      price: 10,
      type: 'sell' as const,
      status: 'disputed' as const
    },
  ];
  
  const filteredActivities = mockActivities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });
  
  const refreshActivities = () => {
    setIsLoading(true);
    // Simulate API call to get_swaps_by_buyer and get_swaps_by_seller
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Energy Activity</h1>
          <p className="text-sm text-muted-foreground">Track your energy swaps and transactions</p>
        </div>
        
        <Button 
          onClick={refreshActivities}
          variant="outline" 
          size="sm"
          disabled={isLoading}
          className="gap-1"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </Button>
      </div>
      
      <div className="flex justify-between items-center space-x-4">
        <Tabs defaultValue="all" className="flex-1">
          <TabsList className="grid grid-cols-4 w-full glass-card">
            <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
            <TabsTrigger value="buy" onClick={() => setFilter('buy')}>Bought</TabsTrigger>
            <TabsTrigger value="sell" onClick={() => setFilter('sell')}>Sold</TabsTrigger>
            <TabsTrigger value="dispute" onClick={() => setFilter('dispute')}>Disputed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center bg-secondary/30 rounded-full px-3 py-1 gap-1 text-xs">
          <Calendar size={14} />
          <select 
            className="bg-transparent focus:outline-none"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
          >
            <option value="day">Last Day</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>
      
      {filteredActivities.length > 0 ? (
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              date={activity.date}
              time={activity.time}
              transactionHash={activity.transactionHash}
              amount={activity.amount}
              price={activity.price}
              type={activity.type}
              status={activity.status}
              swapId={activity.swapId}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center">
          <p className="text-muted-foreground mb-2">No activity found for the selected filter</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Activity;
