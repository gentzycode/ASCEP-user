import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa";

const buttonVariants = cva(
  "inline-flex items-center  justify-center whitespace-nowrap rounded-[16px] text-base font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        primary: "bg-primary text-btn-text hover:bg-primary/90",
        green: "bg-brand_green text-white hover:bg-brand_green/90",
        success: "bg-success text-white hover:bg-success/90 ",
        pill: "bg-dark/10 text-dark  hover:bg-dark/20",
        secondary: "bg-base-100 text-base-400 hover:bg-base-100/50 ",
        "outline-primary":
          "border border-primary bg-transparent hover:bg-primary/10 text-primary",
        "outline-green":
          "border border-brand_green bg-transparent hover:bg-brand_green/10 text-green_text",
        "outline-secondary":
          "border border-base-100 bg-transparent hover:bg-base-100/30 text-base-900",
        // destructive:
        //   "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        // outline:
        //   "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",

        // ghost:
        //   "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        // link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-[52px] px-4 py-2 gap-3",
        sm: "h-8 rounded-[4px] px-3 gap-[6px] text-sm",
        xs: "h-7 rounded-[10px] px-7 gap-[6px] text-xs font-medium",
        // lg: "h-11 rounded-[4px] px-8",
        // icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      children,
      asChild = false,
      isLoading,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon}
        {isLoading ? <FaSpinner className="animate-spin " /> : children}
        {rightIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
