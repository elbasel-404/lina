"use client";

import { useState } from "react";
import { ENDPOINTS } from "../lib/endpoints";

export function SimpleStream() {
  const [output, setOutput] = useState("");

  const start = async () => {
    const res = await fetch(ENDPOINTS.simpleStream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      <pre>{output}</pre>
    </div>
  );
}
