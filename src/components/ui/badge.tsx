import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-sm font-medium shadow-sm transition-colors",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white border-transparent",
        neutral: "bg-gray-100 text-gray-800 border-transparent",
        admin: "bg-amber-100 text-amber-800 border-transparent",
        member: "bg-white text-slate-800 border border-slate-200",
        active: "bg-emerald-900 text-white border-transparent",
        invited: "bg-sky-100 text-sky-800 border-transparent",
        disabled: "bg-rose-600 text-white border-transparent",
        destructive: "bg-rose-600 text-white border-transparent",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
