export default function Marketplace() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Energy Marketplace</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="bg-card p-6 rounded-lg shadow-sm border mb-6">
              <h2 className="text-xl font-semibold mb-4">Available Listings</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Listing #{item}</p>
                      <p className="text-sm text-muted-foreground">10 kWh available</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">0.15 ETH/kWh</p>
                      <button className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-md mt-2">
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-card p-6 rounded-lg shadow-sm border sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Market Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active Listings</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg. Price</span>
                  <span className="font-medium">0.14 ETH/kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>24h Volume</span>
                  <span className="font-medium">450 kWh</span>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-primary text-primary-foreground p-3 rounded-md hover:opacity-90 transition-opacity">
                    Create Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}