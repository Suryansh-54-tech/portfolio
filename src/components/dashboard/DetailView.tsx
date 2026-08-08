"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useCallback, ReactNode } from "react";

export interface DetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  children: ReactNode;
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  className?: string;
}

export function DetailView({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  accentColor = "#0EA5E9",
  children,
  showNavigation = false,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  className,
}: DetailViewProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrevious && onPrevious) onPrevious();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    },
    [isOpen, onClose, hasPrevious, hasNext, onPrevious, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-view-title"
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        <motion.div
          ref={(el) => el?.focus()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "relative w-full max-w-5xl max-h-[90vh] glass-strong rounded-2xl overflow-hidden flex flex-col",
            className
          )}
          onClick={(e) => e.stopPropagation()}
          style={{
            "--detail-accent": accentColor,
          } as React.CSSProperties}
          role="document"
        >
          <header className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-4">
              {icon && (
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
                    color: accentColor,
                  }}
                >
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                <h2 id="detail-view-title" className="text-lg sm:text-xl font-bold text-foreground truncate">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-sm text-muted truncate">{subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {showNavigation && (
                <>
                  <button
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                    className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-2 glass rounded-xl hover:bg-red/10 transition-colors text-muted hover:text-red"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-6 lg:p-8" style={{ minHeight: "300px" }}>
            {children}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted/60 hidden sm:flex px-4 pointer-events-none">
            <kbd className="px-2 py-0.5 bg-secondary rounded border border-border mx-1 font-mono">Esc</kbd> Close
            {showNavigation && (
              <>
                <kbd className="px-2 py-0.5 bg-secondary rounded border border-border mx-1 font-mono">←</kbd> Previous
                <kbd className="px-2 py-0.5 bg-secondary rounded border border-border mx-1 font-mono">→</kbd> Next
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}