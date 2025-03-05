export default function MyListings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Listings</h1>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Active Listings</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors flex items-center gap-1">
                <span className="text-lg">+</span> Listing
              </button>
              <button className="px-4 py-1.5 rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-colors">
                0xc227...
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left pb-2 font-medium">Listing ID</th>
                  <th className="text-left pb-2 font-medium">Amount</th>
                  <th className="text-left pb-2 font-medium">Price</th>
                  <th className="text-right pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/20">
                  <td className="py-4">2</td>
                  <td className="py-4">15 kWh</td>
                  <td className="py-4">15 APT</td>
                  <td className="py-4 text-right">
                    <button className="px-3 py-1 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors">
                      Remove
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-4">5</td>
                  <td className="py-4">5 kWh</td>
                  <td className="py-4">6 APT</td>
                  <td className="py-4 text-right">
                    <button className="px-3 py-1 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors">
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">Past Listings</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left pb-2 font-medium">S.no</th>
                  <th className="text-left pb-2 font-medium">Buyer</th>
                  <th className="text-right pb-2 font-medium">Amount</th>
                  <th className="text-right pb-2 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/20">
                  <td className="py-4">1</td>
                  <td className="py-4 text-xs md:text-sm truncate max-w-[200px]">0x3a1f8e6d4b72c5d2f1a6b9e8cf5a2d3b7a9c6d9f2b4a5c7e1d4f3b6a9e2c4d</td>
                  <td className="py-4 text-right">15 kWh</td>
                  <td className="py-4 text-right">15 APT</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-4">2</td>
                  <td className="py-4 text-xs md:text-sm truncate max-w-[200px]">0x9c2f3a6b7d9cf5a1b2d3a9c6f8a7b4c5d1c2f3a6b9d7e8f5a2b1c9c3d6f9a8</td>
                  <td className="py-4 text-right">5 kWh</td>
                  <td className="py-4 text-right">4 APT</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-4">3</td>
                  <td className="py-4 text-xs md:text-sm truncate max-w-[200px]">0xf5a2b3a9c6d7f8a1b4c5d2e3a6b9d8cf7a1b2e5c3d6f9a8b7c9d4c2f3a6b9d</td>
                  <td className="py-4 text-right">75 kWh</td>
                  <td className="py-4 text-right">67 APT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}