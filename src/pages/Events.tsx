import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, MapPin, Users, Clock, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number | null;
  status: string | null;
  registration_open: boolean | null;
}

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource: Event;
}

const getEventTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'Academic': 'bg-blue-100 text-blue-800 border-blue-200',
    'Social': 'bg-purple-100 text-purple-800 border-purple-200',
    'Workshop': 'bg-green-100 text-green-800 border-green-200',
    'Seminar': 'bg-amber-100 text-amber-800 border-amber-200',
    'Meeting': 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
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
      now.setHours(0, 0, 0, 0);
      
      const upcoming = data.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= now;
      });
      
      const recent = data.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < now;
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setUpcomingEvents(upcoming);
      setRecentEvents(recent);
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

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return upcomingEvents.map(event => {
      const eventDate = new Date(event.date);
      const [hours, minutes] = event.time.split(':').map(Number);
      const start = new Date(eventDate);
      start.setHours(hours, minutes);
      const end = new Date(start);
      end.setHours(hours + 2, minutes);

      return {
        title: event.title,
        start,
        end,
        resource: event
      };
    });
  }, [upcomingEvents]);

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
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Events Calendar
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with upcoming seminars, workshops, and student gatherings organized by UGLSU.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-border p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List View
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Calendar View
              </Button>
            </div>
          </div>

          {viewMode === 'calendar' ? (
            <section className="mb-16">
              <Card>
                <CardContent className="p-6">
                  <div style={{ height: '600px' }}>
                    <Calendar
                      localizer={localizer}
                      events={calendarEvents}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: '100%' }}
                      onSelectEvent={(event) => {
                        toast({
                          title: event.resource.title,
                          description: `${event.resource.location} at ${event.resource.time}`,
                        });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </section>
          ) : (
            <>
              {/* Upcoming Events */}
              <section className="mb-16">
                <h2 className="text-3xl font-heading font-bold mb-8">Upcoming Events</h2>
                {upcomingEvents.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No upcoming events scheduled</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="hover:shadow-elegant transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getEventTypeColor(event.type)}>
                                  {event.type}
                                </Badge>
                                {event.registration_open && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Registration Open
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-xl">{event.title}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {event.description && (
                            <CardDescription className="text-sm">
                              {event.description}
                            </CardDescription>
                          )}
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{event.location}</span>
                            </div>
                            {event.attendees !== null && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="w-4 h-4 mr-2" />
                                <span>{event.attendees} attendees expected</span>
                              </div>
                            )}
                          </div>

                          {event.registration_open && (
                            <Button className="w-full">Register Now</Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </section>

              {/* Recent Events */}
              {recentEvents.length > 0 && (
                <section>
                  <h2 className="text-3xl font-heading font-bold mb-8">Recent Events</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {recentEvents.slice(0, 6).map((event) => (
                      <Card key={event.id} className="opacity-80">
                        <CardHeader>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getEventTypeColor(event.type)} variant="outline">
                              {event.type}
                            </Badge>
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Call to Action */}
          <section className="mt-16 text-center bg-muted/50 rounded-lg p-8">
            <Plus className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-heading font-semibold mb-4">
              Have an Event Idea?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Interested in organizing an event with UGLSU?
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/suggestions">Submit Event Proposal</Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
