import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between text-sm">
        <Link
          to="/forgot-password"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Forgot Password?
        </Link>
        <Link
          to="/register"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Create Account
        </Link>
      </div>
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} Unified. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;