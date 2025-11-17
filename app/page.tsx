import { Log } from "./Log";
import { Run } from "./Run";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <Log />
      <Run />
      <ServiceWorkerRegister />
    </main>
  );
}
