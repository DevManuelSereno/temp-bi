"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const hydrated = useSyncExternalStore(
        () => () => undefined,
        () => true,
        () => false
    );

    const isDark = hydrated && theme === "dark";

    if (!hydrated) {
        return (
            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
                aria-label="Alternar tema"
            >
                <Sun size={20} weight="bold" className="transition-transform duration-300" />
            </button>
        );
    }

    return (
        <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
        >
            {isDark ? (
                <Sun size={20} weight="bold" className="text-primary transition-transform duration-300" />
            ) : (
                <Moon size={20} weight="bold" className="transition-transform duration-300" />
            )}
        </button>
    );
}
