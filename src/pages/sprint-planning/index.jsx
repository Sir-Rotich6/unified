import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import BacklogPanel from './components/BacklogPanel';
import SprintPanel from './components/SprintPanel';
import PlanningToolbar from './components/PlanningToolbar';
import PlanningPokerModal from './components/PlanningPokerModal';
import TeamCapacityPanel from './components/TeamCapacityPanel';

const SprintPlanning = () => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sprintItems, setSprintItems] = useState([]);
  const [sprintDuration, setSprintDuration] = useState(14);
  const [estimationMode, setEstimationMode] = useState('story-points');
  const [isPlanningPokerOpen, setIsPlanningPokerOpen] = useState(false);
  const [currentPokerItem, setCurrentPokerItem] = useState(null);
  const [showCapacityPanel, setShowCapacityPanel] = useState(false);

  // Mock data for backlog items
  const [backlogItems] = useState([
    {
      id: "US-001",
      title: "User Authentication System",
      description: "Implement secure user login and registration with JWT tokens and password encryption",
      storyPoints: 8,
      priority: "High",
      assignee: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      estimatedHours: 32,
      acceptanceCriteria: [
        "User can register with email and password",
        "User can login with valid credentials",
        "JWT tokens are properly generated and validated",
        "Password reset functionality works"
      ],
      dependencies: [],
      aiComplexity: "This story involves security considerations and multiple integration points. Estimated complexity is moderate to high due to authentication flows and token management."
    },
    {
      id: "US-002", 
      title: "Dashboard Analytics Widget",
      description: "Create interactive dashboard with real-time analytics and data visualization components",
      storyPoints: 13,
      priority: "Medium",
      assignee: {
        name: "Mike Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      estimatedHours: 40,
      acceptanceCriteria: [
        "Dashboard displays key metrics in real-time",
        "Charts are interactive and responsive",
        "Data refreshes automatically every 30 seconds",
        "Export functionality for reports"
      ],
      dependencies: ["US-001"],
      aiComplexity: "Complex story requiring real-time data handling and advanced visualization. Consider breaking into smaller components for better estimation accuracy."
    },
    {
      id: "US-003",
      title: "Mobile Responsive Navigation",
      description: "Optimize navigation menu for mobile devices with touch-friendly interactions",
      storyPoints: 5,
      priority: "High",
      assignee: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      estimatedHours: 20,
      acceptanceCriteria: [
        "Navigation works on all mobile screen sizes",
        "Touch gestures are properly implemented",
        "Menu animations are smooth",
        "Accessibility standards are met"
      ],
      dependencies: [],
      aiComplexity: "Straightforward UI enhancement with well-defined requirements. Low to moderate complexity with clear acceptance criteria."
    },
    {
      id: "US-004",
      title: "API Integration Layer",
      description: "Build robust API integration with error handling and retry mechanisms",
      storyPoints: 21,
      priority: "High",
      assignee: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg"
      },
      estimatedHours: 60,
      acceptanceCriteria: [
        "All API endpoints are properly integrated",
        "Error handling covers all edge cases",
        "Retry logic with exponential backoff",
        "Comprehensive logging and monitoring"
      ],
      dependencies: ["US-001"],
      aiComplexity: "High complexity story involving multiple external dependencies and error scenarios. Recommend thorough technical design before implementation."
    },
    {
      id: "US-005",
      title: "User Profile Management",
      description: "Allow users to update profile information, preferences, and account settings",
      storyPoints: 8,
      priority: "Medium",
      assignee: {
        name: "Lisa Wang",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      estimatedHours: 28,
      acceptanceCriteria: [
        "Users can edit personal information",
        "Profile picture upload functionality",
        "Preference settings are saved",
        "Account deactivation option"
      ],
      dependencies: ["US-001"],
      aiComplexity: "Standard CRUD operations with file upload. Moderate complexity with straightforward implementation path."
    },
    {
      id: "US-006",
      title: "Search and Filter System",
      description: "Implement advanced search with filters, sorting, and pagination",
      storyPoints: 13,
      priority: "Low",
      assignee: {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg"
      },
      estimatedHours: 45,
      acceptanceCriteria: [
        "Full-text search functionality",
        "Multiple filter options",
        "Sort by various criteria",
        "Pagination with performance optimization"
      ],
      dependencies: ["US-004"],
      aiComplexity: "Complex search implementation requiring database optimization and UI/UX considerations. Consider performance implications for large datasets."
    }
  ]);

  // Mock team members data
  const [teamMembers] = useState([
    {
      id: "member-1",
      name: "Sarah Chen",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      capacity: 40,
      availability: 100,
      dailyHours: 8,
      timeOff: []
    },
    {
      id: "member-2", 
      name: "Mike Rodriguez",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      capacity: 35,
      availability: 90,
      dailyHours: 7,
      timeOff: [{ start: "Dec 23", end: "Dec 27" }]
    },
    {
      id: "member-3",
      name: "Emma Thompson",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      capacity: 30,
      availability: 80,
      dailyHours: 6,
      timeOff: []
    },
    {
      id: "current-user",
      name: "You",
      role: "Scrum Master",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      capacity: 25,
      availability: 100,
      dailyHours: 8,
      timeOff: []
    }
  ]);

  const teamCapacity = {
    totalPoints: teamMembers?.reduce((sum, member) => sum + member?.capacity, 0),
    totalHours: teamMembers?.reduce((sum, member) => sum + (member?.dailyHours * sprintDuration), 0)
  };

  const handleDragStart = (e, item) => {
    e?.dataTransfer?.setData('application/json', JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    const item = JSON.parse(e?.dataTransfer?.getData('application/json'));
    handleAddToSprint(item);
  };

  const handleAddToSprint = (item) => {
    if (!sprintItems?.find(sprintItem => sprintItem?.id === item?.id)) {
      setSprintItems(prev => [...prev, item]);
    }
  };

  const handleRemoveFromSprint = (itemId) => {
    setSprintItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleStartPlanningPoker = () => {
    if (selectedItem) {
      setCurrentPokerItem(selectedItem);
      setIsPlanningPokerOpen(true);
    } else if (sprintItems?.length > 0) {
      setCurrentPokerItem(sprintItems?.[0]);
      setIsPlanningPokerOpen(true);
    }
  };

  const handleEstimationComplete = (itemId, estimate) => {
    setSprintItems(prev => 
      prev?.map(item => 
        item?.id === itemId 
          ? { ...item, storyPoints: estimate }
          : item
      )
    );
  };

  const handleSaveSprint = () => {
    // Mock save functionality
    console.log('Sprint saved with items:', sprintItems);
    alert('Sprint saved successfully!');
  };

  const handleCapacityUpdate = (newCapacities) => {
    // Mock capacity update
    console.log('Capacity updated:', newCapacities);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsNavigationCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation 
        isCollapsed={isNavigationCollapsed}
        onToggleCollapse={() => setIsNavigationCollapsed(!isNavigationCollapsed)}
      />
      
      <main className={`
        pt-16 lg:pt-0 pb-16 lg:pb-0 transition-all duration-300 ease-in-out
        ${isNavigationCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      `}>
        <div className="p-4 lg:p-6 space-y-6">
          <PlanningToolbar
            sprintDuration={sprintDuration}
            onSprintDurationChange={setSprintDuration}
            estimationMode={estimationMode}
            onEstimationModeChange={setEstimationMode}
            onStartPlanningPoker={handleStartPlanningPoker}
            onSaveSprint={handleSaveSprint}
            isCollaborating={true}
          />

          {showCapacityPanel && (
            <TeamCapacityPanel
              teamMembers={teamMembers}
              onCapacityUpdate={handleCapacityUpdate}
              sprintDuration={sprintDuration}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)] lg:h-[calc(100vh-160px)]">
            <div className="lg:col-span-5">
              <BacklogPanel
                backlogItems={backlogItems}
                onDragStart={handleDragStart}
                onItemSelect={setSelectedItem}
                selectedItem={selectedItem}
                onAddToSprint={handleAddToSprint}
              />
            </div>

            <div className="lg:col-span-7">
              <SprintPanel
                sprintItems={sprintItems}
                teamCapacity={teamCapacity}
                sprintDuration={sprintDuration}
                onRemoveFromSprint={handleRemoveFromSprint}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setShowCapacityPanel(!showCapacityPanel)}
              className="w-full p-3 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              {showCapacityPanel ? 'Hide' : 'Show'} Team Capacity
            </button>
          </div>
        </div>
      </main>

      <PlanningPokerModal
        isOpen={isPlanningPokerOpen}
        onClose={() => setIsPlanningPokerOpen(false)}
        currentItem={currentPokerItem}
        teamMembers={teamMembers}
        onEstimationComplete={handleEstimationComplete}
      />
    </div>
  );
};

export default SprintPlanning;