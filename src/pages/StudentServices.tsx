import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Calendar,
  FileText,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const StudentServices = () => {
  const services = [
    {
      icon: BookOpen,
      title: 'Academic Support',
      description: 'Access to study materials, mentorship programs, and academic guidance to help you excel in your legal studies.',
      link: '/support'
    },
    {
      icon: Briefcase,
      title: 'Internship Opportunities',
      description: 'Connect with law firms, NGOs, and corporate legal departments for internship and practical experience.',
      link: '/internship'
    },
    {
      icon: Users,
      title: 'Peer Mentorship',
      description: 'Get paired with senior students who can guide you through your academic journey and share valuable insights.',
      link: '/about#committees'
    },
    {
      icon: GraduationCap,
      title: 'Career Development',
      description: 'Workshops, seminars, and networking events to prepare you for a successful legal career.',
      link: '/events'
    },
    {
      icon: Heart,
      title: 'Wellness & Counseling',
      description: 'Mental health support, counseling services, and wellness programs to ensure your overall well-being.',
      link: '/about#committees'
    },
    {
      icon: Calendar,
      title: 'Events & Networking',
      description: 'Regular events, competitions, and networking opportunities with legal professionals and alumni.',
      link: '/events'
    },
    {
      icon: FileText,
      title: 'Digital Library',
      description: 'Comprehensive collection of legal resources, case studies, textbooks, and research materials.',
      link: '/library'
    },
    {
      icon: Lightbulb,
      title: 'Suggestion Box',
      description: 'Share your ideas, propose improvements, and contribute to making UGLSU better for everyone.',
      link: '/suggestions'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Student Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive support and resources designed to enhance your academic experience 
              and professional development at the University of Ghana School of Law.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.title} className="group hover:shadow-elegant transition-smooth border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-smooth">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-accent hover:text-accent/80" asChild>
                    <Link to={service.link} className="flex items-center group">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Access Services</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All services are available to registered UGLSU members. To access these services:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>Ensure your UGLSU membership is active</li>
                  <li>Visit the relevant service page or contact the appropriate committee</li>
                  <li>For urgent matters, reach out to the UGLSU executives directly</li>
                  <li>Check our events calendar for upcoming workshops and programs</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Assistance?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you need help accessing any of our services or have questions about what's available, 
                  our team is here to assist you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="professional" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/about">About UGLSU</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentServices;
