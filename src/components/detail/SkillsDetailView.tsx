"use client";

import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGsap,
  SiFramer,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiIntellijidea,
  SiKalilinux,
  SiWireshark,
  SiBurpsuite,
  SiGooglecloud,
  SiGooglegemini,
  SiCplusplus,
} from "react-icons/si";
import {
  DiPython,
  DiJava,
  DiVisualstudio,
  DiGoogleCloudPlatform,
} from "react-icons/di";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", Icon: DiJava, color: "#ED8B00" },
      { name: "Python", Icon: DiPython, color: "#3776AB" },
      { name: "C", Icon: SiCplusplus, color: "#A8B9CC" },
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    title: "Web Technologies",
    skills: [
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss, color: "#1572B6" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Animation & UI",
    skills: [
      { name: "GSAP", Icon: SiGsap, color: "#88CE02" },
      { name: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#181717" },
      { name: "VS Code", Icon: DiVisualstudio, color: "#007ACC" },
      { name: "IntelliJ IDEA", Icon: SiIntellijidea, color: "#000000" },
      { name: "Linux", Icon: SiLinux, color: "#FCC624" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    ],
  },
  {
    title: "Cyber Security",
    skills: [
      { name: "Wireshark", Icon: SiWireshark, color: "#1679A7" },
      { name: "Nmap", Icon: SiWireshark, color: "#000000" },
      { name: "Burp Suite", Icon: SiBurpsuite, color: "#FF6633" },
      { name: "Kali Linux", Icon: SiKalilinux, color: "#557C94" },
    ],
  },
  {
    title: "Cloud & AI",
    skills: [
      { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
      { name: "Vertex AI", Icon: DiGoogleCloudPlatform, color: "#4285F4" },
      { name: "Gemini", Icon: SiGooglegemini, color: "#8E75F2" },
    ],
  },
];

function SkillCard({ skill, index, delay }: { skill: Skill; index: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: delay + index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className={cn(
          "group relative glass rounded-2xl p-5 text-center transition-all duration-300",
          "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] hover:-translate-y-1"
        )}
        whileHover={{ scale: 1.02 }}
        style={{ willChange: "transform" }}
      >
        <div
          className="w-14 h-14 mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
            borderRadius: "14px",
          }}
        >
          <skill.Icon className="w-7 h-7" style={{ color: skill.color }} aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-foreground leading-relaxed">{skill.name}</span>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-light transition-all duration-300 group-hover:w-full rounded-full" />
      </motion.div>
    </motion.div>
  );
}

function CategorySection({ category, categoryIndex }: { category: SkillCategory; categoryIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
        <span
          className="w-7 h-7 rounded-xl flex items-center justify-center text-primary"
          style={{ background: "linear-gradient(135deg, #7C3AED20, #A855F740)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </span>
        {category.title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {category.skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} delay={categoryIndex * 0.08} />
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsDetailView() {
  return (
    <div className="max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-10"
      >
        <Badge variant="primary" dot className="mb-4 inline-block">
          Tech Stack
        </Badge>
        <h3 className="text-3xl sm:text-4xl font-bold leading-[1.1] mb-4">
          <span className="text-gradient">Technologies</span> I Use
        </h3>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Technologies I use to build secure, scalable and modern software.
        </p>
      </motion.div>

      <div className="space-y-10">
        {skillCategories.map((category, index) => (
          <CategorySection key={category.title} category={category} categoryIndex={index} />
        ))}
      </div>
    </div>
  );
}