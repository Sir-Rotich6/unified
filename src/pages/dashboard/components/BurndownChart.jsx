import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BurndownChart = ({ data, className = '' }) => {
  const chartData = [
    { day: 'Day 1', ideal: 100, actual: 100 },
    { day: 'Day 2', ideal: 90, actual: 95 },
    { day: 'Day 3', ideal: 80, actual: 88 },
    { day: 'Day 4', ideal: 70, actual: 82 },
    { day: 'Day 5', ideal: 60, actual: 75 },
    { day: 'Day 6', ideal: 50, actual: 68 },
    { day: 'Day 7', ideal: 40, actual: 58 },
    { day: 'Day 8', ideal: 30, actual: 45 },
    { day: 'Day 9', ideal: 20, actual: 32 },
    { day: 'Day 10', ideal: 10, actual: 18 },
    { day: 'Day 11', ideal: 0, actual: 8 }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sprint Burndown</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Ideal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Actual</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-64" aria-label="Sprint Burndown Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data || chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="ideal" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BurndownChart;