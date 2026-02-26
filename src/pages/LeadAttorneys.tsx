import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Mail, Phone, MapPin, Briefcase } from "lucide-react";

const LeadAttorneys = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Sample data - replace with actual data from your backend
  const attorneys = [
    {
      id: 1,
      name: "Atty. Juan Dela Cruz",
      specialty: "Corporate Law",
      experience: "15 years",
      email: "juan.delacruz@lawfirm.com",
      phone: "+63 2 1234 5678",
      location: "Makati City",
      image: "",
      cases: "500+",
      rating: 4.8
    },
    {
      id: 2,
      name: "Atty. Maria Santos",
      specialty: "Family Law",
      experience: "12 years",
      email: "maria.santos@lawfirm.com",
      phone: "+63 2 2345 6789",
      location: "Quezon City",
      image: "",
      cases: "300+",
      rating: 4.9
    },
    {
      id: 3,
      name: "Atty. Roberto Reyes",
      specialty: "Criminal Law",
      experience: "20 years",
      email: "roberto.reyes@lawfirm.com",
      phone: "+63 2 3456 7890",
      location: "Manila",
      image: "",
      cases: "800+",
      rating: 4.7
    }
  ];

  const specialties = ["all", "Corporate Law", "Family Law", "Criminal Law", "Civil Law", "Labor Law"];

  const filteredAttorneys = attorneys.filter(attorney => {
    const matchesSearch = attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attorney.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || attorney.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lead Attorneys</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with our experienced lead attorneys who specialize in various fields of law
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search attorneys by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Attorneys Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttorneys.map((attorney) => (
            <Card key={attorney.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={attorney.image} alt={attorney.name} />
                  <AvatarFallback className="text-lg">
                    {attorney.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{attorney.name}</CardTitle>
                <CardDescription className="text-lg font-medium text-primary">
                  {attorney.specialty}
                </CardDescription>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="secondary">{attorney.experience}</Badge>
                  <Badge variant="outline">{attorney.cases} cases</Badge>
                  <Badge variant="outline">⭐ {attorney.rating}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{attorney.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{attorney.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{attorney.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span>{attorney.experience} experience</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1" size="sm">
                    Schedule Consultation
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAttorneys.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No attorneys found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default LeadAttorneys;
