"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md active:shadow-sm",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm active:shadow-sm",
        outline:
          "border border-border bg-transparent hover:bg-surface-secondary hover:text-text active:bg-surface-tertiary",
        secondary:
          "bg-surface-secondary text-text hover:bg-surface-tertiary active:bg-dark-200 dark:active:bg-dark-700",
        ghost:
          "text-text-secondary hover:bg-surface-secondary hover:text-text active:bg-surface-tertiary",
        link: "text-primary-600 underline-offset-4 hover:underline",
        gradient:
          "bg-primary-700 text-white hover:bg-primary-800",
        "gradient-cyan":
          "bg-primary-700 text-white hover:bg-primary-800",
        glass:
          "glass text-white hover:bg-white/20 backdrop-blur-md active:bg-white/10",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-lg",
        sm: "h-9 px-3.5 text-sm rounded-lg",
        default: "h-10 px-5 py-2",
        lg: "h-12 px-7 text-base rounded-xl",
        xl: "h-14 px-9 text-lg rounded-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading, disabled, children, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading && !asChild && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-[inherit]">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
        {asChild ? children : <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>{children}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
