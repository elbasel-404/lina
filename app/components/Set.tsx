import { type ReactNode } from "react";
import { set } from "@/app/db/revalidation/set";
import { KEYS } from "../db/revalidation/keys";

interface SetProps {
  children?: ReactNode;
}
export const Set = ({ children }: SetProps) => {
  const formAction = async (formData: FormData) => {
    "use server";
    const formEntries = Array.from(formData.entries()).filter(([k]) => {
      return !k.startsWith("$ACTION");
    });

    for (const [formKey, formValue] of formEntries) {
      const validatedKey = KEYS.parse(formKey);
      await set(validatedKey, formValue);
    }
  };

  return <form action={formAction}>{children}</form>;
};
