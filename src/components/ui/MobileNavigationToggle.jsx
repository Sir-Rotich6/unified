import React from 'react';
import Icon from '../AppIcon';

const MobileNavigationToggle = ({ 
  isOpen = false, 
  onToggle, 
  className = '' 
}) => {
  return (
    <button
      className={`
        lg:hidden flex items-center justify-center w-10 h-10
        text-muted-foreground hover:text-foreground hover:bg-muted
        rounded-lg transition-all duration-150 ease-out focus-ring
        ${className}
      `}
      onClick={onToggle}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
    >
      <Icon 
        name={isOpen ? 'X' : 'Menu'} 
        size={20} 
      />
    </button>
  );
};

export default MobileNavigationToggle;