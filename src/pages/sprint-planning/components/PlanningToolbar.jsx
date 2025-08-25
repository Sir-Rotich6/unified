import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PlanningToolbar = ({
  sprintDuration,
  onSprintDurationChange,
  estimationMode,
  onEstimationModeChange,
  onStartPlanningPoker,
  onSaveSprint,
  isCollaborating
}) => {
  const durationOptions = [
    { value: 7, label: '1 Week (7 days)' },
    { value: 10, label: '2 Weeks (10 days)' },
    { value: 14, label: '2 Weeks (14 days)' },
    { value: 21, label: '3 Weeks (21 days)' }
  ];

  const estimationOptions = [
    { value: 'story-points', label: 'Story Points' },
    { value: 'hours', label: 'Hours' },
    { value: 't-shirt', label: 'T-Shirt Sizes' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Sprint Planning</h1>
          </div>
          
          {isCollaborating && (
            <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs font-medium text-success">
                3 team members active
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-3">
            <Select
              label=""
              placeholder="Sprint Duration"
              options={durationOptions}
              value={sprintDuration}
              onChange={onSprintDurationChange}
              className="w-40"
            />

            <Select
              label=""
              placeholder="Estimation Mode"
              options={estimationOptions}
              value={estimationMode}
              onChange={onEstimationModeChange}
              className="w-40"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Users"
              onClick={onStartPlanningPoker}
            >
              Planning Poker
            </Button>

            <Button
              variant="default"
              size="sm"
              iconName="Save"
              onClick={onSaveSprint}
            >
              Save Sprint
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">Sprint 24</div>
            <div className="text-xs text-muted-foreground">Current Sprint</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">85</div>
            <div className="text-xs text-muted-foreground">Team Velocity</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-warning">72%</div>
            <div className="text-xs text-muted-foreground">Capacity Used</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-success">12</div>
            <div className="text-xs text-muted-foreground">Items Planned</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningToolbar;