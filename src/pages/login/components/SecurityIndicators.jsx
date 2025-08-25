import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: '2FA Available'
    },
    {
      icon: 'Eye',
      text: 'SOC 2 Compliant'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-muted-foreground">
            <Icon name={feature?.icon} size={14} />
            <span className="text-xs font-medium">{feature?.text}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Enterprise-grade security for your agile workflows
      </p>
    </div>
  );
};

export default SecurityIndicators;