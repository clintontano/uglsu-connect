import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter,
} from 'lucide-react';

const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { name: 'About UGLSU', href: '/about' },
      { name: 'Executive Committee', href: '/about#executive' },
      { name: 'Digital Library', href: '/library' },
      { name: 'Events Calendar', href: '/events' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Suggestion Box', href: '/suggestions' },
      { name: 'Admin Access', href: '/auth' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Legally Speakin Blog', href: '/blog' },
      { name: 'Judicial Decisions', href: '/judicial-decisions' },
      { name: 'LSU Law Firms', href: '/law-firms' },
      { name: 'Student Services', href: '/services' },
      { name: 'Academic Support', href: '/support' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ]
  }
];

const socialLinks = [
  {
    name: 'Snapchat',
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13c-.56 0-1.06.46-1.37.83-.61.8-2.72.86-2.82.86-.19.01-.34.17-.32.36.01.14.12.26.26.3 1.13.24 1.72.61 1.88.75.31.25.39.74.41.85.02.13.13.22.25.22H8m8-4c.56 0 1.06.46 1.37.83.61.8 2.72.86 2.82.86.19.01.34.17.32.36-.01.14-.12.26-.26.3-1.13.24-1.72.61-1.88.75-.31.25-.39.74-.41.85-.02.13-.13.22-.25.22H16M8 17h8m-4-4.5L14 13m-4 0 2-.5V15m0-11c-4.17 0-7.37 4.17-7.5 7.5a10.95 10.95 0 0 0 4.66 9.06A8.54 8.54 0 0 0 12 21.5a8.54 8.54 0 0 0 3.84-1.44A10.95 10.95 0 0 0 19.5 11.5C19.37 8.17 16.17 4 12 4Zm-2.5 8.5 .5-.5 2 .5 2-.5.5.5" /></svg>
    ),
    href: 'https://www.snapchat.com/add/ug_lsu',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/ug_lsu',
  },
  {
    name: 'TikTok',
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 256 256" fill="currentColor"><path d="M180 45.7V136a53.33 53.33 0 1 1-53.3-53.3 8 8 0 0 1 0 16A37.3 37.3 0 1 0 164 136V32a8 8 0 0 1 16 0c0 13.9 9.1 25.5 20 25.5a8 8 0 0 1 0 16c-14.2 0-27.7-10.2-32-27.8ZM192 16a8 8 0 0 0-8 8v120a45.3 45.3 0 1 1-27.6-41.2 8 8 0 0 0 7.2-14.4A61.34 61.34 0 1 0 200 144V24a8 8 0 0 0-8-8Z"/></svg>
    ),
    href: 'https://www.tiktok.com/@uglsu',
  },
  {
    name: 'X / Twitter',
    icon: Twitter,
    href: 'https://twitter.com/ug_lsu',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/uglsu',
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  src="/LSU logo.PNG" 
                  alt="UGLSU Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">UGLSU</h3>
                <p className="text-sm text-primary-foreground/80">
                  University of Ghana Law Students' Union
                </p>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Empowering law students through advocacy, education, and community building 
              at the University of Ghana School of Law.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm">lawstudents.ug@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm">+233 55 154 4080</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm">UG School of Law Campus</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm flex items-center group"
                    >
                      {link.name}
                      {link.href.startsWith('http') && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <path d="M15 3h6v6" />
                          <path d="M10 14L21 3" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary-foreground/5 rounded-lg p-8 mb-12">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-heading font-semibold mb-2">Stay Updated</h4>
            <p className="text-primary-foreground/80 mb-4 text-sm">
              Subscribe to get the latest news, events, and important announcements.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background text-foreground border-primary-foreground/20"
              />
              <Button variant="accent" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/51st Admin logo.png" alt="51st Admin logo" className="h-12 w-auto" />
            <span className="text-sm text-primary-foreground/90 font-medium">51st UGLSU Administration</span>
          </div>
          <div className="text-sm text-primary-foreground/80 mb-4 md:mb-0">
            © 2025 University of Ghana Law Students' Union. All rights reserved.
          </div>

          {/* Powered by RoomBerl LTD */}
          <div className="text-sm text-primary-foreground/80 mb-4 md:mb-0">
            Powered by{" "}
            <a 
              href="https://roomberl.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors underline"
            >
              RoomBerl LTD
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-smooth"
                aria-label={social.name}
              >
                {typeof social.icon === 'function' ? (
                  social.icon({ className: 'w-5 h-5' })
                ) : (
                  <social.icon className="w-5 h-5" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};