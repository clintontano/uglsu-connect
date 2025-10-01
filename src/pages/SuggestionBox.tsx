import React, { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SuggestionBox = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('suggestions')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Submission received!",
        description: "Thank you for your contribution. We'll review it shortly.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Suggestion Box
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your voice matters! Share your ideas, suggestions, and contributions to help improve UGLSU.
            </p>
          </div>

          {/* Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                <span>Submit Your Suggestion</span>
              </CardTitle>
              <CardDescription>
                Share your ideas, feedback, or suggestions with us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Your Suggestion</Label>
                  <Textarea
                    id="message"
                    rows={8}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your ideas, feedback, or suggestions..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Suggestion"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• All submissions will be reviewed by the UGLSU team.</p>
              <p>• Please ensure your suggestions are constructive and respectful.</p>
              <p>• You will receive a confirmation email once your submission is reviewed.</p>
              <p>• For urgent matters, please contact us directly via email.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuggestionBox;
