import * as React from "react";
import { cn } from "@/lib/utils";

interface IconTooltipProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

export function IconTooltip({ children, label, className }: IconTooltipProps) {
  return (
    <div className={cn("relative group", className)}>
      {children}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out transform group-hover:translate-y-0 translate-y-1 z-50">
        {/* Arrow */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-foreground dark:bg-card" />
        {/* Tooltip body */}
        <div className="relative bg-foreground dark:bg-card text-background dark:text-foreground text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
          {label}
        </div>
      </div>
    </div>
  );
}
