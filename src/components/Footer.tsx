const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-background border-t border-border/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            © {new Date().getFullYear()} Pablo Ezequiel Moscardo
          </p>
          <p className="text-sm text-muted-foreground/70">
            Ingeniero en Sistemas de Información | IT Auditor & Consultant
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
