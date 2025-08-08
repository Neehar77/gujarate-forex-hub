import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Coins,
  ArrowRight,
  Clock,
  Award,
  Users
} from "lucide-react";
import QuoteRequestModal from "./QuoteRequestModal";

const Services = () => {
  const services = [
    {
      icon: DollarSign,
      title: "Foreign Currency Buy & Sell",
      description: "Best exchange rates for all major currencies with quick and secure transactions.",
      features: ["Live Exchange Rates", "Multiple Currencies", "Instant Processing", "RBI Authorized"],
      color: "primary"
    },
    {
      icon: Coins,
      title: "Foreign Currency Travel Card",
      description: "Convenient prepaid travel cards for international trips with competitive rates.",
      features: ["Multi-Currency Card", "Secure Transactions", "Global Acceptance", "Easy Reloading"],
      color: "accent"
    },
    {
      icon: TrendingUp,
      title: "Foreign Currency Remittance",
      description: "Fast and secure money transfer services to international destinations.",
      features: ["Quick Transfers", "Competitive Rates", "Secure Process", "Global Network"],
      color: "primary"
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Comprehensive travel insurance coverage for international and domestic trips.",
      features: ["Medical Coverage", "Trip Cancellation", "Baggage Protection", "24/7 Support"],
      color: "accent"
    }
  ];

  return (
    <section id="services" className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial services designed to meet all your foreign exchange and investment needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 shadow-md animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  service.color === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                }`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <QuoteRequestModal 
                  service={service.title}
                  trigger={
                    <Button variant="professional" className="w-full">
                      Learn More
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center animate-fade-in">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Processing</h3>
            <p className="text-muted-foreground">Same-day processing for most transactions</p>
          </div>
          <div className="text-center animate-fade-in" style={{animationDelay: '0.1s'}}>
            <Award className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">RBI Authorized</h3>
            <p className="text-muted-foreground">Fully licensed and regulated by RBI</p>
          </div>
          <div className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-muted-foreground">Dedicated customer support team</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;