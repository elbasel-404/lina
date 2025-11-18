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

  // bump the global logsVersion key so EventSource streams can detect a
  // clear and emit the `clear` event. This makes the client-side `Log`
  // component receive the event and reset its local state.
  const current = (get<number>({ key: "logsVersion" }) ?? 0) + 1;
  set("logsVersion", current);
}
