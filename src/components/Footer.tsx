import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">VF</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">Vallabh Forex Pvt Ltd</h3>
                <p className="text-sm opacity-80">Ahmedabad, Gujarat</p>
              </div>
            </div>
            <p className="text-background/80 mb-4 max-w-md">
              Your trusted partner for foreign currency exchange, travel cards, remittance, and travel insurance. RBI authorized and serving Gujarat since 2018.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 9913647948</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">vallabhforex@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">SG Highway, Ahmedabad, Gujarat</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-background/80">
              <li>Foreign Currency Buy & Sell</li>
              <li>Foreign Currency Travel Card</li>
              <li>Foreign Currency Remittance</li>
              <li>Travel Insurance</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 Vallabh Forex Inc. All rights reserved. RBI Authorized Money Changer.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;