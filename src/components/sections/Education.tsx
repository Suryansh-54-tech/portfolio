"use client";

import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, Award, Calendar, MapPin, Building2 } from "lucide-react";
import { education } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks";
import { Transition } from "framer-motion";

const typeConfig = {
  bachelor: { label: "Undergraduate", icon: GraduationCap, color: "#7C3AED" },
  "senior-secondary": { label: "Senior Secondary", icon: School, color: "#8B5CF6" },
  secondary: { label: "Secondary", icon: School, color: "#A855F7" },
  other: { label: "Education", icon: BookOpen, color: "#6366F1" },
};

export function Education() {
  const reducedMotion = useReducedMotion();

  const transition: Transition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] };

  return (
    <section id="education" className="relative py-24 lg:py-32 px-6 section-ambient">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
          className="text-center mb-16"
        >
          <Badge variant="primary" dot className="mb-4">
            Academic Background
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            My <span className="text-gradient">Education</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Academic journey from school to university, building strong foundations
            in computer science and cyber security.
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
          className="relative"
        >
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary-light/0 hidden lg:block" />

          <div className="space-y-10 lg:space-y-12">
            {education.map((edu, index) => {
              const config = typeConfig[edu.type];
              const Icon = config.icon;
              const isFirst = index === 0;
              const isLast = index === education.length - 1;

              return (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative lg:pl-16"
                >
                  <div className="absolute left-0 top-4 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                  {!isLast && (
                    <div className="absolute left-1.5 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary/30 to-transparent hidden lg:block" />
                  )}

                  <Card variant="glass" className="p-6 lg:p-8 hover:border-primary/30 transition-all relative group">
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ background: `linear-gradient(135deg, ${config.color}20, ${config.color}40)` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: config.color }} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: `${config.color}20`, color: config.color }}>
                            {config.label}
                          </span>
                          {isFirst && (
                            <Badge variant="primary" size="sm" dot>
                              Current
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{edu.degree}</h3>
                        {edu.specialization && (
                          <p className="text-primary font-medium mt-1">{edu.specialization}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <Building2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium text-foreground">{edu.institution}</span>
                      </div>
                      {edu.university && (
                        <div className="flex items-center gap-3 text-sm text-muted">
                          <GraduationCap className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                          <span>{edu.university}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    {edu.percentage && (
                      <div className="mt-5 pt-5 border-t border-border">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 flex-shrink-0" style={{ color: config.color }} aria-hidden="true" />
                          <div>
                            <span className="text-sm text-muted">Current Aggregate</span>
                            <div className="text-lg font-bold" style={{ color: config.color }}>{edu.percentage}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {edu.type === "bachelor" && (
                      <div className="mt-5 pt-5 border-t border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                          <h4 className="font-semibold text-sm text-foreground">Core Subjects</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" size="sm">Data Structures & Algorithms</Badge>
                          <Badge variant="secondary" size="sm">DBMS</Badge>
                          <Badge variant="secondary" size="sm">Operating Systems</Badge>
                          <Badge variant="secondary" size="sm">Computer Networks</Badge>
                          <Badge variant="secondary" size="sm">Cyber Security</Badge>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}