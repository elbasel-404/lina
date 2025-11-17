"use client";

import { useActionState, useEffect, startTransition, useRef } from "react";
import { getState } from "./getState";
import { setState } from "./setCookie";

export const Log = () => {
  const counter = useRef(0);
  const [state, formAction] = useActionState(getState, {
    state: "pre-init",
    // counter: 0,
    // error: null,
    // formData: {},
  });

  useEffect(() => {
    const id = setInterval(() => {
      console.log("running..." + counter.current);
      startTransition(() => {
        counter.current += 1;
        formAction();
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h2>Log Component</h2>
      <form action={formAction}>
        <input type="text" name="action" />
        <button type="submit">Submit</button>
      </form>
      {/* <form action={() => setState("some new state")}>
        <button type="submit">set cookie</button>
      </form> */}
      <pre className="border border-white">{state.state}</pre>
    </div>
  );
};
