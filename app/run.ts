"use server";

import { setState } from "./setCookie";
import { sleep } from "./sleep";

export const run = async () => {
  console.log("First");
  await setState("run.ts started");
  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({ info: "from run.ts" }),
  });
  await sleep(2000);
  console.log("Second");
  await setState("run.ts finished");
};
