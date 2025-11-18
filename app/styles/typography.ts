import { cva } from "@util";

export const typography = cva({
  base: "text-gray-900 antialiased",
  variants: {
    level: {
      h1: "text-4xl font-extrabold tracking-tight leading-tight",
      h2: "text-3xl font-bold tracking-tight leading-tight",
      h3: "text-2xl font-semibold leading-snug",
      h4: "text-xl font-semibold",
      h5: "text-lg font-medium",
      h6: "text-base font-medium",
      body: "text-base leading-relaxed",
      small: "text-sm",
    },
    muted: {
      true: "text-gray-500",
    },
    center: {
      true: "text-center",
    },
  },
  defaultVariants: {
    level: "body",
  },
});
