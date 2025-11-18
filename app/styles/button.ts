import { cx, cva } from "@util";

export const button = cva({
  base: "inline-flex items-center justify-center gap-2 transition-colors duration-150 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  variants: {
    intent: {
      primary:
        "bg-linear-to-br from-indigo-600 to-blue-500 text-white border-transparent shadow-sm hover:from-indigo-700 hover:to-blue-600",
      secondary:
        "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm",
      danger: "bg-red-600 text-white border-transparent hover:bg-red-700",
      ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-3",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-md",
      md: "rounded-lg",
      full: "rounded-full",
    },
    full: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      intent: ["primary", "danger"],
      size: "md",
      class: "uppercase tracking-wider",
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "md",
    radius: "md",
  },
});

export const iconButton = (className?: string) =>
  cx(button({ intent: "ghost", size: "sm", radius: "full" }), className);
