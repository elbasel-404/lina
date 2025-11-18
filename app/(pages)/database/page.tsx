import { getAllData } from "../../db/getAllData";

const DatabasePage = () => {
  const allData = getAllData();
  return <pre>{JSON.stringify(allData, null, 2)}</pre>;
};

export default DatabasePage;
