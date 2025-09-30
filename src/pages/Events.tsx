import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  description: string;
  status: string;
  registration_open: boolean;
}

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'Competition': return 'bg-accent text-accent-foreground';
    case 'Workshop': return 'bg-library-primary text-primary-foreground';
    case 'Meeting': return 'bg-primary text-primary-foreground';
    case 'Lecture': return 'bg-secondary text-secondary-foreground';
    case 'Launch': return 'bg-success text-success-foreground';
    case 'Orientation': return 'bg-warning text-warning-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        () => {
          fetchEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      const now = new Date();
      const upcoming = data?.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && event.status !== 'completed';
      }) || [];
      
      const past = data?.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate < now || event.status === 'completed';
      }) || [];

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-display font-heading font-bold mb-6 text-foreground">
              Events & Calendar
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Stay connected with the UGLSU community through our diverse range of academic, 
              professional, and social events designed to enhance your law school experience.
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-display font-heading font-bold">Upcoming Events</h2>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                View Full Calendar
              </Button>
            </div>

            <div className="grid gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="shadow-card border-0 hover:shadow-elegant transition-smooth">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                          {event.registration_open && (
                            <Badge variant="outline" className="ml-2 text-success border-success">
                              Registration Open
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-heading font-semibold mb-3">
                          {event.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {event.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2 text-accent" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="w-4 h-4 mr-2 text-accent" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2 text-accent" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:ml-8 mt-6 lg:mt-0 flex flex-col items-end">
                        <div className="flex items-center text-muted-foreground mb-4">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{event.attendees} registered</span>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {event.registration_open ? (
                            <Button variant="hero" size="sm">
                              Register Now
                            </Button>
                          ) : (
                            <Button variant="secondary" size="sm" disabled>
                              Registration Closed
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-display font-heading font-bold mb-12">Recent Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="shadow-card border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <CardTitle className="font-heading text-xl">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-accent" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-accent" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="group">
                      View Summary
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Event Submission CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-display font-heading font-bold mb-6">
              Have an Event Idea?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              UGLSU welcomes event proposals from students. Share your ideas for workshops, 
              seminars, or community activities that can benefit our law student community.
            </p>
            <Button variant="hero" size="lg">
              Submit Event Proposal
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;