import { db } from "@db";

export const getDbKeys = () => {
  return Array.from(db.keys());
};
