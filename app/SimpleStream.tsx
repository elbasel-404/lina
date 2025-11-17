"use client";

import { useState } from "react";
import { Endpoints } from "./endpoints";

export function SimpleStream() {
  const [output, setOutput] = useState("");

  const start = async () => {
    const res = await fetch(Endpoints["API_SIMPLE-STREAM"], {
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
      <pre>{output}</pre>
      <button onClick={start}>Start Stream</button>
    </div>
  );
}
