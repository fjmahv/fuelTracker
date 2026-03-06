import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
export const SpeedConsumptionChart = ({ data }: { data: any[] }) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid stroke="#1e293b" vertical={false} />
        <XAxis dataKey="range" tick={{fill: '#64748b'}} />
        <YAxis tick={{fill: '#64748b'}} />
        <Tooltip contentStyle={{backgroundColor: '#0f172a'}} />
        <Bar dataKey="avg" fill="#06b6d4">
           {data.map((entry, index) => <Cell key={index} fill={entry.avg > 8 ? '#ef4444' : '#10b981'} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);