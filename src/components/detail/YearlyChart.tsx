import { useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatNumber } from '../../lib/utils';

interface YearlyChartProps {
  data?: any[];
  dataKey?: string;
  tooltipLabel?: string;
  tooltipUnit?: string;
  color?: string;
  decimals?: number;
  yDomain?: [number, number];
  autoDomain?: boolean;
}

export const YearlyChart = ({
  data = [],
  dataKey = 'total_km',
  tooltipLabel = 'Distancia Total',
  tooltipUnit = 'km',
  color = '#06b6d4',
  decimals = 0,
  yDomain,
  autoDomain = false,
}: YearlyChartProps) => {
  const fillColor = color;
  const strokeColor = color;

  // When autoDomain is enabled, compute a "round numbers" Y domain from the
  // data itself: floor/ceil the data min/max to multiples of a round step
  // derived from the values' magnitude (half the power of ten of the max
  // value, e.g. step 0.5 for consumption, step 50 for hundreds of km), so
  // year-to-year variations remain visible. Falls back to the explicit
  // yDomain when data is empty.
  const resolvedDomain = useMemo<[number, number] | undefined>(() => {
    if (!autoDomain) return yDomain;
    const values = data
      .map((item) => Number(item[dataKey]))
      .filter((value) => !Number.isNaN(value));
    if (values.length === 0) return yDomain;
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const maxAbs = Math.max(Math.abs(minValue), Math.abs(maxValue), 1);
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxAbs)));
    const step = magnitude / 2;
    let domainMin = Math.max(0, Math.floor(minValue / step + 1e-9) * step);
    let domainMax = Math.ceil(maxValue / step - 1e-9) * step;
    // Guard against a degenerate (zero-height) domain
    if (domainMax <= domainMin) {
      domainMin = Math.max(0, domainMin - step);
      domainMax = domainMax + step;
    }
    return [domainMin, domainMax];
  }, [autoDomain, data, dataKey, yDomain]);

  return (
    <div className="h-[300px] w-full font-mono">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#94a3b8', fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
            domain={resolvedDomain}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
            itemStyle={{ fontSize: '13px' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            formatter={(value: number) => [`${formatNumber(value, decimals)} ${tooltipUnit}`, tooltipLabel]}
          />

          <Bar
            dataKey={dataKey}
            fill={fillColor}
            fillOpacity={0.3}
            barSize={24}
            radius={[4, 4, 0, 0]}
            tooltipType="none"
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={3}
            dot={{ r: 5, fill: strokeColor, stroke: '#020617', strokeWidth: 2 }}
            activeDot={{ r: 7, fill: '#22d3ee' }}
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};