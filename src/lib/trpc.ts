import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@shared/types";

export const trpc = createTRPCReact<AppRouter>();