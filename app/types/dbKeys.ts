import z from "zod";

export const logKeys = ["default", "dbValidationErrors", "unknown"] as const;
export const globalKeys = ["userName"] as const;

export const logKeysSchema = z.enum(logKeys);
export const globalKeysSchema = z.enum(globalKeys);
export const dbKeysSchema = z.union([globalKeysSchema, logKeysSchema]);

export type GlobalKey = z.infer<typeof globalKeysSchema>;
export type LogKey = z.infer<typeof logKeysSchema>;
export type DBKey = GlobalKey | LogKey;
