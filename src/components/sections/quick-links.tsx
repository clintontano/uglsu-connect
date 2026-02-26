import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Library, 
  BookOpen, 
  Calendar, 
  UserPlus, 
  Bell, 
  ArrowRight,
  Scale,
  Briefcase,
  Users
} from 'lucide-react';

const quickLinks = [
  {
    title: 'Digital Library',
    description: 'Access legal resources, case studies, and academic materials',
    icon: Library,
    href: '/library',
    color: 'library-primary',
    features: ['Case Law', 'Legal Articles', 'Past Papers', 'Study Guides']
  },
  {
    title: 'Legally Speakin',
    description: 'Student-led blog featuring legal insights and commentary',
    icon: BookOpen,
    href: '/blog',
    color: 'accent',
    features: ['Student Articles', 'Legal Commentary', 'Opinion Pieces', 'Research']
  },
  {
    title: 'Events & Calendar',
    description: 'Stay updated on seminars, meetings, and legal events',
    icon: Calendar,
    href: '/events',
    color: 'primary',
    features: ['Seminars', 'Workshops', 'Networking', 'Academic Events']
  },
  {
    title: 'Notices & Updates',
    description: 'Important announcements and union communications',
    icon: Bell,
    href: '/notices',
    color: 'warning',
    features: ['Exam Schedules', 'Meeting Minutes', 'Important Updates', 'Deadlines']
  },
  {
    title: 'External Competitions',
    description: 'Explore prestigious external legal competitions and opportunities',
    icon: Scale,
    href: '/external-competitions',
    color: 'primary',
    features: ['Moot Courts', 'Client Counseling', 'International Events', 'Awards']
  },
  {
    title: 'LSU Judicial Decisions',
    description: 'View past decisions made by the LSU Judicial Board',
    icon: Scale,
    href: '/judicial-decisions',
    color: 'primary',
    features: ['Board Decisions', 'Case Files', 'Legal Precedents', 'Archives']
  },
  {
    title: 'Student Services',
    description: 'Access support services and resources for law students',
    icon: Users,
    href: '/services',
    color: 'accent',
    features: ['Support Services', 'Resources', 'Assistance', 'Guidance']
  },
  {
    title: 'Law Firms',
    description: 'Explore law firms under the LSU for practical experience',
    icon: Briefcase,
    href: '/law-firms',
    color: 'library-primary',
    features: ['Firm Profiles', 'Opportunities', 'Internships', 'Career Paths']
  },
];

export const QuickLinksSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-display font-heading font-bold text-foreground mb-4">
            Quick Access
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navigate to our most important resources and services designed to support your legal education journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickLinks.map((link, index) => (
            <Card key={link.title} className="group hover:shadow-elegant transition-smooth border-0 shadow-card bg-card">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${link.color}/10 mr-4`}>
                    <link.icon className={`w-6 h-6 text-${link.color}`} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-card-foreground">
                    {link.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {link.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {link.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="ghost" 
                  className="w-full bg-foreground text-background hover:bg-foreground/90 hover:text-white" 
                  asChild
                >
                  <Link to={link.href} className="group flex items-center justify-center space-x-2">
                    <span className="group-hover:text-white">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform group-hover:text-white" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Announcement */}
        <div className="mt-16">
          <Card className="bg-gradient-primary text-primary-foreground border-0">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-2xl font-heading font-bold mb-4 text-foreground">
                Stay Connected with UGLSU
              </h3>
              <p className="text-foreground mb-6 max-w-2xl mx-auto">
                Get instant notifications about important announcements, exam schedules, 
                and exclusive member events directly to your inbox.
              </p>
              <Button variant="accent" size="lg" asChild>
                <Link to="/notices">View Latest Notices</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};