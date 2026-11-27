import { useMemo } from 'react';
import { YearlyChart } from '../detail/YearlyChart';

const MONTH_NAMES_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

interface Last12MonthsChartProps {
  data?: any[];
}

export const Last12MonthsChart = ({ data = [] }: Last12MonthsChartProps) => {
  // Mapea los datos de ultimos_12_meses a un formato compatible con YearlyChart
  // (eje X como string "Mes Año", series de consumo y velocidad media)
  const chartData = useMemo(() => {
    return (data || []).map((item: any) => ({
      year: `${item.mes_nombre} ${item.anio}`,
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
