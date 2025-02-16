import { routeTree } from "@/routeTree.gen";
import { ParseRoute } from "@tanstack/react-router";

export type TypedRoute = ParseRoute<typeof routeTree>["fullPath"];
