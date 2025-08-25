import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const KeyPerformanceIndicators = ({ className = '' }) => {
  const kpiData = [
    {
      id: 1,
      title: 'Sprint Success Rate',
      value: '94%',
      change: '+2.3%',
      trend: 'up',
      icon: 'Target',
      color: 'success',
      description: 'Sprints completed successfully'
    },
    {
      id: 2,
      title: 'Team Velocity',
      value: '52',
      change: '+8.1%',
      trend: 'up',
      icon: 'Zap',
      color: 'primary',
      description: 'Story points per sprint'
    },
    {
      id: 3,
      title: 'Bug Resolution Time',
      value: '2.4 days',
      change: '-15%',
      trend: 'up',
      icon: 'Bug',
      color: 'accent',
      description: 'Average time to resolve bugs'
    },
    {
      id: 4,
      title: 'Code Coverage',
      value: '87%',
      change: '+3.2%',
      trend: 'up',
      icon: 'Shield',
      color: 'warning',
      description: 'Test coverage percentage'
    },
    {
      id: 5,
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      icon: 'Star',
      color: 'success',
      description: 'User feedback rating'
    },
    {
      id: 6,
      title: 'Technical Debt',
      value: '12%',
      change: '-5%',
      trend: 'up',
      icon: 'AlertTriangle',
      color: 'error',
      description: 'Code quality issues'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary/10',
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-error bg-error/10',
      accent: 'text-accent bg-accent/10'
    };
    return colorMap?.[color] || 'text-muted-foreground bg-muted';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Key Performance Indicators</h3>
          <p className="text-sm text-muted-foreground">Real-time project metrics</p>
        </div>
        <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
          Refresh
        </Button>
      </div>
      <div className="space-y-4">
        {kpiData?.map((kpi) => (
          <div key={kpi?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(kpi?.color)}`}>
                <Icon name={kpi?.icon} size={20} />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{kpi?.title}</h4>
                <p className="text-sm text-muted-foreground">{kpi?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-foreground">{kpi?.value}</p>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={kpi?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className={getTrendColor(kpi?.trend)}
                />
                <span className={`text-sm font-medium ${getTrendColor(kpi?.trend)}`}>
                  {kpi?.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last updated</span>
          <span className="text-foreground font-medium">2 minutes ago</span>
        </div>
      </div>
    </div>
  );
};

export default KeyPerformanceIndicators;