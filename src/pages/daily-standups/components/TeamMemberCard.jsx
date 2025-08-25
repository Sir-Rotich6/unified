import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeamMemberCard = ({ member, onUpdateStatus, isLiveMode = false }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [tempContent, setTempContent] = useState('');

  const handleSectionToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleEditStart = (section, currentContent) => {
    setEditingSection(section);
    setTempContent(currentContent);
  };

  const handleEditSave = (section) => {
    onUpdateStatus(member?.id, section, tempContent);
    setEditingSection(null);
    setTempContent('');
  };

  const handleEditCancel = () => {
    setEditingSection(null);
    setTempContent('');
  };

  const sections = [
    {
      key: 'yesterday',
      title: 'Yesterday',
      icon: 'CheckCircle',
      content: member?.yesterday,
      color: 'text-success'
    },
    {
      key: 'today',
      title: 'Today',
      icon: 'Target',
      content: member?.today,
      color: 'text-primary'
    },
    {
      key: 'blockers',
      title: 'Blockers',
      icon: 'AlertTriangle',
      content: member?.blockers,
      color: 'text-error'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover-scale">
      {/* Member Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <Image
            src={member?.avatar}
            alt={member?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {isLiveMode && (
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              member?.isOnline ? 'bg-success' : 'bg-muted'
            }`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{member?.name}</h3>
          <p className="text-sm text-muted-foreground">{member?.role}</p>
        </div>
        <div className="flex items-center space-x-1">
          {member?.hasUpdated && (
            <Icon name="CheckCircle2" size={16} className="text-success" />
          )}
          <span className="text-xs text-muted-foreground">
            {member?.lastUpdate}
          </span>
        </div>
      </div>
      {/* Status Sections */}
      <div className="space-y-3">
        {sections?.map((section) => (
          <div key={section?.key} className="border border-border rounded-lg">
            <button
              onClick={() => handleSectionToggle(section?.key)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Icon 
                  name={section?.icon} 
                  size={16} 
                  className={section?.color}
                />
                <span className="font-medium text-sm">{section?.title}</span>
                {section?.key === 'blockers' && member?.blockersCount > 0 && (
                  <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
                    {member?.blockersCount}
                  </span>
                )}
              </div>
              <Icon 
                name={expandedSection === section?.key ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>

            {expandedSection === section?.key && (
              <div className="px-3 pb-3 border-t border-border">
                {editingSection === section?.key ? (
                  <div className="space-y-2 mt-2">
                    <textarea
                      value={tempContent}
                      onChange={(e) => setTempContent(e?.target?.value)}
                      className="w-full p-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      rows={3}
                      placeholder={`What did you work on ${section?.title?.toLowerCase()}?`}
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleEditSave(section?.key)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {section?.content || `No ${section?.title?.toLowerCase()} updates yet`}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit2"
                      iconPosition="left"
                      onClick={() => handleEditStart(section?.key, section?.content)}
                      className="mt-2"
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="flex space-x-2 mt-4 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          className="flex-1"
        >
          Comment
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Flag"
          iconPosition="left"
          className="flex-1"
        >
          Flag Issue
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberCard;