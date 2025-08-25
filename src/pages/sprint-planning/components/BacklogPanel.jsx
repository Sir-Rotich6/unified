import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BacklogPanel = ({ 
  backlogItems, 
  onDragStart, 
  onItemSelect, 
  selectedItem,
  onAddToSprint 
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [filterPriority, setFilterPriority] = useState('all');

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(itemId)) {
      newExpanded?.delete(itemId);
    } else {
      newExpanded?.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredItems = filterPriority === 'all' 
    ? backlogItems 
    : backlogItems?.filter(item => item?.priority?.toLowerCase() === filterPriority);

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Product Backlog</h2>
          <span className="text-sm text-muted-foreground">
            {filteredItems?.length} items
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredItems?.map((item) => (
          <div
            key={item?.id}
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            onClick={() => onItemSelect(item)}
            className={`
              p-4 border border-border rounded-lg cursor-pointer transition-all duration-150
              hover:shadow-elevation-1 hover:border-primary/20 bg-card
              ${selectedItem?.id === item?.id ? 'ring-2 ring-primary border-primary' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex items-center space-x-2">
                  <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {item?.id}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-foreground text-sm leading-tight">
                    {item?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item?.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-3">
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${getPriorityColor(item?.priority)}
                `}>
                  {item?.priority}
                </span>
                
                <div className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-full">
                  <Icon name="Zap" size={12} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {item?.storyPoints}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src={item?.assignee?.avatar}
                  alt={item?.assignee?.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs text-muted-foreground">
                  {item?.assignee?.name}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    toggleExpanded(item?.id);
                  }}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <Icon 
                    name={expandedItems?.has(item?.id) ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                </button>
                
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Plus"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onAddToSprint(item);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            {expandedItems?.has(item?.id) && (
              <div className="mt-3 pt-3 border-t border-border space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-foreground mb-2">
                    Acceptance Criteria
                  </h4>
                  <ul className="space-y-1">
                    {item?.acceptanceCriteria?.map((criteria, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Check" size={12} className="text-success mt-0.5" />
                        <span className="text-xs text-muted-foreground">
                          {criteria}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {item?.dependencies?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-foreground mb-2">
                      Dependencies
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {item?.dependencies?.map((dep) => (
                        <span
                          key={dep}
                          className="px-2 py-1 text-xs bg-warning/10 text-warning rounded-full"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item?.aiComplexity && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Brain" size={14} className="text-primary" />
                      <span className="text-xs font-medium text-primary">
                        AI Complexity Analysis
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item?.aiComplexity}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BacklogPanel;