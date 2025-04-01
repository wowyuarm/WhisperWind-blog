import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[0.75rem] border-2 px-3 py-1 text-xs font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring/30 focus:ring-offset-2 shadow-sm backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-md hand-drawn-border",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-warm-paper text-primary hover:bg-primary/10",
        secondary:
          "border-secondary/30 bg-secondary/15 text-warm hover:bg-secondary/25",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15",
        outline: "border-border bg-card/30 text-foreground hover:bg-card/50",
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