'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BuyPowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerAddress?: string;
  defaultAmount?: number;
  defaultPrice?: number;
}

const BuyPowerModal: React.FC<BuyPowerModalProps> = ({
  isOpen,
  onClose,
  sellerAddress = "0x7F12dd3C0B12345678901234567890123456789",
  defaultAmount = 5,
  defaultPrice = 10
}) => {
  const [amount, setAmount] = useState(defaultAmount);
  
  if (!isOpen) return null;
  
  const totalPrice = amount * defaultPrice;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would submit the purchase to the blockchain
    toast.success('Energy purchased successfully!', {
      description: `${amount} kWh at ${defaultPrice} μPT purchased from the marketplace.`
    });
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg- backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-card rounded-2xl w-full max-w-md p-6 z-10 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Buy Power</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-secondary/80 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-3 mb-6 bg-secondary/50 rounded-lg font-mono text-xs break-all">
            {sellerAddress}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Power amount to buy
            </label>
            <div className="relative">
              <input
                type="range"
                min={1}
                max={10}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 kWh</span>
                <span>10 kWh</span>
              </div>
              <div className="mt-2 text-center">
                <span className="font-mono text-xl font-medium">{amount}</span>
                <span className="text-sm text-muted-foreground ml-1">kWh</span>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-3 mb-6 bg-secondary/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Price per kWh</span>
              <div>
                <span className="font-mono text-base font-medium">{defaultPrice}</span>
                <span className="text-xs text-muted-foreground ml-1">μPT</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total price</span>
              <div>
                <span className="font-mono text-xl font-medium">{totalPrice}</span>
                <span className="text-sm text-muted-foreground ml-1">μPT</span>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-energy hover:bg-energy-dark text-energy-foreground"
          >
            Buy
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BuyPowerModal;
