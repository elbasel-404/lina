Manual test steps to verify logs clear action and re-render:

1. Start the Next.js dev server: `pnpm dev` (or `npm run dev`).
2. Open the app and observe logs displayed in the "Server Logs" panel.
3. Trigger a log entry (click "Start Stream" or perform actions that call `log()` server function).
4. Press the "Clear Logs" button (the form with `action={clearLogs}`).
5. Behavior expected: the server-side log list is cleared and the client log panel empties immediately.

If client does not clear:
- Open the browser console to see if SSE connection is active.
- Ensure SSE connection is receiving a `clear` event. In devtools network tab, check `/api/logs/sse` events.
- Restart the dev server to ensure global state is reset.