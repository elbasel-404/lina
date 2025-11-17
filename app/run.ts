"use server";

import { refresh } from "next/cache";
import { setState } from "./setCookie";
import { sleep } from "./sleep";

export const run = async () => {
  console.log("First");
  await setState("run.ts started");
  refresh();
  await sleep(4000);
  await setState("run.ts finished");
};
