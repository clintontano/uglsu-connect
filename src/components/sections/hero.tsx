import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Calendar } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-hero font-heading font-bold text-hero-text mb-6 text-center">
            University of Ghana
            <span className="block text-accent">Law Students' Union</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-hero-text/90 mb-8 leading-relaxed max-w-3xl mx-auto text-center">
            Advocating for justice, promoting legal excellence, and building a supportive 
            community of future legal professionals at the University of Ghana School of Law.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="professional" size="lg" asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-hero-text mb-2">500+</h3>
              <p className="text-hero-text/80">Active Members</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-hero-text mb-2">1000+</h3>
              <p className="text-hero-text/80">Resources in Library</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-hero-text/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-hero-text/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};