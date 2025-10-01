import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  read_time: string;
  content: string;
  image_url: string | null;
}

const Blog = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('blog-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false })
        .limit(6);

      if (error) throw error;
      setFeaturedPosts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load blog posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(featuredPosts.map(post => post.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Legally Speakin
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, analysis, and perspectives from UGLSU members on legal matters, 
              student life, and the evolving landscape of law in Ghana.
            </p>
          </div>

          {/* Featured Posts */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-semibold mb-8">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.read_time}</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                        <Calendar className="w-4 h-4 ml-2" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Categories */}
          {categories.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-heading font-semibold mb-8">Browse by Category</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="h-auto p-4 justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              Share Your Legal Insights
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have a legal perspective to share? Join our community of student writers 
              and contribute to the discourse on law and justice in Ghana.
            </p>
            <Button size="lg" asChild>
              <Link to="/suggestions">Submit an Article</Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;