import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";

interface JudicialDecision {
  id: string;
  title: string;
  date: string;
  description: string | null;
  pdf_url: string;
  created_at: string;
}

const JudicialDecisions = () => {
  const [decisions, setDecisions] = useState<JudicialDecision[]>([]);
  const [filteredDecisions, setFilteredDecisions] = useState<JudicialDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = async () => {
    try {
      const { data, error } = await supabase
        .from("judicial_decisions")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setDecisions(data || []);
      setFilteredDecisions(data || []);
    } catch (error) {
      console.error("Error fetching decisions:", error);
      toast({
        title: "Error",
        description: "Failed to load judicial decisions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (pdfUrl: string, title: string) => {
    window.open(pdfUrl, "_blank");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredDecisions(decisions);
      return;
    }
    
    const filtered = decisions.filter((decision) => {
      const searchLower = query.toLowerCase();
      return (
        decision.title.toLowerCase().includes(searchLower) ||
        decision.date.toLowerCase().includes(searchLower) ||
        (decision.description && decision.description.toLowerCase().includes(searchLower))
      );
    });
    
    setFilteredDecisions(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-16 px-4 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">LSU Judicial Board Decisions</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access past decisions made by the UGLSU Judicial Board. These documents provide transparency and guidance on matters affecting the law student community.
              </p>
            </div>

            <div className="max-w-xl mx-auto mb-12">
              <Input
                type="text"
                placeholder="Search by title, date, or description..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full"
              />
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading decisions...</p>
              </div>
            ) : filteredDecisions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "No decisions match your search." : "No judicial decisions available at this time."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDecisions.map((decision) => (
                  <Card key={decision.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{decision.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {decision.date}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {decision.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {decision.description}
                        </p>
                      )}
                      <Button
                        onClick={() => handleDownload(decision.pdf_url, decision.title)}
                        className="w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JudicialDecisions;