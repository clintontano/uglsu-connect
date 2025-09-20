import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/sections/hero';
import { QuickLinksSection } from '@/components/sections/quick-links';
import { Footer } from '@/components/ui/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <QuickLinksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
