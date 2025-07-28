import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";
import heroImage from "@/assets/hero-forex.jpg";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Trusted Partner for
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Foreign Exchange</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Leading forex services in Ahmedabad, Gujarat. We provide comprehensive foreign exchange, travel insurance, mutual funds, and soon USDC transactions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-medium">Best Exchange Rates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="font-medium">RBI Authorized</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-accent" />
                <span className="font-medium">Global Reach</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Our Services
              </Button>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={heroImage} 
                alt="Forex Trading Services" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
              <div className="text-sm font-medium">Founded</div>
              <div className="text-2xl font-bold">2020</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg">
              <div className="text-sm font-medium">Happy Clients</div>
              <div className="text-2xl font-bold">5000+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;