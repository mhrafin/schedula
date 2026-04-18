import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Midnight Meridian Input Component
 * 
 * Design System Notes:
 * - Background: surface-container (white) with subtle border
 * - Focus: ring using primary (sapphire) color
 * - Border radius: rounded-lg (0.75rem) for internal components
 * - Shadow: shadow-card for subtle elevation
 * - "No-Line Rule": Minimal border emphasis, relies on surface colors
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styling
        "h-10 w-full min-w-0 rounded-lg border border-border bg-surface-container px-3.5 py-2 text-sm font-medium shadow-card transition-all outline-none",
        // Text styling
        "text-foreground placeholder:text-muted-foreground",
        // Selection styling
        "selection:bg-primary selection:text-primary-foreground",
        // File input styling
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-foreground",
        // Focus state - Sapphire ring
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
        // Hover state - subtle surface shift
        "hover:bg-surface-container-high hover:border-border/80",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Error state
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        // Dark mode
        "dark:bg-surface-container dark:hover:bg-surface-container-high dark:aria-invalid:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
}

export { Input }
