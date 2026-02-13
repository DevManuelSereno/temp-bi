"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Alternar tema">
                <Sun className="h-4 w-4" />
            </Button>
        );
    }

    const isDark = theme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 transition-transform hover:scale-105 cursor-pointer"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
        >
            {isDark ? (
                <Sun className="h-4 w-4 text-primary transition-transform duration-300" />
            ) : (
                <Moon className="h-4 w-4 transition-transform duration-300" />
            )}
        </Button>
    );
}
