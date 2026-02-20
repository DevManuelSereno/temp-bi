"use client";

import { deriveAssociativeData } from "@/shared/engine/associative-engine";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { DIMENSION_DEFINITIONS } from "@/shared/lib/constants";
import type {
    AssociativeAction,
    AssociativeState,
    DerivedAssociativeData,
} from "@/types/associative";
import type { DataRecord } from "@/types/dashboard";
import type { ReactNode } from "react";
import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";

/* ── Reducer ──────────────────────────────────────── */

function associativeReducer(
    state: AssociativeState,
    action: AssociativeAction
): AssociativeState {
    switch (action.type) {
        case "TOGGLE_VALUE": {
            const currentSet = state.selections[action.dimensionId] || new Set<string>();
            const newSet = new Set(currentSet);
            if (newSet.has(action.valueId)) {
                newSet.delete(action.valueId);
            } else {
                newSet.add(action.valueId);
            }
            return {
                ...state,
                selections: { ...state.selections, [action.dimensionId]: newSet },
            };
        }
        case "CLEAR_DIMENSION":
            return {
                ...state,
                selections: { ...state.selections, [action.dimensionId]: new Set<string>() },
            };
        case "CLEAR_ALL":
            return { ...state, selections: {} };
        case "SET_DATA":
            return { records: action.records, selections: {} };
        default:
            return state;
    }
}

/* ── Context ──────────────────────────────────────── */

export interface AssociativeContextValue {
    derived: DerivedAssociativeData;
    loading: boolean;
    error: string | null;
    toggleValue: (dimensionId: string, valueId: string) => void;
    clearDimension: (dimensionId: string) => void;
    clearAll: () => void;
}

const DEFAULT_DERIVED: DerivedAssociativeData = {
    filteredRecords: [],
    dimensions: [],
    kpis: [],
    acquisitionSeries: [],
    financialSeries: [],
    funnelStages: [],
    hasActiveFilters: false,
};

export const AssociativeContext = createContext<AssociativeContextValue>({
    derived: DEFAULT_DERIVED,
    loading: true,
    error: null,
    toggleValue: () => { },
    clearDimension: () => { },
    clearAll: () => { },
});

/* ── Provider ─────────────────────────────────────── */

interface AssociativeProviderProps {
    children: ReactNode;
    fetcher: () => Promise<DataRecord[]>;
}

export function AssociativeProvider({ children, fetcher }: AssociativeProviderProps) {
    const { state: dataState } = useAsyncData(fetcher);
    const [state, dispatch] = useReducer(associativeReducer, {
        records: [],
        selections: {},
    });

    useEffect(() => {
        if (dataState.status === "success") {
            dispatch({ type: "SET_DATA", records: dataState.data });
        }
    }, [dataState]);

    const derived = useMemo(
        () =>
            state.records.length > 0
                ? deriveAssociativeData(state, DIMENSION_DEFINITIONS)
                : DEFAULT_DERIVED,
        [state]
    );

    const toggleValue = useCallback(
        (dimensionId: string, valueId: string) => {
            dispatch({ type: "TOGGLE_VALUE", dimensionId, valueId });
        },
        []
    );

    const clearDimension = useCallback((dimensionId: string) => {
        dispatch({ type: "CLEAR_DIMENSION", dimensionId });
    }, []);

    const clearAll = useCallback(() => {
        dispatch({ type: "CLEAR_ALL" });
    }, []);

    const loading = dataState.status === "loading";
    const error = dataState.status === "error" ? dataState.error : null;

    const contextValue = useMemo<AssociativeContextValue>(
        () => ({
            derived,
            loading,
            error,
            toggleValue,
            clearDimension,
            clearAll,
        }),
        [derived, loading, error, toggleValue, clearDimension, clearAll]
    );

    return (
        <AssociativeContext.Provider value={contextValue}>
            {children}
        </AssociativeContext.Provider>
    );
}
