"use client";

import { type FormEvent, useTransition } from "react";
import type { LogKey } from "@types";
import { clearLogs } from "@server";

interface ClearLogsProps {
  logKey: LogKey;
}

export const ClearLogs = ({ logKey }: ClearLogsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      clearLogs({ logKey });
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
