import React from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Dashboard',
      description: 'Real-time insights and project analytics',
      iconName: 'LayoutDashboard',
      path: '/dashboard',
      color: 'bg-blue-500'
    },
    {
      title: 'Sprint Planning',
      description: 'Collaborative sprint setup and estimation',
      iconName: 'Calendar',
      path: '/sprint-planning',
      color: 'bg-green-500'
    },
    {
      title: 'Backlog Grooming',
      description: 'Product backlog refinement and prioritization',
      iconName: 'List',
      path: '/backlog-grooming',
      color: 'bg-purple-500'
    },
    {
      title: 'Daily Standups',
      description: 'Team coordination and progress tracking',
      iconName: 'Users',
      path: '/daily-standups',
      color: 'bg-orange-500'
    },
    {
      title: 'Reports',
      description: 'Comprehensive analytics and insights',
      iconName: 'BarChart3',
      path: '/reports',
      color: 'bg-red-500'
    }
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      {/* Main Content */}
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Hero Section */}
          <div className="text-center py-12 lg:py-20">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Welcome to Agile Hub
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your comprehensive platform for agile project management, sprint planning, and team collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-8 py-3"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                className="text-lg px-8 py-3"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="py-12">
            <h2 className="text-3xl font-semibold text-center text-foreground mb-12">
              Powerful Features for Agile Teams
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features?.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => handleFeatureClick(feature?.path)}
                  className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary/30"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${feature?.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon name={feature?.iconName} size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature?.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature?.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary group-hover:translate-x-2 transition-transform duration-200">
                    <span className="text-sm font-medium mr-2">Explore</span>
                    <Icon name="ArrowRight" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-12 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Team Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2x</div>
                <div className="text-muted-foreground">Faster Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Integrations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;