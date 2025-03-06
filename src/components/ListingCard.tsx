'use client'

import React from 'react';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  id: number;
  seller: string;
  amount: number;
  price: number;
  unit: string;
  onBuy?: () => void;
  isPast?: boolean;
  className?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  seller,
  amount,
  price,
  unit,
  onBuy,
  isPast = false,
  className
}) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-4 animate-slide-up",
        isPast ? "opacity-70" : "",
        className
      )}
      style={{ animationDelay: `${id * 50}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-muted-foreground">#{id}</span>
        {!isPast && (
          <div className="h-2 w-2 rounded-full bg-energy animate-pulse" />
        )}
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <div className="text-xs font-mono truncate max-w-[180px]" title={seller}>
          {seller.substring(0, 8)}...{seller.substring(seller.length - 8)}
        </div>
        
        <div className="flex items-baseline">
          <span className="text-base font-semibold">{amount}</span>
          <span className="text-xs text-muted-foreground ml-1">{unit}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <span className="text-base font-semibold">{price}</span>
          <span className="text-xs text-muted-foreground ml-1">μPT</span>
        </div>
        
        {!isPast && onBuy && (
          <button 
            onClick={onBuy}
            className="text-xs font-medium py-1 px-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
