"use client";

import { useTransition } from "react";
import { run } from "./run";

export const Run = () => {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(() => {
      void run();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isPending} aria-busy={isPending}>
        {isPending ? "Running..." : "Run"}
      </button>
    </form>
  );
};
