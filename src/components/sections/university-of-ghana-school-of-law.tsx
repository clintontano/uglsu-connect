import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, GraduationCap, Building, Users } from 'lucide-react';

export const UniversityOfGhanaSchoolOfLawSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            University of Ghana School of Law (UGSOL)
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The prestigious University of Ghana School of Law is the parent institution of the 
            Law Students' Union, providing world-class legal education and nurturing the next 
            generation of legal professionals in Ghana and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6 border-2 border-primary/20 hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
              <p className="text-muted-foreground">
                Renowned for rigorous academic standards and producing distinguished legal scholars
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-primary/20 hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rich Heritage</h3>
              <p className="text-muted-foreground">
                Ghana's premier law school with decades of legal education excellence
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-primary/20 hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alumni Network</h3>
              <p className="text-muted-foreground">
                Extensive network of successful legal professionals across Ghana and internationally
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-gradient-primary text-primary-foreground border-0 p-8">
            <CardContent className="pt-0">
              <h3 className="text-2xl font-bold mb-4 text-black">
                Learn More About UG School of Law
              </h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto text-black">
                Discover more about our programs, faculty, admissions, and the rich history 
                of legal education at the University of Ghana.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-400 hover:border-yellow-500"
                asChild
              >
                <a 
                  href="https://law.ug.edu.gh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Visit UG School of Law Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
