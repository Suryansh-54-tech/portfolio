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
  small: "p-4",
  medium: "p-5",
  large: "p-6",
  xlarge: "p-6 lg:p-8",
};

export const Tile = forwardRef<HTMLDivElement, TileProps>(
  (
    {
      title,
      description,
      icon,
      accentColor = "#7dd3fc",
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
        whileHover={{ y: -6, scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "relative glass-tile cursor-pointer overflow-hidden group",
          sizeClasses[size],
          sizeContentClasses[size],
          featured && "ring-1 ring-accent-ice/30",
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
        {/* Ambient accent glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--tile-accent)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--tile-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="glass-icon w-11 h-11 flex-shrink-0" style={{ color: accentColor }}>
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight truncate">
                  {title}
                </h3>
                {count && countLabel && (
                  <p className="text-xs text-muted font-medium truncate">
                    {count} {countLabel}
                  </p>
                )}
              </div>
            </div>
            {featured && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent-ice/15 text-accent-ice border border-accent-ice/30 flex-shrink-0">
                Featured
              </span>
            )}
          </div>

          <p className="text-sm text-muted/80 leading-relaxed flex-1 min-h-0">
            {description}
          </p>
        </div>

        {/* Glossy sweep handled by .glass-tile::before in globals.css */}
      </motion.div>
    );
  }
);

Tile.displayName = "Tile";