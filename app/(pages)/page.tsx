import { ClearLogs } from "../components/ClearLogs";
import { Log } from "@components";
import { Run } from "../components/Run";

const HomePage = () => {
  return (
    <main>
      <Run />
      <ClearLogs logKey="defaultLog" />
      {/* default log view — wrapped by RealtimeData under the hood */}
      <Log logKey="defaultLog" />
      {/* Example: show a different log channel (dbValidationErrors) */}
      {/* <RealtimeData logKey="dbValidationErrors" /> */}
    </main>
  );
};

export default HomePage;
