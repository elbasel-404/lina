"use client";

import { RealtimeData } from "./RealtimeData";
import type { LogEntry, LogKey } from "@types";

interface LogProps {
  logKey: LogKey;
  maxEntries?: number;
}

export function Log({ logKey = "defaultLog", maxEntries = 200 }: LogProps) {
  return (
    <RealtimeData<LogEntry>
      dataKey={logKey}
      maxEntries={maxEntries}
      renderEntry={(entry) => {
        return (
          <div key={entry.id}>
            {entry.timestamp.slice(11, 16)}
            <div>{entry.text}</div>
          </div>
        );
      }}
    />
  );
}
