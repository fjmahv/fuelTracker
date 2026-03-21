import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SpeedConsumptionChart = ({ data = [] }: { data?: any[] }) => (
  <div className="h-[300px] w-full font-mono">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="3 3" />
        <XAxis 
          dataKey="range_label" 
          // REQ: Texto más grande (13px) y color slate-400 para mejor contraste
          tick={{ fill: '#94a3b8', fontSize: 13 }} 
          axisLine={false} 
          tickLine={false}
          // REQ: Desplazamiento a la derecha para no pegar con el eje vertical
          padding={{ left: 50, right: 20 }}
          dy={10}
        />
        <YAxis 
          // REQ: Texto más grande (13px) y color slate-400
          tick={{ fill: '#94a3b8', fontSize: 13 }} 
          axisLine={false} 
          tickLine={false}
          unit=" L"
          // REQ: Forzar valores enteros en los ticks
          allowDecimals={false}
          // REQ: Dominio dinámico: 1 entero menos que el mínimo y 1 entero más que el máximo
          domain={[
            (dataMin: number) => Math.floor(dataMin) - 1,
            (dataMax: number) => Math.ceil(dataMax) + 1
          ]}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
          itemStyle={{ color: '#06b6d4', fontSize: '13px' }}
          formatter={(value: number) => [`${value.toFixed(2)} L/100km`, 'Consumo Medio']}
          labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
        />
        <Line 
          type="monotone" // Línea fluida y curva
          dataKey="average_consumption" 
          stroke="#06b6d4" 
          strokeWidth={3}
          // REQ: Puntos marcados en cada rango de velocidad
          dot={{ r: 6, fill: '#06b6d4', stroke: '#020617', strokeWidth: 2 }}
          activeDot={{ r: 8, fill: '#22d3ee' }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);