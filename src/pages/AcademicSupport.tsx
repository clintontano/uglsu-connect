import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  FileText, 
  MessageCircle, 
  Calendar,
  GraduationCap,
  Award,
  Clock
} from 'lucide-react';

const AcademicSupport = () => {
  const supportServices = [
    {
      icon: Users,
      title: 'Peer Mentorship Program',
      description: 'Get matched with experienced senior students who provide guidance, study tips, and academic advice throughout your law school journey.'
    },
    {
      icon: BookOpen,
      title: 'Study Groups',
      description: 'Join or form study groups for different courses. Collaborative learning helps you understand complex legal concepts better.'
    },
    {
      icon: FileText,
      title: 'Past Papers & Materials',
      description: 'Access a comprehensive collection of past examination papers, notes, and study guides from previous years.'
    },
    {
      icon: MessageCircle,
      title: 'Academic Consultation',
      description: 'Schedule one-on-one consultations with the Academic Affairs Committee to discuss course selection, exam preparation, and academic concerns.'
    },
    {
      icon: Calendar,
      title: 'Tutorial Sessions',
      description: 'Attend regular tutorial sessions organized for challenging courses, led by top-performing students and alumni.'
    },
    {
      icon: GraduationCap,
      title: 'Research Support',
      description: 'Get assistance with legal research methodology, citation practices, and academic writing for dissertations and papers.'
    },
    {
      icon: Award,
      title: 'Competition Preparation',
      description: 'Training and support for moot court competitions, debates, and academic contests to enhance your advocacy skills.'
    },
    {
      icon: Clock,
      title: 'Time Management Workshops',
      description: 'Learn effective time management strategies to balance coursework, extracurriculars, and personal commitments.'
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
              Academic Support
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive academic resources and support systems to help you succeed 
              in your legal studies at the University of Ghana School of Law.
            </p>
          </div>

          {/* Support Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {supportServices.map((service) => (
              <Card key={service.title} className="border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information Sections */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Request Academic Support</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Accessing academic support is easy and available to all UGLSU members:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>Contact the Academic Affairs Committee through the UGLSU office or email</li>
                  <li>Specify the type of support you need (mentorship, study materials, consultation, etc.)</li>
                  <li>Attend scheduled tutorial sessions posted on the events calendar</li>
                  <li>Visit the digital library for past papers and study resources</li>
                  <li>Join student WhatsApp or Telegram groups for course-specific discussions</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Calendar & Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Stay informed about important academic dates including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Tutorial session schedules</li>
                  <li>Exam periods and preparation workshops</li>
                  <li>Academic consultation hours</li>
                  <li>Research paper submission deadlines</li>
                  <li>Moot court competition training sessions</li>
                </ul>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link to="/events">View Academic Events</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Digital Resources</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Access our comprehensive digital library containing:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                  <li>Past examination papers and model answers</li>
                  <li>Course notes and study guides</li>
                  <li>Legal textbooks and case compilations</li>
                  <li>Research methodology guides</li>
                  <li>Citation and legal writing resources</li>
                </ul>
                <Button variant="professional" asChild>
                  <Link to="/library">Access Digital Library</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you're facing academic challenges or need personalized support, don't hesitate to reach out. 
                  The Academic Affairs Committee is here to help you succeed.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="professional" asChild>
                    <Link to="/contact">Contact Academic Affairs</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/suggestions">Submit a Concern</Link>
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

export default AcademicSupport;
