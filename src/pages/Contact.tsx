import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Users, AlertTriangle, MessageSquare } from 'lucide-react';
import MapComponent from '@/components/MapComponent';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+233 55 154 4080"],
      description: "General inquiries and support"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["lawstudentsunion.ug@gmail.com"],
      description: "For detailed inquiries and official communications"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      details: ["Accra, UG Campus, Annie Jiagge Road."],
      description: "Our physical office location"
    }
  ];

  const emergencyContacts = [
    {
      title: "Student Emergency Line",
      number: "+233 55 154 4080",
      description: "24/7 emergency support for student crises"
    },
    {
      title: "Academic Support",
      number: "+233 55 251 7929",
      description: "Urgent academic matters and exam issues"
    }
  ];

  const executiveContacts = [
    {
      position: "President",
      name: "NAHUM AGYEPONG",
      email: "thenahumagyepong@gmail.com",
      linkedin: "https://linkedin.com/in/nahum-agyepong-ab45a7278",
    },
    {
      position: "Vice President",
      name: "KINGSLEY OTU-AMPONSAH",
      email: "kingotuamp@gmail.com",
      linkedin: "https://linkedin.com/in/kingsley-otu-amponsah-204796218",
    },
    {
      position: "General Secretary",
      name: "HUSNA AYARIGA",
      email: "ayarigahusna@gmail.com",
      linkedin: "https://linkedin.com/in/husna-ayariga-56a854212",
    },
    {
      position: "Organising Secretary",
      name: "GILBERT TINADAGA S.",
      email: "tinadagasongze@gmail.com",
      linkedin: "",
    },
    {
      position: "Treasurer",
      name: "SHIELA ZIEM",
      email: "ziemshiela99@gmail.com",
      linkedin: "https://linkedin.com/in/sheila-ziem-76741b354",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Contact UGLSU
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with the University of Ghana Law Students' Union. 
              We're here to support our members and the broader legal community.
            </p>
          </div>

          {/* Contact Methods */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-semibold mb-8">How to Reach Us</h2>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                      {method.icon}
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {method.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="font-medium mb-1">
                        {detail}
                      </p>
                    ))}
                    <CardDescription className="mt-2">
                      {method.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="mb-16">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h2 className="text-2xl font-heading font-semibold text-destructive">
                  Emergency Contacts
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {emergencyContacts.map((contact, index) => (
                  <Card key={index} className="border-destructive/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-destructive">{contact.title}</CardTitle>
                      <CardDescription className="text-lg font-bold text-foreground">
                        {contact.number}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Executive Committee Contacts */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-semibold mb-8">Executive Committee</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {executiveContacts.map((executive, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{executive.position}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground">
                          {executive.name}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${executive.email}`} className="text-primary hover:underline">
                          {executive.email}
                        </a>
                      </div>
                      {executive.linkedin && (
                        <div className="flex items-center space-x-2 text-sm">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-4 h-4 text-muted-foreground"><path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v5h-4v-8h4v2.1"></path><rect width="4" height="4" x="2" y="9" rx="1"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                          <a
                            href={executive.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            LinkedIn
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Contact Form */}
          <section className="mb-16">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                  <MessageSquare className="w-6 h-6" />
                  <span>Send us a Message</span>
                </CardTitle>
                <CardDescription>
                  For non-urgent matters, you can send us a message and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="your.email@domain.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Contact;