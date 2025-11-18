// "use server";

import { nanoid } from "nanoid";
import { create } from "@db";
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
    await create(logKey, logs);
  } else {
    await create(logKey, [entry]);
  }
  return entry;
}
