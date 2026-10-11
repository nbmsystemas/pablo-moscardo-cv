import { useEffect, useRef } from "react";

/**
 * CursorGuides — the crosshair cursor with a coordinate readout (MC-37).
 *
 * Page chrome, not a landing feature: the component is mounted on BOTH routes
 * (`/` and `/cv`) because a crosshair that only existed on the landing would read
 * as a landing effect. It renders a fixed overlay of a 1px horizontal rule, a 1px
 * vertical rule and a micro-label carrying the pointer's viewport coordinates —
 * the same SYSTEM as the reference's `.guides` overlay (same three parts, same
 * fade, same `data-active` / `data-locked` states, same coarse-pointer gate) with
 * our own tokens, type scale and readout format.
 *
 * THE COMPONENT NEVER RE-RENDERS. `--gx` / `--gy` and the `data-*` states are
 * written straight onto the DOM by the pointer handlers, because a pointermove
 * fires up to 120 times a second and a `setState` per move would put a React
 * render on every one of them. There is no state and no props here, so React's
 * only job is the initial element tree: that is also why the coordinates are
 * written with `textContent` (`guides__tag` has no children in the JSX — a text
 * node React owned would be diffed against a string it does not track).
 *
 * POINTER EVENTS, NOT MOUSE EVENTS. `pointermove` is the pointer-type-aware event
 * and the CSS `@media (pointer: coarse)` rule is the gate (the reference's own
 * gate). The one JS-side check is a `(pointer: coarse)` bail-out so a touch drag
 * does not run the coordinate arithmetic for an overlay that is `display: none`.
 *
 * DEACTIVATION. `pointerout` with a null `relatedTarget` is the reliable "the
 * pointer left the document" signal — `pointerleave` cannot be used from a
 * document-level listener, because it does not bubble and a CAPTURING listener on
 * `document` would also fire for every element a pointer leaves inside the page.
 * `blur` covers the other case: the pointer stays where it is while the window
 * loses focus (alt-tab, devtools), and the crosshair must not hang on screen.
 */

/** The gap between the pointer and the tag, in CSS px. Mirrors `.guides__tag`. */
const TAG_GAP = 8;

/**
 * Viewport coordinates print as a fixed 4-digit field — `X 0700 · Y 0400`, not
 * `0700,400`: this is a mission-control readout, and a fixed field is what makes
 * the tag a stable width (so the edge flip needs no re-measure) and the numerals
 * readable as an instrument value.
 */
const pad = (value: number) =>
  String(Math.max(0, Math.round(value))).padStart(4, "0");

const CursorGuides = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const tag = tagRef.current;
    if (!root || !tag) return;

    const coarse = window.matchMedia("(pointer: coarse)");

    /* The tag's own box, cached: it is a fixed-width string (a 4-digit field per
       axis), so the only reason to re-measure is a font swap, and re-measuring on
       every pointermove would force a layout flush 120 times a second. It is
       re-measured once per activation instead. */
    const size = { w: 0, h: 0 };
    let active = false;

    const measure = () => {
      size.w = tag.offsetWidth;
      size.h = tag.offsetHeight;
    };

    const track = (x: number, y: number) => {
      if (coarse.matches) return;

      tag.textContent = `X ${pad(x)} · Y ${pad(y)}`;
      /* Measured with a real string in it: an empty span reports padding only. */
      if (size.w === 0) measure();

      root.style.setProperty("--gx", `${x}px`);
      root.style.setProperty("--gy", `${y}px`);

      /* Flip the tag to the other side of the rules near the right/bottom edge,
         so it can never run off the viewport. `TAG_GAP` mirrors the `.guides__tag`
         default and the comparison includes it, because the near-edge case is
         about the tag's FAR edge, not the rules'. */
      root.dataset.flipX = String(x + TAG_GAP + size.w > window.innerWidth);
      root.dataset.flipY = String(y + TAG_GAP + size.h > window.innerHeight);

      if (!active) {
        active = true;
        root.dataset.active = "true";
      }
    };

    const release = () => {
      if (!active) return;
      active = false;
      size.w = 0;
      root.dataset.active = "false";
      root.dataset.locked = "false";
    };

    const onMove = (event: PointerEvent) => track(event.clientX, event.clientY);

    /* A press without a move still aims the crosshair (a plain click never fires
       pointermove) and locks the readout, which is what turns the tag orange. */
    const onDown = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      track(event.clientX, event.clientY);
      root.dataset.locked = "true";
    };

    const onUp = () => {
      root.dataset.locked = "false";
    };

    const onOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) release();
    };

    const onBlur = () => release();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <div className="guides" ref={rootRef} data-active="false" aria-hidden="true">
      <span className="guides__h" />
      <span className="guides__v" />
      <span className="guides__tag" ref={tagRef} />
    </div>
  );
};

export default CursorGuides;
