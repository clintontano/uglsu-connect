import React, { useState } from 'react';
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

const libraryItems = [
  {
    id: 1,
    title: 'Constitutional Law Case Studies',
    type: 'Case Law',
    author: 'Prof. Kwame Frimpong',
    year: '2024',
    course: 'Constitutional Law',
    downloads: 234,
    tags: ['Constitutional', 'Case Studies', 'Ghana Law']
  },
  {
    id: 2,
    title: 'Contract Law Principles and Practice',
    type: 'Article',
    author: 'Dr. Akosua Mensah',
    year: '2023',
    course: 'Contract Law',
    downloads: 189,
    tags: ['Contracts', 'Commercial Law', 'Legal Principles']
  },
  {
    id: 3,
    title: 'Criminal Procedure Past Papers 2020-2023',
    type: 'Past Papers',
    author: 'UGLSU Academic Committee',
    year: '2023',
    course: 'Criminal Procedure',
    downloads: 456,
    tags: ['Exam Papers', 'Criminal Law', 'Study Guide']
  },
  {
    id: 4,
    title: 'Introduction to Legal Research Methods',
    type: 'Study Guide',
    author: 'Prof. Yaw Asante',
    year: '2024',
    course: 'Legal Research',
    downloads: 167,
    tags: ['Research', 'Methodology', 'Academic Writing']
  },
  {
    id: 5,
    title: 'Ghana Supreme Court Landmark Decisions',
    type: 'Case Law',
    author: 'Justice Sarah Opoku',
    year: '2024',
    course: 'Jurisprudence',
    downloads: 298,
    tags: ['Supreme Court', 'Precedent', 'Ghana Law']
  },
  {
    id: 6,
    title: 'Corporate Law Lecture Notes - Level 400',
    type: 'Lecture Notes',
    author: 'Dr. Kofi Boateng',
    year: '2024',
    course: 'Corporate Law',
    downloads: 134,
    tags: ['Corporate', 'Business Law', 'Lecture Notes']
  }
];

const resourceTypes = [
  { type: 'All', icon: BookOpen, count: libraryItems.length },
  { type: 'Case Law', icon: Gavel, count: libraryItems.filter(item => item.type === 'Case Law').length },
  { type: 'Article', icon: FileText, count: libraryItems.filter(item => item.type === 'Article').length },
  { type: 'Past Papers', icon: GraduationCap, count: libraryItems.filter(item => item.type === 'Past Papers').length },
  { type: 'Study Guide', icon: BookOpen, count: libraryItems.filter(item => item.type === 'Study Guide').length },
];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

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
                    {type.count}
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
                        <p className="text-sm text-muted-foreground">Author: {item.author}</p>
                        <p className="text-sm text-muted-foreground">Course: {item.course}</p>
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