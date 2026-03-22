import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Midnight Meridian Button Component
 * 
 * Design System Notes:
 * - Primary: High-contrast sapphire blue with Shadow-LG tinted glow
 * - Ghost/Review: White bg with slate border, transitions to red-300 on hover for conflict states
 * - Border radius: rounded-lg (0.75rem) for internal components
 * - Font weight: font-semibold for proper Manrope hierarchy
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary: Sapphire blue with Shadow-LG tinted glow
        default:
          "bg-primary text-primary-foreground shadow-elevated hover:bg-primary/90 active:bg-primary/80",
        
        // Destructive with elevated shadow
        destructive:
          "bg-destructive text-white shadow-elevated-slate hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/50",
        
        // Outline: surface-container bg with border
        outline:
          "border border-border bg-surface-container shadow-card hover:bg-surface-container-high hover:border-border/80 dark:bg-surface-container dark:hover:bg-surface-container-high",
        
        // Secondary: surface-container-high styling
        secondary:
          "bg-secondary text-secondary-foreground shadow-card hover:bg-secondary/80",
        
        // Ghost: transparent with accent hover (primary/10 tint)
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        
        // Review: White bg, slate border → red-300 hover for conflict states
        review:
          "border border-border bg-surface-container text-foreground shadow-card hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:hover:border-red-400 dark:hover:bg-red-950 dark:hover:text-red-300",
        
        // Link style
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4",
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-md px-4 has-[>svg]:px-3",
        lg: "h-11 rounded-lg px-7 text-base has-[>svg]:px-5",
        icon: "size-10",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 rounded-md",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
