// "use server";

import { nanoid } from "nanoid";
import { set } from "@db";
import { getLogs } from "@server";
import { LogKey } from "@types";

type LogParams = {
  logKey: LogKey;
  text: string;
};

export async function log({ logKey, text }: LogParams) {
  const logs = getLogs({ logKey });
  const entry = {
    id: nanoid(),
    key: logKey,
    timestamp: new Date().toISOString(),
    text,
  };

  if (logs) {
    logs.push(entry);
    set(logKey, logs);
  } else {
    set(logKey, [entry]);
  }
  return entry;
}
