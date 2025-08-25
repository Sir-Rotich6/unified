import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationItem = ({ 
  label, 
  path, 
  iconName, 
  tooltip, 
  isCollapsed = false,
  isMobile = false,
  className = '' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location?.pathname === path;

  const handleClick = () => {
    navigate(path);
  };

  const baseClasses = `
    flex items-center transition-all duration-150 ease-out cursor-pointer
    focus-ring rounded-lg group relative
  `;

  const desktopClasses = isCollapsed 
    ? 'w-12 h-12 justify-center p-3' 
    : 'px-3 py-3 space-x-3';

  const mobileClasses = 'flex-col space-y-1 p-2 min-w-0';

  const activeClasses = isActive 
    ? 'bg-primary text-primary-foreground' 
    : 'text-muted-foreground hover:text-foreground hover:bg-muted';

  const itemClasses = `
    ${baseClasses}
    ${isMobile ? mobileClasses : desktopClasses}
    ${activeClasses}
    ${className}
  `;

  return (
    <div
      className={itemClasses}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          e?.preventDefault();
          handleClick();
        }
      }}
      aria-label={tooltip || label}
      title={tooltip || label}
    >
      <Icon 
        name={iconName} 
        size={isMobile ? 20 : 20} 
        className="flex-shrink-0"
      />
      {(!isCollapsed || isMobile) && (
        <span className={`
          font-medium text-sm leading-none
          ${isMobile ? 'text-xs text-center' : ''}
          ${isCollapsed && !isMobile ? 'sr-only' : ''}
        `}>
          {label}
        </span>
      )}
      {isCollapsed && !isMobile && tooltip && (
        <div className="
          absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground
          text-xs rounded shadow-elevation-2 opacity-0 group-hover:opacity-100
          transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap
        ">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default NavigationItem;