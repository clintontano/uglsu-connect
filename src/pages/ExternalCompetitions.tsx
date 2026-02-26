import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, MapPin, Users, Target, Award, BookOpen, Globe, Scale } from 'lucide-react';

const ExternalCompetitions = () => {
  const competitions = [
    {
      title: "Philip C. Jessup International Law Moot Court Competition",
      organizer: "International Law Students Association (ILSA)",
      type: "Moot Court",
      level: "International",
      description: "The world's largest moot court competition, testing students' skills in international law.",
      deadline: "December 15, 2025",
      location: "Washington D.C., USA",
      participants: "Teams of 2-5 students",
      status: "open"
    },
    {
      title: "African Human Rights Moot Court Competition",
      organizer: "Centre for Human Rights, University of Pretoria",
      type: "Moot Court",
      level: "Continental",
      description: "Premier African moot court competition focusing on human rights law.",
      deadline: "January 30, 2026",
      location: "Pretoria, South Africa",
      participants: "Teams of 2-3 students",
      status: "open"
    },
    {
      title: "All Africa Inter-University Moot Court Competition",
      organizer: "African Union Commission",
      type: "Moot Court",
      level: "Continental",
      description: "Annual moot court competition bringing together top law students across Africa.",
      deadline: "February 28, 2026",
      location: "Addis Ababa, Ethiopia",
      participants: "Teams of 2-4 students",
      status: "upcoming"
    },
    {
      title: "International Client Counseling Competition",
      organizer: "International Bar Association (IBA)",
      type: "Client Counseling",
      level: "International",
      description: "Competition testing practical client interviewing and counseling skills.",
      deadline: "November 30, 2025",
      location: "Virtual/Various Locations",
      participants: "Teams of 2 students",
      status: "open"
    },
    {
      title: "National Moot Court Competition",
      organizer: "Ghana Bar Association",
      type: "Moot Court",
      level: "National",
      description: "Ghana's premier moot court competition for law students.",
      deadline: "March 15, 2026",
      location: "Accra, Ghana",
      participants: "Teams of 2-4 students",
      status: "upcoming"
    },
    {
      title: "World Trade Organization Moot Court Competition",
      organizer: "WTO Appellate Body Secretariat",
      type: "Moot Court",
      level: "International",
      description: "Specialized competition focusing on international trade law.",
      deadline: "January 15, 2026",
      location: "Geneva, Switzerland",
      participants: "Teams of 2-4 students",
      status: "open"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Applications Open</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Closed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Moot Court':
        return <Scale className="w-5 h-5" />;
      case 'Client Counseling':
        return <Users className="w-5 h-5" />;
      case 'Quiz':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              External Competitions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore prestigious external competitions where UGLSU students can showcase their legal skills 
              and compete with the best law students globally.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Target className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-heading font-semibold mb-4">Why Participate?</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Skill Development</h3>
                        <p>Enhance your advocacy, research, and public speaking skills through practical application.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Networking Opportunities</h3>
                        <p>Connect with legal professionals, judges, and students from around the world.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Career Advancement</h3>
                        <p>Stand out to employers and gain valuable experience for your legal career.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Global Recognition</h3>
                        <p>Represent UGLSU on international platforms and bring recognition to our institution.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Competitions List */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold mb-8">Available Competitions</h2>
            <div className="grid gap-6">
              {competitions.map((competition, index) => (
                <Card key={index} className="hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            {getTypeIcon(competition.type)}
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-1">{competition.type}</Badge>
                            <Badge variant="secondary" className="ml-2">{competition.level}</Badge>
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{competition.title}</CardTitle>
                        <CardDescription className="text-base">
                          Organized by {competition.organizer}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(competition.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{competition.description}</p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Deadline</p>
                          <p className="text-muted-foreground">{competition.deadline}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">{competition.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Team Size</p>
                          <p className="text-muted-foreground">{competition.participants}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Level</p>
                          <p className="text-muted-foreground">{competition.level}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        className="flex-1" 
                        disabled={competition.status !== 'open'}
                      >
                        {competition.status === 'open' ? 'Apply Now' : 'Applications Closed'}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-16">
            <Card className="bg-muted/30">
              <CardContent className="p-8 text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-heading font-semibold mb-4">
                  Ready to Compete?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  For more information about external competitions or to express your interest in participating, 
                  contact the External Competitions Committee.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg">
                    Contact Competitions Committee
                  </Button>
                  <Button variant="outline" size="lg">
                    View Past Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExternalCompetitions;
