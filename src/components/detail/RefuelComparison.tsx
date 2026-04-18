import { Droplets, Gauge, History, Zap, Calendar, MapPin } from 'lucide-react';

export const RefuelComparison = ({ data }: { data: any }) => {
  if (!data?.latest || !data?.avg3 || !data?.historical) return null;

  const Column = ({ title, consumption, speed, distance_km, icon: Icon, sub, highlight }: any) => (
    <div className={`flex-1 flex flex-col justify-between bg-slate-900/60 rounded-2xl p-6 border ${highlight ? 'border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-slate-800'} transition-all group`}>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-xl ${highlight ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'} transition-colors`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-black text-slate-300 uppercase tracking-widest leading-tight">{title}</span>
        </div>
        
        <div className="space-y-6">
          {/* Bloque Consumo */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-white tracking-tighter">
                {consumption.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-cyan-500/80">L/100</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <Droplets className="w-4 h-4 text-cyan-500/60" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Consumo</span>
            </div>
          </div>

          {/* Bloque Velocidad */}
          <div className="pt-5 border-t border-slate-800/80">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-slate-200 tracking-tighter">
                {speed > 0 ? speed.toFixed(1) : '---'}
              </span>
              <span className="text-xs font-bold text-slate-500">km/h</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <Gauge className="w-4 h-4 text-purple-500/60" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Velocidad</span>
            </div>
          </div>

          {/* Bloque Distancia */}
          <div className="pt-5 border-t border-slate-800/80">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-slate-200 tracking-tighter">
                {distance_km > 0 ? distance_km.toFixed(1) : '---'}
              </span>
              <span className="text-xs font-bold text-slate-500">km</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <MapPin className="w-4 h-4 text-emerald-500/60" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Distancia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pie de Tarjeta (Subtexto) */}
      {sub && (
        <div className="mt-8 pt-4 border-t border-slate-800/50">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            {sub}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <Column 
        title="Último Repostaje" 
        consumption={data.latest.consumption} 
        speed={data.latest.speed} 
        distance_km={data.latest.distance_km}
        icon={Zap}
        sub={data.latest.date ? new Date(data.latest.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Sin fecha'}
        highlight={true}
      />
      <Column 
        title="Media 3 Anteriores" 
        consumption={data.avg3.consumption} 
        speed={data.avg3.speed} 
        distance_km={data.avg3.distance_km}
        icon={History}
        sub={`${data.avg3.refuels_count || 0} repostajes`}
      />
      <Column 
        title={`Histórico ${data.historical.monthName}`} 
        consumption={data.historical.consumption} 
        speed={data.historical.speed} 
        distance_km={data.historical.distance_km}
        icon={Calendar}
        sub={`${data.historical.refuels_count || 0} repostajes`}
      />
    </div>
  );
};
