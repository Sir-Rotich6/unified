import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const TeamProductivityChart = ({ className = '' }) => {
  const productivityData = [
    { metric: 'Code Quality', frontend: 85, backend: 92, mobile: 78, qa: 88 },
    { metric: 'Delivery Speed', frontend: 90, backend: 85, mobile: 82, qa: 75 },
    { metric: 'Bug Resolution', frontend: 78, backend: 88, mobile: 85, qa: 95 },
    { metric: 'Innovation', frontend: 92, backend: 80, mobile: 88, qa: 70 },
    { metric: 'Collaboration', frontend: 88, backend: 85, mobile: 90, qa: 92 },
    { metric: 'Documentation', frontend: 75, backend: 90, mobile: 70, qa: 85 }
  ];

  const teamColors = {
    frontend: 'var(--color-primary)',
    backend: 'var(--color-accent)',
    mobile: 'var(--color-warning)',
    qa: 'var(--color-secondary)'
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Team Productivity</h3>
          <p className="text-sm text-muted-foreground">Performance across key metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: teamColors?.frontend }}></div>
            <span className="text-xs text-muted-foreground">Frontend</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: teamColors?.backend }}></div>
            <span className="text-xs text-muted-foreground">Backend</span>
          </div>
        </div>
      </div>
      <div className="w-full h-80" aria-label="Team Productivity Radar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={productivityData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
            />
            <Radar
              name="Frontend Team"
              dataKey="frontend"
              stroke={teamColors?.frontend}
              fill={teamColors?.frontend}
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="Backend Team"
              dataKey="backend"
              stroke={teamColors?.backend}
              fill={teamColors?.backend}
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="Mobile Team"
              dataKey="mobile"
              stroke={teamColors?.mobile}
              fill={teamColors?.mobile}
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="QA Team"
              dataKey="qa"
              stroke={teamColors?.qa}
              fill={teamColors?.qa}
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-lg font-bold text-primary">Frontend</p>
          <p className="text-sm text-muted-foreground">84.7 avg score</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-lg font-bold text-accent">Backend</p>
          <p className="text-sm text-muted-foreground">86.7 avg score</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-lg font-bold text-warning">Mobile</p>
          <p className="text-sm text-muted-foreground">82.2 avg score</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-lg font-bold text-secondary">QA</p>
          <p className="text-sm text-muted-foreground">84.2 avg score</p>
        </div>
      </div>
    </div>
  );
};

export default TeamProductivityChart;