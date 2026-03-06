import { Fuel } from 'lucide-react';
import { useFuelStore } from '../../store/fuelStore';

export const Header = () => {
  const { selectVehicle } = useFuelStore();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => selectVehicle(null)}
        >
          <div className="bg-cyan-500 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Fuel className="w-5 h-5 text-slate-950" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
            FuelTracker <span className="text-cyan-500 transition-colors group-hover:text-white">Pro</span>
          </h1>
        </div>
      </div>
    </header>
  );
};