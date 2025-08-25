import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ className = '' }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Start Sprint',
      iconName: 'Play',
      variant: 'default',
      onClick: () => navigate('/sprint-planning')
    },
    {
      label: 'Add Story',
      iconName: 'Plus',
      variant: 'outline',
      onClick: () => navigate('/backlog-grooming')
    },
    {
      label: 'Daily Standup',
      iconName: 'Users',
      variant: 'outline',
      onClick: () => navigate('/daily-standups')
    },
    {
      label: 'View Reports',
      iconName: 'BarChart3',
      variant: 'outline',
      onClick: () => navigate('/reports')
    }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.iconName}
            iconPosition="left"
            fullWidth
            onClick={action?.onClick}
            className="justify-start"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;