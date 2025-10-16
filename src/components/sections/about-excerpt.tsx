import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Target, Eye, ArrowRight } from 'lucide-react';

export const AboutExcerptSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-display font-heading font-bold mb-4">
            About UGLSU
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            UGLSU has been the voice of law students at the University of Ghana for over two decades, 
            advocating for student rights, promoting academic excellence, and fostering professional development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-card border-0">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-accent mr-4" />
                <h3 className="text-2xl font-heading font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To advocate for the rights and interests of law students at the University of Ghana, 
                promote academic excellence, foster professional development, and create a supportive 
                community that prepares students for successful legal careers.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-library-primary mr-4" />
                <h3 className="text-2xl font-heading font-bold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the premier law students' union in West Africa, recognized for our commitment 
                to academic excellence, professional development, and social justice. We envision 
                a community where every law student is empowered to reach their full potential.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button variant="professional" size="lg" asChild>
            <Link to="/about" className="group">
              Learn More About Us
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
