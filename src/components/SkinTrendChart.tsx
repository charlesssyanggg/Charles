import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface TrendData {
  date: string;
  moisture: number;
  oil: number;
  sensitivity: number;
  overall: number;
}

interface SkinTrendChartProps {
  data: TrendData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/20 text-xs font-sans">
        <p className="font-bold text-slate-900 mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-500 font-medium">{entry.name}</span>
              </div>
              <span className="font-bold text-slate-900">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const SkinTrendChart: React.FC<SkinTrendChartProps> = ({ data }) => {
  // Format dates for display
  const formattedData = [...data].reverse().map(d => ({
    ...d,
    displayDate: new Date(d.date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })
  }));

  return (
    <div className="w-full h-[220px] mt-2 relative -ml-4">
      <ResponsiveContainer width="105%" height="100%">
        <AreaChart 
          data={formattedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSensitivity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="0" 
            vertical={false} 
            stroke="rgba(255,255,255,0.08)" 
          />
          <XAxis 
            dataKey="displayDate" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.5)', fontWeight: 500 }}
            dy={10}
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="moisture" 
            name="水分" 
            stroke="#60A5FA" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorMoisture)"
            activeDot={{ r: 4, strokeWidth: 0, fill: '#60A5FA' }}
            animationDuration={1500}
          />
          <Area 
            type="monotone" 
            dataKey="sensitivity" 
            name="敏感" 
            stroke="#F87171" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorSensitivity)"
            activeDot={{ r: 4, strokeWidth: 0, fill: '#F87171' }}
            animationDuration={1500}
          />
          <Area 
            type="monotone" 
            dataKey="overall" 
            name="得分" 
            stroke="#DDD6FE" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorOverall)"
            activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2, fill: '#fff' }}
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkinTrendChart;
