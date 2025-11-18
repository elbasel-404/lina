"use server";

import { LogKey } from "@types";
import { set, get } from "@db";

export type ClearLogsParams = {
  logKey: LogKey;
};
export async function clearLogs({ logKey }: ClearLogsParams) {
  console.log("Clearing logs for key:", logKey);
  // clear the logs array for the given key
  set(logKey, []);

  // bump a per-key version so EventSource streams can detect a clear and
  // emit the `clear` event for only that data key. This keeps other feeds
  // from being reset when unrelated keys are cleared.
  // bump a per-key version. This makes per-key SSE subscriptions clear
  // only that key's feeds and not every active feed.
  const versionKey = `${logKey}:version`;
  const current = (get<number>({ key: versionKey as any }) ?? 0) + 1;
  set(versionKey as any, current);
}
