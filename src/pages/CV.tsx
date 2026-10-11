import { Link } from "react-router-dom";

import { BlueprintFrame, Telemetry } from "@/components/mission";
import { panels } from "@/data/mission";

/**
 * CV — Stage-2 placeholder shell (owner MC-13 replaces this file).
 *
 * Keeps the landing's stage + frame + telemetry treatment so the route change
 * is visually continuous, and states plainly that the full mission log is still
 * under construction. Unlike the landing, /cv is a long-scroll route, so
 * `.stage--cv` opts out of the 100svh viewport lock.
 */
const CV = () => (
  <div className="stage stage--cv">
    <BlueprintFrame />

    <header className="top">
      <div className="top__telemetry">
        <Telemetry />
      </div>
    </header>

    <main className="main main--cv">
      <section className="cv-shell" aria-labelledby="cv-shell-title">
        <span className="panel-title panel-title--clip">
          {panels.logTitle}
        </span>

        <h1 className="cv-shell__title" id="cv-shell-title">
          CV completo
        </h1>

        <p className="cv-shell__state">Etapa 2 · En construcción</p>

        <p className="cv-shell__note">
          Estoy poniendo en órbita el registro de misión completo: experiencia,
          habilidades, proyectos, educación y contacto, con el mismo sistema
          visual que la portada.
        </p>

        <Link className="cv-shell__back" to="/">
          ← Volver a la portada
        </Link>
      </section>
    </main>
  </div>
);

export default CV;
