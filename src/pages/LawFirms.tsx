import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";

const lawFirms = [
  { name: "IURIS POINTIS", description: "Excellence in legal advocacy and consultation" },
  { name: "LEX APEX", description: "Premier legal solutions for complex matters" },
  { name: "PIESIE LEGAL CONSULT", description: "Trusted advisors in legal affairs" },
  { name: "NSAA CHAMBERS", description: "Professional legal representation" },
  { name: "ANIMUS DOMINI", description: "Dedicated to justice and legal excellence" },
  { name: "DNA & PARTNERS", description: "Strategic legal partnership firm" },
  { name: "LEAD ATTORNEYS", description: "Leading the way in legal practice" },
  { name: "VERITAS CHAMBERS", description: "Truth and integrity in legal service" },
  { name: "TOP HILL SQUARE", description: "Elevated legal solutions" },
  { name: "M&M LEGAL CONSULT", description: "Comprehensive legal consultation services" },
];

const LawFirms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-16 px-4 bg-gradient-primary">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">LSU Law Firms</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the distinguished law firms operating under the Law Students' Union, 
              providing professional legal services and practical experience to our students.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lawFirms.map((firm) => (
                <Card key={firm.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Scale className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-2">{firm.name}</CardTitle>
                        <CardDescription>{firm.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LawFirms;
