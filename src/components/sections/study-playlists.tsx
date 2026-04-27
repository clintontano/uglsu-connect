import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Headphones, ArrowRight } from 'lucide-react';

const playlists = [
  {
    title: 'Hearing in Session — BOOST',
    description: 'High-energy tracks to power through long study sessions and keep your focus sharp.',
    href: 'https://open.spotify.com/playlist/300VC2EtmvpDAao0y4Gv8V',
    icon: Music,
    mood: 'Energising',
  },
  {
    title: 'Hearing in Session — CALM',
    description: 'Soothing sounds to help you unwind, read, and reflect during quieter study moments.',
    href: 'https://open.spotify.com/playlist/4bGrixEyl0DaGUp9RevQDA',
    icon: Headphones,
    mood: 'Relaxing',
  },
];

export const StudyPlaylistsSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-display font-heading font-bold text-foreground mb-4">
            Study Playlists
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated by UGLSU on Spotify — press play and let the music carry you through your studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {playlists.map((p) => (
            <Card key={p.title} className="group hover:shadow-elegant transition-smooth border-0 shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-accent/10 mr-4">
                    <p.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-card-foreground">
                      {p.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">{p.mood}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{p.description}</p>
                <Button
                  variant="ghost"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 hover:text-white"
                  asChild
                >
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center space-x-2"
                  >
                    <span className="group-hover:text-white">Listen on Spotify</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform group-hover:text-white" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
