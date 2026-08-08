"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface TileProps extends HTMLMotionProps<"div"> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  accentColor?: string;
  count?: string | number;
  countLabel?: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large" | "xlarge";
  featured?: boolean;
}

const sizeClasses = {
  small: "col-span-1 row-span-1",
  medium: "col-span-2 row-span-1 lg:col-span-2 lg:row-span-1",
  large: "col-span-2 row-span-2",
  xlarge: "col-span-3 row-span-2 lg:col-span-3 lg:row-span-2",
};

const sizeContentClasses = {
  small: "p-5",
  medium: "p-6",
  large: "p-8",
  xlarge: "p-8 lg:p-10",
};

export const Tile = forwardRef<HTMLDivElement, TileProps>(
  (
    {
      title,
      description,
      icon,
      accentColor = "#0EA5E9",
      count,
      countLabel,
      onClick,
      size = "medium",
      featured = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const tileStyle = {
      ...style,
      ...(accentColor && {
        "--tile-accent": accentColor,
      }),
    } as React.CSSProperties;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          y: -4,
          scale: 1.01,
          boxShadow: `
            0 20px 60px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.08) inset,
            0 2px 0 rgba(255,255,255,0.1) inset,
            0 0 80px -16px var(--tile-accent),
            0 0 120px -24px var(--tile-accent)
          `,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "relative glass-card cursor-pointer overflow-hidden group",
          sizeClasses[size],
          sizeContentClasses[size],
          featured && "ring-1 ring-primary/30",
          className
        )}
        style={tileStyle}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={`Open ${title} details`}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--tile-accent)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--tile-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
                    color: accentColor,
                  }}
                >
                  {icon}
                </div>
              )}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                  {title}
                </h3>
                {count && countLabel && (
                  <p className="text-xs text-muted font-medium">
                    {count} {countLabel}
                  </p>
                )}
              </div>
            </div>
            {featured && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30 flex-shrink-0">
                Featured
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted/90 leading-relaxed mb-6 flex-1">
            {description}
          </p>
          
          <div className="flex items-center justify-end pt-4 border-t border-border/50">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--tile-accent)] group-hover:gap-3 transition-all">
              Explore
              <svg
                className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
        
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        </div>
      </motion.div>
    );
  }
);

Tile.displayName = "Tile";