/**
 * Decorative blueprint frame marks for the stage.
 *
 * Purely ornamental: the whole layer is aria-hidden and the CSS hides it below
 * 1180px, where the fixed frame would fight the free-scrolling layout.
 */
const BlueprintFrame = () => (
  <div className="frame" aria-hidden="true">
    <span className="frame__rule-top" />
    <span className="frame__rule-right" />
    <span className="frame__cross frame__cross--top" />
    <span className="frame__cross frame__cross--left" />
    <span className="frame__cross frame__cross--mid" />
    <span className="frame__cross frame__cross--r2" />
    <span className="frame__ticks" />
    <span className="frame__dots--left" />
    <span className="frame__dots--viz" />
    <span className="frame__dash" />
  </div>
);

export default BlueprintFrame;
