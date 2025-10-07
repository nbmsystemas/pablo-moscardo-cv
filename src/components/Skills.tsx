import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Code, Database, Network, Award, Cpu } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Shield,
      title: "Seguridad & Hacking",
      color: "text-primary",
      skills: [
        "Kali Linux / BackTrack",
        "WiFiSlax / Wife",
        "Metasploit",
        "Encryptación / PGP",
        "Pen Test",
        "Análisis de Vulnerabilidades",
        "Análisis de Brechas",
        "Análisis de Riesgo"
      ]
    },
    {
      icon: Code,
      title: "Desarrollo & Lenguajes",
      color: "text-accent",
      skills: [
        "Python",
        "React / TypeScript",
        "C++ / C#",
        "JavaScript / Node.js",
        "HTML/CSS",
        "SQL",
        "Análisis de Datos"
      ]
    },
    {
      icon: Network,
      title: "Redes & Sistemas",
      color: "text-primary",
      skills: [
        "TCP/IP",
        "DNS, DHCP",
        "Redes IP",
        "Redes Wi-Fi",
        "Linux, UNIX, Windows",
        "Windows Server 2013/7/8",
        "Exchange"
      ]
    },
    {
      icon: Database,
      title: "Infraestructura",
      color: "text-accent",
      skills: [
        "SQL Server",
        "Virtualización VM Ware",
        "Virtual Box",
        "Datacenter Management",
        "Hardware PC y Servidores",
        "MAC OS - OSX"
      ]
    },
    {
      icon: Cpu,
      title: "IA & Automatización",
      color: "text-accent",
      skills: [
        "Consultoría IA",
        "N8N Workflows",
        "Agentes IA",
        "Automatizaciones",
        "Machine Learning",
        "Trading Algorítmico"
      ]
    },
    {
      icon: Award,
      title: "Especialidades",
      color: "text-primary",
      skills: [
        "Sistemas POS/ERP/CRM",
        "Auditoría IT",
        "Consultoría IT",
        "Social Engineering",
        "Peritaje Informático"
      ]
    }
  ];

  const expertise = [
    "Desarrollo de sistemas POS/ERP/CRM a medida para empresas y PyMEs",
    "Consultoría y asesoramiento en implementación de IA y automatizaciones",
    "Desarrollo de agentes IA y workflows con N8N",
    "Sistemas algorítmicos de trading y análisis de datos",
    "Consultoría / Auditorías IT y Seguridad Informática",
    "Control y administración de redes, servidores y seguridad informática",
    "Desarrollo Full Stack con tecnologías modernas (React, Python, TypeScript)",
    "Análisis de Brechas y Penetration Testing"
  ];

  return (
    <section id="habilidades" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Habilidades & Conocimientos
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
          <p className="text-muted-foreground text-lg font-mono">
            LAS HERRAMIENTAS NO HACEN AL ARTESANO
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-6 h-6 ${category.color} group-hover:scale-110 transition-transform`} />
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Expertise Section */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">
              Áreas de Experiencia Notoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;
