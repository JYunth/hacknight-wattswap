'use client'
import React, { useState } from 'react';
import ListingCard from '@/components/ListingCard';
import BuyPowerModal from '@/components/BuyPowerModal';

const Marketplace = () => {
  const [selectedListing, setSelectedListing] = useState<number | null>(null);
  
  // Mock data for listings
  const marketListings = [
    {
      id: 1,
      seller: "0x7F1ba4eE9712312312312312312312312312312",
      amount: 10,
      price: 15,
      unit: "kWh"
    },
    {
      id: 2,
      seller: "0x8A2cb5E9814312312312312312312312312312",
      amount: 5,
      price: 12,
      unit: "kWh"
    },
    {
      id: 3,
      seller: "0x9B3dc6F1014312312312312312312312312312",
      amount: 7.5,
      price: 18,
      unit: "kWh"
    },
    {
      id: 4,
      seller: "0x0C4ed7G2114312312312312312312312312312",
      amount: 15,
      price: 10,
      unit: "kWh"
    },
  ];
  
  const handleBuy = (id: number) => {
    setSelectedListing(id);
  };
  
  const selectedListingData = selectedListing ? 
    marketListings.find(listing => listing.id === selectedListing) : 
    undefined;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Marketplace</h1>
          <p className="text-sm text-muted-foreground">Available energy for purchase</p>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="text-xs font-mono py-1 px-3 bg-secondary/80 rounded-full backdrop-blur-sm">
            <span className="mr-1">25.3</span>
            <span className="text-muted-foreground">kWh</span>
          </div>
          <div className="text-xs font-mono py-1 px-3 bg-secondary/80 rounded-full backdrop-blur-sm">
            <span className="mr-1">27</span>
            <span className="text-muted-foreground">kWh</span>
          </div>
          <div className="text-xs font-mono py-1 px-3 bg-secondary/80 rounded-full backdrop-blur-sm">
            <span className="mr-1">80</span>
            <span className="text-muted-foreground">kWh</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-1 mb-2">
        <h2 className="text-xs text-muted-foreground font-medium">IntellGrid-US-East: Active Listings</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {marketListings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            seller={listing.seller}
            amount={listing.amount}
            price={listing.price}
            unit={listing.unit}
            onBuy={() => handleBuy(listing.id)}
          />
        ))}
      </div>
      
      <BuyPowerModal 
        isOpen={selectedListing !== null} 
        onClose={() => setSelectedListing(null)}
        sellerAddress={selectedListingData?.seller}
        defaultAmount={selectedListingData?.amount}
        defaultPrice={selectedListingData?.price}
      />
    </div>
  );
};

export default Marketplace;
