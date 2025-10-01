import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import Library from "./pages/Library";
import Blog from "./pages/Blog";
import Notices from "./pages/Notices";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import SuggestionBox from "./pages/SuggestionBox";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Accessibility from "./pages/Accessibility";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import StudentServices from "./pages/StudentServices";
import AcademicSupport from "./pages/AcademicSupport";
import InternshipAccess from "./pages/InternshipAccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/library" element={<Library />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/suggestions" element={<SuggestionBox />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/services" element={<StudentServices />} />
          <Route path="/support" element={<AcademicSupport />} />
          <Route path="/internship" element={<InternshipAccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
