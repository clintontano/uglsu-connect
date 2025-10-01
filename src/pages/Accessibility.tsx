import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Keyboard, Volume2, Monitor } from 'lucide-react';

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Accessibility Statement
            </h1>
            <p className="text-lg text-muted-foreground">
              UGLSU is committed to ensuring digital accessibility for all users
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Commitment</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  The University of Ghana Law Students' Union is committed to ensuring that our website 
                  is accessible to people with disabilities. We strive to adhere to the Web Content 
                  Accessibility Guidelines (WCAG) 2.1 Level AA standards and continuously work to improve 
                  the user experience for all visitors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Visual Accessibility</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Clear typography, sufficient color contrast, and text alternatives for images. 
                      Compatible with screen readers and magnification tools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Keyboard className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Keyboard Navigation</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      All website functions are accessible using a keyboard. Focus indicators are visible, 
                      and navigation follows a logical tab order.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Responsive Design</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Our website adapts to different screen sizes and orientations, making it accessible 
                      on various devices including desktops, tablets, and mobile phones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Volume2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Clear Content Structure</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Content is organized with proper headings, lists, and semantic HTML to facilitate 
                      understanding and navigation for all users.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assistive Technologies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website is designed to be compatible with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                  <li>Screen magnification software</li>
                  <li>Speech recognition software</li>
                  <li>Alternative input devices</li>
                  <li>Browser text size adjustment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Known Limitations</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  While we strive for full accessibility, some third-party content or embedded features 
                  may not meet our accessibility standards. We are actively working to address these 
                  limitations and welcome feedback on any accessibility barriers you encounter.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback and Assistance</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We welcome feedback on the accessibility of our website. If you encounter any 
                  accessibility barriers or have suggestions for improvement, please contact us:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Email:</strong> info@uglsu.org</li>
                  <li><strong className="text-foreground">Subject:</strong> Website Accessibility</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We aim to respond to accessibility feedback within 5 business days and will work with 
                  you to provide the information or service you need in an accessible format.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Continuous Improvement</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  UGLSU regularly reviews our website accessibility and makes improvements as part of our 
                  ongoing commitment to digital inclusion. This accessibility statement is reviewed and 
                  updated annually.
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

export default Accessibility;
