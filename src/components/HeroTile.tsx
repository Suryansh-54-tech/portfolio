"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Instagram, Download, Mail, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks";
import { socialLinks } from "@/lib/data";

export function HeroTile() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative glass-card p-6 lg:p-8 xl:p-10 overflow-hidden group cursor-default">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-light/10" />
      
      <div className="relative z-10 flex flex-col h-full">
        <Badge variant="primary" dot size="lg" className="mb-4 w-fit">
          Computer Science Undergraduate | Cyber Security Student
        </Badge>
        
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.1] mb-4">
          <span className="text-foreground">Building</span>{" "}
          <span className="text-gradient">Secure Systems</span>
          <br />
          <span className="text-foreground/80">with Clean Code & Creative Vision</span>
        </h3>
        
        <p className="text-base sm:text-lg text-muted mb-6 leading-relaxed flex-1">
          Computer Science undergraduate specializing in Cyber Security with strong foundations 
          in Java, DSA, DBMS, Operating Systems and Computer Networks. Passionate about 
          software development, cybersecurity, problem solving and photography.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            size="md"
            rightIcon={<Download className="w-4 h-4" />}
            className="group"
            onClick={() => window.open("/resume/Resume_SuryanshSingh.pdf", "_blank")}
          >
            Download Resume
            <span className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            size="md"
            leftIcon={<Github className="w-4 h-4" />}
            onClick={() => window.open("https://github.com/Suryansh-54-tech", "_blank")}
          >
            GitHub
          </Button>
          <Button
            variant="outline"
            size="md"
            leftIcon={<Linkedin className="w-4 h-4" />}
            onClick={() => window.open("https://www.linkedin.com/in/suryansh-singh54/", "_blank")}
          >
            LinkedIn
          </Button>
          <Button
            variant="outline"
            size="md"
            leftIcon={<Instagram className="w-4 h-4" />}
            onClick={() => window.open("https://www.instagram.com/__suryansh__54?igsh=enJsMWhyZnZjOHJk", "_blank")}
          >
            Instagram
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-4 text-sm text-muted pt-4 border-t border-border/50">
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
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{social.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="absolute right-4 top-4 bottom-4 w-48 lg:w-56 xl:w-64 hidden lg:block">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-light/20 rounded-2xl blur-3xl" />
          
          <div className="relative glass-card rounded-2xl p-2 overflow-hidden h-full">
            <div className="glass-card rounded-xl p-6 aspect-square flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center overflow-hidden glass-card">
                    <Image
                      src="/profile.jpg"
                      alt="Suryansh Singh profile photo"
                      fill
                      sizes="80px"
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
                    <span className="text-5xl font-bold text-gradient hidden">◉</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-1">Suryansh Singh</h4>
                <p className="text-muted text-sm">Computer Science Undergraduate</p>
              </div>

              <div className="absolute bottom-3 right-3 w-16 h-16 glass-card rounded-xl p-2 animate-float" style={{ animationDuration: "4s" }}>
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔐</span>
                </div>
              </div>
              
              <div className="absolute top-3 right-3 w-12 h-12 glass-card rounded-lg p-1.5 animate-float-delayed" style={{ animationDuration: "5s", animationDelay: "1s" }}>
                <div className="w-full h-full bg-gradient-to-br from-primary-light/20 to-primary/20 rounded flex items-center justify-center">
                  <span className="text-lg">📸</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
      </div>
    </div>
  );
}