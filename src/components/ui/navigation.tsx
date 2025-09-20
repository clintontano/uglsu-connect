import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Calendar, 
  Library, 
  BookOpen, 
  Bell, 
  UserPlus, 
  Phone,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Digital Library', href: '/library', icon: Library },
  { name: 'Legally Speakin', href: '/blog', icon: BookOpen },
  { name: 'Notices', href: '/notices', icon: Bell },
  { name: 'Membership', href: '/membership', icon: UserPlus },
  { name: 'Contact', href: '/contact', icon: Phone },
];

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className={cn("bg-primary text-primary-foreground shadow-elegant", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">U</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-bold">UGLSU</h1>
                <p className="text-xs text-primary-foreground/80">University of Ghana Law Students' Union</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-smooth flex items-center space-x-1",
                    isActive
                      ? "bg-primary-foreground/10 text-primary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="accent" size="sm" asChild>
              <Link to="/membership">Join UGLSU</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-primary-foreground/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-smooth flex items-center space-x-2",
                      isActive
                        ? "bg-primary-foreground/10 text-primary-foreground"
                        : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4">
                <Button variant="accent" size="sm" className="w-full" asChild>
                  <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                    Join UGLSU
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};