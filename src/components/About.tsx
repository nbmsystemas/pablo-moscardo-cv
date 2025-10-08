import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="sobre-mi" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Presentación
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-scale-in">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground mb-2 font-semibold text-primary">
                    Sr./A quien corresponda:
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Me es grato ponerme en contacto con ustedes y compartir mi trayectoria profesional, la cual adjunto para su consideración.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 bg-accent rounded-full flex-shrink-0" />
                <p className="text-foreground leading-relaxed">
                  Soy <span className="text-primary font-semibold">Ingeniero en Sistemas de la Información</span>, con sólida experiencia en Inteligencia Artificial, Automatización de Procesos y Seguridad Informática, entre otras áreas. A lo largo de mi carrera he trabajado en proyectos relacionados con:
                </p>
              </div>

              <div className="ml-4 sm:ml-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "IA & Automatización",
                  "Consultoría en IA",
                  "N8N Workflows y Agentes IA",
                  "Machine Learning",
                  "Trading Algorítmico",
                  "Seguridad Informática / Ethical Hacking",
                  "Desarrollo en diversos lenguajes de programación"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-border/50">
                <div className="w-2 h-2 mt-2 bg-accent rounded-full flex-shrink-0" />
                <p className="text-foreground leading-relaxed">
                  Agradezco la posibilidad de que puedan conocer mi perfil y considerarme para futuras oportunidades que se alineen con mi experiencia y habilidades.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                <p className="text-foreground leading-relaxed">
                  Quedo a disposición para mantener una entrevista y ampliar cualquier información que consideren relevante.
                </p>
              </div>

              <div className="text-right pt-4">
                <p className="text-foreground font-semibold">
                  Atentamente,
                </p>
                <p className="text-foreground font-semibold">
                  Pablo Ezequiel Moscardo
                </p>
                <p className="text-muted-foreground text-sm">
                  Ingeniero en Sistemas de la Información
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { label: "DNI", value: "27.484.---" },
            { label: "Fecha de Nacimiento", value: "17 de Julio 1979" },
            { label: "Estado Civil", value: "Soltero" },
            { label: "Domicilio", value: "Jose Ingenieros 1-- 2-, Rafaela" }
          ].map((info, index) => (
            <Card key={index} className="border-border/30 bg-card/30 hover:border-primary/50 transition-all duration-300 animate-fade-in-left" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">{info.label}</p>
                <p className="text-foreground font-semibold">{info.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
