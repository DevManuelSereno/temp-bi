import { Question, Info, ArrowsClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ── Empty State ────────────────────────────────────── */
interface EmptyStateProps {
    title?: string;
    description?: string;
    className?: string;
}

export function EmptyState({
    title = "Sem dados disponíveis",
    description = "Não há dados para exibir no momento.",
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 py-12 text-center",
                className
            )}
        >
            <Question weight="duotone" className="h-10 w-10 text-muted-foreground/50" />
            <div className="flex flex-col gap-1">
                <h4 className="font-serif text-sm font-semibold text-card-foreground">
                    {title}
                </h4>
                <p className="text-xs text-muted-foreground max-w-[240px]">
                    {description}
                </p>
            </div>
        </div>
    );
}

/* ── Error State ────────────────────────────────────── */
interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
    className?: string;
}

export function ErrorState({
    title = "Erro ao carregar",
    description = "Ocorreu um erro ao buscar os dados. Tente novamente.",
    onRetry,
    className,
}: ErrorStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 py-12 text-center",
                className
            )}
        >
            <Info weight="duotone" className="h-10 w-10 text-destructive/60" />
            <div className="flex flex-col gap-1">
                <h4 className="font-serif text-sm font-semibold text-card-foreground">
                    {title}
                </h4>
                <p className="text-xs text-muted-foreground max-w-[240px]">
                    {description}
                </p>
            </div>
            {onRetry && (
                <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
                    <ArrowsClockwise weight="bold" className="mr-1.5 h-3.5 w-3.5" />
                    Tentar novamente
                </Button>
            )}
        </div>
    );
}
