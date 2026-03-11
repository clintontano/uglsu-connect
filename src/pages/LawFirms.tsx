import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import LawFirmDetailModal from "@/components/LawFirmDetailModal";

interface LawFirm {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string | null;
  practice_areas: string[];
  founded_year: number | null;
  partner_count: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const LawFirms = () => {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFirm, setSelectedFirm] = useState<LawFirm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLawFirms = async () => {
    try {
      const { data, error } = await supabase
        .from("law_firms")
        .select("*")
        .eq("status", "active")
        .order("name");

      if (error) {
        console.error("Error fetching law firms:", error);
      } else {
        setLawFirms(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawFirms();
  }, []);

  const handleFirmClick = (firm: LawFirm) => {
    setSelectedFirm(firm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFirm(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-16 px-4 bg-gradient-primary">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">LSU Law Firms</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet distinguished law firms operating under Law Students' Union,
              providing professional legal services and practical experience to our students.
            </p>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <p>Loading law firms...</p>
              </div>
            ) : lawFirms.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No law firms available</h3>
                <p className="text-muted-foreground">Check back later for updates</p>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                {lawFirms.map((firm) => (
                  <Card
                    key={firm.id}
                    className="w-full max-w-[200px] p-5 flex flex-col items-center justify-center cursor-pointer transition-all group hover:shadow-xl border-2 border-muted hover:border-primary hover:scale-105"
                    onClick={() => handleFirmClick(firm)}
                  >
                    {firm.logo_url ? (
                      <img
                        src={firm.logo_url}
                        alt={firm.name + " logo"}
                        className="h-20 w-20 object-cover rounded-full mx-auto mb-4 border shadow group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-muted text-gray-400 flex items-center justify-center text-2xl font-bold mb-4 border">
                        {firm.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                    <h2 className="text-base font-semibold text-center mb-1 group-hover:text-primary transition-colors">
                      {firm.name}
                    </h2>
                    <p className="text-xs text-muted-foreground text-center">
                      Click for details
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      <LawFirmDetailModal
        firm={selectedFirm}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default LawFirms;
