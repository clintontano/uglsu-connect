import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Users,
  Building
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
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

const LawFirmsManager = () => {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFirm, setEditingFirm] = useState<LawFirm | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    practice_areas: '',
    founded_year: '',
    partner_count: '',
    status: 'active' as 'active' | 'inactive',
    logo_url: null as string | null
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchLawFirms();
  }, []);

  const fetchLawFirms = async () => {
    try {
      const { data, error } = await supabase
        .from('law_firms' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLawFirms((data as any[]) || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch law firms",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        practice_areas: formData.practice_areas.split(',').map(area => area.trim()).filter(area => area),
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
        partner_count: formData.partner_count ? parseInt(formData.partner_count) : null,
      };

      if (editingFirm) {
        const { error } = await supabase
          .from('law_firms' as any)
          .update(submitData)
          .eq('id', editingFirm.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Law firm updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('law_firms' as any)
          .insert(submitData);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Law firm created successfully",
        });
      }

      resetForm();
      fetchLawFirms();
    } catch (error: any) {
      toast({
        title: "Error",
        description: editingFirm ? "Failed to update law firm" : "Failed to create law firm",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `law-firms/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('law-firms')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('law-firms')
        .getPublicUrl(filePath);

      setFormData({ ...formData, logo_url: publicUrl });
      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleEdit = (firm: LawFirm) => {
    setEditingFirm(firm);
    setFormData({
      name: firm.name,
      description: firm.description,
      address: firm.address,
      phone: firm.phone,
      email: firm.email,
      website: firm.website,
      practice_areas: firm.practice_areas.join(', '),
      founded_year: firm.founded_year?.toString() || '',
      partner_count: firm.partner_count?.toString() || '',
      status: firm.status,
      logo_url: firm.logo_url
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this law firm?')) return;

    try {
      const { error } = await supabase
        .from('law_firms' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Law firm deleted successfully",
      });
      fetchLawFirms();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete law firm",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      practice_areas: '',
      founded_year: '',
      partner_count: '',
      status: 'active',
      logo_url: null
    });
    setEditingFirm(null);
    setIsFormOpen(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Law Firms Management</h2>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Law Firm
        </Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingFirm ? 'Edit Law Firm' : 'Add New Law Firm'}
              </CardTitle>
              <CardDescription>
                {editingFirm ? 'Update the law firm information' : 'Enter details for the new law firm'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Firm Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="logo">Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploadingLogo}
                    />
                    {uploadingLogo && <p className="text-sm text-muted-foreground">Uploading...</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://"
                  />
                </div>

                <div>
                  <Label htmlFor="practice_areas">Practice Areas (comma-separated)</Label>
                  <Input
                    id="practice_areas"
                    value={formData.practice_areas}
                    onChange={(e) => setFormData({ ...formData, practice_areas: e.target.value })}
                    placeholder="Corporate Law, Litigation, IP Law"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="founded_year">Founded Year</Label>
                    <Input
                      id="founded_year"
                      type="number"
                      value={formData.founded_year}
                      onChange={(e) => setFormData({ ...formData, founded_year: e.target.value })}
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partner_count">Partner Count</Label>
                    <Input
                      id="partner_count"
                      type="number"
                      value={formData.partner_count}
                      onChange={(e) => setFormData({ ...formData, partner_count: e.target.value })}
                      min="1"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {editingFirm ? 'Update' : 'Create'} Law Firm
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Law Firms List */}
      <div className="grid gap-4">
        {lawFirms.map((firm) => (
          <Card key={firm.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {firm.logo_url ? (
                        <img src={firm.logo_url} alt={firm.name} className="w-10 h-10 object-contain" />
                      ) : (
                        <Building className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{firm.name}</CardTitle>
                      <Badge variant={firm.status === 'active' ? 'default' : 'secondary'}>
                        {firm.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{firm.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(firm)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(firm.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{firm.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{firm.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{firm.email}</span>
                </div>
                {firm.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={firm.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
                {firm.founded_year && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>Founded {firm.founded_year}</span>
                  </div>
                )}
                {firm.partner_count && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{firm.partner_count} partners</span>
                  </div>
                )}
              </div>
              {firm.practice_areas.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Practice Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {firm.practice_areas.map((area, index) => (
                      <Badge key={index} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LawFirmsManager;
