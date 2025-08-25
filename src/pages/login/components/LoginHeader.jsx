import React from 'react';
import HeaderBrand from '../../../components/ui/HeaderBrand';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-6">
        <HeaderBrand />
      </div>
      <h1 className="text-2xl font-semibold text-foreground mb-2">
        Welcome Back
      </h1>
      <p className="text-muted-foreground">
        Sign in to your agile project management workspace
      </p>
    </div>
  );
};

export default LoginHeader;