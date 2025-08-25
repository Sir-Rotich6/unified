import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HistoricalDataPanel = () => {
  const [activeChart, setActiveChart] = useState('velocity');

  const velocityData = [
    { sprint: 'Sprint 1', velocity: 24, blockers: 3 },
    { sprint: 'Sprint 2', velocity: 28, blockers: 2 },
    { sprint: 'Sprint 3', velocity: 32, blockers: 4 },
    { sprint: 'Sprint 4', velocity: 30, blockers: 1 },
    { sprint: 'Sprint 5', velocity: 35, blockers: 2 },
    { sprint: 'Sprint 6', velocity: 38, blockers: 1 }
  ];

  const blockerData = [
    { category: 'Technical Debt', count: 8, color: '#DC2626' },
    { category: 'Dependencies', count: 6, color: '#D97706' },
    { category: 'Requirements', count: 4, color: '#059669' },
    { category: 'Resources', count: 3, color: '#2563EB' }
  ];

  const attendanceData = [
    { date: '2025-01-20', attendance: 85 },
    { date: '2025-01-21', attendance: 92 },
    { date: '2025-01-22', attendance: 88 },
    { date: '2025-01-23', attendance: 95 },
    { date: '2025-01-24', attendance: 90 },
    { date: '2025-01-25', attendance: 87 }
  ];

  const charts = [
    { id: 'velocity', label: 'Team Velocity', icon: 'TrendingUp' },
    { id: 'blockers', label: 'Blocker Analysis', icon: 'AlertTriangle' },
    { id: 'attendance', label: 'Attendance Trends', icon: 'Users' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'velocity':
        return (
          <div className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData}>
                  <XAxis 
                    dataKey="sprint" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="velocity" 
                    stroke="var(--color-primary)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-success">+58%</p>
                <p className="text-xs text-muted-foreground">Velocity Growth</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">31</p>
                <p className="text-xs text-muted-foreground">Avg Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">6</p>
                <p className="text-xs text-muted-foreground">Sprints Tracked</p>
              </div>
            </div>
          </div>
        );

      case 'blockers':
        return (
          <div className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={blockerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {blockerData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {blockerData?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item?.color }}
                    />
                    <span className="text-sm text-foreground">{item?.category}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item?.count}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
                    tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    domain={[70, 100]}
                  />
                  <Bar 
                    dataKey="attendance" 
                    fill="var(--color-primary)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-success">90%</p>
                <p className="text-xs text-muted-foreground">Avg Attendance</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">95%</p>
                <p className="text-xs text-muted-foreground">Best Day</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">85%</p>
                <p className="text-xs text-muted-foreground">Lowest Day</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
          Historical Analysis
        </h3>
        <Button variant="outline" size="sm" iconName="Download">
          Export
        </Button>
      </div>
      {/* Chart Selector */}
      <div className="flex space-x-1 mb-4 bg-muted p-1 rounded-lg">
        {charts?.map((chart) => (
          <button
            key={chart?.id}
            onClick={() => setActiveChart(chart?.id)}
            className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeChart === chart?.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={chart?.icon} size={14} />
            <span className="hidden sm:inline">{chart?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart Content */}
      {renderChart()}
      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
          Key Insights
        </h4>
        <div className="space-y-2 text-sm">
          {activeChart === 'velocity' && (
            <>
              <p className="text-muted-foreground">• Team velocity has improved by 58% over the last 6 sprints</p>
              <p className="text-muted-foreground">• Most consistent performance in Sprint 4 and 5</p>
              <p className="text-muted-foreground">• Current trajectory suggests 40+ points capacity next sprint</p>
            </>
          )}
          {activeChart === 'blockers' && (
            <>
              <p className="text-muted-foreground">• Technical debt accounts for 38% of all blockers</p>
              <p className="text-muted-foreground">• Dependency issues are the second most common blocker</p>
              <p className="text-muted-foreground">• Resource constraints have decreased significantly</p>
            </>
          )}
          {activeChart === 'attendance' && (
            <>
              <p className="text-muted-foreground">• Average attendance is 90% across all standups</p>
              <p className="text-muted-foreground">• Thursday shows the highest attendance rate</p>
              <p className="text-muted-foreground">• Monday attendance tends to be lower than other days</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricalDataPanel;