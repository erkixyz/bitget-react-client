import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'BTC', value: 400 },
  { name: 'ETH', value: 300 },
  { name: 'USDT', value: 300 },
];
const COLORS = ['#1976d2', '#90caf9', '#e3e3e3'];

export default function PieChartPlaceholder() {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={24}
          outerRadius={40}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
