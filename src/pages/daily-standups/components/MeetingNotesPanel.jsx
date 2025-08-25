import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MeetingNotesPanel = ({ 
  notes, 
  actionItems, 
  onAddNote, 
  onAddActionItem, 
  onToggleActionItem,
  onSendSlackSummary 
}) => {
  const [newNote, setNewNote] = useState('');
  const [newActionItem, setNewActionItem] = useState('');
  const [newActionAssignee, setNewActionAssignee] = useState('');
  const [activeTab, setActiveTab] = useState('notes');

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onAddNote(newNote?.trim());
      setNewNote('');
    }
  };

  const handleAddActionItem = () => {
    if (newActionItem?.trim() && newActionAssignee?.trim()) {
      onAddActionItem({
        text: newActionItem?.trim(),
        assignee: newActionAssignee?.trim(),
        completed: false,
        createdAt: new Date()?.toISOString()
      });
      setNewActionItem('');
      setNewActionAssignee('');
    }
  };

  const tabs = [
    { id: 'notes', label: 'Notes', icon: 'FileText' },
    { id: 'actions', label: 'Action Items', icon: 'CheckSquare' },
    { id: 'slack', label: 'Slack Integration', icon: 'MessageSquare' }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-card border border-border rounded-lg">
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4">
          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Add a meeting note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleAddNote()}
                />
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleAddNote}
                  disabled={!newNote?.trim()}
                  fullWidth
                >
                  Add Note
                </Button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notes?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="FileText" size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notes yet</p>
                    <p className="text-xs">Add notes during the meeting</p>
                  </div>
                ) : (
                  notes?.map((note) => (
                    <div key={note?.id} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-foreground">{note?.text}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>{note?.author}</span>
                        <span>{note?.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Action Items Tab */}
          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="What needs to be done?"
                  value={newActionItem}
                  onChange={(e) => setNewActionItem(e?.target?.value)}
                />
                <Input
                  type="text"
                  placeholder="Assign to..."
                  value={newActionAssignee}
                  onChange={(e) => setNewActionAssignee(e?.target?.value)}
                />
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleAddActionItem}
                  disabled={!newActionItem?.trim() || !newActionAssignee?.trim()}
                  fullWidth
                >
                  Add Action Item
                </Button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {actionItems?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="CheckSquare" size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No action items yet</p>
                    <p className="text-xs">Create tasks from meeting discussions</p>
                  </div>
                ) : (
                  actionItems?.map((item) => (
                    <div key={item?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <button
                        onClick={() => onToggleActionItem(item?.id)}
                        className="mt-0.5"
                      >
                        <Icon 
                          name={item?.completed ? "CheckSquare" : "Square"} 
                          size={16} 
                          className={item?.completed ? "text-success" : "text-muted-foreground"}
                        />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${item?.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {item?.text}
                        </p>
                        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                          <span>Assigned to {item?.assignee}</span>
                          <span>{new Date(item.createdAt)?.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Slack Integration Tab */}
          {activeTab === 'slack' && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <Icon name="MessageSquare" size={32} className="mx-auto mb-3 text-primary" />
                <h4 className="font-semibold text-foreground mb-2">Slack Integration</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Automatically send standup summaries to your team channel
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Hash" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">daily-standup</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Connected to #daily-standup channel
                  </p>
                </div>

                <Button
                  variant="default"
                  iconName="Send"
                  iconPosition="left"
                  onClick={onSendSlackSummary}
                  fullWidth
                >
                  Send Summary to Slack
                </Button>

                <Button
                  variant="outline"
                  iconName="Settings"
                  iconPosition="left"
                  fullWidth
                >
                  Configure Integration
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <h5 className="font-medium text-foreground mb-2">Auto-send Settings</h5>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-muted-foreground">Send after each meeting</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Include action items</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Mention absent members</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingNotesPanel;