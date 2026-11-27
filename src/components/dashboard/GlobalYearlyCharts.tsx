import { useMemo } from 'react';
import { useFuelStore } from '../../store/fuelStore';
import { YearlyChart } from '../detail/YearlyChart';
import { Last12MonthsChart } from './Last12MonthsChart';

const MONTH_NAMES_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const GlobalYearlyCharts = () => {
  const { vehicles } = useFuelStore();

  const {
    kmData,
    consumptionData,
    litresData,
    avgDistanceData,
    costPer100kmData,
    last12MonthsData,
  } = useMemo(() => {
    const yearMap = new Map<number, { total_km: number; total_litres: number; total_refuels: number }>();

    vehicles.forEach((v) => {
      const yearlyHistory = v.total_statistics?.yearly_history || [];
      yearlyHistory.forEach((y: any) => {
        const year = y.year;
        const current = yearMap.get(year) || { total_km: 0, total_litres: 0, total_refuels: 0 };
        yearMap.set(year, {
          total_km: current.total_km + (y.total_km || 0),
          total_litres: current.total_litres + (y.total_litres || 0),
          total_refuels: current.total_refuels + (y.number_of_refuels || 0),
        });
      });
    });

    const sortedYears = Array.from(yearMap.entries()).sort(([a], [b]) => a - b);

    const kmSeries = sortedYears.map(([year, data]) => ({
      year,
      total_km: data.total_km,
    }));

    const consumptionSeries = sortedYears.map(([year, data]) => ({
      year,
      total_km: data.total_km > 0
        ? (data.total_litres / data.total_km) * 100
        : 0,
    }));

    const litresSeries = sortedYears.map(([year, data]) => ({
      year,
      total_litres: data.total_litres,
    }));

    const avgDistanceSeries = sortedYears.map(([year, data]) => ({
      year,
      avg_km_between_refuels: data.total_refuels > 0
        ? data.total_km / data.total_refuels
        : 0,
    }));

    // --- Coste por 100 km por año (agregado global) ---
    const costYearMap = new Map<number, { total_km: number; total_cost: number }>();
    vehicles.forEach((v) => {
      const data = v.total_statistics?.coste_por_100km_por_ano || [];
      data.forEach((c: any) => {
        const year = c.anio;
        const current = costYearMap.get(year) || { total_km: 0, total_cost: 0 };
        costYearMap.set(year, {
          total_km: current.total_km + (c.km_totales || 0),
          total_cost: current.total_cost + (c.coste_total || 0),
        });
      });
    });
    const costPer100kmSeries = Array.from(costYearMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([year, d]) => ({
        year: String(year),
        coste_por_100km_eur: d.total_km > 0 ? (d.total_cost / d.total_km) * 100 : 0,
        km_totales: d.total_km,
        coste_total: d.total_cost,
      }));

    // --- Últimos 12 meses (agregado global) ---
    const monthMap = new Map<string, { year: number; month: number; km: number; litres: number; hours: number }>();
    vehicles.forEach((v) => {
      const data = v.total_statistics?.ultimos_12_meses || [];
      data.forEach((m: any) => {
        const key = `${m.anio}-${m.mes}`;
        const current = monthMap.get(key) || { year: m.anio, month: m.mes, km: 0, litres: 0, hours: 0 };
        monthMap.set(key, {
          year: m.anio,
          month: m.mes,
          km: current.km + (m.km || 0),
          litres: current.litres + (m.litros || 0),
          hours: current.hours + (m.horas || 0),
        });
      });
    });
    const last12MonthsSeries = Array.from(monthMap.values())
      .sort((a, b) => b.year - a.year || b.month - a.month)
      .slice(0, 12)
      .sort((a, b) => a.year - b.year || a.month - b.month)
      .map((m) => ({
        year: `${MONTH_NAMES_ES[m.month - 1]} ${m.year}`,
        consumo_medio_l_per_100km: m.km > 0 ? (m.litres / m.km) * 100 : 0,
        velocidad_media_km_per_h: m.hours > 0 ? m.km / m.hours : 0,
        km: m.km,
        litros: m.litres,
        horas: m.hours,
        numero_repostajes: 0,
      }));

    return {
      kmData: kmSeries,
      consumptionData: consumptionSeries,
      litresData: litresSeries,
      avgDistanceData: avgDistanceSeries,
      costPer100kmData: costPer100kmSeries,
      last12MonthsData: last12MonthsSeries,
    };
  }, [vehicles]);

  if (kmData.length === 0) return null;

  return (
    <div className="mt-12 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-card p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">
            Kilómetros Totales por Año
          </h3>
          <YearlyChart
            data={kmData}
            dataKey="total_km"
            tooltipLabel="KM Totales"
            tooltipUnit="km"
            color="#06b6d4"
            decimals={0}
          />
        </div>

        <div className="bg-dark-card p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">
            Consumo Medio por Año
          </h3>
          <YearlyChart
            data={consumptionData}
            dataKey="total_km"
            tooltipLabel="Consumo Medio"
            tooltipUnit="L/100km"
            decimals={2}
            autoDomain
          />
        </div>

        <div className="bg-dark-card p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">
            Litros por Año
          </h3>
          <YearlyChart
            data={litresData}
            dataKey="total_litres"
            tooltipLabel="Litros Totales"
            tooltipUnit="L"
            color="#06b6d4"
            decimals={0}
          />
        </div>

        <div className="bg-dark-card p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">
            Distancia Media entre Repostajes por Año
          </h3>
          <YearlyChart
            data={avgDistanceData}
            dataKey="avg_km_between_refuels"
            tooltipLabel="Distancia Media"
            tooltipUnit="km"
            color="#06b6d4"
            decimals={1}
            autoDomain
          />
        </div>
      </div>

      {/* NUEVO: Coste por 100 km y últimos 12 meses agregados globalmente */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-card p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">
            Coste por 100 km por Año (todos los vehículos)
          </h3>
          <div className="flex-grow">
            <YearlyChart
              data={costPer100kmData}
              dataKey="coste_por_100km_eur"
              tooltipLabel="Coste por 100 km"
              tooltipUnit="€"
              decimals={2}
              autoDomain
            />
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">
            Consumo Medio Últimos 12 Meses (todos los vehículos)
          </h3>
          <Last12MonthsChart data={last12MonthsData} />
        </div>
      </div>
    </div>
  );
};
