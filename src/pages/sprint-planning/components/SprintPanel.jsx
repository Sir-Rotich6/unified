import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SprintPanel = ({ 
  sprintItems, 
  teamCapacity, 
  sprintDuration, 
  onRemoveFromSprint,
  onDragOver,
  onDrop 
}) => {
  const [showBurndown, setShowBurndown] = useState(false);

  const totalPlannedPoints = sprintItems?.reduce((sum, item) => sum + item?.storyPoints, 0);
  const capacityUtilization = (totalPlannedPoints / teamCapacity?.totalPoints) * 100;

  const burndownData = [
    { day: 'Day 1', planned: totalPlannedPoints, actual: totalPlannedPoints },
    { day: 'Day 2', planned: totalPlannedPoints * 0.9, actual: totalPlannedPoints * 0.85 },
    { day: 'Day 3', planned: totalPlannedPoints * 0.8, actual: totalPlannedPoints * 0.75 },
    { day: 'Day 4', planned: totalPlannedPoints * 0.7, actual: totalPlannedPoints * 0.65 },
    { day: 'Day 5', planned: totalPlannedPoints * 0.6, actual: totalPlannedPoints * 0.55 },
    { day: 'Day 6', planned: totalPlannedPoints * 0.5, actual: totalPlannedPoints * 0.45 },
    { day: 'Day 7', planned: totalPlannedPoints * 0.4, actual: totalPlannedPoints * 0.35 },
    { day: 'Day 8', planned: totalPlannedPoints * 0.3, actual: totalPlannedPoints * 0.25 },
    { day: 'Day 9', planned: totalPlannedPoints * 0.2, actual: totalPlannedPoints * 0.15 },
    { day: 'Day 10', planned: totalPlannedPoints * 0.1, actual: totalPlannedPoints * 0.05 },
    { day: 'Day 11', planned: 0, actual: 0 }
  ];

  const getCapacityColor = () => {
    if (capacityUtilization > 100) return 'text-error';
    if (capacityUtilization > 85) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Sprint Planning</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={showBurndown ? "default" : "outline"}
              size="sm"
              iconName="TrendingUp"
              onClick={() => setShowBurndown(!showBurndown)}
            >
              Burndown
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-xs font-medium text-foreground">Duration</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {sprintDuration} days
            </span>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-xs font-medium text-foreground">Team Capacity</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {teamCapacity?.totalPoints} pts
            </span>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Target" size={16} className={getCapacityColor()} />
              <span className="text-xs font-medium text-foreground">Utilization</span>
            </div>
            <span className={`text-sm font-semibold ${getCapacityColor()}`}>
              {capacityUtilization?.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">
              Capacity Progress
            </span>
            <span className="text-xs text-muted-foreground">
              {totalPlannedPoints} / {teamCapacity?.totalPoints} points
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                capacityUtilization > 100 
                  ? 'bg-error' 
                  : capacityUtilization > 85 
                    ? 'bg-warning' :'bg-success'
              }`}
              style={{ width: `${Math.min(capacityUtilization, 100)}%` }}
            />
          </div>
        </div>
      </div>
      {showBurndown ? (
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Projected Burndown Chart
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={burndownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="planned" fill="var(--color-muted)" name="Planned" />
                <Bar dataKey="actual" fill="var(--color-primary)" name="Projected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div
          className="flex-1 overflow-y-auto p-4"
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          {sprintItems?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Icon name="Package" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                No items in sprint
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                Drag items from the backlog or use the "Add" button to start planning your sprint
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sprintItems?.map((item, index) => (
                <div
                  key={item?.id}
                  className="p-4 border border-border rounded-lg bg-card hover:shadow-elevation-1 transition-all duration-150"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          #{index + 1}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {item?.id}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground text-sm leading-tight">
                          {item?.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {item?.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-3">
                      <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-full">
                        <Icon name="Zap" size={12} className="text-primary" />
                        <span className="text-xs font-medium text-primary">
                          {item?.storyPoints}
                        </span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="X"
                        onClick={() => onRemoveFromSprint(item?.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={item?.assignee?.avatar}
                        alt={item?.assignee?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-muted-foreground">
                        {item?.assignee?.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item?.dependencies?.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Link" size={12} className="text-warning" />
                          <span className="text-xs text-warning">
                            {item?.dependencies?.length} deps
                          </span>
                        </div>
                      )}
                      
                      <span className="text-xs text-muted-foreground">
                        Est: {item?.estimatedHours}h
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SprintPanel;