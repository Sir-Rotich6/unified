import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const ReportScheduling = ({ className = '' }) => {
  const [selectedFrequency, setSelectedFrequency] = useState('weekly');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'json', label: 'JSON Data' }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Sprint Summary Report',
      frequency: 'Weekly',
      format: 'PDF',
      nextRun: '2025-08-30',
      recipients: 3,
      status: 'active'
    },
    {
      id: 2,
      name: 'Velocity Tracking',
      frequency: 'Monthly',
      format: 'Excel',
      nextRun: '2025-09-01',
      recipients: 5,
      status: 'active'
    },
    {
      id: 3,
      name: 'Bug Analysis Report',
      frequency: 'Daily',
      format: 'CSV',
      nextRun: '2025-08-26',
      recipients: 2,
      status: 'paused'
    }
  ];

  const handleScheduleReport = () => {
    // Handle report scheduling logic
    console.log('Scheduling report with:', {
      frequency: selectedFrequency,
      format: selectedFormat,
      emailNotifications,
      slackNotifications
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-warning';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Report Scheduling</h3>
          <p className="text-sm text-muted-foreground">Automate report delivery</p>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          New Schedule
        </Button>
      </div>
      <div className="space-y-4 mb-6">
        <Select
          label="Frequency"
          options={frequencyOptions}
          value={selectedFrequency}
          onChange={setSelectedFrequency}
        />

        <Select
          label="Format"
          options={formatOptions}
          value={selectedFormat}
          onChange={setSelectedFormat}
        />

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Notifications</label>
          <div className="space-y-2">
            <Checkbox
              label="Email notifications"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e?.target?.checked)}
            />
            <Checkbox
              label="Slack notifications"
              checked={slackNotifications}
              onChange={(e) => setSlackNotifications(e?.target?.checked)}
            />
          </div>
        </div>

        <Button
          variant="default"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={handleScheduleReport}
        >
          Schedule Report
        </Button>
      </div>
      <div className="border-t border-border pt-6">
        <h4 className="font-medium text-foreground mb-4">Active Schedules</h4>
        <div className="space-y-3">
          {scheduledReports?.map((report) => (
            <div key={report?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h5 className="font-medium text-foreground">{report?.name}</h5>
                  <span className={`text-xs font-medium ${getStatusColor(report?.status)}`}>
                    {report?.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {report?.frequency} • {report?.format}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Next: {report?.nextRun}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {report?.recipients} recipients
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Edit" />
                <Button variant="ghost" size="sm" iconName="Trash2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportScheduling;