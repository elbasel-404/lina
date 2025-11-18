import { cva } from "@util";

export const select = cva({
  base: "w-full border rounded-md bg-white px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    intent: {
      default: "border-gray-200 focus:ring-blue-400",
      error: "border-red-300 focus:ring-red-400",
    },
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-base px-3 py-2",
      lg: "text-lg px-4 py-3",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "md",
  },
});
