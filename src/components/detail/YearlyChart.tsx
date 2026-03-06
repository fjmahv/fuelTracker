import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
export const YearlyChart = ({ data }: { data: any[] }) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer>
      <ComposedChart data={data}>
        <CartesianGrid stroke="#1e293b" vertical={false} />
        <XAxis dataKey="year" tick={{fill: '#64748b'}} />
        <YAxis yAxisId="left" tick={{fill: '#64748b'}} />
        <Tooltip contentStyle={{backgroundColor: '#0f172a'}} />
        <Bar yAxisId="left" dataKey="total_km" fill="#334155" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);