import { db } from "./index";

export const keys = () => {
  return Array.from(db.keys());
};

export default keys;
