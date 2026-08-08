"use client";

import { motion } from "framer-motion";
import { Tile } from "./Tile";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

export interface DashboardTile {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  accentColor?: string;
  count?: string | number;
  countLabel?: string;
  onClick: () => void;
  size?: "small" | "medium" | "large" | "xlarge";
  featured?: boolean;
}

interface DashboardProps {
  tiles: DashboardTile[];
  className?: string;
}

export function Dashboard({ tiles, className }: DashboardProps) {
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.01 : 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "dashboard-grid grid grid-cols-4 grid-rows-[auto_auto_auto_auto] gap-4 lg:gap-6 px-4 lg:px-6",
        "max-w-[1400px] mx-auto",
        className
      )}
      style={{
        gridTemplateAreas: `
          "hero hero hero hero"
          "about skills projects projects"
          "education experience leetcode photography"
          "achievements achievements contact resume"
        `.trim(),
      }}
      role="main"
      aria-label="Portfolio dashboard"
    >
      {tiles.map((tile, index) => (
        <motion.div
          key={tile.id}
          variants={itemVariants}
          custom={index}
          style={{
            gridArea: getTileGridArea(tile.id),
          }}
        >
          <Tile
            title={tile.title}
            description={tile.description}
            icon={tile.icon}
            accentColor={tile.accentColor}
            count={tile.count}
            countLabel={tile.countLabel}
            onClick={tile.onClick}
            size={tile.size}
            featured={tile.featured}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function getTileGridArea(id: string): string {
  const areas: Record<string, string> = {
    hero: "hero",
    about: "about",
    skills: "skills",
    projects: "projects",
    education: "education",
    experience: "experience",
    leetcode: "leetcode",
    photography: "photography",
    achievements: "achievements",
    contact: "contact",
    resume: "resume",
  };
  return areas[id] || "auto";
}