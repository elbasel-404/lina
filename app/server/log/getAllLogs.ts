import { type LogEntry, logKeys } from "@types";
import { getLogs } from ".";

export const getAllLogs = async () => {
  const allLogs: LogEntry[] = [];
  logKeys.forEach(async (key) => {
    const logs = await getLogs({ logKey: key });
    allLogs.push(...logs);
  });
  return allLogs;
};
