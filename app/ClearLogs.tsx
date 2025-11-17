"use client";

import { type FormEvent, useTransition } from "react";
import { clearLogs } from "./log";

export const ClearLogs = () => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      void clearLogs();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isPending}>
        Clear Logs
      </button>
    </form>
  );
};
