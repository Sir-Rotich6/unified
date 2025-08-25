import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const VelocityChart = ({ className = '' }) => {
  const velocityData = [
    { sprint: 'Sprint 1', planned: 45, completed: 42, committed: 45 },
    { sprint: 'Sprint 2', planned: 50, completed: 48, committed: 50 },
    { sprint: 'Sprint 3', planned: 48, completed: 52, committed: 48 },
    { sprint: 'Sprint 4', planned: 52, completed: 49, committed: 52 },
    { sprint: 'Sprint 5', planned: 55, completed: 58, committed: 55 },
    { sprint: 'Sprint 6', planned: 58, completed: 55, committed: 58 },
    { sprint: 'Sprint 7', planned: 60, completed: 62, committed: 60 },
    { sprint: 'Sprint 8', planned: 62, completed: 59, committed: 62 }
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

  const averageVelocity = Math.round(
    velocityData?.reduce((sum, sprint) => sum + sprint?.completed, 0) / velocityData?.length
  );

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Team Velocity</h3>
          <p className="text-sm text-muted-foreground">Story points delivered per sprint</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{averageVelocity}</p>
          <p className="text-xs text-muted-foreground">Avg Velocity</p>
        </div>
      </div>

      <div className="w-full h-80" aria-label="Team Velocity Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={velocityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="sprint" 
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
            <Bar 
              dataKey="planned" 
              fill="var(--color-muted)" 
              name="Planned"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="completed" 
              fill="var(--color-primary)" 
              name="Completed"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-success">96%</p>
          <p className="text-xs text-muted-foreground">Delivery Rate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-primary">+8%</p>
          <p className="text-xs text-muted-foreground">Velocity Trend</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">456</p>
          <p className="text-xs text-muted-foreground">Total Points</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-warning">2.1</p>
          <p className="text-xs text-muted-foreground">Predictability</p>
        </div>
      </div>
    </div>
  );
};

export default VelocityChart;