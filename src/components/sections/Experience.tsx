"use client";

import { motion } from "framer-motion";
import { Building, Briefcase, MapPin, Calendar, CheckCircle, Code, Camera, Users, Award } from "lucide-react";
import { experiences } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const typeLabels = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
};

const typeIcons = {
  "full-time": Briefcase,
  "part-time": Briefcase,
  contract: Building,
  freelance: Code,
  internship: Building,
};

export function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-32 px-6 section-ambient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <Badge variant="primary" dot className="mb-4">
            Professional Journey
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            My professional journey building scalable solutions, leading teams,
            and delivering impactful products across various industries.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary-light/0 hidden lg:block" />
          
          <div className="space-y-8">
            {experiences.map((experience, index) => {
              const IconComponent = typeIcons[experience.type as keyof typeof typeIcons] || Briefcase;
              
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative lg:pl-20"
                >
                  <div className="absolute left-0 top-4 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                  {index < experiences.length - 1 && (
                    <div className="absolute left-1.5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/30 to-transparent hidden lg:block" />
                  )}
                  
                  <Card variant="glass" className="p-6 lg:p-8 hover:border-primary/30 transition-all relative">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl sm:text-2xl font-bold">{experience.role}</h3>
                          {experience.current && (
                            <Badge variant="primary" size="sm" dot>
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-muted text-sm mb-2">
                          <span className="font-medium text-foreground">{experience.company}</span>
                          <span className="hidden sm:inline">•</span>
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                          <span>{experience.location}</span>
                          <span className="hidden sm:inline">•</span>
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <span>{experience.period}</span>
                        </div>
                        <Badge
                          variant="outline"
                          size="sm"
                          className={cn("mb-4", experience.current && "border-primary/50 text-primary")}
                        >
                          <IconComponent className="w-3 h-3 mr-1" aria-hidden="true" />
                          {typeLabels[experience.type as keyof typeof typeLabels]}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2" role="list">
                          {experience.description.map((desc, descIndex) => (
                            <motion.li
                              key={descIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: descIndex * 0.05 }}
                              className="flex items-start gap-3 text-sm text-muted leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 flex-shrink-0" />
                              <span>{desc}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <Code className="w-4 h-4 text-primary" aria-hidden="true" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { 
              label: "Photography Experience", 
              value: "4+", 
              subtitle: "Years of Photography",
              description: "Passionate about photography since school, covering college events, portraits, automotive photography, and creative storytelling.",
              icon: Camera 
            },
            { 
              label: "Leadership Experience", 
              value: "4+", 
              subtitle: "Years of Leadership",
              description: "Leadership through student clubs, event management, team coordination, digital media, and organizing campus activities.",
              icon: Users 
            },
            { 
              label: "Technologies", 
              value: "18+", 
              subtitle: "Technologies Learned",
              description: "Java, Python, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, SQL, MySQL, MongoDB, Git, GitHub, Linux, Networking, Cyber Security, HTML, CSS.",
              icon: Code 
            },
            { 
              label: "Certifications & Badges", 
              value: "Growing", 
              subtitle: "Learning Journey",
              description: "Continuously earning industry certifications, Google Cloud Skill Badges, Coursera certificates, and expanding technical knowledge.",
              icon: Award 
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-6 text-center hover:border-primary/30 transition-all">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mb-2">{stat.label}</div>
                <div className="text-xs text-muted mb-3">{stat.subtitle}</div>
                <div className="text-xs text-muted/80 line-clamp-3">{stat.description}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}