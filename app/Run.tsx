"use client";

import { run } from "./run";
import { SimpleStream } from "./SimpleStream";
import { StreamRunner } from "./StreamRunner";

export const Run = () => {
  return (
    <div>
      <h1>Run Component</h1>
      <form action={run}>
        <button type="submit">Run Action</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <h3>Streaming (polling fallback)</h3>
        {/* <StreamRunner /> */}
        <SimpleStream />
      </div>
    </div>
  );
};
