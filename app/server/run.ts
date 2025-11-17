"use server";

import { log } from "./log";

export const run = async () => {
  log("Server action started");
  await new Promise((r) => setTimeout(r, 2000));

  log("Server action in progress");

  await new Promise((r) => setTimeout(r, 2000));
  log("Server action finished");
};
