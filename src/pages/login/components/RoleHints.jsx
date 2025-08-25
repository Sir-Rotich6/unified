import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleHints = () => {
  const roles = [
    {
      name: 'Scrum Master',
      icon: 'Users',
      description: 'Team coordination & sprint management',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      name: 'Developer',
      icon: 'Code',
      description: 'Sprint tracking & task management',
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      name: 'Product Owner',
      icon: 'Target',
      description: 'Backlog prioritization & insights',
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  return (
    <div className="mt-8">
      <p className="text-sm text-muted-foreground text-center mb-4">
        Role-based access for agile teams
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {roles?.map((role) => (
          <div
            key={role?.name}
            className={`p-3 rounded-lg border text-center ${role?.color}`}
          >
            <div className="flex items-center justify-center mb-2">
              <Icon name={role?.icon} size={16} />
            </div>
            <p className="text-xs font-medium mb-1">{role?.name}</p>
            <p className="text-xs opacity-80">{role?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleHints;