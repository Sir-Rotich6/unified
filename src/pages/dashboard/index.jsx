import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import SummaryCard from './components/SummaryCard';
import BurndownChart from './components/BurndownChart';
import VelocityChart from './components/VelocityChart';
import TeamPerformanceChart from './components/TeamPerformanceChart';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import UpcomingReminders from './components/UpcomingReminders';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for summary cards
  const summaryData = [
    {
      title: 'Active Sprints',
      value: '3',
      subtitle: '2 in progress, 1 planning',
      iconName: 'Zap',
      trend: 'neutral',
      trendValue: '0%',
      color: 'primary'
    },
    {
      title: 'Backlog Items',
      value: '127',
      subtitle: '23 ready for sprint',
      iconName: 'List',
      trend: 'up',
      trendValue: '+12%',
      color: 'success'
    },
    {
      title: 'Team Velocity',
      value: '48',
      subtitle: 'Story points per sprint',
      iconName: 'TrendingUp',
      trend: 'up',
      trendValue: '+8%',
      color: 'warning'
    },
    {
      title: 'Upcoming Deadlines',
      value: '5',
      subtitle: 'Next 7 days',
      iconName: 'Clock',
      trend: 'down',
      trendValue: '-2',
      color: 'error'
    }
  ];

  // Mock data for charts and components
  const mockChartData = [
    { date: '2024-01-01', planned: 100, actual: 95 },
    { date: '2024-01-02', planned: 85, actual: 88 },
    { date: '2024-01-03', planned: 70, actual: 75 }
  ];

  const mockActivities = [
    { 
      id: 1, 
      type: 'sprint', 
      message: 'Sprint 12 completed', 
      timestamp: new Date()?.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    { 
      id: 2, 
      type: 'task', 
      message: 'New task assigned to John', 
      timestamp: new Date()?.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  ];

  const mockReminders = [
    { 
      id: 1, 
      title: 'Sprint Review Meeting', 
      date: new Date()?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }), 
      time: '2:00 PM',
      priority: 'high',
      type: 'review',
      attendees: 8
    },
    { 
      id: 2, 
      title: 'Release Planning', 
      date: new Date(Date.now() + 86400000)?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }), 
      time: '10:30 AM',
      priority: 'medium',
      type: 'planning',
      attendees: 6
    }
  ];

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would update the theme context
  };

  const formatLastUpdated = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your agile projects.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="RefreshCw" size={16} />
                <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors focus-ring"
                aria-label="Toggle dark mode"
              >
                <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
              </button>
            </div>
          </div>

          {/* Summary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryData?.map((card, index) => (
              <SummaryCard
                key={index}
                title={card?.title}
                value={card?.value}
                subtitle={card?.subtitle}
                iconName={card?.iconName}
                trend={card?.trend}
                trendValue={card?.trendValue}
                color={card?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BurndownChart data={mockChartData} />
            <VelocityChart data={mockChartData} />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Team Performance */}
            <div className="lg:col-span-1">
              <TeamPerformanceChart data={mockChartData} />
            </div>
            
            {/* Middle Column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed activities={mockActivities} />
            </div>
            
            {/* Right Column - Quick Actions & Reminders */}
            <div className="lg:col-span-1 space-y-6">
              <QuickActions />
              <UpcomingReminders reminders={mockReminders} />
            </div>
          </div>

          {/* Mobile Chart Carousel Indicator */}
          <div className="lg:hidden mt-8 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-muted rounded-full"></div>
            <div className="w-2 h-2 bg-muted rounded-full"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;