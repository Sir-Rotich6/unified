import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIInsights = ({ className = '' }) => {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const insights = [
    {
      id: 1,
      type: 'prediction',
      title: 'Sprint Completion Forecast',
      confidence: 92,
      priority: 'high',
      icon: 'TrendingUp',
      summary: 'Current sprint likely to complete 2 days early based on velocity trends',
      details: `Based on the current team velocity of 52 story points and remaining work of 8 points, the AI Scrum Master predicts sprint completion by Day 9 instead of Day 11.\n\nKey factors:\n• 15% increase in velocity over last 3 sprints\n• Reduced cycle time from 5.2 to 4.1 days\n• No critical blockers identified\n\nRecommendation: Consider pulling additional stories from the backlog to maximize sprint value.`,
      actionable: true,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'risk',
      title: 'Technical Debt Alert',
      confidence: 87,
      priority: 'medium',
      icon: 'AlertTriangle',
      summary: 'Code complexity increasing in authentication module',
      details: `The AI analysis has detected increasing technical debt in the authentication module with a 23% rise in cyclomatic complexity over the past month.\n\nRisk indicators:\n• 15 new code smells introduced\n• Test coverage dropped from 92% to 87%\n• 3 critical security vulnerabilities detected\n\nImpact: Potential 40% increase in bug resolution time if not addressed.\n\nRecommended actions:\n• Schedule refactoring sprint\n• Implement additional unit tests\n• Conduct security audit`,
      actionable: true,
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'Team Performance Optimization',
      confidence: 78,
      priority: 'low',
      icon: 'Lightbulb',
      summary: 'Frontend team showing potential for 20% velocity increase',
      details: `Machine learning analysis suggests the Frontend team has capacity for increased throughput based on recent performance patterns.\n\nOptimization opportunities:\n• Pair programming sessions reduced bug count by 35%\n• Code review efficiency improved with automated tools\n• Team collaboration score increased to 90/100\n\nPredicted outcomes:\n• 20% velocity increase within 2 sprints\n• 15% reduction in rework\n• Improved code quality metrics\n\nNext steps: Implement similar practices across other teams.`,
      actionable: false,
      timestamp: '1 day ago'
    },
    {
      id: 4,
      type: 'anomaly',
      title: 'Unusual Bug Pattern Detected',
      confidence: 95,
      priority: 'high',
      icon: 'AlertCircle',
      summary: 'Spike in UI-related bugs in mobile application',
      details: `Anomaly detection algorithms have identified an unusual pattern in bug reports for the mobile application.\n\nPattern analysis:\n• 300% increase in UI-related bugs over past week\n• 85% of issues related to responsive design\n• Correlation with recent CSS framework update\n\nRoot cause analysis:\n• Breaking changes in CSS framework v3.2.1\n• Insufficient regression testing coverage\n• Missing mobile-specific test scenarios\n\nImmediate actions required:\n• Rollback CSS framework update\n• Implement comprehensive mobile testing\n• Review deployment pipeline`,
      actionable: true,
      timestamp: '30 minutes ago'
    }
  ];

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: 'text-error bg-error/10 border-error/20',
      medium: 'text-warning bg-warning/10 border-warning/20',
      low: 'text-success bg-success/10 border-success/20'
    };
    return colorMap?.[priority] || 'text-muted-foreground bg-muted border-border';
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      prediction: 'Crystal',
      risk: 'AlertTriangle',
      opportunity: 'Lightbulb',
      anomaly: 'AlertCircle'
    };
    return iconMap?.[type] || 'Info';
  };

  const handleInsightClick = (insight) => {
    setSelectedInsight(selectedInsight?.id === insight?.id ? null : insight);
  };

  const handleTakeAction = (insightId) => {
    console.log('Taking action for insight:', insightId);
    // Handle action logic
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Scrum Master Insights</h3>
          <p className="text-sm text-muted-foreground">Intelligent analysis and recommendations</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">AI Active</span>
          </div>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {insights?.map((insight) => (
          <div key={insight?.id} className="border border-border rounded-lg overflow-hidden">
            <div 
              className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleInsightClick(insight)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPriorityColor(insight?.priority)}`}>
                    <Icon name={getTypeIcon(insight?.type)} size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{insight?.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(insight?.priority)}`}>
                        {insight?.priority}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{insight?.summary}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Confidence: {insight?.confidence}%</span>
                      <span>{insight?.timestamp}</span>
                      {insight?.actionable && (
                        <span className="text-primary font-medium">Actionable</span>
                      )}
                    </div>
                  </div>
                </div>
                <Icon 
                  name={selectedInsight?.id === insight?.id ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  className="text-muted-foreground"
                />
              </div>
            </div>

            {selectedInsight?.id === insight?.id && (
              <div className="px-4 pb-4 border-t border-border bg-muted/20">
                <div className="pt-4">
                  <div className="prose prose-sm max-w-none">
                    <div className="text-sm text-foreground whitespace-pre-line">
                      {insight?.details}
                    </div>
                  </div>
                  
                  {insight?.actionable && (
                    <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="BookOpen"
                        iconPosition="left"
                      >
                        Learn More
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Play"
                        iconPosition="left"
                        onClick={() => handleTakeAction(insight?.id)}
                      >
                        Take Action
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Cpu" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              AI analysis updated every 15 minutes
            </span>
          </div>
          <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
            Configure AI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;