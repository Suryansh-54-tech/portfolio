"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, BookOpen, Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const aboutStats = [
  { value: "2023", label: "Started B.Tech", icon: BookOpen },
  { value: "2+", label: "Projects Completed", icon: Code },
  { value: "6", label: "Core CS Subjects", icon: Database },
  { value: "1", label: "Specialization", icon: Shield },
];

const focusAreas = [
  {
    title: "Software Development",
    description:
      "Building secure, scalable, and user-friendly software with clean code practices using Java, Python, JavaScript and modern frameworks.",
    icon: Code,
    color: "#61DAFB",
  },
  {
    title: "Cyber Security",
    description:
      "Learning network security, vulnerability assessment, and secure coding practices. Hands-on with Linux, Wireshark, Nmap, and OWASP methodologies.",
    icon: Shield,
    color: "#EF4444",
  },
  {
    title: "Problem Solving",
    description:
      "Strong foundation in Data Structures & Algorithms, DBMS, Operating Systems, and Computer Networks for efficient system design.",
    icon: Database,
    color: "#8B5CF6",
  },
  {
    title: "Photography",
    description:
      "Creative vision through photography - capturing moments, landscapes, and stories with technical precision and artistic eye.",
    icon: Globe,
    color: "#F59E0B",
  },
];

export function AboutDetailView() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center"
      >
        <Badge variant="primary" dot className="mb-4 inline-block">
          About Me
        </Badge>
        <h3 className="text-3xl sm:text-4xl font-bold leading-[1.1] mb-6">
          Computer Science Undergraduate
          <br />
          <span className="text-gradient">Cyber Security & Software Development</span>
        </h3>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Computer Science undergraduate specializing in Cyber Security with strong foundations
          in Java, Data Structures & Algorithms, DBMS, Operating Systems and Computer Networks.
          Passionate about software development, cybersecurity, problem solving and photography.
          Interested in building secure, scalable and user-friendly software while continuously
          learning modern technologies.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {aboutStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="text-center"
          >
            <Card variant="glass" className="p-5 h-full">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="grid lg:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <h4 className="text-xl sm:text-2xl font-bold mb-2">
            What I <span className="text-gradient">Focus On</span>
          </h4>
          <div className="space-y-4">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex gap-4 p-4 glass rounded-2xl hover:border-primary/30 transition-all"
              >
                <div
                  className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${area.color}20, ${area.color}40)` }}
                >
                  <area.icon className="w-5 h-5" style={{ color: area.color }} aria-hidden="true" />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">{area.title}</h5>
                  <p className="text-muted text-sm">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl sm:text-2xl font-bold mb-2">Education</h4>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg mb-1">Pranveer Singh Institute of Technology (PSIT)</h5>
                  <p className="text-muted mb-2">B.Tech in Computer Science Engineering (Cyber Security)</p>
                  <p className="text-sm text-muted">2023 – Present | Kanpur, Uttar Pradesh, India</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <h6 className="font-medium mb-2">Core Subjects:</h6>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass rounded-2xl p-6 lg:p-8"
      >
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">Cyber Security</div>
            <div className="text-muted">Specialization</div>
          </div>
          <div className="p-4 border-l border-r border-border md:border-r md:border-l-0 md:border-t">
            <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">Java</div>
            <div className="text-muted">Primary Language</div>
          </div>
          <div className="p-4">
            <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">Kanpur, UP</div>
            <div className="text-muted">Location</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}