"use client";

import { RealtimeData } from "./RealtimeData";
import type { LogEntry, LogKey } from "@types";

interface LogProps {
  logKey: LogKey;
  maxEntries?: number;
}

export function Log({ logKey = "defaultLog", maxEntries = 200 }: LogProps) {
  return (
    <RealtimeData<LogEntry[]>
      dataKey={logKey}
      maxEntries={maxEntries}
      renderEntry={({ data }) => {
        return (
          <div>
            {data.map(({ text, id }) => {
              return <span>{text}</span>;
            })}
          </div>
        );
      }}
    />
  );
}
