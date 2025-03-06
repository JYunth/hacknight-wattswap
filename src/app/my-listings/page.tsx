import Table from '@/components/ui/activelisting_table';
import Past from '@/components/ui/pasthistory';

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
          <div><Table /></div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border mb-8">
          <div><Past /></div>
        </div>
      </div>
    </div>
  );
}