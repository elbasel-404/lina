"use client";
import { useState } from "react";

export function StreamRunner() {
  const [text, setText] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [cursor, setCursor] = useState(0);
  const [finished, setFinished] = useState(false);
  const [pending, setPending] = useState(false);

  const start = async () => {
    setText("");
    setCursor(0);
    setFinished(false);
    setPending(true);

    try {
      const res = await fetch("/api/stream/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Run stream demo" }),
      });
      const { id } = await res.json();
      setId(id);

      // Poll until finished
      let currentCursor = 0;
      while (true) {
        const poll = await fetch(
          `/api/stream/poll?id=${id}&cursor=${currentCursor}`
        );
        const json = await poll.json();
        if (Array.isArray(json.chunks) && json.chunks.length > 0) {
          setText((t) => t + json.chunks.join("\n"));
          currentCursor = json.cursor;
          setCursor(currentCursor);
        }
        if (json.finished) {
          setFinished(true);
          setPending(false);
          break;
        }

        // small delay for polling
        await new Promise((r) => setTimeout(r, 250));
      }
    } catch (e) {
      console.error(e);
      setPending(false);
    }
  };

  const startSSE = async () => {
    setText("");
    setCursor(0);
    setFinished(false);
    setPending(true);

    try {
      const res = await fetch("/api/stream/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Run SSE demo" }),
      });
      const { id } = await res.json();
      setId(id);

      const src = new EventSource(`/api/stream/sse/${id}`);

      src.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          setText((t) => t + data.text + "\n");
        } catch (e) {
          setText((t) => t + evt.data + "\n");
        }
      };

      src.onerror = () => {
        src.close();
        setFinished(true);
        setPending(false);
      };
    } catch (e) {
      console.error(e);
      setPending(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        {/* <button onClick={start} disabled={pending || finished}>
          {pending ? "Starting..." : finished ? "Finished" : "Start Stream"}
        </button> */}
        <button onClick={startSSE} disabled={pending || finished}>
          {pending ? "Starting..." : "Start SSE"}
        </button>
      </div>
      <pre
        className="border border-white"
        style={{ whiteSpace: "pre-wrap", marginTop: 8 }}
      >
        {text}
      </pre>
    </div>
  );
}
