"use client";

import { useEffect, useRef, useState } from "react";

type Entry = { id: string; timestamp: string; text: string };

export function Log() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Connect to server-sent events
    const src = new EventSource(`/api/logs/sse`);
    esRef.current = src;

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

    return () => {
      src.close();
      esRef.current = null;
    };
  }, []);

  return (
    <div>
      <h3>Server Logs</h3>
      <div
        style={{ maxHeight: 240, overflow: "auto", border: "1px solid #ccc" }}
      >
        {entries.map((e) => (
          <div key={e.id} style={{ padding: 6, fontFamily: "monospace" }}>
            <small style={{ color: "#666" }}>
              {new Date(e.timestamp).toLocaleTimeString()}
            </small>
            <div>{e.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
