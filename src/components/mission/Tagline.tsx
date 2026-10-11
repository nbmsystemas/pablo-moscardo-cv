import { tagline } from "@/data/mission";

/** Tagline — the one-sentence positioning line with a blinking caret. */
const Tagline = () => (
  <p className="tagline">
    {tagline}
    <span className="tagline__caret" aria-hidden="true" />
  </p>
);

export default Tagline;
