import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeetingToolbar = ({ 
  isLiveMode, 
  onToggleLiveMode, 
  attendanceCount, 
  totalMembers,
  onStartVoiceInput,
  isVoiceActive = false
}) => {
  const [meetingTime, setMeetingTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning && isLiveMode) {
      interval = setInterval(() => {
        setMeetingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isLiveMode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    setMeetingTime(0);
    setIsTimerRunning(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Meeting Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLiveMode ? 'bg-success animate-pulse' : 'bg-muted'}`} />
            <span className="font-semibold text-foreground">
              {isLiveMode ? 'Live Meeting' : 'Async Updates'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span>{attendanceCount}/{totalMembers} Present</span>
          </div>

          {isLiveMode && (
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="font-mono text-sm font-medium">
                {formatTime(meetingTime)}
              </span>
            </div>
          )}
        </div>

        {/* Meeting Controls */}
        <div className="flex items-center space-x-2">
          {isLiveMode && (
            <>
              <Button
                variant={isTimerRunning ? "destructive" : "success"}
                size="sm"
                iconName={isTimerRunning ? "Pause" : "Play"}
                iconPosition="left"
                onClick={handleTimerToggle}
              >
                {isTimerRunning ? 'Pause' : 'Start'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                iconName="RotateCcw"
                onClick={handleResetTimer}
              />

              <Button
                variant={isVoiceActive ? "destructive" : "outline"}
                size="sm"
                iconName={isVoiceActive ? "MicOff" : "Mic"}
                onClick={onStartVoiceInput}
              >
                {isVoiceActive ? 'Stop' : 'Voice'}
              </Button>
            </>
          )}

          <Button
            variant={isLiveMode ? "outline" : "default"}
            size="sm"
            iconName={isLiveMode ? "UserX" : "Users"}
            iconPosition="left"
            onClick={onToggleLiveMode}
          >
            {isLiveMode ? 'End Meeting' : 'Start Meeting'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
          />
        </div>
      </div>

      {/* AI Suggestions */}
      {isLiveMode && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Bot" size={16} className="text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-1">AI Scrum Master Suggestion</p>
              <p className="text-sm text-muted-foreground">
                Consider discussing the API integration blocker mentioned by Sarah - it might affect sprint delivery.
              </p>
            </div>
            <Button variant="ghost" size="sm" iconName="X" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingToolbar;