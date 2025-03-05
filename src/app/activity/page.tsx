export default function Activity() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Activity Feed</h1>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start gap-4 p-4 border rounded-md">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item % 2 === 0 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {item % 2 === 0 ? '↑' : '↓'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item % 2 === 0 ? 'Sold Energy' : 'Bought Energy'}</h3>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Transaction ID: 0x{Array(8).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}...</p>
                  <div className="flex justify-between mt-2">
                    <span>{Math.floor(Math.random() * 10 + 5)} kWh</span>
                    <span className="font-medium">{(Math.random() * 0.1 + 0.1).toFixed(3)} ETH/kWh</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}