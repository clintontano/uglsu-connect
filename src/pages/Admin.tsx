import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Calendar, BookOpen, Briefcase, Scale } from "lucide-react";
import EventsManager from "@/components/admin/EventsManager";
import LibraryManager from "@/components/admin/LibraryManager";
import LawFirmsManager from "@/components/admin/LawFirmsManager";
import ExternalCompetitionsManager from "@/components/admin/ExternalCompetitionsManager";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("events");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/20 flex flex-col relative">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          <Button
            variant={activeTab === "events" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("events")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Events
          </Button>
          <Button
            variant={activeTab === "library" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("library")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Library (Image Uploads)
          </Button>
          <Button
            variant={activeTab === "lawfirms" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("lawfirms")}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Law Firms
          </Button>
          <Button
            variant={activeTab === "competitions" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("competitions")}
          >
            <Scale className="mr-2 h-4 w-4" />
            External Competitions
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="border-b bg-background sticky top-0 z-10">
          <div className="px-8 py-4">
            <h2 className="text-2xl font-bold">Content Management</h2>
          </div>
        </header>

        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

            <TabsContent value="events">
              <EventsManager />
            </TabsContent>

            <TabsContent value="library">
              <LibraryManager />
            </TabsContent>

            <TabsContent value="lawfirms">
              <LawFirmsManager />
            </TabsContent>

            <TabsContent value="competitions">
              <ExternalCompetitionsManager />
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;