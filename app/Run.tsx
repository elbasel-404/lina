"use client";

import { run } from "./run";

export const Run = () => {
  return (
    <form action={run}>
      <button type="submit">Run</button>
    </form>
  );
};
