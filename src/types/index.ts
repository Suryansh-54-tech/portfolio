export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "design";
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "web" | "mobile" | "fullstack" | "design";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
  current: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  category: "award" | "certification" | "milestone" | "recognition";
  link?: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: "google-cloud" | "coursera" | "cisco" | "ibm" | "microsoft" | "aws" | "nptel" | "other";
  providerName: string;
  issuedBy: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  description?: string;
  category: "cloud" | "programming" | "security" | "ai-ml" | "other";
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export interface Education {
  id: string;
  degree: string;
  specialization?: string;
  institution: string;
  university?: string;
  period: string;
  percentage?: string;
  location: string;
  type: "bachelor" | "senior-secondary" | "secondary" | "other";
}