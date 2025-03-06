export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to<span className="font-gothic font-[#FFB400] text-transparent bg-clip-text bg-gradient-to-r from-[#FFB400] to-[#F0C419]"> WattSwap</span></h1>
        <p className="text-lg mb-8">
          The decentralized marketplace for energy trading
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Energy Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Available Energy</span>
                <span className="font-medium">20.2 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Energy Capacity</span>
                <span className="font-medium">50 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Current Rate</span>
                <span className="font-medium">0.12 ETH/kWh</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-primary text-primary-foreground p-3 rounded-md hover:opacity-90 transition-opacity">
                Buy Energy
              </button>
              <button className="bg-secondary text-secondary-foreground p-3 rounded-md hover:opacity-90 transition-opacity">
                Sell Energy
              </button>
              <a href="/my-listings" className="bg-muted text-muted-foreground p-3 rounded-md hover:opacity-90 transition-opacity text-center">
                My Listings
              </a>
              <a href="/analytics" className="bg-muted text-muted-foreground p-3 rounded-md hover:opacity-90 transition-opacity text-center">
                Analytics
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
