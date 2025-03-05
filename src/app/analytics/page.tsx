export default function Analytics() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Energy Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Energy Consumption</h2>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Consumption Chart</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Daily Average</span>
                <span className="font-medium">12.4 kWh</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Total</span>
                <span className="font-medium">86.8 kWh</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Energy Production</h2>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Production Chart</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Daily Average</span>
                <span className="font-medium">18.2 kWh</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Total</span>
                <span className="font-medium">127.4 kWh</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Trading History</h2>
          <div className="aspect-[2/1] bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Trading History Chart</p>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">Total Sold</p>
              <p className="text-2xl font-semibold">245 kWh</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">Total Bought</p>
              <p className="text-2xl font-semibold">178 kWh</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p className="text-2xl font-semibold">+0.32 ETH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}