import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlanningPokerModal = ({ 
  isOpen, 
  onClose, 
  currentItem, 
  teamMembers,
  onEstimationComplete 
}) => {
  const [votes, setVotes] = useState({});
  const [showVotes, setShowVotes] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const fibonacciCards = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  const specialCards = ['?', '∞', '☕'];

  useEffect(() => {
    if (isOpen) {
      setVotes({});
      setShowVotes(false);
      setSelectedCard(null);
    }
  }, [isOpen, currentItem]);

  const handleVote = (value) => {
    setSelectedCard(value);
    setVotes(prev => ({
      ...prev,
      'current-user': value
    }));
  };

  const handleRevealVotes = () => {
    // Simulate other team members' votes
    const simulatedVotes = {
      'current-user': selectedCard,
      'member-1': fibonacciCards?.[Math.floor(Math.random() * fibonacciCards?.length)],
      'member-2': fibonacciCards?.[Math.floor(Math.random() * fibonacciCards?.length)],
      'member-3': fibonacciCards?.[Math.floor(Math.random() * fibonacciCards?.length)]
    };
    setVotes(simulatedVotes);
    setShowVotes(true);
  };

  const handleAcceptEstimate = () => {
    const voteValues = Object.values(votes)?.filter(v => typeof v === 'number');
    const averageEstimate = Math.round(voteValues?.reduce((a, b) => a + b, 0) / voteValues?.length);
    onEstimationComplete(currentItem?.id, averageEstimate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="Users" size={24} className="text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Planning Poker</h2>
            </div>
            
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose}>
              Close
            </Button>
          </div>

          {currentItem && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <span className="text-sm font-mono text-muted-foreground">
                  {currentItem?.id}
                </span>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-2">
                    {currentItem?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentItem?.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {teamMembers?.map((member) => (
              <div
                key={member?.id}
                className="bg-card border border-border rounded-lg p-4 text-center"
              >
                <Image
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
                <div className="text-sm font-medium text-foreground mb-2">
                  {member?.name}
                </div>
                
                <div className="h-16 flex items-center justify-center">
                  {votes?.[member?.id] ? (
                    showVotes ? (
                      <div className="w-12 h-16 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold">
                        {votes?.[member?.id]}
                      </div>
                    ) : (
                      <div className="w-12 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name="Check" size={20} className="text-success" />
                      </div>
                    )
                  ) : (
                    <div className="w-12 h-16 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-4">
              Select your estimate:
            </h3>
            
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4">
              {fibonacciCards?.map((card) => (
                <button
                  key={card}
                  onClick={() => handleVote(card)}
                  className={`
                    h-16 rounded-lg border-2 font-bold text-lg transition-all duration-150
                    ${selectedCard === card
                      ? 'border-primary bg-primary text-primary-foreground shadow-elevation-2'
                      : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted'
                    }
                  `}
                >
                  {card}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-2 max-w-xs">
              {specialCards?.map((card) => (
                <button
                  key={card}
                  onClick={() => handleVote(card)}
                  className={`
                    h-16 rounded-lg border-2 font-bold text-lg transition-all duration-150
                    ${selectedCard === card
                      ? 'border-primary bg-primary text-primary-foreground shadow-elevation-2'
                      : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted'
                    }
                  `}
                >
                  {card}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {Object.keys(votes)?.length} of {teamMembers?.length} votes cast
            </div>
            
            <div className="flex items-center space-x-3">
              {!showVotes ? (
                <Button
                  variant="default"
                  iconName="Eye"
                  onClick={handleRevealVotes}
                  disabled={Object.keys(votes)?.length === 0}
                >
                  Reveal Votes
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="outline" onClick={() => setShowVotes(false)}>
                    Vote Again
                  </Button>
                  <Button variant="default" iconName="Check" onClick={handleAcceptEstimate}>
                    Accept Estimate
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningPokerModal;