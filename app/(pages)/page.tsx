// import { SimpleStream } from "./SimpleStream";
import { ClearLogs } from "../components/ClearLogs";
import { Log } from "../components/Log";
import { Run } from "../components/Run";

const HomePage = () => {
  return (
    <main>
      <Run />
      <ClearLogs />
      <Log />
    </main>
  );
};

export default HomePage;
