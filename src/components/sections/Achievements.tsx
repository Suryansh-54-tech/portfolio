"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Download, Award, FileText } from "lucide-react";
import { certifications } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CertificateViewer } from "@/components/ui/CertificateViewer";
import { cn } from "@/lib/utils";

const providerConfig = {
  "google-cloud": { label: "Google Cloud", color: "#4285F4", icon: "google-cloud" },
  coursera: { label: "Coursera", color: "#0056D2", icon: "coursera" },
  cisco: { label: "Cisco", color: "#1BA0D7", icon: "cisco" },
  ibm: { label: "IBM", color: "#052F5B", icon: "ibm" },
  microsoft: { label: "Microsoft", color: "#0078D4", icon: "microsoft" },
  aws: { label: "AWS", color: "#FF9900", icon: "aws" },
  nptel: { label: "NPTEL", color: "#E84343", icon: "nptel" },
  other: { label: "Other", color: "#8B5CF6", icon: "other" },
};

const categoryConfig = {
  cloud: { label: "Cloud", color: "#4285F4" },
  programming: { label: "Programming", color: "#10B981" },
  security: { label: "Security", color: "#EF4444" },
  "ai-ml": { label: "AI/ML", color: "#8B5CF6" },
  other: { label: "Other", color: "#6B7280" },
};

function ProviderLogo({ provider, size = 32 }: { provider: string; size?: number }) {
  const config = providerConfig[provider as keyof typeof providerConfig] || providerConfig.other;
  
  const logos: Record<string, React.JSX.Element> = {
    "google-cloud": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.518,0,2.818,0.547,3.839,1.44l2.817-2.817C17.429,0.768,15.138,0,12.545,0C7.384,0,3.127,4.257,3.127,9.418c0,2.433,1.049,4.55,2.64,5.977l-2.902,2.902C1.598,16.512,0,13.115,0,9.418C0,4.257,4.257,0,9.418,0c5.161,0,9.418,4.257,9.418,9.418c0,1.617-0.262,3.148-0.742,4.571L12.545,10.239z" fill="#4285F4" />
        <path d="M12.545,18.072c-2.594,0-4.801-1.736-5.516-3.972h-0.079l5.595-5.595c0.63,0.792,1.087,1.751,1.087,2.814c0,2.106-1.024,3.936-2.747,3.936c-0.942,0-1.776-0.333-2.404-0.843l-2.33,2.33C10.929,20.794,11.736,21.175,12.545,21.175C17.706,21.175,21.963,16.918,21.963,11.757C21.963,10.492,21.81,9.26,21.54,8.089l-2.733,2.733C18.636,11.207,15.72,11.889,12.545,11.889z" fill="#34A853" />
        <path d="M21.963,11.757c0,0.979-0.118,1.933-0.333,2.842l-2.817,2.817c1.389-1.121,2.449-2.677,2.449-4.475c0-2.19-1.013-4.092-2.639-5.199l2.972,2.972C21.572,8.193,21.963,9.988,21.963,11.757z" fill="#FBBC05" />
        <path d="M12.545,0C7.384,0,3.127,4.257,3.127,9.418c0,2.004,0.708,3.815,1.837,5.199l2.972-2.972C5.641,10.194,5.162,8.788,5.162,7.35c0-1.814,0.851-3.392,2.216-4.318L7.378,0.317C5.533,1.148,4.01,2.678,3.127,4.713C4.257,6.748,5.965,8.456,8.141,9.418c0.539,0.241,1.101,0.384,1.682,0.384c1.518,0,2.818-0.547,3.839-1.44l-2.817-2.817C8.141,3.347,5.595,4.904,3.127,6.748C1.598,6.748,0.125,5.275,0,3.554l0,0C4.257,0,9.418,0,12.545,0z" fill="#EA4335" />
      </svg>
    ),
    coursera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 16.879c-.24.301-.541.522-.842.662-.3.14-.661.21-.961.21-.361 0-.661-.141-.962-.21-.3-.071-.541-.292-.722-.602l-4.022-6.723c-.181-.3-.181-.721 0-1.021.181-.3.422-.521.722-.602.36-.071.72-.141 1.081-.141.3 0 .6.07.841.14.301.14.54.361.72.661l3.36 5.582c.18.24.18.6.18.84 0 .3-.06.54-.18.84zm-11.042 0c-.24.301-.54.522-.841.662-.36.14-.72.21-1.08.21-.36 0-.66-.14-.96-.21-.3-.14-.54-.36-.72-.661l-3.36-5.582c-.18-.24-.18-.6-.18-.84 0-.3.06-.54.18-.84.18-.3.42-.52.72-.601.3-.07.66-.14 1.02-.14.3 0 .6.07.9.14.3.07.54.29.72.601l4.022 6.723c.18.3.18.72 0 1.02z" />
      </svg>
    ),
    ibm: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size={size * 0.5} fill="currentColor">IBM</text>
      </svg>
    ),
    microsoft: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14.28,0h-4.28v14.43H0v4.28h10V24h4.28V18.71H24V14.43H14.28V0zM6.71,14.43h-2.43V4.57H6.71V14.43zM10,10.43H6.71V6.57H10V10.43zM0,10.43h2.43V6.57H0V10.43z" />
      </svg>
    ),
    aws: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.298.305l4.656 9.312H22.61l-5.017 4.014 1.85 10.807-9.934-7.548-9.933 7.548 1.851-10.807-5.017-4.014h4.656L10.702.305l2.596 0zm.002 1.578L10.55 7.193l-2.75 1.321v.001l2.832 5.665-5.771 3.554 1.055 6.157 9.14-6.175 1.223-7.338-5.474-3.377 2.75-1.322V1.883z" />
      </svg>
    ),
    cisco: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm0-2.4c3.979 0 7.2-3.221 7.2-7.2s-3.221-7.2-7.2-7.2-7.2 3.221-7.2 7.2 3.221 7.2 7.2 7.2z" />
      </svg>
    ),
    nptel: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size={size * 0.35} fill="currentColor">NPTEL</text>
      </svg>
    ),
    other: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ color: config.color }}
      aria-hidden="true"
    >
      {logos[config.icon] || logos.other}
    </div>
  );
}

function CertificationCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
  const category = categoryConfig[cert.category];
  const [viewerCert, setViewerCert] = useState<typeof cert | null>(null);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Card variant="glass" className="h-full flex flex-col group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-start justify-between gap-4 mb-4">
              <ProviderLogo provider={cert.provider} size={40} />
              <Badge
                variant="outline"
                size="sm"
                className={cn(
                  "border-current/30",
                  `text-[${category.color}] border-[${category.color}]`
                )}
              >
                {category.label}
              </Badge>
            </div>

            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              {cert.title}
            </h3>
            
            <p className="text-sm text-muted mb-2">Issued by {cert.issuedBy}</p>
            
            <div className="flex items-center gap-3 text-xs text-muted mb-4">
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3" aria-hidden="true" />
                {cert.issueDate}
              </span>
              {cert.credentialId && (
                <span className="font-mono bg-secondary/50 px-2 py-0.5 rounded">
                  {cert.credentialId}
                </span>
              )}
            </div>

            {cert.description && (
              <p className="text-sm text-muted/80 leading-relaxed mb-4 flex-1">
                {cert.description}
              </p>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setViewerCert(cert)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass rounded-xl text-sm font-medium text-primary hover:bg-primary/10 transition-all border border-primary/30 group"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                View Certificate
              </button>
              {cert.pdfUrl && (
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-secondary/50 transition-all border border-border group"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  Download PDF
                </a>
              )}
              {!cert.pdfUrl && (
                <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass rounded-xl text-sm font-medium text-muted/50 border border-border/50">
                  <Download className="w-4 h-4" aria-hidden="true" />
                  PDF Not Available
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.article>

      <CertificateViewer
        isOpen={!!viewerCert}
        onClose={() => setViewerCert(null)}
        pdfUrl={viewerCert?.pdfUrl}
        title={viewerCert?.title}
        provider={viewerCert?.providerName}
        issuedBy={viewerCert?.issuedBy}
        issueDate={viewerCert?.issueDate}
        credentialId={viewerCert?.credentialId}
        credentialUrl={viewerCert?.credentialUrl}
      />
    </>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <Badge variant="primary" dot className="mb-4">
            Certifications & Credentials
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            <span className="text-gradient">Certifications</span> & Credentials
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Industry-recognized certifications validating expertise in cloud computing, cybersecurity, AI/ML, and software development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3"
        >
          {Object.entries(providerConfig).map(([key, config]) => {
            const count = certifications.filter(c => c.provider === key).length;
            if (count === 0) return null;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card variant="glass" className="p-4 h-full text-center hover:border-primary/30 transition-all group">
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${config.color}20, ${config.color}40)` }}
                  >
                    <ProviderLogo provider={key} size={24} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{config.label}</h3>
                  <div className="text-2xl font-bold" style={{ color: config.color }}>{count}</div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}