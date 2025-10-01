import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LibraryDocument {
  id: string;
  title: string;
  category: string;
  author: string | null;
  year: number | null;
  course: string | null;
  downloads: number;
  tags: string[];
  file_url: string | null;
}

const LibraryManager = () => {
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Books",
    author: "",
    year: "",
    course: "",
    tags: "",
    file_url: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from("library_documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setDocuments(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let fileUrl = formData.file_url;

    // Upload PDF if provided
    if (pdfFile) {
      const fileExt = pdfFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('library-documents')
        .upload(filePath, pdfFile);

      if (uploadError) {
        toast({ title: "Error", description: uploadError.message, variant: "destructive" });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('library-documents')
        .getPublicUrl(filePath);

      fileUrl = publicUrl;
    }

    const submitData = {
      title: formData.title,
      category: formData.category,
      author: formData.author || null,
      year: formData.year ? parseInt(formData.year) : null,
      course: formData.course || null,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      file_url: fileUrl || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("library_documents")
        .update(submitData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Document updated successfully" });
        resetForm();
        fetchDocuments();
      }
    } else {
      const { error } = await supabase.from("library_documents").insert([submitData]);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Document created successfully" });
        resetForm();
        fetchDocuments();
      }
    }
  };

  const handleEdit = (doc: LibraryDocument) => {
    setEditingId(doc.id);
    setFormData({
      title: doc.title,
      category: doc.category,
      author: doc.author || "",
      year: doc.year?.toString() || "",
      course: doc.course || "",
      tags: doc.tags.join(", "),
      file_url: doc.file_url || "",
    });
    setPdfFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    const { error } = await supabase.from("library_documents").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Document deleted successfully" });
      fetchDocuments();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Books",
      author: "",
      year: "",
      course: "",
      tags: "",
      file_url: "",
    });
    setPdfFile(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Document" : "Add New Document"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  required
                >
                  <option value="Books">Books</option>
                  <option value="Study Guides">Study Guides</option>
                  <option value="Lecture Slides">Lecture Slides</option>
                  <option value="Cases">Cases</option>
                  <option value="Past Questions">Past Questions</option>
                  <option value="Articles">Articles</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>PDF Document (required, max 20MB)</Label>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                required={!editingId && !formData.file_url}
              />
              {formData.file_url && (
                <p className="text-sm text-muted-foreground">Current: {formData.file_url}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Course</Label>
                <Input
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="tag1, tag2, tag3"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Update" : "Create"} Document
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{doc.course || "—"}</TableCell>
                  <TableCell>{doc.year}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(doc)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryManager;