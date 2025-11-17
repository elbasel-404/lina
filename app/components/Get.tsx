import { get } from "../db/get";

interface GetProps {
  key: string;
}

export const Get = async ({ key }: GetProps) => {
  console.log({ key });
  const value = await get<string>(key);
  console.log({ value });
  return <>{value}</>;
};
