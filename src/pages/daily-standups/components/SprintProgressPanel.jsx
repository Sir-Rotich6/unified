import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const SprintProgressPanel = ({ sprintData, upcomingDeadlines }) => {
  const burndownData = [
    { day: 'Day 1', remaining: 45, ideal: 45 },
    { day: 'Day 2', remaining: 42, ideal: 40 },
    { day: 'Day 3', remaining: 38, ideal: 35 },
    { day: 'Day 4', remaining: 35, ideal: 30 },
    { day: 'Day 5', remaining: 30, ideal: 25 },
    { day: 'Day 6', remaining: 28, ideal: 20 },
    { day: 'Day 7', remaining: 22, ideal: 15 },
    { day: 'Day 8', remaining: 18, ideal: 10 },
    { day: 'Day 9', remaining: 12, ideal: 5 },
    { day: 'Day 10', remaining: 8, ideal: 0 }
  ];

  const getDeadlineUrgency = (daysLeft) => {
    if (daysLeft <= 1) return { color: 'text-error', bg: 'bg-error/10', icon: 'AlertTriangle' };
    if (daysLeft <= 3) return { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' };
    return { color: 'text-muted-foreground', bg: 'bg-muted/50', icon: 'Calendar' };
  };

  return (
    <div className="space-y-6">
      {/* Sprint Overview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Target" size={20} className="mr-2 text-primary" />
          Sprint Progress
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Completion</span>
            <span className="font-semibold text-foreground">{sprintData?.completion}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${sprintData?.completion}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Completed</span>
              <p className="font-semibold text-success">{sprintData?.completed}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Remaining</span>
              <p className="font-semibold text-foreground">{sprintData?.remaining}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Days Left</span>
              <span className="font-semibold text-foreground">{sprintData?.daysLeft}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Burndown Mini Chart */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="TrendingDown" size={20} className="mr-2 text-primary" />
          Burndown Chart
        </h3>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={burndownData?.slice(-5)}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis hide />
              <Bar dataKey="remaining" radius={[2, 2, 0, 0]}>
                {burndownData?.slice(-5)?.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry?.remaining > entry?.ideal ? 'var(--color-warning)' : 'var(--color-primary)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>Behind Schedule</span>
          <span>On Track</span>
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-primary" />
          Upcoming Deadlines
        </h3>
        
        <div className="space-y-3">
          {upcomingDeadlines?.map((deadline) => {
            const urgency = getDeadlineUrgency(deadline?.daysLeft);
            return (
              <div key={deadline?.id} className={`p-3 rounded-lg ${urgency?.bg}`}>
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={urgency?.icon} 
                    size={16} 
                    className={`mt-0.5 ${urgency?.color}`} 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {deadline?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {deadline?.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs font-medium ${urgency?.color}`}>
                        {deadline?.daysLeft === 0 ? 'Due Today' : 
                         deadline?.daysLeft === 1 ? 'Due Tomorrow' : 
                         `${deadline?.daysLeft} days left`}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {deadline?.assignee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Team Velocity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-primary" />
          Team Velocity
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Sprint</span>
            <span className="font-semibold text-foreground">32 pts</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Average (3 sprints)</span>
            <span className="font-semibold text-muted-foreground">28 pts</span>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Trend</span>
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-sm font-semibold text-success">+14%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintProgressPanel;