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

export const MonthlyChart = ({ data = [] }: { data?: any[] }) => (
  <div className="h-[300px] w-full font-mono">
    <ResponsiveContainer width="100%" height="100%">
      {/* REQ: Aumentamos el margen inferior (bottom: 50) para que las etiquetas en diagonal tengan espacio */}
      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
        <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="3 3" />
        <XAxis 
          dataKey="month_name" 
          // REQ: interval={0} obliga a mostrar TODOS los meses sin saltarse ninguno
          interval={0}
          // REQ: angle y textAnchor para poner los meses en diagonal de forma elegante
          angle={-35}
          textAnchor="end"
          tick={{ fill: '#94a3b8', fontSize: 11 }} 
          axisLine={false} 
          tickLine={false}
        />
        <YAxis 
          tick={{ fill: '#94a3b8', fontSize: 13 }} 
          axisLine={false} 
          tickLine={false}
          tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
          itemStyle={{ fontSize: '13px' }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          formatter={(value: number) => [`${formatNumber(value, 0)} km`, 'Promedio Mensual']}
        />
        <Bar 
          dataKey="average_km" 
          fill="#06b6d4" 
          fillOpacity={0.2}
          barSize={20} 
          radius={[4, 4, 0, 0]} 
          tooltipType="none"
        />
        <Line 
          type="monotone" 
          dataKey="average_km" 
          stroke="#22d3ee" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#06b6d4', stroke: '#020617', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#22d3ee' }}
          animationDuration={1500}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);