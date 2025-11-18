"use client";

import { useEffect, useRef, useState } from "react";

type Entry = { id: string; timestamp: string; text: string };

export function Log() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Connect to server-sent events
    const src = new EventSource(`/api/logs`);
    esRef.current = src;

    src.onopen = () => {
      // debug connection state
      console.debug("SSE connected to /api/logs");
    };

    src.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as Entry;
        setEntries((prev) => [...prev, data]);
      } catch (err) {
        // ignore parse errors
      }
    };

    src.onerror = () => {
      // attempt to reconnect after a short delay
      // EventSource automatically reconnects, so we just leave it
    };

    // listen for the special "clear" event so we can empty local state
    src.addEventListener("clear", () => {
      setEntries([]);
    });

    // listen for the special "clear" event so we can empty local state
    // src.addEventListener("clear", () => {
    //   setEntries([]);
    // });

    return () => {
      src.close();
      esRef.current = null;
    };
  }, []);

  return (
    <div className="border border-white rounded-lg p-2">
      {entries.map(({ id, text, timestamp }) => (
        <div key={id} className="not-last:border-b border-white p-2 flex gap-2">
          <span className="italic text-amber-400">
            {timestamp.slice(11, 16)}
          </span>
          <div>{text}</div>
        </div>
      ))}
    </div>
  );
}
