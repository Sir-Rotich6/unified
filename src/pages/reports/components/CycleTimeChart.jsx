import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from 'recharts';

const CycleTimeChart = ({ className = '' }) => {
  const cycleTimeData = [
    { week: 'Week 1', avgCycleTime: 5.2, leadTime: 7.8, throughput: 12 },
    { week: 'Week 2', avgCycleTime: 4.8, leadTime: 7.2, throughput: 15 },
    { week: 'Week 3', avgCycleTime: 6.1, leadTime: 8.5, throughput: 10 },
    { week: 'Week 4', avgCycleTime: 4.5, leadTime: 6.9, throughput: 18 },
    { week: 'Week 5', avgCycleTime: 5.8, leadTime: 8.1, throughput: 14 },
    { week: 'Week 6', avgCycleTime: 4.2, leadTime: 6.5, throughput: 20 },
    { week: 'Week 7', avgCycleTime: 5.5, leadTime: 7.8, throughput: 16 },
    { week: 'Week 8', avgCycleTime: 4.1, leadTime: 6.2, throughput: 22 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value} {entry?.name === 'Throughput' ? 'items' : 'days'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const avgCycleTime = (cycleTimeData?.reduce((sum, week) => sum + week?.avgCycleTime, 0) / cycleTimeData?.length)?.toFixed(1);

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cycle Time Analysis</h3>
          <p className="text-sm text-muted-foreground">Time from start to completion</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-accent">{avgCycleTime}</p>
          <p className="text-xs text-muted-foreground">Avg Days</p>
        </div>
      </div>

      <div className="w-full h-80" aria-label="Cycle Time Analysis Chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={cycleTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="week" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="time"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="throughput"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Items', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              yAxisId="time"
              type="monotone" 
              dataKey="avgCycleTime" 
              stroke="var(--color-accent)" 
              strokeWidth={3}
              name="Cycle Time"
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 5 }}
            />
            <Line 
              yAxisId="time"
              type="monotone" 
              dataKey="leadTime" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Lead Time"
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              yAxisId="throughput"
              type="monotone" 
              dataKey="throughput" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              name="Throughput"
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-accent">4.1</p>
          <p className="text-xs text-muted-foreground">Best Cycle Time</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-success">-12%</p>
          <p className="text-xs text-muted-foreground">Improvement</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-primary">22</p>
          <p className="text-xs text-muted-foreground">Peak Throughput</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">6.2</p>
          <p className="text-xs text-muted-foreground">Avg Lead Time</p>
        </div>
      </div>
    </div>
  );
};

export default CycleTimeChart;