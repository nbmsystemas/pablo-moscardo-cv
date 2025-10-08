import { Mail, Phone, Globe, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/pablo-profile.png";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="animate-fade-in order-2 md:order-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl" />
                <img 
                  src={profileImage} 
                  alt="Pablo Ezequiel Moscardo - Ingeniero en Sistemas"
                  className="relative w-full max-w-md h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 md:order-2 text-center md:text-left">
              {/* Name and Title */}
              <div className="animate-fade-in">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow leading-tight">
                  PABLO MOSCARDO
                </h1>
                <div className="h-1 w-32 mx-auto md:mx-0 bg-gradient-to-r from-primary to-accent mb-8 rounded-full" />
              </div>

              {/* Professional Title */}
              <div className="animate-fade-in-left delay-200">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-4 font-mono leading-tight">
                  INGENIERO EN SISTEMAS DE INFORMACIÓN
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-primary font-medium mb-8 leading-relaxed">
                  Auditor & Consultor IT | Ethical Hacker | Security Expert
                </p>
              </div>

              {/* Experience Badge */}
              <div className="animate-scale-in delay-400 mb-12">
                <div className="inline-block px-6 py-3 bg-card border border-primary/30 rounded-full">
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    +20 Años de Experiencia en IT
                  </p>
                </div>
              </div>

              {/* Contact Links */}
              <div className="animate-fade-in-right delay-600 flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 mb-8">
            <Button variant="outline" size="sm" className="group border-primary/50 hover:border-primary hover:bg-primary/10 sm:size-lg" asChild>
              <a href="mailto:pablo.ezequiel.moscardo@gmail.com" className="flex items-center gap-2">
                <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span>Email</span>
              </a>
            </Button>
            
            <Button variant="outline" size="sm" className="group border-primary/50 hover:border-primary hover:bg-primary/10 sm:size-lg" asChild>
              <a href="tel:+5493492640293" className="flex items-center gap-2">
                <Phone className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span>Teléfono</span>
              </a>
            </Button>
            
            <Button variant="outline" size="sm" className="group border-primary/50 hover:border-primary hover:bg-primary/10 sm:size-lg" asChild>
              <a href="https://nbmsystemas.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Globe className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span>Website</span>
              </a>
            </Button>
          </div>

              {/* Social Links */}
              <div className="animate-fade-in delay-800 flex justify-center md:justify-start gap-4 sm:gap-6">
            <a 
              href="https://linkedin.com/in/pablo-moscardo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            <a 
              href="https://twitter.com/pabloezm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
            >
              <Twitter className="w-7 h-7" />
            </a>
            <a 
              href="https://behance.net/pabloezm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 4.5h4.5c1.38 0 2.5 1.12 2.5 2.5 0 .89-.47 1.67-1.17 2.11C13.47 9.53 14 10.39 14 11.5c0 1.38-1.12 2.5-2.5 2.5H6.5V4.5zm2 2v2h2.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H8.5zm0 4v2h3c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-3zM15 6h6v1.5h-6V6zm1 8.5c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .34-.04.67-.12 1H18.5c.17.9.93 1.5 1.75 1.5.66 0 1.24-.36 1.55-.9H24c-.46 1.66-2.03 2.9-3.75 2.9-2.21 0-4-1.79-4-4zm6.38-.5c-.17-.9-.93-1.5-1.75-1.5-.82 0-1.58.6-1.75 1.5h3.5z"/>
              </svg>
            </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
