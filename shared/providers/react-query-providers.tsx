"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AppError } from "../api/http";

const MINUTE_IN_MS = 60_000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * MINUTE_IN_MS,
        gcTime: 30 * MINUTE_IN_MS,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: (failureCount: number, error: unknown) => {
          if (error instanceof AppError) {
            if (error.status && error.status < 500) {
              return false;
            }
          }
          return failureCount < 1;
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        if (error instanceof AppError) {
          toast.error(error.message ?? "An unexpected error occurred");
          return;
        }

        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }

        toast.error("An unexpected error occurred");
      },
    }),
  });
}

export function ReactQueryProviders(
  props: Readonly<{ children: React.ReactNode }>
) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
