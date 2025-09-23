import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Pin, Download, AlertTriangle } from 'lucide-react';

const Notices = () => {
  const urgentNotices = [
    {
      id: 1,
      title: "Emergency General Meeting - January 25, 2024",
      description: "All UGLSU members are required to attend the emergency general meeting to discuss upcoming election procedures.",
      date: "2024-01-20",
      type: "urgent"
    }
  ];

  const regularNotices = [
    {
      id: 2,
      title: "Second Semester Examination Timetable Released",
      description: "The examination timetable for the second semester has been published. Students are advised to check for any conflicts.",
      date: "2024-01-18",
      type: "academic",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "UGLSU Executive Committee Meeting Minutes - January 2024",
      description: "Minutes from the January executive committee meeting are now available for member review.",
      date: "2024-01-15",
      type: "administrative",
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "Legal Aid Clinic Schedule Updated",
      description: "New schedule for the student legal aid clinic sessions. Sign-up required for participation.",
      date: "2024-01-12",
      type: "event"
    },
    {
      id: 5,
      title: "Library Resource Access Changes",
      description: "Important updates to digital library access procedures and new resource additions.",
      date: "2024-01-10",
      type: "information"
    },
    {
      id: 6,
      title: "Moot Court Competition Registration Open",
      description: "Registration is now open for the annual inter-university moot court competition. Deadline: February 15, 2024.",
      date: "2024-01-08",
      type: "event"
    }
  ];

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
                      {notice.downloadUrl && (
                        <button className="flex items-center space-x-1 text-sm text-primary hover:underline">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
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