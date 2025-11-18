"use server";

import { LogKey } from "@types";
import { create, findOne } from "@db";

export type ClearLogsParams = {
  logKey: LogKey;
};
export async function clearLogs({ logKey }: ClearLogsParams) {
  console.log("Clearing logs for key:", logKey);
  // clear the logs array for the given key
  await create(logKey, []);

  // bump a per-key version so EventSource streams can detect a clear and
  // emit the `clear` event for only that data key. This keeps other feeds
  // from being reset when unrelated keys are cleared.
  // bump a per-key version. This makes per-key SSE subscriptions clear
  // only that key's feeds and not every active feed.
  const versionKey = `${logKey}:version`;
  const current = (findOne<number>(versionKey as any) ?? 0) + 1;
  await create(versionKey as any, current);
}
