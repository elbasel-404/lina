import { type ReactNode } from "react";
import { create, validateKey } from "@db";

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
      const { data } = await validateKey(formKey);
      await create(data, formValue);
    }
  };

  return <form action={formAction}>{children}</form>;
};
