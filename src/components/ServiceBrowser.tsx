import { useState, useEffect } from 'react';
import { Search, Wrench, Lightbulb, Hammer, Home, Paintbrush, Bug, Flower2, FileText, Thermometer, Shield, ShowerHead, Truck, Heart, Car, Cpu, CalendarDays, Users, HelpCircle, Monitor } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ServiceCard from '@/components/ServiceCard';
import { useAuth } from "../context/AuthContext";

// Icon mapping for the services
const ICON_MAP = {
  "Plumbing Services": Wrench,
  "Electrical Services": Lightbulb,
  "Carpentry Services": Hammer,
  "Home Appliance Repair": Home,
  "Painting Services": Paintbrush,
  "Pest Control": Bug,
  "Gardening & Landscaping": Flower2,
  "Home Renovation": FileText,
  "AC & HVAC Services": Thermometer,
  "Home Security": Shield,
  "Laundry Services": ShowerHead,
  "Moving & Relocation": Truck,
  "Wellness & Lifestyle": Heart,
  "Vehicle Services": Car,
  "Smart Home": Cpu,
  "Event Support": CalendarDays,
  "Handyman Services": Wrench,
  "IT & Technical Support": Monitor
};

const getDescriptionForService = (title) => {
  const descriptions = {
    "Plumbing Services": "Fix leaks, installations, and repairs",
    "Electrical Services": "Wiring, fixtures, and electrical repairs",
    "Carpentry Services": "Furniture repair and custom woodwork",
    "Home Appliance Repair": "Fix appliances and household equipment",
    "Painting Services": "Interior and exterior painting",
    "Pest Control": "Removal and prevention of pests",
    "Gardening & Landscaping": "Garden maintenance and design",
    "Home Renovation": "Major and minor home renovations",
    "AC & HVAC Services": "Installation and repair of climate systems",
    "Home Security": "Security system installation and monitoring",
    "Laundry Services": "Washing, dry cleaning, and ironing",
    "Moving & Relocation": "Packing, moving, and setup services",
    "Wellness & Lifestyle": "In-home fitness, nutrition, and wellness",
    "Vehicle Services": "Car maintenance and repair at home",
    "Smart Home": "Smart device installation and setup",
    "Event Support": "Party planning and event services",
    "Handyman Services": "General repairs and maintenance",
    "IT & Technical Support": "Computer and tech support at home"
  };
  return descriptions[title] || "Service description not available";
};

const ServiceBrowser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { servicesList, getServicePrice } = useAuth();
  
  useEffect(() => {
    if (servicesList.length === 0) {
      getServicePrice();
    }
  }, []);
  
  const filteredServices = servicesList.filter(
    service => service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 relative">
        <Input
          placeholder="Search for a service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
      </div>
      
      {searchTerm && filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.name}
              title={service.name}
              description={getDescriptionForService(service.name)}
              icon={ICON_MAP[service.name] || HelpCircle}
              price={service.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceBrowser;
