import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  understanding how you use our site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                    <p className="leading-relaxed">
                      These cookies are necessary for the website to function properly. They enable basic 
                      functions like page navigation, secure access to member areas, and form submissions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Performance Cookies</h4>
                    <p className="leading-relaxed">
                      These cookies help us understand how visitors interact with our website by collecting 
                      anonymous information about page visits, time spent on pages, and any errors encountered.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Functionality Cookies</h4>
                    <p className="leading-relaxed">
                      These cookies enable personalized features such as remembering your login details, 
                      language preferences, and other customization options.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  UGLSU uses cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Maintaining your login session</li>
                  <li>Remembering your preferences and settings</li>
                  <li>Analyzing website traffic and usage patterns</li>
                  <li>Improving website performance and user experience</li>
                  <li>Ensuring website security</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control and manage cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>View what cookies are stored and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from specific websites</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please note that disabling certain cookies may affect the functionality of our website 
                  and limit your access to some features.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services that set their own cookies to provide services such as 
                  analytics, social media integration, and authentication. These third parties have their 
                  own privacy and cookie policies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, please contact us at info@uglsu.org.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
