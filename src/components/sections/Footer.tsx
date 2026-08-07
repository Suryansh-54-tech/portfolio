"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Moon, Sun, ArrowUp, Heart, Code, FileText, Instagram } from "lucide-react";
import { navItems, socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export function Footer() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("light", initialTheme === "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative border-t border-border bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <Code className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-gradient">Suryansh Singh</span>
            </div>
            <p className="text-muted max-w-md mb-6 leading-relaxed">
              Computer Science Undergraduate | Cyber Security Student | Software Developer | Photographer.
              Building secure systems with clean code and creative vision.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                  github: Github,
                  linkedin: Linkedin,
                  twitter: Twitter,
                  mail: Mail,
                  instagram: Instagram,
                };
                const Icon = IconMap[social.icon] || Github;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-primary/30 hover:bg-primary/10 transition-all group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3" role="list">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowUp className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3" role="list">
              <li>
                <a href="/resume/Resume_SuryanshSingh.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <FileText className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  Download Resume
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <Code className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  View Projects
                </a>
              </li>
              <li>
                <a href="https://github.com/Suryansh-54-tech" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <Github className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href="mailto:suryansh.18535@gmail.com" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <Mail className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  Contact Me
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm text-muted">
              <p>© {currentYear} Suryansh Singh. All rights reserved.</p>
              <span className="hidden sm:inline">•</span>
              <p>Built with Next.js 15, React 18, TypeScript & Tailwind CSS</p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="gap-2"
              >
                {theme === "dark" ? (
                  <>
                    <Moon className="w-4 h-4" aria-hidden="true" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" aria-hidden="true" />
                    <span>Light</span>
                  </>
                )}
              </Button>

              <a
                href="#hero"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-primary/30 hover:bg-primary/10 transition-all"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5 text-muted" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted flex items-center justify-center gap-2">
              Made with
              <Heart className="w-4 h-4 text-red-500" aria-hidden="true" />
              by Suryansh Singh
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}