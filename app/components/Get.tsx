import { get } from "../db/revalidation/get";
import { DBKey } from "../db/revalidation/keys";

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
