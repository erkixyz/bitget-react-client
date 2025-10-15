import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'E', uv: 400 },
  { name: 'T', uv: 300 },
  { name: 'K', uv: 200 },
  { name: 'N', uv: 278 },
  { name: 'R', uv: 189 },
  { name: 'L', uv: 239 },
  { name: 'P', uv: 349 },
];

export default function BarChartPlaceholder() {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="uv" fill="#1976d2" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
