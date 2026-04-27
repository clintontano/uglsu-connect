import React from 'react';
import { Music, Headphones, Play } from 'lucide-react';

const playlists = [
  {
    title: 'Hearing in Session — BOOST',
    description: 'High-energy tracks to power through long study sessions and keep your focus sharp.',
    href: 'https://open.spotify.com/playlist/300VC2EtmvpDAao0y4Gv8V',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c518fe163148d3aeee1ad0efa',
    icon: Music,
    mood: 'Energising',
  },
  {
    title: 'Hearing in Session — CALM',
    description: 'Soothing sounds to help you unwind, read, and reflect during quieter study moments.',
    href: 'https://open.spotify.com/playlist/4bGrixEyl0DaGUp9RevQDA',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c509fe39f20fc81b7fd1c8132',
    icon: Headphones,
    mood: 'Relaxing',
  },
];

// Spotify brand colors used as inline styles to stay outside the design tokens
const SPOTIFY_GREEN = '#1DB954';
const SPOTIFY_GREEN_HOVER = '#1ed760';
const SPOTIFY_BLACK = '#191414';

export const StudyPlaylistsSection: React.FC = () => {
  return (
    <section className="py-20" style={{ backgroundColor: SPOTIFY_BLACK }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{ backgroundColor: SPOTIFY_GREEN, color: SPOTIFY_BLACK }}
          >
            {/* Spotify glyph */}
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.56.3z" />
            </svg>
            Study Playlists by UGLSU
          </div>
          <h2 className="text-display font-heading font-bold mb-4" style={{ color: '#ffffff' }}>
            Hearing in Session 🎧
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#b3b3b3' }}>
            Curated by UGLSU on Spotify — press play and let the music carry you through your studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {playlists.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#181818' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#282828')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#181818')}
            >
              <div className="relative mb-5">
                <img
                  src={p.cover}
                  alt={`${p.title} cover art`}
                  loading="lazy"
                  className="w-full aspect-square object-cover rounded-lg shadow-2xl"
                />
                {/* Floating play button */}
                <div
                  className="absolute bottom-3 right-3 w-14 h-14 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                  style={{ backgroundColor: SPOTIFY_GREEN }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = SPOTIFY_GREEN_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = SPOTIFY_GREEN)}
                >
                  <Play className="w-6 h-6 ml-0.5" fill={SPOTIFY_BLACK} stroke={SPOTIFY_BLACK} />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <p.icon className="w-4 h-4" style={{ color: SPOTIFY_GREEN }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: SPOTIFY_GREEN }}>
                  {p.mood}
                </span>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2" style={{ color: '#ffffff' }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#b3b3b3' }}>
                {p.description}
              </p>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://open.spotify.com/user/31ppaqhcmf2apz6lbpsvycyunh5m"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-transform hover:scale-105"
            style={{ backgroundColor: SPOTIFY_GREEN, color: SPOTIFY_BLACK }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = SPOTIFY_GREEN_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = SPOTIFY_GREEN)}
          >
            Follow UGLSU on Spotify
          </a>
        </div>
      </div>
    </section>
  );
};
