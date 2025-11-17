import z from "zod";

export const KEYS = z.enum(["userName"]);

export type DBKey = z.infer<typeof KEYS>;
