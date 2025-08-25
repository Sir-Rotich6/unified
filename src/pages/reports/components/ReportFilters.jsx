import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const ReportFilters = ({ onFiltersChange, className = '' }) => {
  const [selectedDateRange, setSelectedDateRange] = useState('current-sprint');
  const [selectedTeam, setSelectedTeam] = useState('all-teams');
  const [selectedProject, setSelectedProject] = useState('all-projects');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');

  const dateRangeOptions = [
    { value: 'current-sprint', label: 'Current Sprint' },
    { value: 'last-sprint', label: 'Last Sprint' },
    { value: 'current-quarter', label: 'Current Quarter' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const teamOptions = [
    { value: 'all-teams', label: 'All Teams' },
    { value: 'frontend-team', label: 'Frontend Team' },
    { value: 'backend-team', label: 'Backend Team' },
    { value: 'mobile-team', label: 'Mobile Team' },
    { value: 'devops-team', label: 'DevOps Team' },
    { value: 'qa-team', label: 'QA Team' }
  ];

  const projectOptions = [
    { value: 'all-projects', label: 'All Projects' },
    { value: 'unified-platform', label: 'Unified Platform' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'api-gateway', label: 'API Gateway' },
    { value: 'analytics-dashboard', label: 'Analytics Dashboard' },
    { value: 'user-portal', label: 'User Portal' }
  ];

  const handleApplyFilters = () => {
    const filters = {
      dateRange: selectedDateRange,
      team: selectedTeam,
      project: selectedProject,
      customDateFrom: selectedDateRange === 'custom' ? customDateFrom : null,
      customDateTo: selectedDateRange === 'custom' ? customDateTo : null
    };
    
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  const handleResetFilters = () => {
    setSelectedDateRange('current-sprint');
    setSelectedTeam('all-teams');
    setSelectedProject('all-projects');
    setCustomDateFrom('');
    setCustomDateTo('');
    
    if (onFiltersChange) {
      onFiltersChange({
        dateRange: 'current-sprint',
        team: 'all-teams',
        project: 'all-projects',
        customDateFrom: null,
        customDateTo: null
      });
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Report Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={selectedDateRange}
          onChange={setSelectedDateRange}
        />

        <Select
          label="Team"
          options={teamOptions}
          value={selectedTeam}
          onChange={setSelectedTeam}
        />

        <Select
          label="Project"
          options={projectOptions}
          value={selectedProject}
          onChange={setSelectedProject}
        />
      </div>
      {selectedDateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-muted rounded-lg">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              From Date
            </label>
            <input
              type="date"
              value={customDateFrom}
              onChange={(e) => setCustomDateFrom(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              To Date
            </label>
            <input
              type="date"
              value={customDateTo}
              onChange={(e) => setCustomDateTo(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-end space-x-3">
        <Button
          variant="outline"
          iconName="Filter"
          iconPosition="left"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
        >
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;