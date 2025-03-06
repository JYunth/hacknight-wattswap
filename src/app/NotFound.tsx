
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bolt } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="h-24 w-24 rounded-full glass-card flex items-center justify-center mb-6 animate-float">
        <Bolt className="h-12 w-12 text-energy" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Connection Lost</p>
      
      <Button 
        onClick={() => navigate('/')} 
        className="bg-energy hover:bg-energy-dark text-energy-foreground"
      >
        Reconnect to Grid
      </Button>
    </div>
  );
};

export default NotFound;
