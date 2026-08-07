import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { LeetCode } from "@/components/sections/LeetCode";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Photography } from "@/components/sections/Photography";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

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