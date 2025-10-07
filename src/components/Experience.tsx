import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building2 } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Desarrollador Full Stack & Consultor IA",
      company: "Freelance",
      period: "2019 - Actualidad",
      current: true,
      description: "Desarrollo de sistemas a medida para empresas y PyMEs. Consultor y asesor en IA, automatizaciones, N8N y Agentes IA. Desarrollo de sistemas POS/ERP/CRM personalizados. Implementación de soluciones algorítmicas y análisis de datos.",
      reference: "Portfolio: rapiventapos.site, mrdoctor.nbmsystemas.com"
    },
    {
      title: "Gerente General Área Sistema",
      company: "FINANYA!",
      period: "2018 - 2019",
      current: false,
      description: "Encargado de Casa Central y 6 Sucursales. Sistema, Redes, Servidores, Seguridad Informática, Procesos, Infraestructura, Desarrollo, personal a cargo (2).",
      reference: "Ref.: Disponible a Solicitud del interesado"
    },
    {
      title: "Perito Oficial & Perito de Parte",
      company: "Policía Federal Argentina",
      period: "2015 - 2019",
      current: false,
      description: "Desarrollo tareas de Perito Informático para la Policía Federal y para diferentes estudios de abogacía como Estudio Rossini & Asociados - Lorenzetti y Asociados."
    },
    {
      title: "Administrador de Sistemas",
      company: "Grupo Medios Litoral",
      period: "2013-2014",
      description: "Desempeñando Tareas en Admin Sistema, Auditorías en Seguridad, Licenciamiento y Soporte Técnico.",
      reference: "Ref.: Disponible a Solicitud del interesado"
    },
    {
      title: "Técnico de Redes y Admin. Sistema",
      company: "MG Seguridad",
      period: "2008-2011",
      description: "Técnico áreas redes y Administrador de Sistema.",
      reference: "Ref.: Disponible a Solicitud del interesado"
    },
    {
      title: "Encargado de Laboratorio de Sistema",
      company: "Ministerio de Justicia y Culto",
      period: "2007-2008",
      description: "Encargado de Laboratorio de Sistema, áreas redes, sistemas y seguridad informática.",
      reference: "Ref.: Disponible a Solicitud del interesado"
    },
    {
      title: "Docente CTC",
      company: "UTN Santa Fe",
      period: "2006",
      description: "Dictado de cursos CTC. La capacitación estaba dirigida a profesores y maestros de escuelas primarias y secundarias, EGB Y POLIMODAL. Designado por la Universidad Tecnológica Nacional de Santa Fe.",
      reference: "Ref.: Disponible a Solicitud del interesado"
    }
  ];

  return (
    <section id="experiencia" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Experiencia Laboral
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
          <p className="text-muted-foreground text-lg">
            Más de 15 años de trayectoria profesional
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-lg shadow-primary/50" />

                {/* Content */}
                <div className="w-full md:w-1/2 md:px-8">
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                        {exp.current && (
                          <Badge variant="default" className="bg-accent text-accent-foreground">
                            Actual
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                      <p className="text-sm text-primary font-mono">{exp.period}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {exp.description}
                      </p>
                      {exp.reference && (
                        <p className="text-xs text-muted-foreground/70 italic">
                          {exp.reference}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
