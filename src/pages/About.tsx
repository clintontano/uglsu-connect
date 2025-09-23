import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Eye, 
  Mail, 
  Linkedin, 
  ArrowRight 
} from 'lucide-react';

const executiveMembers = [
  {
    name: 'Sarah Mensah',
    position: 'President',
    year: 'Final Year',
    email: 'president@uglsu.org',
    image: '/api/placeholder/200/200'
  },
  {
    name: 'Kwame Asante',
    position: 'Vice President',
    year: 'Level 300',
    email: 'vp@uglsu.org',
    image: '/api/placeholder/200/200'
  },
  {
    name: 'Akosua Owusu',
    position: 'General Secretary',
    year: 'Level 400',
    email: 'secretary@uglsu.org',
    image: '/api/placeholder/200/200'
  },
  {
    name: 'Kofi Boateng',
    position: 'Treasurer',
    year: 'Level 300',
    email: 'treasurer@uglsu.org',
    image: '/api/placeholder/200/200'
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-display font-heading font-bold mb-6 text-foreground">
              University of Ghana Law Students' Union
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              UGLSU has been the voice of law students at the University of Ghana for over two decades, 
              advocating for student rights, promoting academic excellence, and fostering professional development.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="shadow-card border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-accent mr-4" />
                    <h2 className="text-2xl font-heading font-bold">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To advocate for the rights and interests of law students at the University of Ghana, 
                    promote academic excellence, foster professional development, and create a supportive 
                    community that prepares students for successful legal careers while upholding the 
                    highest standards of integrity and service.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Eye className="w-8 h-8 text-library-primary mr-4" />
                    <h2 className="text-2xl font-heading font-bold">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the premier law students' union in West Africa, recognized for our commitment 
                    to academic excellence, professional development, and social justice. We envision 
                    a community where every law student is empowered to reach their full potential and 
                    contribute meaningfully to the legal profession and society.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Executive Committee */}
        <section className="py-20 bg-muted/30" id="executive">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-display font-heading font-bold mb-4">
                Executive Committee 2024/2025
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated leaders working tirelessly to represent and serve the law student community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {executiveMembers.map((member) => (
                <Card key={member.name} className="shadow-card border-0 text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-1">{member.name}</h3>
                    <Badge variant="secondary" className="mb-2">{member.position}</Badge>
                    <p className="text-sm text-muted-foreground mb-4">{member.year}</p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href="#" aria-label="LinkedIn Profile">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-display font-heading font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Become part of a vibrant community of law students committed to excellence, 
              advocacy, and professional growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/membership" className="group">
                  Join UGLSU Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="professional" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;