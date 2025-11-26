import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";

const intro = `Lead Attorneys is an inclusive, talent-nurturing firm which gives members the opportunity to grow, gain practical experience, and develop their legal skills.\nWe are dedicated to fostering an environment that supports continuous learning to expand our impact while maintaining an unwavering commitment to excellence in all our endeavors.`;

const LeadAttorneys = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white dark:bg-muted rounded-2xl shadow-lg p-6 md:p-10 flex flex-col items-center text-center">
          {/* Logo */}
          <img
            src="/lead-attorneys-logo.jpeg"
            alt="Lead Attorneys Logo"
            className="h-24 w-24 rounded-full object-cover border-4 border-primary bg-white dark:bg-muted -mt-16 mb-6 shadow-md"
          />

          {/* Title */}
          <h1 className="text-3xl font-bold mb-2 text-primary">Lead Attorneys</h1>

          {/* Firm Image */}
          <img
            src="/lead-attorneys-image.jpeg"
            alt="Lead Attorneys Team"
            className="w-full max-w-xs h-48 md:h-64 rounded-lg object-cover my-6 mx-auto border border-muted shadow-md"
          />

          {/* Intro */}
          <p className="text-md md:text-lg text-muted-foreground whitespace-pre-line leading-relaxed">
            {intro}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeadAttorneys;
