import { getAllData } from "./getAllData";

export const GET = async () => {
  const entries = getAllData();
  return new Response(JSON.stringify(entries, null, 4), { status: 200 });
};
