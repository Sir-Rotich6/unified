import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import TeamMemberCard from './components/TeamMemberCard';
import MeetingToolbar from './components/MeetingToolbar';
import SprintProgressPanel from './components/SprintProgressPanel';
import MeetingNotesPanel from './components/MeetingNotesPanel';
import HistoricalDataPanel from './components/HistoricalDataPanel';
import Icon from '../../components/AppIcon';


const DailyStandups = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedView, setSelectedView] = useState('meeting');
  const [notes, setNotes] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  // Mock team members data
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      role: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      hasUpdated: true,
      lastUpdate: "2 min ago",
      yesterday: "Completed the user authentication flow and fixed responsive issues on the login page. Reviewed pull requests from the team.",
      today: "Working on the dashboard components and integrating with the new API endpoints. Planning to finish the data visualization charts.",
      blockers: "Waiting for API documentation update from backend team. The new endpoints are not fully documented yet.",
      blockersCount: 1
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Backend Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      hasUpdated: true,
      lastUpdate: "5 min ago",
      yesterday: "Implemented the new user management API endpoints and optimized database queries for better performance.",
      today: "Finalizing API documentation and working on the notification service integration. Will deploy to staging environment.",
      blockers: "",
      blockersCount: 0
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      hasUpdated: false,
      lastUpdate: "1 hour ago",
      yesterday: "Created wireframes for the new reporting dashboard and conducted user testing sessions with 5 participants.",
      today: "Refining the dashboard design based on user feedback and creating high-fidelity mockups for development handoff.",
      blockers: "Need clarification on data visualization requirements from product team.",
      blockersCount: 1
    },
    {
      id: 4,
      name: "David Kim",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      hasUpdated: true,
      lastUpdate: "10 min ago",
      yesterday: "Set up CI/CD pipeline for the new microservice and configured monitoring alerts for production environment.",
      today: "Working on container optimization and implementing automated backup solutions. Planning infrastructure scaling.",
      blockers: "Cloud provider having intermittent issues affecting deployment times.",
      blockersCount: 1
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "QA Engineer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      hasUpdated: true,
      lastUpdate: "3 min ago",
      yesterday: "Executed regression testing for the authentication module and documented 3 critical bugs found during testing.",
      today: "Creating automated test scripts for the new API endpoints and planning performance testing scenarios.",
      blockers: "Test environment is unstable, affecting automated test execution.",
      blockersCount: 1
    },
    {
      id: 6,
      name: "Alex Johnson",
      role: "Product Owner",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      hasUpdated: false,
      lastUpdate: "30 min ago",
      yesterday: "Reviewed sprint progress with stakeholders and prioritized backlog items for next sprint planning session.",
      today: "Meeting with customer success team to gather feedback and updating user stories based on recent requirements.",
      blockers: "",
      blockersCount: 0
    }
  ]);

  // Mock sprint data
  const sprintData = {
    completion: 68,
    completed: 27,
    remaining: 13,
    daysLeft: 4
  };

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "API Documentation",
      description: "Complete REST API documentation",
      daysLeft: 1,
      assignee: "Marcus R."
    },
    {
      id: 2,
      title: "User Testing Report",
      description: "Finalize usability testing findings",
      daysLeft: 2,
      assignee: "Emily W."
    },
    {
      id: 3,
      title: "Sprint Demo",
      description: "Prepare demo for stakeholders",
      daysLeft: 3,
      assignee: "Alex J."
    }
  ];

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleToggleLiveMode = () => {
    setIsLiveMode(!isLiveMode);
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const handleUpdateStatus = (memberId, section, content) => {
    setTeamMembers(prev => prev?.map(member => 
      member?.id === memberId 
        ? { 
            ...member, 
            [section]: content,
            hasUpdated: true,
            lastUpdate: "Just now",
            blockersCount: section === 'blockers' ? (content ? 1 : 0) : member?.blockersCount
          }
        : member
    ));
  };

  const handleAddNote = (noteText) => {
    const newNote = {
      id: Date.now(),
      text: noteText,
      author: "You",
      timestamp: new Date()?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    setNotes(prev => [...prev, newNote]);
  };

  const handleAddActionItem = (actionItem) => {
    const newActionItem = {
      id: Date.now(),
      ...actionItem
    };
    setActionItems(prev => [...prev, newActionItem]);
  };

  const handleToggleActionItem = (itemId) => {
    setActionItems(prev => prev?.map(item =>
      item?.id === itemId ? { ...item, completed: !item?.completed } : item
    ));
  };

  const handleSendSlackSummary = () => {
    // Mock Slack integration
    alert('Standup summary sent to #daily-standup channel!');
  };

  const attendanceCount = teamMembers?.filter(member => member?.isOnline)?.length;
  const totalMembers = teamMembers?.length;

  const views = [
    { id: 'meeting', label: 'Meeting View', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation 
        isCollapsed={isNavCollapsed} 
        onToggleCollapse={handleNavToggle} 
      />
      <main className={`transition-all duration-300 ease-in-out pt-16 pb-16 lg:pb-0 ${
        isNavCollapsed ? 'lg:pl-16' : 'lg:pl-60'
      }`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Daily Standups
              </h1>
              <p className="text-muted-foreground">
                Streamline team coordination and track progress across your agile workflow
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 lg:mt-0">
              <div className="flex bg-muted p-1 rounded-lg">
                {views?.map((view) => (
                  <button
                    key={view?.id}
                    onClick={() => setSelectedView(view?.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedView === view?.id
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={view?.icon} size={16} />
                    <span className="hidden sm:inline">{view?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedView === 'meeting' ? (
            <>
              {/* Meeting Toolbar */}
              <MeetingToolbar
                isLiveMode={isLiveMode}
                onToggleLiveMode={handleToggleLiveMode}
                attendanceCount={attendanceCount}
                totalMembers={totalMembers}
                onStartVoiceInput={handleVoiceToggle}
                isVoiceActive={isVoiceActive}
              />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Left Panel - Sprint Progress */}
                <div className="xl:col-span-1">
                  <SprintProgressPanel 
                    sprintData={sprintData}
                    upcomingDeadlines={upcomingDeadlines}
                  />
                </div>

                {/* Center Panel - Team Members */}
                <div className="xl:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers?.map((member) => (
                      <TeamMemberCard
                        key={member?.id}
                        member={member}
                        onUpdateStatus={handleUpdateStatus}
                        isLiveMode={isLiveMode}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Panel - Meeting Notes */}
                <div className="xl:col-span-1">
                  <MeetingNotesPanel
                    notes={notes}
                    actionItems={actionItems}
                    onAddNote={handleAddNote}
                    onAddActionItem={handleAddActionItem}
                    onToggleActionItem={handleToggleActionItem}
                    onSendSlackSummary={handleSendSlackSummary}
                  />
                </div>
              </div>
            </>
          ) : (
            /* Analytics View */
            (<div className="space-y-6">
              <HistoricalDataPanel />
              {/* Additional Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Meeting Time</p>
                      <p className="text-2xl font-bold text-foreground">12:34</p>
                    </div>
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <p className="text-xs text-success mt-2">-2:15 from last week</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Blockers</p>
                      <p className="text-2xl font-bold text-foreground">4</p>
                    </div>
                    <Icon name="AlertTriangle" size={24} className="text-warning" />
                  </div>
                  <p className="text-xs text-error mt-2">+1 from yesterday</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Team Participation</p>
                      <p className="text-2xl font-bold text-foreground">94%</p>
                    </div>
                    <Icon name="Users" size={24} className="text-success" />
                  </div>
                  <p className="text-xs text-success mt-2">+3% from last sprint</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Action Items</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                    <Icon name="CheckSquare" size={24} className="text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">8 completed this week</p>
                </div>
              </div>
            </div>)
          )}
        </div>
      </main>
    </div>
  );
};

export default DailyStandups;