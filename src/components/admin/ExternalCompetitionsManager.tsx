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
  Trophy, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin, 
  Users, 
  Globe,
  Target,
  Award,
  Clock
} from 'lucide-react';

interface ExternalCompetition {
  id: string;
  title: string;
  organizer: string;
  type: string;
  level: string;
  description: string;
  deadline: string;
  location: string;
  participants: string;
  status: 'open' | 'upcoming' | 'closed' | 'completed';
  image_url: string | null;
  application_guidelines: string | null;
  created_at: string;
  updated_at: string;
}

const ExternalCompetitionsManager = () => {
  const [competitions, setCompetitions] = useState<ExternalCompetition[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState<ExternalCompetition | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    type: '',
    level: '',
    description: '',
    deadline: '',
    location: '',
    participants: '',
    status: 'upcoming' as 'open' | 'upcoming' | 'closed' | 'completed',
    application_guidelines: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('external_competitions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompetitions(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch competitions",
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
      if (editingCompetition) {
        const { error } = await supabase
          .from('external_competitions')
          .update(formData)
          .eq('id', editingCompetition.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Competition updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('external_competitions')
          .insert(formData);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Competition created successfully",
        });
      }

      resetForm();
      fetchCompetitions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: editingCompetition ? "Failed to update competition" : "Failed to create competition",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (competition: ExternalCompetition) => {
    setEditingCompetition(competition);
    setFormData({
      title: competition.title,
      organizer: competition.organizer,
      type: competition.type,
      level: competition.level,
      description: competition.description,
      deadline: competition.deadline,
      location: competition.location,
      participants: competition.participants,
      status: competition.status
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this competition?')) return;

    try {
      const { error } = await supabase
        .from('external_competitions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Competition deleted successfully",
      });
      fetchCompetitions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete competition",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      organizer: '',
      type: '',
      level: '',
      description: '',
      deadline: '',
      location: '',
      participants: '',
      status: 'upcoming'
    });
    setEditingCompetition(null);
    setIsFormOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Applications Open</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Closed</Badge>;
      case 'completed':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Completed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">External Competitions Management</h2>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Competition
        </Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingCompetition ? 'Edit Competition' : 'Add New Competition'}
              </CardTitle>
              <CardDescription>
                {editingCompetition ? 'Update the competition information' : 'Enter details for the new competition'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Competition Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="organizer">Organizer *</Label>
                    <Input
                      id="organizer"
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Moot Court">Moot Court</option>
                      <option value="Client Counseling">Client Counseling</option>
                      <option value="Quiz">Quiz</option>
                      <option value="Debate">Debate</option>
                      <option value="Negotiation">Negotiation</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="level">Level *</Label>
                    <select
                      id="level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="International">International</option>
                      <option value="Continental">Continental</option>
                      <option value="National">National</option>
                      <option value="Regional">Regional</option>
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
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deadline">Application Deadline *</Label>
                    <Input
                      id="deadline"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="application_guidelines">Application Guidelines</Label>
                    <Textarea
                      id="application_guidelines"
                      value={formData.application_guidelines}
                      onChange={(e) => setFormData({ ...formData, application_guidelines: e.target.value })}
                      rows={4}
                      placeholder="Enter detailed application guidelines, requirements, and procedures..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'open' | 'upcoming' | 'closed' | 'completed' })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="open">Applications Open</option>
                      <option value="closed">Closed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {editingCompetition ? 'Update' : 'Create'} Competition
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Competitions List */}
      <div className="grid gap-4">
        {competitions.map((competition) => (
          <Card key={competition.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {competition.image_url ? (
                        <img src={competition.image_url} alt={competition.title} className="w-10 h-10 object-contain" />
                      ) : (
                        <Trophy className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{competition.title}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        {getStatusBadge(competition.status)}
                        <Badge variant="outline">{competition.type}</Badge>
                        <Badge variant="secondary">{competition.level}</Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{competition.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(competition)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(competition.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Organizer</p>
                    <p>{competition.organizer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Deadline</p>
                    <p>{competition.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{competition.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p>{competition.participants}</p>
                  </div>
                </div>
              </div>
              {competition.application_guidelines && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Application Guidelines</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {competition.application_guidelines}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExternalCompetitionsManager;
