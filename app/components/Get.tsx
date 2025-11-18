import { findOne } from "@db";
import { DBKey } from "@types";

interface GetProps {
  dbKey: DBKey;
  label?: string;
}

export const Get = async ({ dbKey, label }: GetProps) => {
  const value = findOne<string>(dbKey);
  return (
    <>
      {label}
      {label && ":"}
      {value}
    </>
  );
};
