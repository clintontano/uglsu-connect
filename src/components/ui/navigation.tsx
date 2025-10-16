import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  X,
  ChevronDown,
  Scale,
  Briefcase,
  MessageSquare
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Notices', href: '/notices', icon: Bell },
  { name: 'Digital Library', href: '/library', icon: Library },
  { name: 'Legally Speakin', href: '/blog', icon: BookOpen },
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
              <img 
                src="/uglsu-logo.png" 
                alt="UGLSU Logo" 
                className="w-10 h-10 rounded-lg object-contain"
              />
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
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-smooth flex items-center space-x-1"
                >
                  <span>More</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card z-50">
                <DropdownMenuItem asChild>
                  <Link to="/law-firms" className="flex items-center cursor-pointer">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Law Firms
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/judicial-decisions" className="flex items-center cursor-pointer">
                    <Scale className="w-4 h-4 mr-2" />
                    LSU Judicial Decisions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center cursor-pointer">
                    <Users className="w-4 h-4 mr-2" />
                    Student Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/suggestions" className="flex items-center cursor-pointer">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Suggestion Box
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              
              {/* More Links in Mobile */}
              <div className="border-t border-primary-foreground/10 mt-2 pt-2">
                <Link
                  to="/law-firms"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-smooth flex items-center space-x-2"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Law Firms</span>
                </Link>
                <Link
                  to="/judicial-decisions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-smooth flex items-center space-x-2"
                >
                  <Scale className="w-5 h-5" />
                  <span>LSU Judicial Decisions</span>
                </Link>
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-smooth flex items-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Student Services</span>
                </Link>
                <Link
                  to="/suggestions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-smooth flex items-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Suggestion Box</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};