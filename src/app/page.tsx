"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DetailView } from "@/components/dashboard/DetailView";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  AboutDetailView,
  EducationDetailView,
  SkillsDetailView,
  ProjectsDetailView,
  ExperienceDetailView,
  AchievementsDetailView,
  LeetCodeDetailView,
  PhotographyDetailView,
  ContactDetailView,
  ResumeDetailView,
} from "@/components/detail";

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

const detailViewComponents: Record<Exclude<DetailViewType, null>, React.ComponentType> = {
  about: AboutDetailView,
  education: EducationDetailView,
  skills: SkillsDetailView,
  projects: ProjectsDetailView,
  experience: ExperienceDetailView,
  achievements: AchievementsDetailView,
  leetcode: LeetCodeDetailView,
  photography: PhotographyDetailView,
  contact: ContactDetailView,
  resume: ResumeDetailView,
};

const detailViewConfig: Record<Exclude<DetailViewType, null>, { 
  title: string; 
  subtitle?: string; 
  icon: React.ReactNode; 
  accentColor: string;
}> = {
  about: { 
    title: "About Me", 
    subtitle: "Computer Science Undergraduate", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ), 
    accentColor: "#0EA5E9" 
  },
  education: { 
    title: "Education", 
    subtitle: "Academic Background", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ), 
    accentColor: "#7C3AED" 
  },
  skills: { 
    title: "Skills", 
    subtitle: "Technologies I Use", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ), 
    accentColor: "#06B6D4" 
  },
  projects: { 
    title: "Projects", 
    subtitle: "Featured Work", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ), 
    accentColor: "#10B981" 
  },
  experience: { 
    title: "Experience", 
    subtitle: "Professional Journey", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ), 
    accentColor: "#F59E0B" 
  },
  achievements: { 
    title: "Achievements", 
    subtitle: "Certifications & Credentials", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ), 
    accentColor: "#EF4444" 
  },
  leetcode: { 
    title: "LeetCode", 
    subtitle: "Algorithmic Journey", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ), 
    accentColor: "#F59E0B" 
  },
  photography: { 
    title: "Photography", 
    subtitle: "Through My Lens", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ), 
    accentColor: "#EC4899" 
  },
  contact: { 
    title: "Contact", 
    subtitle: "Get In Touch", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ), 
    accentColor: "#10B981" 
  },
  resume: { 
    title: "Resume", 
    subtitle: "Download CV", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ), 
    accentColor: "#8B5CF6" 
  },
};

export default function Home() {
  const [openDetail, setOpenDetail] = useState<DetailViewType>(null);

  const handleOpenDetail = useCallback((view: DetailViewType) => {
    setOpenDetail(view);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setOpenDetail(null);
  }, []);

  const tiles = [
    {
      id: "hero",
      title: "Suryansh Singh",
      description: "Computer Science Undergraduate | Cyber Security Student | Software Developer | Photographer",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      accentColor: "#0EA5E9",
      onClick: () => {},
      size: "xlarge" as const,
      featured: true,
    },
    {
      id: "about",
      title: "About",
      description: "Computer Science undergraduate specializing in Cyber Security with strong foundations in Java, DSA, DBMS, OS and Computer Networks.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      accentColor: "#0EA5E9",
      count: "4+",
      countLabel: "Focus Areas",
      onClick: () => handleOpenDetail("about"),
      size: "medium" as const,
    },
    {
      id: "skills",
      title: "Skills",
      description: "18+ technologies across programming, web development, databases, tools, cyber security, and cloud platforms.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      accentColor: "#06B6D4",
      count: "7",
      countLabel: "Categories",
      onClick: () => handleOpenDetail("skills"),
      size: "medium" as const,
    },
    {
      id: "projects",
      title: "Projects",
      description: "Cybersecurity & software projects including network anomaly detection and security dashboards.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      accentColor: "#10B981",
      count: "2+",
      countLabel: "Projects",
      onClick: () => handleOpenDetail("projects"),
      size: "large" as const,
    },
    {
      id: "education",
      title: "Education",
      description: "B.Tech CSE (Cyber Security) at PSIT Kanpur, AKTU. Core subjects: DSA, DBMS, OS, Networks, Security.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        </svg>
      ),
      accentColor: "#7C3AED",
      count: "3",
      countLabel: "Degrees",
      onClick: () => handleOpenDetail("education"),
      size: "medium" as const,
    },
    {
      id: "experience",
      title: "Experience",
      description: "Leadership roles at Ingenious Club, event management, team coordination, and technical skill development.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      accentColor: "#F59E0B",
      count: "4+",
      countLabel: "Years",
      onClick: () => handleOpenDetail("experience"),
      size: "medium" as const,
    },
    {
      id: "leetcode",
      title: "LeetCode",
      description: "Daily problem solving practice tracking algorithmic growth and contest performance.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      accentColor: "#F59E0B",
      count: "100+",
      countLabel: "Problems",
      onClick: () => handleOpenDetail("leetcode"),
      size: "medium" as const,
    },
    {
      id: "photography",
      title: "Photography",
      description: "Creative portfolio spanning architecture, macro, landscape, street, and nature photography.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        </svg>
      ),
      accentColor: "#EC4899",
      count: "6",
      countLabel: "Gallery Items",
      onClick: () => handleOpenDetail("photography"),
      size: "large" as const,
    },
    {
      id: "achievements",
      title: "Achievements",
      description: "Google Cloud Skill Badges, Coursera certifications, Microsoft certifications, and leadership recognition.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      accentColor: "#EF4444",
      count: "5+",
      countLabel: "Certifications",
      onClick: () => handleOpenDetail("achievements"),
      size: "medium" as const,
    },
    {
      id: "contact",
      title: "Contact",
      description: "Get in touch for collaborations, project inquiries, or just to say hello.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      accentColor: "#10B981",
      onClick: () => handleOpenDetail("contact"),
      size: "medium" as const,
    },
    {
      id: "resume",
      title: "Resume",
      description: "Download my latest resume with education, experience, skills, and projects.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      accentColor: "#8B5CF6",
      onClick: () => handleOpenDetail("resume"),
      size: "medium" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenDetail={handleOpenDetail} />
      
      <main className="relative z-10 pt-24 pb-8 lg:pb-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="mt-6 lg:mt-8">
            <Dashboard tiles={tiles} />
          </div>
        </div>
      </main>

      <AnimatePresence mode="wait">
        {openDetail && (
          <DetailView
            isOpen={true}
            onClose={handleCloseDetail}
            title={detailViewConfig[openDetail].title}
            subtitle={detailViewConfig[openDetail].subtitle}
            icon={detailViewConfig[openDetail].icon}
            accentColor={detailViewConfig[openDetail].accentColor}
            showNavigation={false}
          >
            {(() => {
              const DetailComponent = detailViewComponents[openDetail];
              return <DetailComponent />;
            })()}
          </DetailView>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}