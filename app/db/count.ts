import { db } from "./index";

export const count = () => {
  return db.size;
};

export default count;
