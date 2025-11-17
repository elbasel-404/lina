"use server";

import { cookies } from "next/headers";

export const getState = async () => {
  const cookieStore = await cookies();

  const state = cookieStore.get("state");
  // console.log("Counter:", (prev as any)?.counter);

  return {
    state: state?.value,
    // counter:
    //   typeof (prev as any)?.counter === "number"
    //     ? (prev as any).counter + 1
    //     : 1,
    // error: null,
    // formData: Object.fromEntries(
    //   formData.entries().filter((k, v) => {
    //     const keyStr = k.toString();
    //     return !keyStr.startsWith("$ACTION_");
    //   })
    // ),
  };
};
