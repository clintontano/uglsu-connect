import React, { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Calendar, BookOpen, Library, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SuggestionBox = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('policy');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 20MB",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Submission received!",
      description: "Thank you for your contribution. We'll review it shortly.",
    });
    setUploadedFile(null);
  };

  const suggestionTypes = [
    {
      value: 'policy',
      label: 'Policy Suggestion',
      icon: Lightbulb,
      description: 'Share your views on UGLSU policies and governance'
    },
    {
      value: 'event',
      label: 'Event Proposal',
      icon: Calendar,
      description: 'Suggest upcoming events, seminars, or workshops'
    },
    {
      value: 'article',
      label: 'Legally Speakin Article',
      icon: BookOpen,
      description: 'Submit articles for our student-led legal blog'
    },
    {
      value: 'resource',
      label: 'Library Resource',
      icon: Library,
      description: 'Contribute resources to our digital library'
    }
  ];

  const selectedTypeData = suggestionTypes.find(t => t.value === selectedType);

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
                {selectedTypeData && <selectedTypeData.icon className="w-6 h-6 text-primary" />}
                <span>Submit Your Contribution</span>
              </CardTitle>
              <CardDescription>
                Choose the type of submission and fill in the details below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Submission Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Submission Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select submission type" />
                    </SelectTrigger>
                    <SelectContent>
                      {suggestionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <type.icon className="w-4 h-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTypeData && (
                    <p className="text-sm text-muted-foreground">
                      {selectedTypeData.description}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
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
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    {selectedType === 'policy' ? 'Policy Topic' : 
                     selectedType === 'event' ? 'Event Title' :
                     selectedType === 'article' ? 'Article Title' :
                     'Resource Title'}
                  </Label>
                  <Input
                    id="title"
                    placeholder={
                      selectedType === 'policy' ? 'Brief topic of your policy suggestion' :
                      selectedType === 'event' ? 'Name of the proposed event' :
                      selectedType === 'article' ? 'Title of your article' :
                      'Title of the resource'
                    }
                    required
                  />
                </div>

                {/* Description/Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">
                    {selectedType === 'article' ? 'Article Content' : 'Description'}
                  </Label>
                  <Textarea
                    id="content"
                    rows={8}
                    placeholder={
                      selectedType === 'policy' ? 'Explain your policy suggestion in detail...' :
                      selectedType === 'event' ? 'Describe the event, objectives, and target audience...' :
                      selectedType === 'article' ? 'Write your article content here...' :
                      'Describe the resource and its relevance...'
                    }
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file">
                    Upload Document {selectedType === 'resource' && '(Required)'}
                    <span className="text-muted-foreground text-sm ml-2">(Max 20MB)</span>
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {uploadedFile ? (
                      <div className="flex items-center justify-between bg-muted p-3 rounded">
                        <div className="flex items-center space-x-2">
                          <Upload className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium">{uploadedFile.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOC, DOCX, PPT, PPTX (Max 20MB)
                        </p>
                        <Input
                          id="file"
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          required={selectedType === 'resource'}
                        />
                        <Label htmlFor="file">
                          <Button type="button" variant="outline" className="mt-3" asChild>
                            <span>Choose File</span>
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full">
                  Submit {selectedTypeData?.label}
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
              <p>• All submissions will be reviewed by the UGLSU team before publication or implementation.</p>
              <p>• Please ensure your content is original and properly cited if referencing other works.</p>
              <p>• For article submissions, maintain professional and respectful language.</p>
              <p>• Library resources should be relevant to legal studies and properly labeled.</p>
              <p>• Event proposals should include clear objectives and target audience.</p>
              <p>• You will receive a confirmation email once your submission is reviewed.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuggestionBox;
