import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[0.65rem] border-2 px-3 py-1 text-xs font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring/30 focus:ring-offset-2 shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/60 hover:rotate-[1deg]",
        secondary:
          "border-secondary/40 bg-secondary/15 text-foreground/90 hover:bg-secondary/25 hover:border-secondary/50 hover:rotate-[1deg]",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:border-destructive/60 hover:rotate-[1deg]",
        outline: "border-secondary/30 bg-warm-paper/80 text-foreground/80 hover:bg-secondary/20 hover:text-foreground hover:rotate-[1deg]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 