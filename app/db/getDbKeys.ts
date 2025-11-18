"use server";
import { db } from "@db";

export const getDbKeys = async () => {
  return Array.from(db.keys());
};
