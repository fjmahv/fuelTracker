import { useFuelStore } from '../../store/fuelStore';
import { BRAND_LOGOS, formatNumber } from '../../lib/utils';
import { Fuel, ChevronRight } from 'lucide-react';

export const VehicleCards = () => {
  const { vehicles, selectVehicle } = useFuelStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {vehicles.map((v) => (
        <div key={v.car_id} onClick={() => selectVehicle(v.car_id)} className="bg-dark-card border border-slate-800/40 rounded-2xl p-6 cursor-pointer hover:border-cyan-500/50 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400">{v.car_details.brand} {v.car_details.model}</h3>
            
            {/* REQ: Marco para el logo con contraste */}
            <div className="bg-white/90 p-2 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-slate-700 w-14 h-14 flex items-center justify-center shrink-0">
              <img 
                src={BRAND_LOGOS[v.car_details.brand] || BRAND_LOGOS['Audi']} 
                alt={v.car_details.brand} 
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-400 font-bold text-xl font-mono">{v.total_statistics.average_consumption_l_per_100km}</span>
            </div>
            <div className="bg-slate-800 p-2 rounded-full group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};