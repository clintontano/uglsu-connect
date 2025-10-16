import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Calendar, Bell, BookOpen, Newspaper, Mail, Users, MessageSquare } from "lucide-react";
import EventsManager from "@/components/admin/EventsManager";
import NoticesManager from "@/components/admin/NoticesManager";
import LibraryManager from "@/components/admin/LibraryManager";
import BlogManager from "@/components/admin/BlogManager";
import CommunityMembersManager from "@/components/admin/CommunityMembersManager";
import NewsletterManager from "@/components/admin/NewsletterManager";
import SuggestionsManager from "@/components/admin/SuggestionsManager";

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
            variant={activeTab === "notices" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("notices")}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notices
          </Button>
          <Button
            variant={activeTab === "library" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("library")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Library
          </Button>
          <Button
            variant={activeTab === "blog" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("blog")}
          >
            <Newspaper className="mr-2 h-4 w-4" />
            Blog
          </Button>
          <div className="border-t my-2"></div>
          <Button
            variant={activeTab === "community" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("community")}
          >
            <Users className="mr-2 h-4 w-4" />
            Community Members
          </Button>
          <Button
            variant={activeTab === "newsletter" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("newsletter")}
          >
            <Mail className="mr-2 h-4 w-4" />
            Newsletter
          </Button>
          <Button
            variant={activeTab === "suggestions" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("suggestions")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Suggestions
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

            <TabsContent value="notices">
              <NoticesManager />
            </TabsContent>

            <TabsContent value="library">
              <LibraryManager />
            </TabsContent>

            <TabsContent value="blog">
              <BlogManager />
            </TabsContent>

            <TabsContent value="community">
              <CommunityMembersManager />
            </TabsContent>

            <TabsContent value="newsletter">
              <NewsletterManager />
            </TabsContent>

            <TabsContent value="suggestions">
              <SuggestionsManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;