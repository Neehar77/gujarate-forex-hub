import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { checkApiHealth } from "@/lib/api";

const Header = () => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await checkApiHealth();
        setApiStatus(response.success ? 'online' : 'offline');
      } catch (error) {
        setApiStatus('offline');
      }
    };

    checkBackend();
  }, []);

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
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                apiStatus === 'online' ? 'bg-green-500' : 
                apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-xs text-muted-foreground">
                {apiStatus === 'online' ? 'API Online' : 
                 apiStatus === 'offline' ? 'API Offline' : 'Checking...'}
              </span>
            </div>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="tel:+919913647948" className="hidden sm:flex items-center space-x-2 text-sm text-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91 9913647948</span>
            </a>
            <a href="mailto:vallabhforex@gmail.com" className="hidden sm:flex items-center space-x-2 text-sm text-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;