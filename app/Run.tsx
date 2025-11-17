"use client";

import { run } from "./run";

export const Run = () => {
  return (
    <div>
      <h1>Run Component</h1>
      <form action={run}>
        <button type="submit">Run Action</button>
      </form>
    </div>
  );
};
