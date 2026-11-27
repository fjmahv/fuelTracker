import { useMemo } from 'react';
import { YearlyChart } from '../detail/YearlyChart';

interface Last12MonthsChartProps {
  data?: any[];
}

export const Last12MonthsChart = ({ data = [] }: Last12MonthsChartProps) => {
  // Mapea los datos de ultimos_12_meses a un formato compatible con YearlyChart
  // (eje X como string "MM/AA", series de consumo y velocidad media).
  // Ordena de más antiguo a más reciente para que el eje X avance cronológicamente.
  const chartData = useMemo(() => {
    return (data || [])
      .slice()
      .sort((a: any, b: any) => a.anio - b.anio || a.mes - b.mes)
      .map((item: any) => ({
        year: `${String(item.mes).padStart(2, '0')}/${String(item.anio).slice(-2)}`,
        consumo_medio_l_per_100km: item.consumo_medio_l_per_100km ?? 0,
        velocidad_media_km_per_h: item.velocidad_media_km_per_h ?? 0,
        km: item.km ?? 0,
        litros: item.litros ?? 0,
        horas: item.horas ?? 0,
        numero_repostajes: item.numero_repostajes ?? 0,
      }));
  }, [data]);

  return (
    <div className="h-[300px] w-full font-mono">
      <YearlyChart
        data={chartData}
        dataKey="consumo_medio_l_per_100km"
        tooltipLabel="Consumo Medio"
        tooltipUnit="L/100km"
        decimals={2}
        autoDomain
        extraDataKey="velocidad_media_km_per_h"
        extraTooltipLabel="Velocidad Media"
        extraTooltipUnit="km/h"
        extraDecimals={1}
      />
    </div>
  );
};
