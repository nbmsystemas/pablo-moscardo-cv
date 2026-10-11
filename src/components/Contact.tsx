import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Globe, Linkedin, Twitter, Download } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "pablo.ezequiel.moscardo@gmail.com",
      href: "mailto:pablo.ezequiel.moscardo@gmail.com"
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "+54 9 3492 640293",
      href: "tel:+549349215640293"
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.nbmsystemas.com",
      href: "https://www.nbmsystemas.com"
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Argentina - Rafaela",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pablo-moscardo"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/pabloezm"
    },
    {
      icon: Globe,
      label: "Behance",
      href: "https://behance.net/pabloezm"
    }
  ];

  return (
    <section id="contacto" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Contacto
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
          <p className="text-muted-foreground text-lg">
            Me complacerá mantener las entrevistas que consideren necesarias
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-foreground font-medium hover:text-primary transition-colors break-words text-sm sm:text-base"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Social Links */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-fade-in">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Redes Sociales
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    asChild
                    className="group border-primary/50 hover:border-primary hover:bg-primary/10"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                      <span>{social.label}</span>
                    </a>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-muted-foreground mb-4">
            A la espera de sus novedades, lo saludo atentamente.
          </p>
          <p className="text-foreground font-semibold text-lg mb-6">
            Pablo Ezequiel Moscardo
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
