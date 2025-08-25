import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TeamCapacityPanel = ({ 
  teamMembers, 
  onCapacityUpdate, 
  sprintDuration 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCapacities, setEditingCapacities] = useState({});

  const handleEditStart = () => {
    setIsEditing(true);
    const capacities = {};
    teamMembers?.forEach(member => {
      capacities[member.id] = member?.capacity;
    });
    setEditingCapacities(capacities);
  };

  const handleCapacityChange = (memberId, capacity) => {
    setEditingCapacities(prev => ({
      ...prev,
      [memberId]: parseInt(capacity) || 0
    }));
  };

  const handleSave = () => {
    onCapacityUpdate(editingCapacities);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingCapacities({});
  };

  const totalCapacity = teamMembers?.reduce((sum, member) => sum + member?.capacity, 0);
  const averageCapacity = Math.round(totalCapacity / teamMembers?.length);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Team Capacity</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <Button variant="outline" size="sm" iconName="Edit" onClick={handleEditStart}>
              Edit
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="default" size="sm" iconName="Save" onClick={handleSave}>
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {teamMembers?.map((member) => (
          <div
            key={member?.id}
            className="bg-muted/30 rounded-lg p-3 border border-border"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Image
                src={member?.avatar}
                alt={member?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">
                  {member?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {member?.role}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Capacity</span>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editingCapacities?.[member?.id] || member?.capacity}
                    onChange={(e) => handleCapacityChange(member?.id, e?.target?.value)}
                    className="w-16 h-8 text-xs"
                    min="0"
                    max="100"
                  />
                ) : (
                  <span className="text-sm font-semibold text-foreground">
                    {member?.capacity} pts
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Availability</span>
                <span className="text-xs text-foreground">
                  {member?.availability}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Daily Hours</span>
                <span className="text-xs text-foreground">
                  {member?.dailyHours}h
                </span>
              </div>

              {member?.timeOff && member?.timeOff?.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center space-x-1 mb-1">
                    <Icon name="Calendar" size={12} className="text-warning" />
                    <span className="text-xs text-warning">Time Off</span>
                  </div>
                  {member?.timeOff?.map((timeOff, index) => (
                    <div key={index} className="text-xs text-muted-foreground">
                      {timeOff?.start} - {timeOff?.end}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-primary">
              {totalCapacity}
            </div>
            <div className="text-xs text-muted-foreground">
              Total Capacity
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-foreground">
              {averageCapacity}
            </div>
            <div className="text-xs text-muted-foreground">
              Avg per Member
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-foreground">
              {sprintDuration}
            </div>
            <div className="text-xs text-muted-foreground">
              Sprint Days
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-success">
              {Math.round(totalCapacity / sprintDuration)}
            </div>
            <div className="text-xs text-muted-foreground">
              Daily Velocity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCapacityPanel;