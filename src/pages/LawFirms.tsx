import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const sampleLawFirms = [
  { name: "IURIS POINTIS", logo: null, detailRoute: null },
  { name: "LEX APEX", logo: null, detailRoute: null },
  { name: "PIESIE LEGAL CONSULT", logo: null, detailRoute: null },
  { name: "NSAA CHAMBERS", logo: null, detailRoute: null },
  { name: "ANIMUS DOMINI", logo: null, detailRoute: null },
  { name: "DNA & PARTNERS", logo: null, detailRoute: null },
  { name: "LEAD ATTORNEYS", logo: "/lead-attorneys-logo.jpeg", detailRoute: "/law-firms/lead-attorneys" },
  { name: "VERITAS CHAMBERS", logo: null, detailRoute: null },
  { name: "TOP HILL SQUARE", logo: null, detailRoute: null },
  { name: "M&M LEGAL CONSULT", logo: null, detailRoute: null },
  { name: "REBEL LEGAL", logo: null, detailRoute: "/law-firms/rebel-legal" },
];

const LawFirms = () => {
  const [lawFirms, setLawFirms] = useState(sampleLawFirms);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchLawFirms = async () => {
    try {
      const { data, error } = await supabase
        .from("law_firms")
        .select("*")
        .eq("is_active", true)
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
              <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center">
                {lawFirms.map((firm) => (
                  <Card
                    key={firm.id}
                    className={`w-full max-w-[180px] p-5 flex flex-col items-center justify-center cursor-pointer transition-shadow group hover:shadow-xl border-2 border-muted ${firm.logo ? "hover:border-primary" : ""}`}
                    onClick={() => firm.detailRoute && navigate(firm.detailRoute)}
                  >
                    {firm.logo ? (
                      <img
                        src={firm.logo}
                        alt={firm.name + " logo"}
                        className="h-20 w-20 object-cover rounded-full mx-auto mb-4 border shadow group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-muted text-gray-400 flex items-center justify-center text-3xl font-bold mb-4 border">
                        {/* If no logo, use initials or ? */}
                        {firm.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                    )}
                    <h2 className="text-base font-semibold text-center mb-1">{firm.name}</h2>
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

export default LawFirms;
