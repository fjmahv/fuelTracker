import { MapPin, Droplets, Banknote, Zap, Gauge, CalendarClock, CalendarDays, Hash, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { useFuelStore } from '../../store/fuelStore';
import { formatNumber } from '../../lib/utils';

export const KPIGrid = () => {
  const { globalStats, metadata } = useFuelStore();

  // Si no hay datos, mostramos un estado vacío o cargando para evitar el crash
  if (!globalStats || !metadata) return null;

  // REQ: Media km entre repostajes (Km totales / número de repostajes)
  const totalKm = globalStats.total_km || 0;
  const totalRefuels = globalStats.total_refuels || 1;
  const avgKmBetween = totalKm / totalRefuels;
  const avgKmPerYear = totalKm / metadata.yearsOfData;

  const firstRow = [
    { label: 'Total KM', value: `${formatNumber(totalKm, 0)} km`, icon: MapPin, color: 'text-blue-400' },
    { label: 'Total Litros', value: `${formatNumber(globalStats.total_litres || 0, 0)} L`, icon: Droplets, color: 'text-cyan-400' },
    { label: 'Coste Total', value: `${formatNumber(globalStats.total_cost || 0, 0)} €`, icon: Banknote, color: 'text-emerald-400' },
    { label: 'Consumo Medio', value: `${globalStats.average_consumption_l_per_100km || 0} L/100`, icon: Zap, color: 'text-orange-400' },
    { label: 'Velocidad Media', value: `${globalStats.monthly_averages?.average_speed_km_per_h || 0} km/h`, icon: Gauge, color: 'text-purple-400' },
    { label: 'Años de Datos', value: `${metadata.yearsOfData || 0} años`, icon: CalendarClock, color: 'text-slate-400' },
  ];

  const secondRow = [
    { label: 'Primer Repostaje', value: metadata.firstRefuel ? new Date(metadata.firstRefuel).toLocaleDateString('es-ES') : '---', icon: CalendarDays, color: 'text-slate-500' },
    { label: 'Último Repostaje', value: metadata.lastRefuel ? new Date(metadata.lastRefuel).toLocaleDateString('es-ES') : '---', icon: CalendarDays, color: 'text-cyan-500' },
    { label: 'Total Repostajes', value: totalRefuels, icon: Hash, color: 'text-indigo-400' },
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
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {firstRow.map((kpi, i) => <Card key={i} item={kpi} />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {secondRow.map((kpi, i) => <Card key={i} item={kpi} />)}
      </div>
    </div>
  );
};

// import { Zap, MapPin, Droplets, Banknote, Gauge, CalendarClock } from 'lucide-react';
// import { useFuelStore } from '../../store/fuelStore';
// import { formatNumber } from '../../lib/utils';

// export const KPIGrid = () => {
//   const { globalStats, metadata } = useFuelStore();
//   if (!globalStats || !metadata) return null;

//   const kpis = [
//     { label: 'Total KM', value: `${formatNumber(globalStats.total_km, 0)} km`, icon: MapPin, color: 'text-blue-400' },
//     { label: 'Total Litros', value: `${formatNumber(globalStats.total_litres, 0)} L`, icon: Droplets, color: 'text-cyan-400' },
//     { label: 'Coste Total', value: `${formatNumber(globalStats.total_cost, 0)} €`, icon: Banknote, color: 'text-emerald-400' },
//     { label: 'Consumo Medio', value: `${globalStats.average_consumption_l_per_100km} L/100`, icon: Zap, color: 'text-orange-400' },
//     { label: 'Velocidad Media', value: `${globalStats.monthly_averages.average_speed_km_per_h} km/h`, icon: Gauge, color: 'text-purple-400' },
//     // REQ: Años de datos calculados
//     { label: 'Años de Datos', value: `${metadata.yearsOfData} años`, icon: CalendarClock, color: 'text-slate-400' },
//   ];

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
//       {kpis.map((kpi, i) => (
//         // REQ: flex-col e items-center para centrado horizontal
//         <div key={i} className="bg-dark-card border border-slate-800/40 p-5 rounded-2xl flex flex-col items-center text-center">
//           <div className="flex items-center gap-2 mb-2">
//             <kpi.icon className={`w-3.5 h-3.5 ${kpi.color}`} />
//             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</span>
//           </div>
//           <div className="text-xl font-bold font-mono text-slate-100">{kpi.value}</div>
//         </div>
//       ))}
//     </div>
//   );
// };