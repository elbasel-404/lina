import { cva } from "@util";

export const card = cva({
  base: "bg-white border rounded-lg shadow-sm p-4",
  variants: {
    tone: {
      default: "",
      muted: "bg-gray-50 border-gray-100",
      elevated: "shadow-lg",
    },
    size: {
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    tone: "default",
    size: "md",
  },
});
