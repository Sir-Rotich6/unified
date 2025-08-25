import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingReminders = ({ reminders, className = '' }) => {
  const mockReminders = [
    {
      id: 1,
      title: 'Daily Standup',
      time: '9:00 AM',
      date: 'Today',
      type: 'meeting',
      priority: 'high',
      attendees: 8
    },
    {
      id: 2,
      title: 'Sprint Review',
      time: '2:00 PM',
      date: 'Tomorrow',
      type: 'review',
      priority: 'medium',
      attendees: 12
    },
    {
      id: 3,
      title: 'Backlog Grooming',
      time: '10:30 AM',
      date: 'Dec 27',
      type: 'planning',
      priority: 'medium',
      attendees: 6
    },
    {
      id: 4,
      title: 'Sprint Retrospective',
      time: '3:30 PM',
      date: 'Dec 28',
      type: 'retrospective',
      priority: 'high',
      attendees: 8
    }
  ];

  const getTypeIcon = (type) => {
    const icons = {
      meeting: 'Users',
      review: 'Eye',
      planning: 'Calendar',
      retrospective: 'RotateCcw'
    };
    return icons?.[type] || 'Calendar';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colors?.[priority] || colors?.medium;
  };

  const formatDate = (date) => {
    if (!date) return '';
    
    // If it's already a string, return it
    if (typeof date === 'string') return date;
    
    // If it's a Date object, format it
    if (date instanceof Date) {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
    
    return '';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {(reminders || mockReminders)?.map((reminder) => (
          <div key={reminder?.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getPriorityColor(reminder?.priority)}`}>
              <Icon name={getTypeIcon(reminder?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {reminder?.title}
                </h4>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatDate(reminder?.date)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {reminder?.time}
                </p>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={12} />
                  <span>{reminder?.attendees}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingReminders;