import { set } from "@/app/db/set";
import { ReactNode, Suspense } from "react";

interface SetProps {
  children?: ReactNode;
}
export const Set = ({ children }: SetProps) => {
  const formAction = async (formData: FormData) => {
    "use server";
    const formEntries = Array.from(formData.entries());
    for (const [formKey, formValue] of formEntries) {
      await set(formKey, formValue);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form action={formAction}>{children}</form>
    </Suspense>
  );
};
