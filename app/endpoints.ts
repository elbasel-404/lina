import type { Route } from "next";

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer Head}${From}${infer Tail}`
  ? `${ReplaceAll<Head, From, To>}${To}${ReplaceAll<Tail, From, To>}`
  : S;

type Normalize<R extends string> = R extends `/${infer Rest}`
  ? Rest extends ""
    ? "ROOT"
    : ReplaceAll<Rest, "/", "_">
  : ReplaceAll<R, "/", "_">;

type RouteKey<R extends string> = Uppercase<Normalize<R>>;

type RouteUnion = Extract<Route, string>;

type RouteEnumMap = {
  [R in RouteUnion as RouteKey<R>]: R;
};

export const Endpoints = {} as RouteEnumMap;

export type EndpointKey = keyof typeof Endpoints;
export type EndpointValue = (typeof Endpoints)[EndpointKey];
