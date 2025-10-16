import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/sections/hero';
import { AboutExcerptSection } from '@/components/sections/about-excerpt';
import { QuickLinksSection } from '@/components/sections/quick-links';
import { SuggestionBoxSection } from '@/components/sections/suggestion-box';
import { Footer } from '@/components/ui/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <QuickLinksSection />
        <AboutExcerptSection />
        <SuggestionBoxSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
