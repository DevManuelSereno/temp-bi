"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Sun, Moon, Palette, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
    {
        value: "light",
        label: "MicroRealismo (Claro)",
        icon: Sun,
        description: "Fundo off-white, tipografia editorial, bordô como destaque",
    },
    {
        value: "dark",
        label: "CriativosADS (Escuro)",
        icon: Moon,
        description: "Fundo charcoal, ouro como primário, glow sutil em CTAs",
    },
] as const;

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col gap-8 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="font-serif text-2xl font-bold tracking-tight">
                    Configurações
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Personalize a aparência e preferências do painel
                </p>
            </div>

            {/* Theme section */}
            <section className="frame-card flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Palette className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-serif text-base font-semibold">Tema Visual</h2>
                        <p className="text-xs text-muted-foreground">
                            Escolha a identidade visual do dashboard
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {THEME_OPTIONS.map((opt) => {
                        const isActive = theme === opt.value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setTheme(opt.value)}
                                className={cn(
                                    "flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition-all",
                                    "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                                    isActive
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/40"
                                )}
                                aria-pressed={isActive}
                            >
                                <div className="flex items-center gap-2">
                                    <opt.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                    <span className="text-sm font-semibold">{opt.label}</span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {opt.description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </section>

            <Separator className="bg-border/60" />

            {/* Display preferences */}
            <section className="frame-card flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Eye className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-serif text-base font-semibold">Visualização</h2>
                        <p className="text-xs text-muted-foreground">
                            Preferências de exibição dos dados
                        </p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {/* Currency format */}
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <span className="text-sm font-medium">Moeda</span>
                            <p className="text-xs text-muted-foreground">
                                Formato de exibição de valores
                            </p>
                        </div>
                        <Select defaultValue="brl">
                            <SelectTrigger className="w-[140px] h-9 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="brl">R$ (BRL)</SelectItem>
                                <SelectItem value="usd">$ (USD)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date format */}
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <span className="text-sm font-medium">Data</span>
                            <p className="text-xs text-muted-foreground">
                                Formato de exibição de datas
                            </p>
                        </div>
                        <Select defaultValue="dd-mm">
                            <SelectTrigger className="w-[140px] h-9 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dd-mm">DD/MM/AAAA</SelectItem>
                                <SelectItem value="mm-dd">MM/DD/YYYY</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Numbers */}
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <span className="text-sm font-medium">Números</span>
                            <p className="text-xs text-muted-foreground">
                                Abreviar valores grandes (ex: 487K)
                            </p>
                        </div>
                        <Select defaultValue="compact">
                            <SelectTrigger className="w-[140px] h-9 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="compact">Compacto</SelectItem>
                                <SelectItem value="full">Completo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>
        </div>
    );
}
