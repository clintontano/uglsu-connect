import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Users,
  Briefcase,
  Building,
  X
} from 'lucide-react';

interface LawFirm {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string | null;
  practice_areas: string[];
  founded_year: number | null;
  partner_count: number | null;
  status: string;
}

interface LawFirmDetailModalProps {
  firm: LawFirm | null;
  isOpen: boolean;
  onClose: () => void;
}

const LawFirmDetailModal: React.FC<LawFirmDetailModalProps> = ({ 
  firm, 
  isOpen, 
  onClose 
}) => {
  if (!firm) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                {firm.logo_url ? (
                  <img 
                    src={firm.logo_url} 
                    alt={firm.name} 
                    className="w-14 h-14 object-contain" 
                  />
                ) : (
                  <Building className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <DialogTitle className="text-2xl">{firm.name}</DialogTitle>
                <Badge 
                  variant={firm.status === 'active' ? 'default' : 'secondary'}
                  className="mt-2"
                >
                  {firm.status}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground leading-relaxed">
              {firm.description || 'No description available.'}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm">{firm.address || 'Address not available'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm">{firm.phone || 'Phone not available'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm">{firm.email || 'Email not available'}</span>
              </div>
              {firm.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <a
                    href={firm.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Firm Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Firm Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {firm.founded_year && (
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">Founded {firm.founded_year}</span>
                </div>
              )}
              {firm.partner_count && (
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{firm.partner_count} partners</span>
                </div>
              )}
            </div>
          </div>

          {/* Practice Areas */}
          {firm.practice_areas && firm.practice_areas.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Practice Areas</h3>
              <div className="flex flex-wrap gap-2">
                {firm.practice_areas.map((area, index) => (
                  <Badge key={index} variant="outline">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            {firm.website && (
              <Button asChild className="flex-1">
                <a
                  href={firm.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </Button>
            )}
            {firm.email && (
              <Button variant="outline" asChild className="flex-1">
                <a href={`mailto:${firm.email}`}>
                  Send Email
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LawFirmDetailModal;
