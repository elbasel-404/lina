import { ClearLogs } from "../components/ClearLogs";
import { Log } from "@components";
import { Run } from "../components/Run";

const HomePage = () => {
  return (
    <main>
      <Run />
      <ClearLogs logKey="default" />
      <Log />
    </main>
  );
};

export default HomePage;
