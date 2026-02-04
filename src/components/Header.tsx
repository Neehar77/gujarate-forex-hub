
import { Phone, Mail, Menu, X, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { useFormSubmission } from '@/hooks/use-form-submission';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useFormSubmission();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-3 group">
            <img
              src="/logo.jpg"
              alt="Shri Vallabh Forex Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary group-hover:border-accent transition-colors"
            />
            <div>
              <h1 className="font-bold text-xl text-foreground">Shri Vallabh Forex Pvt Ltd</h1>
              <p className="text-xs text-muted-foreground">Ahmedabad, Gujarat</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-accent/10 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 px-4 rounded-md hover:bg-accent/10 text-foreground font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;