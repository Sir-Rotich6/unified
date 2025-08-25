import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: "Bulk Estimate",
      description: "Add story points to multiple items",
      icon: "Calculator",
      action: "estimate",
      color: "text-primary"
    },
    {
      id: 2,
      title: "Epic Assignment",
      description: "Assign stories to epics",
      icon: "Layers",
      action: "assign",
      color: "text-accent"
    },
    {
      id: 3,
      title: "Priority Reorder",
      description: "Bulk priority adjustments",
      icon: "ArrowUpDown",
      action: "reorder",
      color: "text-warning"
    },
    {
      id: 4,
      title: "Sprint Ready",
      description: "Mark items as sprint ready",
      icon: "CheckCircle",
      action: "ready",
      color: "text-success"
    }
  ];

  const bulkOperations = [
    {
      id: 1,
      name: "Move to Backlog",
      icon: "Archive",
      count: 0
    },
    {
      id: 2,
      name: "Delete Selected",
      icon: "Trash2",
      count: 0,
      destructive: true
    },
    {
      id: 3,
      name: "Export Items",
      icon: "Download",
      count: 0
    }
  ];

  const handleQuickAction = (action) => {
    console.log(`Executing quick action: ${action}`);
  };

  const handleBulkOperation = (operation) => {
    console.log(`Executing bulk operation: ${operation}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 mb-6">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleQuickAction(action?.action)}
            className="w-full flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
          >
            <div className={`flex-shrink-0 ${action?.color}`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm">
                {action?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {action?.description}
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>
      <div className="border-t border-border pt-6">
        <h4 className="font-medium text-foreground mb-4 text-sm">Bulk Operations</h4>
        <div className="space-y-2">
          {bulkOperations?.map((operation) => (
            <Button
              key={operation?.id}
              variant={operation?.destructive ? "destructive" : "outline"}
              size="sm"
              fullWidth
              iconName={operation?.icon}
              iconPosition="left"
              onClick={() => handleBulkOperation(operation?.name)}
              disabled={operation?.count === 0}
              className="justify-start"
            >
              <span className="flex-1 text-left">{operation?.name}</span>
              {operation?.count > 0 && (
                <span className="text-xs opacity-70">({operation?.count})</span>
              )}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Selected Items</span>
          <span className="font-medium text-foreground">0 of 45</span>
        </div>
        <div className="mt-2 w-full bg-muted rounded-full h-1">
          <div className="h-1 bg-primary rounded-full" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;