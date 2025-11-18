import { get } from "../get";
import { getDbKeys } from "../getDbKeys";

type DbEntry = {
  key: string;
  value: unknown;
};

export const GET = async () => {
  const dbKeys = getDbKeys();
  const dbEntries: DbEntry[] = [];
  dbKeys.forEach((key) => {
    const value = get({ key });
    dbEntries.push({ key, value });
  });
  return new Response(JSON.stringify(dbEntries, null, 4), { status: 200 });
};
