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

export const YearlyChart = ({ data = [] }: { data?: any[] }) => (
  <div className="h-[300px] w-full font-mono">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="3 3" />
        <XAxis 
          dataKey="year" 
          // REQ: Texto más grande y color slate-400 para contraste
          tick={{ fill: '#94a3b8', fontSize: 13 }} 
          axisLine={false} 
          tickLine={false}
          dy={10}
        />
        <YAxis 
          // REQ: Texto más grande y color slate-400
          tick={{ fill: '#94a3b8', fontSize: 13 }} 
          axisLine={false} 
          tickLine={false}
          tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
          itemStyle={{ fontSize: '13px' }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          formatter={(value: number) => [`${formatNumber(value, 0)} km`, 'Distancia Total']}
        />
        
        {/* REQ: Bloques más finos (barSize) y color atractivo con transparencia */}
        <Bar 
          dataKey="total_km" 
          fill="#06b6d4" 
          fillOpacity={0.3}
          barSize={24} 
          radius={[4, 4, 0, 0]}
          tooltipType="none" 
        />
        
        {/* REQ: Línea fluida (monotone) que une las partes superiores */}
        <Line 
          type="monotone" 
          dataKey="total_km" 
          stroke="#06b6d4" 
          strokeWidth={3} 
          dot={{ r: 5, fill: '#06b6d4', stroke: '#020617', strokeWidth: 2 }}
          activeDot={{ r: 7, fill: '#22d3ee' }}
          animationDuration={1500}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);