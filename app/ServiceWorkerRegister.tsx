"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) {
      console.info("Service workers are not supported in this browser.");
      return;
    }

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        console.info("Service worker registered:", reg);

        // optional: log lifecycle changes
        if (reg.waiting) {
          console.info("A new SW is waiting.");
        }
        reg.addEventListener("updatefound", () => {
          console.info("Service worker update found.");
        });
      } catch (err) {
        console.error("Service worker registration failed:", err);
      }
    };

    register();

    // cleanup is not necessary for registration but we could keep listeners etc
  }, []);

  return null;
}
