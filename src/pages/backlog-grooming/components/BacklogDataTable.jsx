import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

import { Checkbox } from '../../../components/ui/Checkbox';

const BacklogDataTable = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'priority', direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState([]);
  const [editingCell, setEditingCell] = useState(null);

  const backlogItems = [
    {
      id: 1,
      priority: 1,
      title: "User Registration with Email Verification",
      epic: "User Authentication",
      storyPoints: 5,
      status: "ready",
      assignee: "Sarah Chen",
      lastUpdated: "2025-08-25",
      description: `As a new user, I want to register for an account using my email address so that I can access the platform.\n\nAcceptance Criteria:\n- User can enter email and password\n- Email verification is sent\n- Account is activated upon verification`,
      dependencies: ["Database setup", "Email service integration"],
      tags: ["authentication", "email", "security"]
    },
    {
      id: 2,
      priority: 2,
      title: "OAuth Integration (Google, GitHub)",
      epic: "User Authentication",
      storyPoints: 8,
      status: "in-progress",
      assignee: "Mike Johnson",
      lastUpdated: "2025-08-24",
      description: `As a user, I want to sign in using my Google or GitHub account so that I don't need to create a new password.\n\nAcceptance Criteria:\n- Google OAuth integration\n- GitHub OAuth integration\n- User profile sync`,
      dependencies: ["OAuth provider setup"],
      tags: ["oauth", "google", "github"]
    },
    {
      id: 3,
      priority: 3,
      title: "Password Reset Functionality",
      epic: "User Authentication",
      storyPoints: 3,
      status: "draft",
      assignee: "Alex Rodriguez",
      lastUpdated: "2025-08-23",
      description: `As a user, I want to reset my password if I forget it so that I can regain access to my account.\n\nAcceptance Criteria:\n- Password reset email\n- Secure reset token\n- New password validation`,
      dependencies: [],
      tags: ["password", "security", "email"]
    },
    {
      id: 4,
      priority: 4,
      title: "Payment Gateway Integration",
      epic: "Payment Integration",
      storyPoints: 13,
      status: "blocked",
      assignee: "Emily Davis",
      lastUpdated: "2025-08-22",
      description: `As a customer, I want to make secure payments using credit cards so that I can purchase products.\n\nAcceptance Criteria:\n- Stripe integration\n- Payment validation\n- Receipt generation`,
      dependencies: ["Legal approval", "PCI compliance"],
      tags: ["payment", "stripe", "security"]
    },
    {
      id: 5,
      priority: 5,
      title: "Mobile App Navigation",
      epic: "Mobile App Features",
      storyPoints: 2,
      status: "ready",
      assignee: "Sarah Chen",
      lastUpdated: "2025-08-21",
      description: `As a mobile user, I want intuitive navigation so that I can easily access different sections of the app.\n\nAcceptance Criteria:\n- Bottom tab navigation\n- Smooth transitions\n- Accessibility support`,
      dependencies: [],
      tags: ["mobile", "navigation", "ux"]
    }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'ready', label: 'Ready' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'done', label: 'Done' }
  ];

  const storyPointOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '5', label: '5' },
    { value: '8', label: '8' },
    { value: '13', label: '13' }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'ready':
        return `${baseClasses} bg-success/10 text-success`;
      case 'in-progress':
        return `${baseClasses} bg-primary/10 text-primary`;
      case 'blocked':
        return `${baseClasses} bg-error/10 text-error`;
      case 'draft':
        return `${baseClasses} bg-muted text-muted-foreground`;
      case 'done':
        return `${baseClasses} bg-accent/10 text-accent`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const getPriorityColor = (priority) => {
    if (priority <= 2) return 'text-error';
    if (priority <= 4) return 'text-warning';
    return 'text-success';
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(backlogItems?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems?.filter(id => id !== itemId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleExpandRow = (itemId) => {
    if (expandedRows?.includes(itemId)) {
      setExpandedRows(expandedRows?.filter(id => id !== itemId));
    } else {
      setExpandedRows([...expandedRows, itemId]);
    }
  };

  const handleCellEdit = (itemId, field, value) => {
    console.log(`Editing item ${itemId}, field ${field}, value ${value}`);
    setEditingCell(null);
  };

  const SortableHeader = ({ children, sortKey, className = "" }) => (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortConfig?.key === sortKey && (
          <Icon 
            name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left">
                <Checkbox
                  checked={selectedItems?.length === backlogItems?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <SortableHeader sortKey="priority">Priority</SortableHeader>
              <SortableHeader sortKey="title" className="min-w-[300px]">Story Title</SortableHeader>
              <SortableHeader sortKey="epic">Epic</SortableHeader>
              <SortableHeader sortKey="storyPoints">Points</SortableHeader>
              <SortableHeader sortKey="status">Status</SortableHeader>
              <SortableHeader sortKey="assignee">Assignee</SortableHeader>
              <SortableHeader sortKey="lastUpdated">Last Updated</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {backlogItems?.map((item) => (
              <React.Fragment key={item?.id}>
                <tr className={`hover:bg-muted/50 transition-colors ${selectedItems?.includes(item?.id) ? 'bg-primary/5' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={selectedItems?.includes(item?.id)}
                      onChange={(e) => handleSelectItem(item?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getPriorityColor(item?.priority)}`}>
                        #{item?.priority}
                      </span>
                      <button
                        onClick={() => handleExpandRow(item?.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Icon 
                          name={expandedRows?.includes(item?.id) ? 'ChevronDown' : 'ChevronRight'} 
                          size={16} 
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <h4 className="font-medium text-foreground text-sm leading-tight">
                        {item?.title}
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item?.tags?.slice(0, 2)?.map((tag) => (
                          <span 
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {item?.tags?.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{item?.tags?.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{item?.epic}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingCell === `${item?.id}-points` ? (
                      <Select
                        options={storyPointOptions}
                        value={item?.storyPoints?.toString()}
                        onChange={(value) => handleCellEdit(item?.id, 'storyPoints', value)}
                        className="w-20"
                      />
                    ) : (
                      <button
                        onClick={() => setEditingCell(`${item?.id}-points`)}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
                      >
                        {item?.storyPoints}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(item?.status)}>
                      {item?.status?.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {item?.assignee?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">{item?.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {item?.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Edit2">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                        More
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {expandedRows?.includes(item?.id) && (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 bg-muted/25">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-foreground mb-2">Description & Acceptance Criteria</h5>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {item?.description}
                          </p>
                        </div>
                        
                        {item?.dependencies?.length > 0 && (
                          <div>
                            <h5 className="font-medium text-foreground mb-2">Dependencies</h5>
                            <div className="flex flex-wrap gap-2">
                              {item?.dependencies?.map((dep, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-warning/10 text-warning"
                                >
                                  <Icon name="Link" size={12} className="mr-1" />
                                  {dep}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" iconName="Split">
                              Split Story
                            </Button>
                            <Button variant="outline" size="sm" iconName="Copy">
                              Duplicate
                            </Button>
                            <Button variant="outline" size="sm" iconName="MessageSquare">
                              Add Comment
                            </Button>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Created: 2025-08-20 • Modified: {item?.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-border bg-muted/25">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {selectedItems?.length} of {backlogItems?.length} items selected
            </span>
            {selectedItems?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Edit">
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm" iconName="Archive">
                  Archive
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="ChevronLeft" disabled>
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">Page 1 of 1</span>
            <Button variant="ghost" size="sm" iconName="ChevronRight" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacklogDataTable;