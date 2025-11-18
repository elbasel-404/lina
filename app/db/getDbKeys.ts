// "use server";
import { keys } from "./keys";

export const getDbKeys = () => {
  return keys();
};

export default getDbKeys;
