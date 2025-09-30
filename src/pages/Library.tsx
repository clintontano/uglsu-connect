import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Gavel, 
  GraduationCap, 
  Download, 
  Eye, 
  Filter 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LibraryDocument {
  id: string;
  title: string;
  type: string;
  author: string | null;
  year: number | null;
  course: string | null;
  downloads: number;
  tags: string[];
}

const resourceTypes = [
  { type: 'All', icon: BookOpen },
  { type: 'Case Law', icon: Gavel },
  { type: 'Article', icon: FileText },
  { type: 'Past Papers', icon: GraduationCap },
  { type: 'Study Guide', icon: BookOpen },
  { type: 'Lecture Notes', icon: FileText },
];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [libraryItems, setLibraryItems] = useState<LibraryDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('library-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'library_documents'
        },
        () => {
          fetchDocuments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('library_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLibraryItems(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load library documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.course?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getCountForType = (type: string) => {
    if (type === 'All') return libraryItems.length;
    return libraryItems.filter(item => item.type === type).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading library...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-display font-heading font-bold mb-6 text-foreground">
                UGLSU Digital Library
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-muted-foreground">
                Access a comprehensive collection of legal resources, case studies, past papers, 
                and academic materials curated for University of Ghana law students.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search resources, authors, courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg bg-background text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Types & Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Resource Type Filter */}
            <div className="flex flex-wrap gap-4 mb-8">
              {resourceTypes.map((type) => (
                <Button
                  key={type.type}
                  variant={selectedType === type.type ? 'default' : 'secondary'}
                  onClick={() => setSelectedType(type.type)}
                  className="flex items-center space-x-2"
                >
                  <type.icon className="w-4 h-4" />
                  <span>{type.type}</span>
                  <Badge variant="secondary" className="ml-2">
                    {getCountForType(type.type)}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredItems.length} of {libraryItems.length} resources
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="shadow-card border-0 hover:shadow-elegant transition-smooth">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{item.type}</Badge>
                      <span className="text-sm text-muted-foreground">{item.year}</span>
                    </div>
                    <CardTitle className="font-heading text-lg leading-tight">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Author: {item.author || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">Course: {item.course || 'N/A'}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Download className="w-4 h-4" />
                          <span>{item.downloads}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="library" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2">No resources found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Upload Section (Admin) */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-display font-heading font-bold mb-6">
              Contribute to Our Library
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Have valuable resources to share? Help grow our digital library 
              by contributing materials that benefit the entire law student community.
            </p>
            <Button variant="hero" size="lg">
              Submit Resource
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Library;