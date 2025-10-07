import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Ingeniero en Sistemas de Información",
      institution: "Universidad Tecnológica Nacional",
      location: "Facultad de Ingeniería, Buenos Aires",
      year: "2004",
      type: "Universitario",
      icon: GraduationCap
    },
    {
      degree: "Técnico en Computación",
      institution: "Escuela Técnica N°01 Otto Krause",
      location: "Buenos Aires",
      year: "1997",
      type: "Secundario",
      icon: Award
    }
  ];

  return (
    <section id="educacion" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Educación
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => {
            const Icon = edu.icon;
            return (
              <Card
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group animate-fade-in-left"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                          {edu.degree}
                        </CardTitle>
                        <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground font-semibold mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.location}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
