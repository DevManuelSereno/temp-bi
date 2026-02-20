"use client";

import type { AsyncState } from "@/types/dashboard";
import { useCallback, useEffect, useState } from "react";

/**
 * Generic hook for async data fetching.
 * Returns { state, refetch } where state follows AsyncState<T>.
 */
export function useAsyncData<T>(fetcher: () => Promise<T>) {
    const [state, setState] = useState<AsyncState<T>>({ status: "loading" });

    const refetch = useCallback(() => {
        setState({ status: "loading" });
        fetcher()
            .then((data) => setState({ status: "success", data }))
            .catch((err) =>
                setState({ status: "error", error: err?.message ?? "Erro desconhecido" })
            );
    }, [fetcher]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { state, refetch } as const;
}
