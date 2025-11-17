"use client";

// import { run } from "./run";
// import { startTransition, useState } from "react";

// export const Run = () => {
//   const [pending, setPending] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setPending(true);
//     startTransition(() => {
//       Promise.resolve(run()).finally(async () => {
//         setPending(false);
//         // Trigger a fetch to /api/post; SW should intercept this
//         await doFetchPost();
//       });
//     });
//   };

//   const doFetchPost = async () => {
//     try {
//       // This fetch is expected to be intercepted by the service worker if installed
//       const result = await fetch("/api/post", { method: "GET" });
//       const json = await result.json();
//       console.log("fetch /api/post response ->", json);
//     } catch (err) {
//       console.error("fetch /api/post failed:", err);
//     }
//   };

//   return (
//     <div>
//       <h1>Run Component</h1>
//       <form onSubmit={handleSubmit}>
//         <button type="submit" disabled={pending}>
//           {pending ? "Running..." : "Run Action"}
//         </button>
//       </form>
//     </div>
//   );
// };

import { run } from "./run";

export const Run = () => {
  return (
    <div>
      <h1>Run Component</h1>
      <form action={run}>
        <button type="submit">Run Action</button>
      </form>
    </div>
  );
};
