import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const BurndownChart = ({ className = '' }) => {
  const burndownData = [
    { day: 'Day 1', ideal: 100, actual: 100, remaining: 95 },
    { day: 'Day 2', ideal: 90, actual: 95, remaining: 88 },
    { day: 'Day 3', ideal: 80, actual: 88, remaining: 82 },
    { day: 'Day 4', ideal: 70, actual: 82, remaining: 75 },
    { day: 'Day 5', ideal: 60, actual: 75, remaining: 68 },
    { day: 'Day 6', ideal: 50, actual: 68, remaining: 58 },
    { day: 'Day 7', ideal: 40, actual: 58, remaining: 45 },
    { day: 'Day 8', ideal: 30, actual: 45, remaining: 32 },
    { day: 'Day 9', ideal: 20, actual: 32, remaining: 18 },
    { day: 'Day 10', ideal: 10, actual: 18, remaining: 8 },
    { day: 'Day 11', ideal: 0, actual: 8, remaining: 0 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value} story points
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sprint Burndown</h3>
          <p className="text-sm text-muted-foreground">Story points remaining over time</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground">Ideal</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">Actual</span>
          </div>
        </div>
      </div>

      <div className="w-full h-80" aria-label="Sprint Burndown Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={burndownData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Story Points', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="ideal" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Ideal Burndown"
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-warning)" 
              strokeWidth={3}
              name="Actual Progress"
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">8</p>
          <p className="text-xs text-muted-foreground">Points Remaining</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">92%</p>
          <p className="text-xs text-muted-foreground">Sprint Progress</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-warning">1</p>
          <p className="text-xs text-muted-foreground">Days Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default BurndownChart;