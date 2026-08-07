"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "outline";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-secondary text-foreground border border-border",
    primary: "bg-primary/20 text-primary-light border border-primary/30",
    secondary: "bg-secondary-hover text-muted border border-border",
    success: "bg-green-500/20 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    outline: "bg-transparent text-foreground border border-border",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "rounded-full",
            variant === "primary" && "bg-primary-light",
            variant === "success" && "bg-green-400",
            variant === "warning" && "bg-yellow-400",
            variant === "secondary" && "bg-muted",
            variant === "default" && "bg-foreground",
            variant === "outline" && "bg-border",
            size === "sm" && "w-1.5 h-1.5",
            size === "md" && "w-2 h-2",
            size === "lg" && "w-2.5 h-2.5"
          )}
        />
      )}
      {children}
    </span>
  );
}