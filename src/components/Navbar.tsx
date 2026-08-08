"use client";

import { motion, Transition } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, Moon, Menu, X, Instagram, Download, Twitter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { navItems, socialLinks } from "@/lib/data";
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
  scrolled?: boolean;
}

export function Navbar({ onOpenDetail, scrolled = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const transition: Transition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="text-2xl font-bold text-gradient"
        >
          Suryansh Singh
        </motion.div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.filter(item => item.label !== "Home").map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.label)}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all hover:after:w-full cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Moon className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
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
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 py-4"
        >
          <div className="flex flex-col gap-4">
            {navItems.filter(item => item.label !== "Home").map((item) => (
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