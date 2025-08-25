import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderBrand = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <div 
      className={`flex items-center cursor-pointer hover-scale ${className}`}
      onClick={handleLogoClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary-foreground"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-foreground leading-none">
            Unified
          </span>
          <span className="text-xs text-muted-foreground leading-none mt-0.5">
            Agile Project Management
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderBrand;