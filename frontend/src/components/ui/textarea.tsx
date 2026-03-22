import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Midnight Meridian Textarea Component
 * 
 * Design System Notes:
 * - Background: surface-container (white) with subtle border
 * - Focus: ring using primary (sapphire) color
 * - Border radius: rounded-lg (0.75rem) for internal components
 * - Shadow: shadow-card for subtle elevation
 * - "No-Line Rule": Minimal border emphasis, relies on surface colors
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styling
        "flex field-sizing-content min-h-24 w-full rounded-lg border border-border bg-surface-container px-3.5 py-2.5 text-sm font-medium shadow-card transition-all outline-none",
        // Text styling
        "text-foreground placeholder:text-muted-foreground",
        // Focus state - Sapphire ring
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
        // Hover state - subtle surface shift
        "hover:bg-surface-container-high hover:border-border/80",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
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

export { Textarea }
