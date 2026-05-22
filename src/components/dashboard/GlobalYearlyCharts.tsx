import { useMemo } from 'react';
import { useFuelStore } from '../../store/fuelStore';
import { YearlyChart } from '../detail/YearlyChart';

export const GlobalYearlyCharts = () => {
  const { vehicles } = useFuelStore();

  const { kmData, consumptionData } = useMemo(() => {
    const yearMap = new Map<number, { total_km: number; total_litres: number }>();

    vehicles.forEach((v) => {
      const yearlyHistory = v.total_statistics?.yearly_history || [];
      yearlyHistory.forEach((y: any) => {
        const year = y.year;
        const current = yearMap.get(year) || { total_km: 0, total_litres: 0 };
        yearMap.set(year, {
          total_km: current.total_km + (y.total_km || 0),
          total_litres: current.total_litres + (y.total_litres || 0),
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

    return { kmData: kmSeries, consumptionData: consumptionSeries };
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
            yDomain={[5, 10]}
          />
        </div>
      </div>
    </div>
  );
};
