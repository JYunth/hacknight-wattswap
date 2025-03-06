import React from 'react';
import { Badge } from '@/components/ui/badge';

type ActivityItemProps = {
  date: string;
  time: string;
  transactionHash: string;
  amount: number;
  price: number;
  type: 'buy' | 'sell';
  status: 'completed' | 'pending' | 'disputed';
  swapId: string;
};

const ActivityItem = ({
  date,
  time,
  transactionHash,
  amount,
  price,
  type,
  status,
  swapId,
}: ActivityItemProps) => {
  return (
    <div className="glass-card rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant={type === 'buy' ? 'default' : 'secondary'}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {date} • {time}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium truncate">
            Swap ID: <span className="text-muted-foreground">{swapId}</span>
          </p>
          <p className="text-sm truncate">
            TX: <span className="text-muted-foreground">{transactionHash}</span>
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2 sm:w-auto w-full">
        <div className="text-right">
          <p className="font-semibold">{amount} kWh</p>
          <p className="text-sm text-muted-foreground">${price}/kWh</p>
        </div>
        <Badge 
          variant={
            status === 'completed' ? 'default' :
            status === 'pending' ? 'outline' : 'destructive'
          }
          className="self-end"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
    </div>
  );
};

export default ActivityItem;