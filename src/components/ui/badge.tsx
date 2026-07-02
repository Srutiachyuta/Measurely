"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-white hover:bg-primary-700",
        secondary:
          "border-transparent bg-surface-secondary text-text hover:bg-dark-200 dark:hover:bg-dark-700",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700",
        outline: "text-text border-border",
        success:
          "border-transparent bg-accent-green/15 text-accent-green dark:bg-accent-green/10",
        warning:
          "border-transparent bg-accent-amber/15 text-accent-amber dark:bg-accent-amber/10",
        info:
          "border-transparent bg-accent-cyan/15 text-accent-cyan dark:bg-accent-cyan/10",
        gradient:
          "border-transparent bg-gradient-to-r from-primary-500 to-accent-cyan text-white",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
