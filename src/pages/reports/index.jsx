import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import ReportFilters from './components/ReportFilters';
import BurndownChart from './components/BurndownChart';
import VelocityChart from './components/VelocityChart';
import CycleTimeChart from './components/CycleTimeChart';
import TeamProductivityChart from './components/TeamProductivityChart';
import KeyPerformanceIndicators from './components/KeyPerformanceIndicators';
import ReportScheduling from './components/ReportScheduling';
import AIInsights from './components/AIInsights';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Reports = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    dateRange: 'current-sprint',
    team: 'all-teams',
    project: 'all-projects',
    customDateFrom: null,
    customDateTo: null
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Reports - Unified Agile Project Management';
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFiltersChange = (newFilters) => {
    setCurrentFilters(newFilters);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExportReport = (format) => {
    console.log(`Exporting report in ${format} format with filters:`, currentFilters);
    // Handle export logic
  };

  const handleShareReport = () => {
    console.log('Sharing report with current filters:', currentFilters);
    // Handle share logic
  };

  const mainContentClass = `
    transition-all duration-300 ease-in-out
    ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
    pt-16 lg:pt-0 pb-16 lg:pb-0
  `;

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={handleSidebarToggle} 
      />
      
      <main className={mainContentClass}>
        <div className="p-4 lg:p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Reports & Analytics
              </h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive insights and performance metrics for data-driven agile management
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Share"
                iconPosition="left"
                onClick={handleShareReport}
              >
                Share
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={() => handleExportReport('pdf')}
              >
                Export PDF
              </Button>
            </div>
          </div>

          {/* Filters Section */}
          <ReportFilters 
            onFiltersChange={handleFiltersChange}
            className="w-full"
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg p-6 shadow-elevation-3 flex items-center space-x-3">
                <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                <span className="text-foreground">Updating reports...</span>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Charts Section - 3 columns on desktop */}
            <div className="xl:col-span-3 space-y-6">
              {/* Top Row Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BurndownChart />
                <VelocityChart />
              </div>
              
              {/* Bottom Row Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CycleTimeChart />
                <TeamProductivityChart />
              </div>

              {/* AI Insights - Full Width */}
              <AIInsights />
            </div>

            {/* Sidebar Section - 1 column on desktop */}
            <div className="xl:col-span-1 space-y-6">
              <KeyPerformanceIndicators />
              <ReportScheduling />
            </div>
          </div>

          {/* Additional Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-card rounded-lg border border-border">
            <div>
              <h3 className="font-semibold text-foreground">Need more detailed analysis?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Access advanced reporting features and custom dashboard creation
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button variant="outline" iconName="BarChart3" iconPosition="left">
                Custom Dashboard
              </Button>
              <Button variant="default" iconName="Zap" iconPosition="left">
                Advanced Analytics
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;