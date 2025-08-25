import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import BacklogHealthMetrics from './components/BacklogHealthMetrics';
import UpcomingGroomingSessions from './components/UpcomingGroomingSessions';
import QuickActionPanel from './components/QuickActionPanel';
import BacklogFilters from './components/BacklogFilters';
import BacklogDataTable from './components/BacklogDataTable';
import AIInsightsPanel from './components/AIInsightsPanel';

import Button from '../../components/ui/Button';

const BacklogGrooming = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('table'); // table, kanban, list

  useEffect(() => {
    document.title = 'Backlog Grooming - Unified';
  }, []);

  const handleToggleNavigation = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleExportBacklog = () => {
    console.log('Exporting backlog data...');
  };

  const handleImportStories = () => {
    console.log('Importing stories...');
  };

  const handleCreateStory = () => {
    console.log('Creating new story...');
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation 
        isCollapsed={isNavCollapsed} 
        onToggleCollapse={handleToggleNavigation} 
      />
      
      <main className={`
        transition-all duration-300 ease-in-out
        lg:ml-${isNavCollapsed ? '16' : '60'}
        pt-16 lg:pt-0 pb-16 lg:pb-0
      `}>
        <div className="p-4 lg:p-6 max-w-full">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Backlog Grooming
              </h1>
              <p className="text-muted-foreground">
                Refine, prioritize, and maintain your product backlog for optimal sprint planning
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Table"
                  onClick={() => handleViewModeChange('table')}
                >
                  Table
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Columns"
                  onClick={() => handleViewModeChange('kanban')}
                >
                  Kanban
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="List"
                  onClick={() => handleViewModeChange('list')}
                >
                  List
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  iconName="Download"
                  onClick={handleExportBacklog}
                >
                  Export
                </Button>
                <Button
                  variant="outline"
                  iconName="Upload"
                  onClick={handleImportStories}
                >
                  Import
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  onClick={handleCreateStory}
                >
                  New Story
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Sidebar - Metrics and Actions */}
            <div className="xl:col-span-3 space-y-6">
              <BacklogHealthMetrics />
              <UpcomingGroomingSessions />
              <QuickActionPanel />
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-9 space-y-6">
              {/* AI Insights Panel */}
              <AIInsightsPanel />
              
              {/* Filters */}
              <BacklogFilters onFiltersChange={handleFiltersChange} />
              
              {/* Data Table */}
              <BacklogDataTable />
            </div>
          </div>

          {/* Mobile-specific bottom spacing */}
          <div className="h-4 lg:hidden" />
        </div>
      </main>
    </div>
  );
};

export default BacklogGrooming;