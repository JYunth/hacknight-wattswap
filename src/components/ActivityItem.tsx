
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ActivityItemProps {
  date: string;
  time: string;
  transactionHash: string;
  swapId: string;
  amount: number;
  price: number;
  type: 'buy' | 'sell';
  status?: 'pending' | 'completed' | 'disputed';
  className?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  date,
  time,
  transactionHash,
  swapId,
  amount,
  price,
  type,
  status = 'completed',
  className
}) => {
  const [expanded, setExpanded] = useState(false);
  const isBuy = type === 'buy';
  const isDisputed = status === 'disputed';
  
  const handleDisputeResolution = () => {
    // This would call the resolve_dispute function from the spec
    toast.success('Dispute submitted for review', {
      description: 'An admin will review your dispute shortly.'
    });
  };
  
  const handleCompleteSwap = () => {
    // This would call the complete_swap function from the spec
    toast.success('Swap completed successfully', {
      description: 'The transaction has been finalized.'
    });
  };
  
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-4 border-l-4 animate-slide-up",
        isBuy 
          ? "border-l-energy" 
          : isDisputed 
            ? "border-l-yellow-500" 
            : "border-l-danger",
        className
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div 
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-full",
              isBuy 
                ? "bg-energy/20 text-energy" 
                : isDisputed
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-danger/20 text-danger"
            )}
          >
            {isBuy ? <TrendingDown size={16} /> : 
             isDisputed ? <AlertCircle size={16} /> : <TrendingUp size={16} />}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {isDisputed 
                ? 'Disputed Transaction' 
                : isBuy ? 'Bought Energy' : 'Sold Energy'}
            </p>
            <p className="text-xs text-muted-foreground">
              {date}, {time}
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>
      
      <div className="text-xs font-mono mb-2 text-muted-foreground truncate">
        Swap ID: {swapId}
      </div>
      
      <div className="flex justify-between mt-2">
        <div className="flex items-baseline">
          <span className="text-sm font-medium">{amount}</span>
          <span className="text-xs text-muted-foreground ml-1">kWh</span>
        </div>
        <div className="flex items-baseline">
          <span className="text-sm font-medium">{price}</span>
          <span className="text-xs text-muted-foreground ml-1">μPT</span>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs font-mono mb-3 text-muted-foreground break-all">
            Transaction: {transactionHash}
          </p>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Status:</span>
              <span className={cn(
                status === 'completed' ? "text-green-500" : 
                status === 'disputed' ? "text-yellow-500" : 
                "text-blue-500"
              )}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Total Value:</span>
              <span>{(amount * price).toFixed(2)} μPT</span>
            </div>
            
            {status === 'pending' && type === 'sell' && (
              <Button 
                size="sm" 
                className="mt-2 w-full bg-energy hover:bg-energy-dark text-energy-foreground"
                onClick={handleCompleteSwap}
              >
                Complete Swap
              </Button>
            )}
            
            {status === 'pending' && type === 'buy' && (
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-2 w-full text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10"
                onClick={handleDisputeResolution}
              >
                Dispute Transaction
              </Button>
            )}
            
            {status === 'disputed' && (
              <p className="text-xs text-muted-foreground mt-2">
                This transaction is under review by an admin. You will be notified once resolved.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityItem;
