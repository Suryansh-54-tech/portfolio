"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Eye, Code } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ResumeDetailView() {
  const handleDownload = () => {
    window.open("/resume/Resume_SuryanshSingh.pdf", "_blank");
  };

  return (
    <div className="max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-10"
      >
        <Badge variant="primary" dot className="mb-4 inline-block">
          Resume & CV
        </Badge>
        <h3 className="text-3xl sm:text-4xl font-bold leading-[1.1] mb-4">
          Download <span className="text-gradient">Resume</span>
        </h3>
        <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
          Download my latest resume to learn more about my education, experience, skills, and projects.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-6"
      >
        <Card variant="glass-strong" className="p-8 lg:p-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center">
            <FileText className="w-10 h-10 text-primary" aria-hidden="true" />
          </div>

          <h4 className="text-xl sm:text-2xl font-bold mb-3">Suryansh Singh</h4>
          <p className="text-primary font-medium mb-2">Computer Science Undergraduate | Cyber Security</p>
          <p className="text-muted mb-6">Kanpur, Uttar Pradesh, India</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 glass rounded-xl text-lg font-medium text-primary hover:bg-primary/10 transition-all border border-primary/30 group w-full sm:w-auto"
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              Download PDF Resume
              <span className="transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="/resume/Resume_SuryanshSingh.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 glass rounded-xl text-lg font-medium text-muted hover:text-foreground hover:bg-secondary/50 transition-all border border-border group w-full sm:w-auto"
            >
              <Eye className="w-5 h-5" aria-hidden="true" />
              View in Browser
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl font-bold text-gradient">B.Tech</div>
              <div className="text-xs text-muted">CSE (Cyber Security)</div>
            </div>
            <div className="p-3 border-l border-r border-border md:border-r md:border-l-0 md:border-t">
              <div className="text-2xl font-bold text-gradient">2023</div>
              <div className="text-xs text-muted">Started</div>
            </div>
            <div className="p-3 border-l border-r border-border md:border-r md:border-l-0 md:border-t">
              <div className="text-2xl font-bold text-gradient">PSIT</div>
              <div className="text-xs text-muted">Institute</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-gradient">69%</div>
              <div className="text-xs text-muted">Aggregate (6th Sem)</div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card variant="glass" className="p-5 hover:border-primary/30 transition-all">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-primary/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <h5 className="font-semibold mb-1">Technical Skills</h5>
            <p className="text-sm text-muted">Java, Python, JavaScript, TypeScript, React, Next.js, Tailwind, Node.js, SQL, MongoDB, Linux, Git</p>
          </Card>

          <Card variant="glass" className="p-5 hover:border-primary/30 transition-all">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-primary-light/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary-light" aria-hidden="true" />
            </div>
            <h5 className="font-semibold mb-1">Core Subjects</h5>
            <p className="text-sm text-muted">DSA, DBMS, OS, Computer Networks, Cyber Security</p>
          </Card>

          <Card variant="glass" className="p-5 hover:border-primary/30 transition-all">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-primary-glow/20 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-primary-glow" aria-hidden="true" />
            </div>
            <h5 className="font-semibold mb-1">Projects</h5>
            <p className="text-sm text-muted">Network Anomaly Detector, ZeroFlux Dashboard</p>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-10 text-center"
      >
        <Badge variant="outline" size="md" className="text-sm">
          Last Updated: August 2026
        </Badge>
      </motion.div>
    </div>
  );
}