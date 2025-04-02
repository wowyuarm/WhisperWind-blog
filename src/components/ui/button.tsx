"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-400 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-ghibli border-2 shadow-md transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-warm-paper text-primary border-primary/40 hover:bg-primary/10 hover:border-primary/60",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/40 hover:bg-destructive/20 hover:border-destructive/60 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-2 bg-warm-paper backdrop-blur-sm shadow-sm hover:bg-secondary/20 hover:text-warm hover:border-primary/40 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-foreground border-secondary/40",
        secondary:
          "bg-secondary/80 text-secondary-foreground shadow-sm hover:bg-secondary/90 border-secondary/60",
        ghost:
          "hover:bg-primary/5 hover:text-primary dark:hover:bg-accent/50 border-transparent shadow-none",
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-5 rounded-[1.25rem]",
        sm: "h-10 rounded-[0.75rem] gap-1.5 px-5 has-[>svg]:px-4",
        lg: "h-12 rounded-[1.25rem] px-8 has-[>svg]:px-7 text-base",
        icon: "size-11 rounded-full",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }