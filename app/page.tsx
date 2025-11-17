// import { SimpleStream } from "./SimpleStream";
import { ClearLogs } from "./ClearLogs";
import { Log } from "./Log";
import { Run } from "./Run";

export default function Home() {
  return (
    <main>
      <Run />
      <ClearLogs />
      <Log />
    </main>
  );
}
