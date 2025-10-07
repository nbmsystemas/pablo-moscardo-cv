import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Globe, Building, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      icon: Rocket,
      title: "RapiVenta POS",
      subtitle: "Sistema de Punto de Venta",
      period: "2024 - Producción",
      description: "Sistema POS completo desarrollado con tecnologías modernas. Gestión de ventas, inventario y reportes en tiempo real para PyMEs.",
      tags: ["React", "TypeScript", "POS", "ERP"],
      highlight: true,
      link: "https://www.rapiventapos.site/"
    },
    {
      icon: Globe,
      title: "Mr. Doctor",
      subtitle: "Sistema de Gestión Médica",
      period: "2024 - Producción",
      description: "Plataforma integral para gestión de consultorios médicos. Administración de pacientes, historias clínicas y agenda de turnos.",
      tags: ["React", "CRM", "Healthcare", "TypeScript"],
      highlight: true,
      link: "https://mrdoctor.nbmsystemas.com/"
    },
    {
      icon: Building,
      title: "Punto & Coma Trading",
      subtitle: "Sistema Algorítmico de Trading",
      period: "2024 - Desarrollo",
      description: "Sistema algorítmico de trading con análisis de datos en tiempo real. Implementación de estrategias automatizadas y machine learning.",
      tags: ["Python", "Trading", "Análisis de Datos", "IA"],
      highlight: true,
      link: "https://puntoicomatrading.vercel.app/"
    },
    {
      icon: Building,
      title: "TRASCENDER IT",
      subtitle: "Consultoría & Auditoría IT",
      period: "2008 - Presente",
      description: "Servicio preventivo y correctivo, Auditoría y Consultoría IT, Seguridad informática, Diseño gráfico (Pymes y Corporativos).",
      tags: ["Consultoría", "Auditoría", "Seguridad", "Diseño"],
      highlight: false
    },
    {
      icon: Globe,
      title: "Proyecto Internacional",
      subtitle: "Caracas, Venezuela",
      period: "03/06/2008 - 10/06/2008",
      description: "Implementación de políticas de Seguridad Informática en Servidores de empresa internacional.",
      tags: ["Seguridad", "Internacional", "Servidores"],
      highlight: false
    }
  ];

  return (
    <section id="proyectos" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Proyectos Laborales Independientes
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
          <p className="text-muted-foreground text-lg">
            +10 años de experiencia en IT
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card
                key={index}
                className={`border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group animate-scale-in ${
                  project.highlight ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <Icon className="w-8 h-8 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    {project.highlight && (
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        Destacado
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-primary font-mono">{project.period}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-accent/20 hover:text-accent transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {project.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group/btn"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      Ver Proyecto
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <Card className="mt-8 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-fade-in">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground leading-relaxed">
              Para más información sobre proyectos y referencias adicionales, puedo ampliar más datos personalmente.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Projects;
