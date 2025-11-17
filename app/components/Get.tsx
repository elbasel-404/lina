import { get } from "../db/get";
import { DBKey } from "../db/keys";

interface GetProps {
  dbKey: DBKey;
  label?: string;
}

export const Get = async ({ dbKey, label }: GetProps) => {
  const value = await get<string>(dbKey);
  return (
    <>
      {label}
      {label && ":"}
      {value}
    </>
  );
};
