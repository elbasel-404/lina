// import { SimpleStream } from "./SimpleStream";
import { clearLogs } from "./log";
import { Log } from "./Log";
import { Run as RunComponent } from "./Run";

export default function Home() {
  return (
    <main>
      <Log />
      <RunComponent />
      <form action={clearLogs}>
        <button>Clear Logs</button>
      </form>
    </main>
  );
}
