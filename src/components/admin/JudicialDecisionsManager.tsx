import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, FileText, Upload, CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface JudicialDecision {
  id: string;
  title: string;
  date: string;
  description: string | null;
  pdf_url: string;
}

const JudicialDecisionsManager = () => {
  const [decisions, setDecisions] = useState<JudicialDecision[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
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
    } catch (error) {
      console.error("Error fetching decisions:", error);
      toast({
        title: "Error",
        description: "Failed to load judicial decisions",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      setPdfFile(file);
    }
  };

  const uploadPDF = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("judicial-decisions")
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from("judicial-decisions")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const pdfUrl = await uploadPDF(pdfFile);

      const { error } = await supabase.from("judicial_decisions").insert({
        title: formData.title,
        date: formData.date,
        description: formData.description || null,
        pdf_url: pdfUrl,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Judicial decision uploaded successfully",
      });

      setFormData({ title: "", date: "", description: "" });
      setSelectedDate(undefined);
      setPdfFile(null);
      fetchDecisions();
    } catch (error) {
      console.error("Error uploading decision:", error);
      toast({
        title: "Error",
        description: "Failed to upload judicial decision",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, pdfUrl: string) => {
    if (!confirm("Are you sure you want to delete this decision?")) return;

    try {
      const fileName = pdfUrl.split("/").pop();
      if (fileName) {
        await supabase.storage.from("judicial-decisions").remove([fileName]);
      }

      const { error } = await supabase
        .from("judicial_decisions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Decision deleted successfully",
      });
      fetchDecisions();
    } catch (error) {
      console.error("Error deleting decision:", error);
      toast({
        title: "Error",
        description: "Failed to delete decision",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Judicial Decision</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Decision Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setFormData({ 
                        ...formData, 
                        date: date ? format(date, "yyyy-MM-dd") : "" 
                      });
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the decision..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="pdf">PDF File</Label>
              <Input
                id="pdf"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              {pdfFile && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {pdfFile.name}
                </p>
              )}
            </div>

            <Button type="submit" disabled={loading}>
              <Upload className="h-4 w-4 mr-2" />
              {loading ? "Uploading..." : "Upload Decision"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Judicial Decisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {decisions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No decisions uploaded yet
              </p>
            ) : (
              decisions.map((decision) => (
                <div
                  key={decision.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex gap-3 flex-1">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{decision.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Date: {decision.date}
                      </p>
                      {decision.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {decision.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(decision.id, decision.pdf_url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JudicialDecisionsManager;