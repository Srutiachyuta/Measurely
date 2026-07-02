import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function SectionCard({ title, children, icon, className }: SectionCardProps) {
  return (
    <div className={cn("bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4", className)}>
      <div className="flex items-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        <h2 className="text-base font-semibold text-text">{title}</h2>
      </div>
      {children}
    </div>
  );
}
