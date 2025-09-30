import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Pin, Download, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  is_urgent: boolean;
  download_link: string | null;
}

const Notices = () => {
  const [urgentNotices, setUrgentNotices] = useState<Notice[]>([]);
  const [regularNotices, setRegularNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotices();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('notices-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notices'
        },
        () => {
          fetchNotices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotices = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const urgent = data?.filter(notice => notice.is_urgent) || [];
      const regular = data?.filter(notice => !notice.is_urgent) || [];

      setUrgentNotices(urgent);
      setRegularNotices(regular);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load notices. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'academic':
        return <Calendar className="w-5 h-5 text-primary" />;
      case 'event':
        return <Pin className="w-5 h-5 text-accent" />;
      default:
        return <Pin className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNoticeVariant = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'destructive';
      case 'academic':
        return 'default';
      case 'event':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading notices...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Notices & Announcements
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with important announcements, meeting schedules, and academic notices from UGLSU.
            </p>
          </div>

          {/* Urgent Notices */}
          {urgentNotices.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-semibold mb-6 text-destructive">
                Urgent Notices
              </h2>
              {urgentNotices.map((notice) => (
                <Alert key={notice.id} className="border-destructive/50 bg-destructive/5">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold mb-2">{notice.title}</div>
                    <div className="text-sm">{notice.description}</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Posted: {new Date(notice.date).toLocaleDateString()}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </section>
          )}

          {/* Regular Notices */}
          <section>
            <h2 className="text-2xl font-heading font-semibold mb-6">
              All Notices
            </h2>
            <div className="space-y-6">
              {regularNotices.map((notice) => (
                <Card key={notice.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getNoticeIcon(notice.type)}
                        <div className="flex-1">
                          <CardTitle className="text-lg">{notice.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {notice.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={getNoticeVariant(notice.type) as any}>
                        {notice.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(notice.date).toLocaleDateString()}</span>
                      </div>
                      {notice.download_link && (
                        <a 
                          href={notice.download_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-primary hover:underline"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Subscription CTA */}
          <section className="mt-16 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground mb-6">
              Never miss important announcements. Subscribe to our notice updates 
              and get notifications directly to your email.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notices;