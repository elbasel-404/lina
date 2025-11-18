import { get } from "@db";
import { DBKey } from "@types";

interface GetProps {
  dbKey: DBKey;
  label?: string;
}

export const Get = async ({ dbKey, label }: GetProps) => {
  const value = await get<string>({ key: dbKey });
  return (
    <>
      {label}
      {label && ":"}
      {value}
    </>
  );
};
