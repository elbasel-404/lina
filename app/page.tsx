// import { SimpleStream } from "./SimpleStream";
import { ClearLogs } from "./components/ClearLogs";
import { Log } from "./components/Log";
import { Run } from "./components/Run";

export default function Home() {
  return (
    <main>
      <Run />
      <ClearLogs />
      <Log />
    </main>
  );
}
