import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VelocityChart = ({ data, className = '' }) => {
  const chartData = [
    { sprint: 'Sprint 1', planned: 45, completed: 42 },
    { sprint: 'Sprint 2', planned: 50, completed: 48 },
    { sprint: 'Sprint 3', planned: 48, completed: 45 },
    { sprint: 'Sprint 4', planned: 52, completed: 50 },
    { sprint: 'Sprint 5', planned: 55, completed: 53 },
    { sprint: 'Sprint 6', planned: 50, completed: 47 }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Team Velocity</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Planned</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Completed</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-64" aria-label="Team Velocity Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data || chartData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="sprint" 
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
            <Bar 
              dataKey="planned" 
              fill="var(--color-secondary)" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="completed" 
              fill="var(--color-success)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VelocityChart;