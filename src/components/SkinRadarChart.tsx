import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface SkinRadarChartProps {
  data: { name: string; value: number }[];
}

export default function SkinRadarChart({ data }: SkinRadarChartProps) {
  return (
    <div className="w-full h-56 mt-2 mb-4 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#E2E8F0" strokeDasharray="4 4" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} 
          />
          <Radar
            name="Skin Condition"
            dataKey="value"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.15}
            strokeWidth={3}
            dot={{ r: 3, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <div className="w-32 h-32 rounded-full bg-brand blur-3xl animate-pulse" />
      </div>
    </div>
  );
}
