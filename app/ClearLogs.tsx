import { clearLogs } from "./log";

export const ClearLogs = () => {
  return (
    <form action={clearLogs}>
      <button type="submit">Clear Logs</button>
    </form>
  );
};
