import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities, className = '' }) => {
  const mockActivities = [
    {
      id: 1,
      type: 'commit',
      user: 'Sarah Chen',
      action: 'pushed 3 commits to feature/user-auth',
      timestamp: '2 minutes ago',
      icon: 'GitCommit',
      color: 'success'
    },
    {
      id: 2,
      type: 'task',
      user: 'Mike Johnson',
      action: 'completed task "Implement login validation"',
      timestamp: '15 minutes ago',
      icon: 'CheckCircle',
      color: 'primary'
    },
    {
      id: 3,
      type: 'comment',
      user: 'Alex Rodriguez',
      action: 'commented on PR #142',
      timestamp: '1 hour ago',
      icon: 'MessageCircle',
      color: 'warning'
    },
    {
      id: 4,
      type: 'sprint',
      user: 'Emma Wilson',
      action: 'started Sprint 7 planning session',
      timestamp: '2 hours ago',
      icon: 'Calendar',
      color: 'secondary'
    },
    {
      id: 5,
      type: 'merge',
      user: 'David Kim',
      action: 'merged PR #138 into main branch',
      timestamp: '3 hours ago',
      icon: 'GitMerge',
      color: 'success'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      secondary: 'bg-secondary/10 text-secondary'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {(activities || mockActivities)?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getColorClasses(activity?.color)}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity?.user}</span>{' '}
                {activity?.action}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity?.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;