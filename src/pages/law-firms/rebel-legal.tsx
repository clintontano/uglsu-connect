import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RebelLegal = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <section className="py-16 px-4 bg-gradient-primary">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">REBEL LEGAL</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tired of being told you do not fit in, or you are not good enough? We understand, and they lied. You are just as much as capable as you are willing to push. Join Rebellion today, fight for what you believe in!
            </p>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>REBEL LEGAL</CardTitle>
                <CardDescription>
                  A movement dedicated to challenging the status quo and fighting for the rights and recognition we deserve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We are tired of being told you do not fit in, or you are not good enough? We understand, and they lied. You are just as much as capable as you are willing to push. Join Rebellion today, fight for what you believe in!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RebelLegal;
