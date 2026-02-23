"use client";

import { cn } from "@/lib/utils";
import { Eye, Moon, Palette, Sun } from "@phosphor-icons/react";
import { Divider, Select } from "antd";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const THEME_OPTIONS = [
  {
    value: "light",
    label: "MicroRealismo (Claro)",
    icon: Sun,
    description: "Fundo off-white, tipografia editorial, bordo como destaque",
  },
  {
    value: "dark",
    label: "CriativosADS (Escuro)",
    icon: Moon,
    description: "Fundo charcoal, ouro como primario, glow sutil em CTAs",
  },
] as const;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const currentTheme = hydrated ? theme : "light";

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight">Configuracoes</h1>
        <p className="text-sm text-muted-foreground mt-1">Personalize a aparencia e preferencias do painel</p>
      </div>

      <section className="frame-card flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Palette weight="duotone" className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-base font-semibold">Tema Visual</h2>
            <p className="text-xs text-muted-foreground">Escolha a identidade visual do dashboard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {THEME_OPTIONS.map((opt) => {
            const isActive = currentTheme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTheme(opt.value)}
                className={cn(
                  "flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition-all",
                  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                  isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
                )}
                aria-pressed={isActive}
              >
                <div className="flex items-center gap-2">
                  <opt.icon
                    weight="bold"
                    className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")}
                  />
                  <span className="text-sm font-semibold">{opt.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <Divider className="!my-0 !border-border/60" />

      <section className="frame-card flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Eye weight="duotone" className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-base font-semibold">Visualizacao</h2>
            <p className="text-xs text-muted-foreground">Preferencias de exibicao dos dados</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm font-medium">Moeda</span>
              <p className="text-xs text-muted-foreground">Formato de exibicao de valores</p>
            </div>
            <Select
              defaultValue="brl"
              options={[
                { value: "brl", label: "R$ (BRL)" },
                { value: "usd", label: "$ (USD)" },
              ]}
              className="w-[140px]"
              size="middle"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm font-medium">Data</span>
              <p className="text-xs text-muted-foreground">Formato de exibicao de datas</p>
            </div>
            <Select
              defaultValue="dd-mm"
              options={[
                { value: "dd-mm", label: "DD/MM/AAAA" },
                { value: "mm-dd", label: "MM/DD/YYYY" },
              ]}
              className="w-[140px]"
              size="middle"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm font-medium">Numeros</span>
              <p className="text-xs text-muted-foreground">Abreviar valores grandes (ex: 487K)</p>
            </div>
            <Select
              defaultValue="compact"
              options={[
                { value: "compact", label: "Compacto" },
                { value: "full", label: "Completo" },
              ]}
              className="w-[140px]"
              size="middle"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
