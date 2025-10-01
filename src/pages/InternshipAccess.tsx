import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Building2, 
  FileText, 
  Users, 
  Target,
  CheckCircle2,
  TrendingUp,
  Globe
} from 'lucide-react';

const InternshipAccess = () => {
  const internshipTypes = [
    {
      icon: Building2,
      title: 'Law Firms',
      description: 'Gain hands-on experience in litigation, corporate law, and legal consulting with established law firms in Ghana and beyond.'
    },
    {
      icon: Globe,
      title: 'Corporate Legal Departments',
      description: 'Work alongside in-house counsel at major corporations, learning about contract management, compliance, and corporate governance.'
    },
    {
      icon: Users,
      title: 'NGOs & Civil Society',
      description: 'Contribute to human rights, environmental law, and social justice initiatives with leading non-governmental organizations.'
    },
    {
      icon: Briefcase,
      title: 'Government Agencies',
      description: 'Experience public service law through internships with ministries, regulatory bodies, and government legal departments.'
    }
  ];

  const benefits = [
    'Practical legal experience in real-world settings',
    'Professional networking opportunities',
    'Mentorship from experienced legal practitioners',
    'Exposure to diverse areas of legal practice',
    'Enhanced CV and career prospects',
    'Potential for future employment',
    'Skills development in legal research and drafting',
    'Understanding of legal ethics and professional conduct'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Internship Access
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with leading law firms, corporations, NGOs, and government agencies 
              for valuable internship opportunities that complement your legal education.
            </p>
          </div>

          {/* Internship Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-8">
              Internship Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internshipTypes.map((type) => (
                <Card key={type.title} className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <type.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                          {type.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Information Sections */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  <CardTitle>Benefits of Internships</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Internships are crucial for bridging the gap between academic study and legal practice:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start space-x-2 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-accent" />
                  <CardTitle>How to Apply for Internships</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Check Available Opportunities:</strong> Visit our 
                    events page and notices section regularly for posted internship openings.
                  </li>
                  <li>
                    <strong className="text-foreground">Prepare Your Documents:</strong> Update your CV, 
                    write a compelling cover letter, and gather academic transcripts.
                  </li>
                  <li>
                    <strong className="text-foreground">Contact the External Affairs Committee:</strong> Reach 
                    out for guidance on application procedures and recommendations.
                  </li>
                  <li>
                    <strong className="text-foreground">Submit Applications:</strong> Follow the specific 
                    application instructions for each organization.
                  </li>
                  <li>
                    <strong className="text-foreground">Prepare for Interviews:</strong> Attend UGLSU's 
                    interview preparation workshops if offered.
                  </li>
                  <li>
                    <strong className="text-foreground">Stay Professional:</strong> Maintain communication 
                    with prospective employers and follow up appropriately.
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-accent" />
                  <CardTitle>Application Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  UGLSU provides resources to help you create strong internship applications:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                  <li>CV and cover letter templates tailored for legal internships</li>
                  <li>Sample application letters and writing tips</li>
                  <li>Interview preparation guides and mock interview sessions</li>
                  <li>Networking events with legal professionals and alumni</li>
                  <li>Workshops on professional etiquette and workplace conduct</li>
                </ul>
                <Button variant="outline" asChild>
                  <Link to="/library">Access Application Resources</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-accent" />
                  <CardTitle>Need Assistance?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The External Affairs Committee and Career Development team are here to help you navigate 
                  the internship application process. Whether you need help with your CV, interview 
                  preparation, or connecting with potential employers, we're here to support you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="professional" asChild>
                    <Link to="/contact">Contact External Affairs</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/events">View Career Events</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Opportunities CTA */}
            <Card className="bg-gradient-primary border-0">
              <CardContent className="p-8 text-center">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-4">
                  Current Internship Openings
                </h3>
                <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                  Check our notices page for the latest internship opportunities posted by partner 
                  organizations and firms.
                </p>
                <Button variant="accent" size="lg" asChild>
                  <Link to="/notices">View Current Opportunities</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InternshipAccess;
