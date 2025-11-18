"use server";

import { log } from "@server";
import { sleep } from "@util";

export const run = async () => {
  await log({
    logKey: "defaultLog",
    text: "Server run started",
  });
  await sleep(2000);

  await log({
    logKey: "defaultLog",
    text: "Server run completed",
  });

  await sleep(2000);
  await log({
    logKey: "defaultLog",
    text: "Server run finalized",
  });
};
