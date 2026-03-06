import { useFuelStore } from '../../store/fuelStore';
import { BRAND_LOGOS, formatNumber } from '../../lib/utils';
import { 
  ArrowLeft, MapPin, Droplets, Banknote, Zap, Gauge, 
  CalendarClock, CalendarDays, Hash, TrendingUp, ArrowRightLeft 
} from 'lucide-react';
import { YearlyChart } from './YearlyChart';
import { SpeedConsumptionChart } from './SpeedConsumptionChart';

export const VehicleDetail = () => {
  const { vehicles, selectedVehicleId, selectVehicle } = useFuelStore();
  const vehicle = vehicles.find(v => v.car_id === selectedVehicleId);

  if (!vehicle) return null;
  const stats = vehicle.total_statistics;

  // Cálculos matemáticos precisos usando los años en decimales
  const years = stats.yearsOfData || 1;
  const avgKmPerYear = stats.total_km / years;
  const avgKmBetween = stats.total_km / (stats.total_refuels || 1);

  const firstRow = [
    { label: 'Total KM', value: `${formatNumber(stats.total_km, 0)} km`, icon: MapPin, color: 'text-blue-400' },
    { label: 'Total Litros', value: `${formatNumber(stats.total_litres, 0)} L`, icon: Droplets, color: 'text-cyan-400' },
    { label: 'Coste Total', value: `${formatNumber(stats.total_cost, 0)} €`, icon: Banknote, color: 'text-emerald-400' },
    { label: 'Consumo Medio', value: `${stats.average_consumption_l_per_100km} L/100`, icon: Zap, color: 'text-orange-400' },
    // Control condicional para la velocidad usando el dato directo
    { label: 'Velocidad Media', value: stats.average_speed_km_per_h ? `${stats.average_speed_km_per_h} km/h` : 'Sin Telemetría', icon: Gauge, color: 'text-purple-400' },
    { label: 'Años de Datos', value: `${years} años`, icon: CalendarClock, color: 'text-slate-400' },
  ];

  const secondRow = [
    // Fechas deterministas formatedas a formato local (ej. 20/05/2010)
    { label: 'Primer Repostaje', value: new Date(stats.first_refuel_date).toLocaleDateString('es-ES'), icon: CalendarDays, color: 'text-slate-500' },
    { label: 'Último Repostaje', value: new Date(stats.last_refuel_date).toLocaleDateString('es-ES'), icon: CalendarDays, color: 'text-cyan-500' },
    { label: 'Total Repostajes', value: stats.total_refuels, icon: Hash, color: 'text-indigo-400' },
    { label: 'Promedio KM/Año', value: `${formatNumber(avgKmPerYear, 0)} km`, icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'KM entre Repostajes', value: `${formatNumber(avgKmBetween, 1)} km`, icon: ArrowRightLeft, color: 'text-amber-400' },
  ];

  const Card = ({ item }: { item: any }) => (
    <div className="bg-dark-card border border-slate-800/40 p-4 rounded-2xl flex flex-col items-center text-center shadow-sm">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
      </div>
      <div className="text-lg font-bold font-mono text-slate-100">{item.value}</div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => selectVehicle(null)} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
      </button>

      <div className="flex items-center gap-6 mb-8 bg-dark-card/30 p-6 rounded-3xl border border-slate-800/20">
        <div className="bg-white/90 p-3 rounded-2xl shadow-lg border border-slate-700 w-20 h-20 flex items-center justify-center shrink-0">
          <img src={BRAND_LOGOS[vehicle.car_details.brand] || BRAND_LOGOS['Audi']} className="w-14 h-14 object-contain" alt={vehicle.car_details.brand} />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">{vehicle.car_details.brand} <span className="text-cyan-500">{vehicle.car_details.model}</span></h2>
          <p className="text-slate-500 font-mono mt-1">{vehicle.car_details.number_plate} • {vehicle.car_details.fuel_type}</p>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {firstRow.map((kpi, i) => <Card key={i} item={kpi} />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {secondRow.map((kpi, i) => <Card key={i} item={kpi} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-dark-card p-6 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Evolución de Distancia Anual</h3>
            <YearlyChart data={stats.yearly_history} />
        </div>
        <div className="bg-dark-card p-6 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Eficiencia por Rango de Velocidad</h3>
            <SpeedConsumptionChart data={vehicle.speedRanges} />
        </div>
      </div>
    </div>
  );
};