import { get } from "../db/get";

interface GetProps {
  dbKey: string;
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
