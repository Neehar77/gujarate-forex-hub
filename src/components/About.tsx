import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Calendar, Target } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm">About ForexIndia</Badge>
              <h2 className="text-3xl lg:text-5xl font-bold">
                Leading Forex Services in
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Ahmedabad</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Based in the vibrant commercial hub of Ahmedabad, Gujarat, we have been serving individuals and businesses with comprehensive financial services since 2020. Our commitment to excellence and customer satisfaction has made us a trusted name in foreign exchange and financial services.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-sm text-muted-foreground">Ahmedabad, Gujarat</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-accent">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold">Established</h4>
                      <p className="text-sm text-muted-foreground">2020</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Building className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">License</h4>
                      <p className="text-sm text-muted-foreground">RBI Authorized</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-accent">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold">Clients Served</h4>
                      <p className="text-sm text-muted-foreground">5000+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Why Choose ForexIndia?</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Competitive Rates</h4>
                      <p className="text-sm text-muted-foreground">Best exchange rates in the market with transparent pricing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-foreground font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Trusted Service</h4>
                      <p className="text-sm text-muted-foreground">RBI authorized with years of reliable service experience</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Future Ready</h4>
                      <p className="text-sm text-muted-foreground">Expanding to include USDC transactions for modern needs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;