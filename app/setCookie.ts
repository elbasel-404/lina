"use server";
import { cookies } from "next/headers";

export const setState = async (state: string) => {
  const cookieStore = await cookies();
  const currentState = cookieStore.get("state")?.value;
  cookieStore.set("state", `${currentState} \n ${state}`.trim());
};
