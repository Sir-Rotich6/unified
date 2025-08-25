import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingGroomingSessions = () => {
  const upcomingSessions = [
    {
      id: 1,
      title: "Epic: User Authentication",
      date: "2025-08-26",
      time: "10:00 AM",
      duration: "2 hours",
      attendees: 6,
      status: "scheduled",
      priority: "high",
      facilitator: "Sarah Chen"
    },
    {
      id: 2,
      title: "Payment Integration Stories",
      date: "2025-08-27",
      time: "2:00 PM",
      duration: "1.5 hours",
      attendees: 4,
      status: "scheduled",
      priority: "medium",
      facilitator: "Mike Johnson"
    },
    {
      id: 3,
      title: "Mobile App Features",
      date: "2025-08-28",
      time: "11:00 AM",
      duration: "3 hours",
      attendees: 8,
      status: "tentative",
      priority: "low",
      facilitator: "Alex Rodriguez"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'scheduled':
        return `${baseClasses} bg-success/10 text-success`;
      case 'tentative':
        return `${baseClasses} bg-warning/10 text-warning`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Sessions</h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {upcomingSessions?.map((session) => (
          <div key={session?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
                  {session?.title}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{session?.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{session?.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name="Flag" 
                  size={14} 
                  className={getPriorityColor(session?.priority)} 
                />
                <span className={getStatusBadge(session?.status)}>
                  {session?.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Users" size={14} />
                  <span>{session?.attendees} attendees</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Timer" size={14} />
                  <span>{session?.duration}</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                by {session?.facilitator}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-primary hover:text-primary/80 transition-colors">
          <Icon name="Plus" size={16} />
          <span>Schedule New Session</span>
        </button>
      </div>
    </div>
  );
};

export default UpcomingGroomingSessions;