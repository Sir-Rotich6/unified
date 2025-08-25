import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const aiSuggestions = [
    {
      id: 1,
      type: "estimation",
      priority: "high",
      title: "Story Points Missing",
      description: "3 high-priority stories need estimation before next sprint",
      items: ["User Registration", "OAuth Integration", "Password Reset"],
      action: "Estimate Now",
      icon: "Calculator"
    },
    {
      id: 2,
      type: "dependency",
      priority: "medium",
      title: "Dependency Conflict",
      description: "Payment Gateway story blocked by pending legal approval",
      items: ["Payment Gateway Integration"],
      action: "Review Dependencies",
      icon: "AlertTriangle"
    },
    {
      id: 3,
      type: "refinement",
      priority: "low",
      title: "Acceptance Criteria",
      description: "2 stories lack detailed acceptance criteria",
      items: ["Mobile Navigation", "User Profile"],
      action: "Add Criteria",
      icon: "FileText"
    },
    {
      id: 4,
      type: "optimization",
      priority: "medium",
      title: "Story Splitting Opportunity",
      description: "Large story (13 points) could be split for better velocity",
      items: ["Payment Gateway Integration"],
      action: "Split Story",
      icon: "Split"
    }
  ];

  const backlogInsights = {
    totalStories: 45,
    readyForSprint: 23,
    needsEstimation: 12,
    blocked: 2,
    averageStoryPoints: 5.2,
    velocityTrend: "increasing",
    completionRate: 78
  };

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

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10';
      case 'medium':
        return 'bg-warning/10';
      case 'low':
        return 'bg-success/10';
      default:
        return 'bg-muted';
    }
  };

  const handleSuggestionAction = (suggestion) => {
    console.log(`Executing AI suggestion: ${suggestion?.action}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Icon name="Brain" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Scrum Master</h3>
            <p className="text-xs text-muted-foreground">Intelligent backlog insights</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {isExpanded && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sprint Ready</span>
                <span className="text-sm font-medium text-success">
                  {backlogInsights?.readyForSprint}/{backlogInsights?.totalStories}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Needs Estimation</span>
                <span className="text-sm font-medium text-warning">
                  {backlogInsights?.needsEstimation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Blocked Items</span>
                <span className="text-sm font-medium text-error">
                  {backlogInsights?.blocked}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Story Points</span>
                <span className="text-sm font-medium text-foreground">
                  {backlogInsights?.averageStoryPoints}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Velocity Trend</span>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success capitalize">
                    {backlogInsights?.velocityTrend}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Health Score</span>
                <span className="text-sm font-medium text-success">
                  {backlogInsights?.completionRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground text-sm">AI Recommendations</h4>
            {aiSuggestions?.map((suggestion) => (
              <div 
                key={suggestion?.id}
                className={`p-4 rounded-lg border border-border ${getPriorityBg(suggestion?.priority)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={suggestion?.icon} 
                      size={16} 
                      className={getPriorityColor(suggestion?.priority)} 
                    />
                    <div>
                      <h5 className="font-medium text-foreground text-sm">
                        {suggestion?.title}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        {suggestion?.description}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityBg(suggestion?.priority)} ${getPriorityColor(suggestion?.priority)}`}>
                    {suggestion?.priority}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestion?.items?.map((item, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionAction(suggestion)}
                  >
                    {suggestion?.action}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="ThumbsUp">
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm" iconName="X">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Zap" size={14} />
                <span>AI analysis updated 5 minutes ago</span>
              </div>
              <Button variant="ghost" size="sm" iconName="RefreshCw">
                Refresh Insights
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIInsightsPanel;