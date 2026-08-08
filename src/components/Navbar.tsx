"use client";

import { motion, Transition } from "framer-motion";
import { Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { navItems } from "@/lib/data";
import { useReducedMotion } from "@/hooks";

type DetailViewType =
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "experience"
  | "achievements"
  | "leetcode"
  | "photography"
  | "contact"
  | "resume"
  | null;

interface NavbarProps {
  onOpenDetail?: (view: DetailViewType) => void;
}

export function Navbar({ onOpenDetail }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const transition: Transition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const };

  const handleNavClick = (label: string) => {
    const viewMap: Record<string, DetailViewType> = {
      About: "about",
      Education: "education",
      Skills: "skills",
      Projects: "projects",
      Experience: "experience",
      Achievements: "achievements",
      Photography: "photography",
      Contact: "contact",
      Resume: "resume",
    };
    const view = viewMap[label];
    if (view && onOpenDetail) {
      onOpenDetail(view);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1400px] px-4 transition-all duration-300",
        "glass-nav rounded-2xl"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="text-xl font-bold text-gradient"
        >
          Suryansh Singh
        </motion.div>

        <div className="hidden md:flex items-center gap-5">
          {navItems.filter((item) => item.label !== "Home").map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.label)}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-accent-ice after:to-accent-violet after:transition-all hover:after:w-full cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Moon className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Moon className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={false}
          animate={{ opacity: 1, height: "auto" }}
          transition={transition}
          className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-3"
        >
          <div className="flex flex-col gap-3">
            {navItems.filter((item) => item.label !== "Home").map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className="text-base font-medium text-muted hover:text-foreground transition-colors py-2 text-left"
              >
                {item.label}
              </button>
            ))}
            <Button variant="ghost" className="justify-start">
              <Moon className="w-5 h-5 mr-2" aria-hidden="true" />
              Toggle Theme
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}