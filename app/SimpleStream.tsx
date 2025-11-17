"use client";
import { useRef, useState } from "react";

export function SimpleStream() {
  const [output, setOutput] = useState("");

  // Keep controller in ref so it persists across renders but doesn't cause re-renders
  const controllerRef = useRef<AbortController | null>(null);

  const start = async () => {
    setOutput("");
    const ctrl = new AbortController();
    controllerRef.current = ctrl;

    // try {
    const res = await fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      signal: ctrl.signal,
    });

    if (!res.body) {
      setOutput("[No streaming body in response]");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      setOutput((prev) => prev + chunk + "\n");
    }
  };

  return (
    <div>
      <button onClick={start}>Start Stream</button>

      <div>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
