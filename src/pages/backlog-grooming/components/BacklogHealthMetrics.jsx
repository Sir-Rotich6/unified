import React from 'react';
import Icon from '../../../components/AppIcon';

const BacklogHealthMetrics = () => {
  const healthMetrics = [
    {
      id: 1,
      title: "Ready for Sprint",
      value: 23,
      total: 45,
      percentage: 51,
      status: "good",
      icon: "CheckCircle2",
      description: "Stories with complete acceptance criteria"
    },
    {
      id: 2,
      title: "Needs Estimation",
      value: 12,
      total: 45,
      percentage: 27,
      status: "warning",
      icon: "Clock",
      description: "Items requiring story point estimation"
    },
    {
      id: 3,
      title: "Missing Details",
      value: 8,
      total: 45,
      percentage: 18,
      status: "error",
      icon: "AlertTriangle",
      description: "Stories lacking acceptance criteria"
    },
    {
      id: 4,
      title: "Blocked Items",
      value: 2,
      total: 45,
      percentage: 4,
      status: "error",
      icon: "Ban",
      description: "Items with unresolved dependencies"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'good':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'error':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Backlog Health</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {healthMetrics?.map((metric) => (
          <div key={metric?.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={metric?.icon} 
                  size={16} 
                  className={getStatusColor(metric?.status)} 
                />
                <span className="text-sm font-medium text-foreground">
                  {metric?.title}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {metric?.value}/{metric?.total}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(metric?.status)}`}
                style={{ width: `${metric?.percentage}%` }}
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              {metric?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Health Score</span>
          <span className="font-semibold text-success">78%</span>
        </div>
      </div>
    </div>
  );
};

export default BacklogHealthMetrics;