import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BacklogFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    epic: '',
    priority: '',
    status: '',
    assignee: '',
    storyPoints: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const epicOptions = [
    { value: '', label: 'All Epics' },
    { value: 'user-auth', label: 'User Authentication' },
    { value: 'payment', label: 'Payment Integration' },
    { value: 'mobile', label: 'Mobile App Features' },
    { value: 'analytics', label: 'Analytics Dashboard' },
    { value: 'notifications', label: 'Notification System' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'ready', label: 'Ready for Sprint' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'done', label: 'Done' }
  ];

  const assigneeOptions = [
    { value: '', label: 'All Assignees' },
    { value: 'sarah-chen', label: 'Sarah Chen' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'alex-rodriguez', label: 'Alex Rodriguez' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const storyPointOptions = [
    { value: '', label: 'All Story Points' },
    { value: '1', label: '1 Point' },
    { value: '2', label: '2 Points' },
    { value: '3', label: '3 Points' },
    { value: '5', label: '5 Points' },
    { value: '8', label: '8 Points' },
    { value: '13', label: '13 Points' },
    { value: 'unestimated', label: 'Unestimated' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      epic: '',
      priority: '',
      status: '',
      assignee: '',
      storyPoints: ''
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search stories..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="col-span-full md:col-span-2"
        />
        
        <Select
          placeholder="Select Epic"
          options={epicOptions}
          value={filters?.epic}
          onChange={(value) => handleFilterChange('epic', value)}
        />
        
        <Select
          placeholder="Select Priority"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => handleFilterChange('priority', value)}
        />
      </div>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
          <Select
            placeholder="Select Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
          
          <Select
            placeholder="Select Assignee"
            options={assigneeOptions}
            value={filters?.assignee}
            onChange={(value) => handleFilterChange('assignee', value)}
          />
          
          <Select
            placeholder="Story Points"
            options={storyPointOptions}
            value={filters?.storyPoints}
            onChange={(value) => handleFilterChange('storyPoints', value)}
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
        <span>Showing 45 of 45 backlog items</span>
        <div className="flex items-center space-x-4">
          <span>Last updated: 2 minutes ago</span>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BacklogFilters;