import { cx, cva } from "@util";

export const button = cva({
  base: "font-semibold bg-gray-200 border rounded",
  variants: {
    intent: {
      primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
      secondary: "bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

// button();
// => "font-semibold border rounded bg-blue-500 text-white border-transparent hover:bg-blue-600 text-base py-2 px-4 uppercase"

// cx("bg-gray-200", "bg-blue-500");
// => "bg-blue-500"
