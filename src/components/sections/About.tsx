"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, BookOpen, Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const aboutStats = [
  { value: "2023", label: "Started B.Tech", icon: BookOpen },
  { value: "2", label: "Projects Completed", icon: Code },
  { value: "6", label: "Core CS Subjects", icon: Database },
  { value: "1", label: "Specialization", icon: Shield },
];

const focusAreas = [
  { title: "Software Development", description: "Building secure, scalable, and user-friendly software with clean code practices using Java, Python, JavaScript and modern frameworks.", icon: Code, color: "#61DAFB" },
  { title: "Cyber Security", description: "Learning network security, vulnerability assessment, and secure coding practices. Hands-on with Linux, Wireshark, Nmap, and OWASP methodologies.", icon: Shield, color: "#EF4444" },
  { title: "Problem Solving", description: "Strong foundation in Data Structures & Algorithms, DBMS, Operating Systems, and Computer Networks for efficient system design.", icon: Database, color: "#8B5CF6" },
  { title: "Photography", description: "Creative vision through photography - capturing moments, landscapes, and stories with technical precision and artistic eye.", icon: Globe, color: "#F59E0B" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <Badge variant="primary" dot className="mb-4">
            About Me
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Computer Science Undergraduate
            <br />
            <span className="text-gradient">Cyber Security & Software Development</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Computer Science undergraduate specializing in Cyber Security with strong foundations 
            in Java, Data Structures & Algorithms, DBMS, Operating Systems and Computer Networks.
            Passionate about software development, cybersecurity, problem solving and photography.
            Interested in building secure, scalable and user-friendly software while continuously 
            learning modern technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {aboutStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Card variant="glass" className="p-6 h-full">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              What I <span className="text-gradient">Focus On</span>
            </h3>
            <div className="space-y-6">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-4 glass rounded-2xl hover:border-primary/30 transition-all"
                >
                  <div
                    className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${area.color}20, ${area.color}40)` }}
                  >
                    <area.icon className="w-6 h-6" style={{ color: area.color }} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{area.title}</h4>
                    <p className="text-muted text-sm">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Education
            </h3>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Pranveer Singh Institute of Technology (PSIT)</h4>
                    <p className="text-muted mb-2">B.Tech in Computer Science Engineering (Cyber Security)</p>
                    <p className="text-sm text-muted">2023 – Present | Kanpur, Uttar Pradesh, India</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <h5 className="font-medium mb-2">Core Subjects:</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" size="sm">Data Structures & Algorithms</Badge>
                    <Badge variant="secondary" size="sm">DBMS</Badge>
                    <Badge variant="secondary" size="sm">Operating Systems</Badge>
                    <Badge variant="secondary" size="sm">Computer Networks</Badge>
                    <Badge variant="secondary" size="sm">Cyber Security</Badge>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 glass rounded-3xl p-8 lg:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">Cyber Security</div>
              <div className="text-muted">Specialization</div>
            </div>
            <div className="p-4 border-l border-r border-border md:border-r md:border-l-0 md:border-t">
              <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">Java</div>
              <div className="text-muted">Primary Language</div>
            </div>
            <div className="p-4">
              <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">Kanpur, UP</div>
              <div className="text-muted">Location</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}