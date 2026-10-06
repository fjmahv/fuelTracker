import { useMemo } from 'react';
import { useFuelStore } from '../../store/fuelStore';
import { YearlyChart } from '../detail/YearlyChart';

export const GlobalYearlyCharts = () => {
  const { vehicles } = useFuelStore();

  const { kmData, consumptionData, litresData, avgDistanceData } = useMemo(() => {
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

    // Average distance between refuels per year (same formula as the "KM entre Repostajes" KPI)
    const avgDistanceSeries = sortedYears.map(([year, data]) => ({
      year,
      avg_km_between_refuels: data.total_refuels > 0
        ? data.total_km / data.total_refuels
        : 0,
    }));

    return { kmData: kmSeries, consumptionData: consumptionSeries, litresData: litresSeries, avgDistanceData: avgDistanceSeries };
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
    </div>
  );
};
