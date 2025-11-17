"use client";
import { run } from "./run";
import { startTransition, useState } from "react";

export const Run = () => {
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    startTransition(() => {
      Promise.resolve(run()).finally(() => setPending(false));
    });
  };

  return (
    <div>
      <h1>Run Component</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={pending}>
          {pending ? "Running..." : "Run Action"}
        </button>
      </form>
    </div>
  );
};
