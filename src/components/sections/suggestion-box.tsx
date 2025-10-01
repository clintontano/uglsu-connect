import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Lightbulb, ArrowRight } from 'lucide-react';

export const SuggestionBoxSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-subtle border-0 shadow-elegant">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-accent" />
              </div>
            </div>
            
            <h2 className="text-display font-heading font-bold text-foreground mb-4">
              Suggestion Box
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Your voice matters! Share your ideas, propose events, contribute articles, 
              or suggest library resources. Help us make UGLSU even better.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center text-muted-foreground">
                <Lightbulb className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm">Policy Suggestions</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Lightbulb className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm">Event Proposals</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Lightbulb className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm">Article Submissions</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Lightbulb className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm">Library Resources</span>
              </div>
            </div>

            <Button variant="professional" size="lg" asChild>
              <Link to="/suggestion-box" className="group flex items-center justify-center space-x-2">
                <span>Submit Your Suggestion</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
