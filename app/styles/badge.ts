import { cva } from "@util";

export const badge = cva({
  base: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
  variants: {
    color: {
      neutral: "bg-gray-100 text-gray-800",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-900",
      danger: "bg-red-100 text-red-800",
      info: "bg-indigo-100 text-indigo-800",
    },
    dot: {
      true: "rounded-full h-2 w-2 px-0 py-0",
    },
  },
  defaultVariants: {
    color: "neutral",
  },
});
