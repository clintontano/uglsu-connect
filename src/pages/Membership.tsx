import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Users, Calendar, BookOpen, Scale, Trophy, Heart } from 'lucide-react';

const Membership = () => {
  const benefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Digital Library Access",
      description: "Full access to our comprehensive digital library with legal resources, case studies, and academic materials."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Exclusive Events",
      description: "Priority registration for workshops, seminars, networking events, and guest lectures."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Legal Aid Clinic",
      description: "Participate in our student-run legal aid clinic and gain practical experience."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Competition Opportunities",
      description: "Represent UGLSU in moot court competitions, debates, and academic challenges."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Networking Community",
      description: "Connect with fellow law students, alumni, and legal professionals."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Student Support",
      description: "Access to academic support, mentorship programs, and career guidance."
    }
  ];

  const membershipTypes = [
    {
      name: "Regular Member",
      price: "GHS 50",
      period: "per semester",
      description: "Full membership benefits for current UG Law students",
      features: [
        "Complete digital library access",
        "Event participation",
        "Voting rights in elections",
        "Legal aid clinic participation",
        "Newsletter and updates"
      ],
      recommended: true
    },
    {
      name: "Associate Member",
      price: "GHS 30",
      period: "per semester", 
      description: "Limited benefits for non-UG Law students",
      features: [
        "Basic digital library access",
        "Event participation (limited)",
        "Newsletter and updates",
        "Networking opportunities"
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Join UGLSU Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Become part of Ghana's premier law students' community. Access exclusive resources, 
              networking opportunities, and shape the future of legal education.
            </p>
          </div>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-semibold text-center mb-12">
              Membership Benefits
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Membership Types */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-semibold text-center mb-12">
              Choose Your Membership
            </h2>
            <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
              {membershipTypes.map((type, index) => (
                <Card key={index} className={`relative ${type.recommended ? 'border-primary shadow-elegant' : ''}`}>
                  {type.recommended && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                      Recommended
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{type.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">{type.price}</span>
                      <span className="text-muted-foreground ml-2">{type.period}</span>
                    </div>
                    <CardDescription className="text-base mt-2">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={type.recommended ? "default" : "outline"}
                      size="lg"
                    >
                      Join as {type.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-16">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Membership Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Regular Membership</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Current University of Ghana Law student</li>
                      <li>• Valid student ID</li>
                      <li>• University email address</li>
                      <li>• Payment of membership fees</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Associate Membership</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Law student from any recognized institution</li>
                      <li>• Valid student ID from your institution</li>
                      <li>• Letter of good standing (if required)</li>
                      <li>• Payment of membership fees</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-primary/5 rounded-lg p-12">
            <h2 className="text-3xl font-heading font-semibold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Take the first step towards becoming part of Ghana's most active law students' union. 
              Join hundreds of students who are already benefiting from our resources and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="min-w-[200px]">
                Apply for Membership
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Learn More
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Questions? Contact us at membership@uglsu.org or visit our office during regular hours.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;