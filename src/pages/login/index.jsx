import React from 'react';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import RoleHints from './components/RoleHints';
import SecurityIndicators from './components/SecurityIndicators';
import LoginFooter from './components/LoginFooter';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-elevation-2 p-8 border border-border">
          <LoginHeader />
          <LoginForm />
          <RoleHints />
          <SecurityIndicators />
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;