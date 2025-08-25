import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import HeaderBrand from './HeaderBrand';
import MobileNavigationToggle from './MobileNavigationToggle';


const MainNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Login',
      path: '/login',
      iconName: 'LogIn',
      tooltip: 'Sign in to your account'
    },
    {
      label: 'Dashboard',
      path: '/dashboard',
      iconName: 'LayoutDashboard',
      tooltip: 'Central command center with real-time insights'
    },
    {
      label: 'Sprint Planning',
      path: '/sprint-planning',
      iconName: 'Calendar',
      tooltip: 'Collaborative sprint setup and backlog estimation'
    },
    {
      label: 'Backlog Grooming',
      path: '/backlog-grooming',
      iconName: 'List',
      tooltip: 'Product backlog refinement and prioritization'
    },
    {
      label: 'Daily Standups',
      path: '/daily-standups',
      iconName: 'Users',
      tooltip: 'Team coordination and progress tracking'
    },
    {
      label: 'Reports',
      path: '/reports',
      iconName: 'BarChart3',
      tooltip: 'Comprehensive analytics and performance insights'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-1000">
        <div className="flex items-center justify-between h-full px-4 lg:px-6 max-w-7xl mx-auto">
          <HeaderBrand />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <NavigationItem
                key={item?.path}
                label={item?.label}
                path={item?.path}
                iconName={item?.iconName}
                tooltip={item?.tooltip}
                isCollapsed={false}
                isMobile={false}
                className="px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              />
            ))}
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <MobileNavigationToggle 
              isOpen={isMobileMenuOpen}
              onToggle={handleMobileToggle}
            />
          </div>
        </div>
      </header>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-900">
        <div className="flex items-center justify-around h-full px-2">
          {navigationItems?.slice(0, 5)?.map((item) => (
            <NavigationItem
              key={item?.path}
              label={item?.label}
              path={item?.path}
              iconName={item?.iconName}
              tooltip={item?.tooltip}
              isCollapsed={false}
              isMobile={true}
              className="flex-1"
            />
          ))}
        </div>
      </nav>
      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-950">
          <div 
            className="absolute inset-0 bg-black/20" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-lg">
            <nav className="p-4 space-y-2">
              {navigationItems?.map((item) => (
                <NavigationItem
                  key={item?.path}
                  label={item?.label}
                  path={item?.path}
                  iconName={item?.iconName}
                  tooltip={item?.tooltip}
                  isCollapsed={false}
                  isMobile={false}
                  className="w-full px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                />
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavigation;