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

export function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transition: Transition = reducedMotion 
    ? { duration: 0.01 } 
    : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Static Animated Background */}
      <div className="absolute inset-0 -z-10 hero-background" aria-hidden="true">
        {!reducedMotion && (
          <>
            <div className="glow-orb glow-orb-1" />
            <div className="glow-orb glow-orb-2" />
            <div className="glow-orb glow-orb-3" />
            <div className="shimmer-line" />
          </>
        )}
      </div>

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

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
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
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-muted hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="ghost" className="justify-start">
                <Moon className="w-5 h-5 mr-2" aria-hidden="true" />
                Toggle Theme
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="text-center lg:text-left"
          >
            <Badge variant="primary" dot size="lg" className="mb-6 mx-auto lg:mx-0">
              Computer Science Undergraduate | Cyber Security Student
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-gradient-white">Building</span>{" "}
              <span className="text-gradient">Secure Systems</span>
              <br />
              <span className="text-foreground/80">with Clean Code & Creative Vision</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Computer Science undergraduate specializing in Cyber Security with strong foundations 
              in Java, DSA, DBMS, Operating Systems and Computer Networks. Passionate about 
              software development, cybersecurity, problem solving and photography.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
              <Button
                size="lg"
                rightIcon={<Download className="w-5 h-5" />}
                className="group"
                onClick={() => window.open("/resume/Resume_SuryanshSingh.pdf", "_blank")}
              >
                Download Resume
                <span className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Github className="w-5 h-5" />}
                onClick={() => window.open("https://github.com/Suryansh-54-tech", "_blank")}
              >
                GitHub
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Linkedin className="w-5 h-5" />}
                onClick={() => window.open("https://www.linkedin.com/in/suryansh-singh54/", "_blank")}
              >
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Instagram className="w-5 h-5" />}
                onClick={() => window.open("https://www.instagram.com/__suryansh__54?igsh=enJsMWhyZnZjOHJk", "_blank")}
              >
                Instagram
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted">
              {socialLinks.slice(0, 5).map((social) => {
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
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span className="hidden sm:inline">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-light/20 rounded-3xl blur-3xl" />
              
              <div className="relative glossy-card rounded-3xl p-2 border-glass-border overflow-hidden">
                <div className="glossy-card rounded-2xl p-8 aspect-square flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 relative">
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center overflow-hidden glossy-card">
                        <Image
                          src="/profile.jpg"
                          alt="Suryansh Singh profile photo"
                          fill
                          sizes="96px"
                          className="object-cover"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <span className="text-6xl font-bold text-gradient hidden">◉</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Suryansh Singh</h3>
                    <p className="text-muted">Computer Science Undergraduate</p>
                  </div>

                  {/* Floating icons INSIDE the profile card */}
                  <div className="absolute bottom-4 right-4 w-20 h-20 glossy-card rounded-xl p-3 animate-float hidden lg:block" style={{ animationDuration: "4s" }}>
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">🔐</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 w-16 h-16 glossy-card rounded-lg p-2 animate-float-delayed hidden lg:block" style={{ animationDuration: "5s", animationDelay: "1s" }}>
                    <div className="w-full h-full bg-gradient-to-br from-primary-light/20 to-primary/20 rounded flex items-center justify-center">
                      <span className="text-2xl">📸</span>
                    </div>
                  </div>

                  {/* Mobile/tablet: reposition icons to not overlap content */}
                  <div className="absolute bottom-2 right-2 w-14 h-14 glossy-card rounded-lg p-2 animate-float lg:hidden" style={{ animationDuration: "4s" }}>
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/20 rounded flex items-center justify-center">
                      <span className="text-xl">🔐</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-2 w-12 h-12 glossy-card rounded p-1.5 animate-float-delayed lg:hidden" style={{ animationDuration: "5s", animationDelay: "1s" }}>
                    <div className="w-full h-full bg-gradient-to-br from-primary-light/20 to-primary/20 rounded flex items-center justify-center">
                      <span className="text-lg">📸</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="mt-20 text-center"
        >
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 10, 0] }}
            transition={reducedMotion ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors cursor-pointer"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to about section"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </main>
    </section>
  );
}