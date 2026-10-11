import {
  Badge,
  BlueprintFrame,
  ContactBlock,
  CursorGuides,
  LinkCards,
  Masthead,
  MissionFooter,
  Motto,
  OrbitPanel,
  OrbitSystem,
  SpecPanel,
  StatusPanel,
  Tagline,
  Telemetry,
} from "@/components/mission";

/**
 * Landing — the single-viewport mission control readout.
 *
 * Composition v2 (MC-25 / §7.12). The Stage-1 "row 2" is gone: the reference has
 * no second row, and that row is what starved the artwork (546x282 at 1440 vs the
 * reference's 621x497) and squeezed both panels into a 336px sidebar.
 *
 * Stage order: frame -> top (badge / telemetry / motto) -> main (lead + art and
 * its spec strip, with the orbit panel floating in the art column's bottom-right
 * corner) -> the stage-level status plate -> footer. The >=1180px viewport lock
 * lives in .stage / .main in src/styles/landing.css; below that the page scrolls
 * freely.
 *
 * <StatusPanel /> is a stage-level <aside> on purpose: it floats OVER the footer
 * band (as in the reference) instead of competing with the artwork for the
 * column's height. Below 1180px the same element is an ordinary block between
 * <main> and the footer.
 *
 * <CursorGuides /> (MC-37) is the crosshair cursor overlay. It is fixed-position
 * page chrome rather than part of the composition — it takes no space in any
 * grid, and it is mounted on both routes, not just here.
 */
const Landing = () => (
  <div className="stage">
    <CursorGuides />

    <BlueprintFrame />

    <header className="top">
      <div className="top__badge">
        <Badge />
      </div>
      <div className="top__telemetry">
        <Telemetry />
      </div>
      <div className="top__motto">
        <Motto />
      </div>
    </header>

    <main className="main">
      <div className="main__lead">
        <Masthead />
        <Tagline />
        <ContactBlock />
        <LinkCards />
      </div>

      <div className="main__art">
        <OrbitSystem />
        <OrbitPanel />
      </div>

      <div className="main__spec">
        <SpecPanel />
      </div>
    </main>

    <aside className="status-aside" aria-label="Estado del sistema">
      <StatusPanel />
    </aside>

    <MissionFooter />
  </div>
);

export default Landing;
