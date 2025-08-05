import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">VF</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">Vallabh Forex Pvt Ltd</h1>
                <p className="text-xs text-muted-foreground">Ahmedabad, Gujarat</p>
              </div>
            </div>
         
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-foreground">+91 9913647948</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-foreground">vallabhforex@gmail.com</span>
              </div>
            </div>
            <Button variant="professional">Get Quote</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;