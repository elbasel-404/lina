import { LogKey } from "@types";

export type LogEntry = {
  id: string;
  key: LogKey;
  timestamp: string;
  text: string;
};
