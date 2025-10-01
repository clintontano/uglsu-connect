import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  The University of Ghana Law Students' Union ("UGLSU", "we", "us", or "our") respects 
                  your privacy and is committed to protecting your personal information. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you visit our 
                  website or use our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
                    <p className="leading-relaxed mb-2">
                      We may collect personal information that you voluntarily provide, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Name and contact details (email, phone number)</li>
                      <li>Student ID and academic information</li>
                      <li>Login credentials for member areas</li>
                      <li>Submitted content (articles, suggestions, comments)</li>
                      <li>Payment information for events or services</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Automatically Collected Information</h4>
                    <p className="leading-relaxed mb-2">
                      When you visit our website, we automatically collect:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Browser type and version</li>
                      <li>IP address and location data</li>
                      <li>Pages visited and time spent</li>
                      <li>Referring website addresses</li>
                      <li>Device information</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Providing and managing access to union services and resources</li>
                  <li>Communicating important announcements, events, and updates</li>
                  <li>Processing membership applications and event registrations</li>
                  <li>Responding to inquiries and providing support</li>
                  <li>Improving our website and services</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Ensuring website security and preventing fraud</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information only in the 
                  following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>With your consent or at your direction</li>
                  <li>With UGLSU executive committee members for union operations</li>
                  <li>With University of Ghana officials when necessary for academic purposes</li>
                  <li>With service providers who assist in website operations (under confidentiality agreements)</li>
                  <li>When required by law or to protect legal rights</li>
                  <li>In connection with union events or activities (with appropriate notice)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information from unauthorized access, disclosure, alteration, or destruction. 
                  However, no method of transmission over the internet is completely secure, and we cannot 
                  guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes 
                  outlined in this Privacy Policy, unless a longer retention period is required by law. 
                  When information is no longer needed, we securely delete or anonymize it.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Access:</strong> Request a copy of your personal information</li>
                  <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong className="text-foreground">Deletion:</strong> Request deletion of your information (subject to legal requirements)</li>
                  <li><strong className="text-foreground">Objection:</strong> Object to certain processing of your information</li>
                  <li><strong className="text-foreground">Portability:</strong> Request transfer of your information to another organization</li>
                  <li><strong className="text-foreground">Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us at info@uglsu.org.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Links</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the 
                  privacy practices of these external sites. We encourage you to review their privacy 
                  policies before providing any personal information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our practices or 
                  legal requirements. The "Last Updated" date at the top indicates when the policy was last 
                  revised. We encourage you to review this policy regularly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions or concerns about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Email:</strong> info@uglsu.org</li>
                  <li><strong className="text-foreground">Address:</strong> University of Ghana School of Law Campus</li>
                  <li><strong className="text-foreground">Subject Line:</strong> Privacy Policy Inquiry</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
