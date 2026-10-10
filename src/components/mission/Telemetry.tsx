import { useEffect, useState } from "react";

import { telemetry } from "@/data/mission";

/**
 * Telemetry — LOCATION plus a live UTC mission clock and the hatch readout.
 *
 * The clock ticks once per second and is cleaned up on unmount. `tabular-nums`
 * keeps the digits from shifting as they change.
 */

const pad = (value: number) => String(value).padStart(2, "0");

/** "HH:MM:SS · YYYY.MM.DD" in UTC. */
const formatUtc = (date: Date) => {
  const clock = `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(
    date.getUTCSeconds(),
  )}`;
  const day = `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}.${pad(
    date.getUTCDate(),
  )}`;

  return `${clock} · ${day}`;
};

const Telemetry = () => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="telemetry">
      <dl className="telemetry__rows">
        {telemetry.rows.map((row) => (
          <div className="telemetry__row" key={row.label}>
            <dt className="telemetry__label">{row.label}</dt>
            <dd className="telemetry__value">{row.value}</dd>
          </div>
        ))}

        <div className="telemetry__row">
          <dt className="telemetry__label">{telemetry.clockLabel}</dt>
          <dd className="telemetry__value">
            <time dateTime={now.toISOString()}>{formatUtc(now)}</time>
          </dd>
        </div>
      </dl>

      <div className="telemetry__hatch" aria-hidden="true" />
    </div>
  );
};

export default Telemetry;
