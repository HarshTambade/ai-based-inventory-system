import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InventoryDashboard from './components/InventoryDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">Inventory AI Platform</h1>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <InventoryDashboard />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
