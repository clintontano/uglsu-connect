import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the UGLSU website, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to these terms, please do not use 
                  our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Membership and Access</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Access to certain features of this website is restricted to registered members of the 
                  University of Ghana Law Students' Union. You are responsible for maintaining the 
                  confidentiality of your account credentials.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Conduct</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Users agree to use the website in accordance with all applicable laws and regulations. 
                  Prohibited activities include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Posting false, misleading, or defamatory content</li>
                  <li>Attempting to gain unauthorized access to any portion of the website</li>
                  <li>Harassing or intimidating other users</li>
                  <li>Distributing viruses or malicious code</li>
                  <li>Using the platform for commercial purposes without permission</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos, and software, is the 
                  property of UGLSU or its content suppliers and is protected by intellectual property laws. 
                  Unauthorized use of any materials may violate copyright, trademark, and other laws.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Content Submissions</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  By submitting content to UGLSU (including articles, suggestions, or comments), you grant 
                  us a non-exclusive, royalty-free license to use, reproduce, and distribute such content 
                  for union purposes. You retain ownership of your content but warrant that you have the 
                  right to grant this license.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  UGLSU and its officers shall not be liable for any direct, indirect, incidental, or 
                  consequential damages arising from the use of or inability to use our website or services. 
                  We provide the website "as is" without warranties of any kind.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Modifications</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  UGLSU reserves the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting. Your continued use of the website after changes constitutes 
                  acceptance of the modified terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at info@uglsu.org or 
                  visit our contact page.
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

export default TermsOfService;
