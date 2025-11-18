import { cva } from "@util";

export const toggle = cva({
  base: "relative inline-flex shrink-0 items-center h-6 w-11 rounded-full cursor-pointer transition-colors duration-200",
  variants: {
    checked: {
      true: "bg-green-500",
      false: "bg-gray-200",
    },
    size: {
      sm: "h-5 w-9",
      md: "h-6 w-11",
      lg: "h-7 w-14",
    },
  },
  defaultVariants: {
    checked: false,
    size: "md",
  },
});

export const toggleThumb = cva({
  base: "inline-block h-5 w-5 rounded-full bg-white transform transition-transform duration-200",
  variants: {
    checked: {
      true: "translate-x-5",
      false: "translate-x-0",
    },
  },
});
