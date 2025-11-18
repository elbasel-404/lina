"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import type { DBKey } from "@types";

interface RealtimeDataProps<T = unknown> {
  dataKey: DBKey;
  maxEntries?: number;
  renderEntry: (entry: T) => ReactNode;
}

export function RealtimeData<T>({
  dataKey,
  maxEntries = 200,
  renderEntry,
}: RealtimeDataProps<T>) {
  const [entries, setEntries] = useState<T[]>([]);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // open an EventSource for the requested key (generic `key` param)
    const key = dataKey;
    // use a relative URL so the same code works in local dev and deployed
    // environments (avoids forced cross-origin requests that can be blocked
    // or alter session/cors behavior).
    const url = `/api/logs?key=${encodeURIComponent(key)}`;
    const src = new EventSource(url);
    esRef.current = src;

    src.onopen = () => console.debug(`SSE connected to ${url}`);

    src.onmessage = (e) => {
      try {
        // the server streams the raw item stored under `dataKey`; cast to T
        const data = JSON.parse(e.data) as T;
        setEntries((prev) => {
          const next = [...prev, data];
          if (maxEntries && next.length > maxEntries) {
            return next.slice(-maxEntries);
          }
          return next;
        });
      } catch (err) {
        // ignore parse errors
      }
    };

    src.addEventListener("clear", (event: MessageEvent) => {
      try {
        const payload = JSON.parse(event.data || "{}") as { key?: string };
        if (!payload.key || payload.key === key) {
          setEntries([]);
        }
      } catch (err) {
        setEntries([]);
      }
    });

    src.onerror = () => {
      // Let EventSource handle auto-reconnect.
    };

    return () => {
      src.close();
      esRef.current = null;
    };
  }, [dataKey, maxEntries]);

  return (
    <>
      {entries.map((e) => {
        return renderEntry(e);
      })}
    </>
  );
}

export default RealtimeData;
