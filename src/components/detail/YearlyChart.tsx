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
}

export const YearlyChart = ({
  data = [],
  dataKey = 'total_km',
  tooltipLabel = 'Distancia Total',
  tooltipUnit = 'km',
  color = '#06b6d4',
  decimals = 0,
  yDomain,
}: YearlyChartProps) => {
  const fillColor = color;
  const strokeColor = color;

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
            domain={yDomain}
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