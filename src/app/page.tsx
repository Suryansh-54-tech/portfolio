import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import dynamic from "next/dynamic";

const Education = dynamic(() => import("@/components/sections/Education").then((mod) => mod.Education), {
  loading: () => <section id="education" className="py-24 lg:py-32 px-6" aria-hidden="true" />,
});
const Skills = dynamic(() => import("@/components/sections/Skills").then((mod) => mod.Skills), {
  loading: () => <section id="skills" className="py-20 lg:py-28 px-6" aria-hidden="true" />,
});
const LeetCode = dynamic(() => import("@/components/sections/LeetCode").then((mod) => mod.LeetCode), {
  loading: () => <section id="leetcode" className="py-24 lg:py-32 px-6" aria-hidden="true" />,
});
const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects), {
  loading: () => <section id="projects" className="py-24 lg:py-32 px-6" aria-hidden="true" />,
});
const Experience = dynamic(() => import("@/components/sections/Experience").then((mod) => mod.Experience), {
  loading: () => <section id="experience" className="py-24 lg:py-32 px-6" aria-hidden="true" />,
});
const Achievements = dynamic(() => import("@/components/sections/Achievements").then((mod) => mod.Achievements), {
  loading: () => <section id="achievements" className="py-24 lg:py-32 px-6" aria-hidden="true" />,
});
const Photography = dynamic(() => import("@/components/sections/Photography").then((mod) => mod.Photography), {
  loading: () => <section id="photography" className="py-24 lg:py-32 px-6" aria-hidden="true" />,
});

export default async function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Education />
      <Skills />
      <LeetCode />
      <Projects />
      <Experience />
      <Achievements />
      <Photography />
      <Contact />
      <Footer />
    </div>
  );
}