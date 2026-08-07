"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Star, Code, Layers, Globe, Smartphone } from "lucide-react";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categoryFilters = [
  { key: "all", label: "All", icon: Layers },
  { key: "web", label: "Web Apps", icon: Globe },
  { key: "mobile", label: "Mobile", icon: Smartphone },
  { key: "fullstack", label: "Full Stack", icon: Code },
  { key: "design", label: "Design", icon: Star },
];

const categoryColors = {
  web: "border-blue-500/30 bg-blue-500/10",
  mobile: "border-green-500/30 bg-green-500/10",
  fullstack: "border-purple-500/30 bg-purple-500/10",
  design: "border-orange-500/30 bg-orange-500/10",
};

const filterLabels: Record<string, string> = {
  web: "Web App",
  mobile: "Mobile",
  fullstack: "Full Stack",
  design: "Design",
};

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 lg:py-32 px-6 section-ambient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <Badge variant="primary" dot className="mb-4">
            Selected Work
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            A curated collection of projects showcasing modern web development practices,
            innovative solutions, and attention to detail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap gap-3 justify-center mb-12"
          role="tablist"
          aria-label="Project categories"
        >
          {categoryFilters.map((filter, index) => (
            <motion.button
              key={filter.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg"
                  : "glass text-muted hover:text-foreground hover:border-primary/30"
              )}
              role="tab"
              aria-selected={activeFilter === filter.key}
              aria-controls={`panel-${filter.key}`}
            >
              <filter.icon className="w-4 h-4" aria-hidden="true" />
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          id={`panel-${activeFilter}`}
          aria-label={`${activeFilter} projects`}
        >
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group"
            >
              <Card variant="elevated" className="h-full overflow-hidden group-hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-500">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-light/20" />
                  <div className="absolute inset-0 bg-[url('/images/project-placeholder.svg')] bg-cover bg-center opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-8 h-8 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="primary" size="sm" className="animate-pulse-glow">
                        <Star className="w-3 h-3 mr-1" aria-hidden="true" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4">
                    <Badge
                      variant="outline"
                      size="sm"
                      className={cn("backdrop-blur-sm", categoryColors[project.category])}
                    >
                      {(() => {
                        const filter = categoryFilters.find(c => c.key === project.category);
                        if (filter?.icon) {
                          return <filter.icon className="w-3 h-3 mr-1" aria-hidden="true" />;
                        }
                        return null;
                      })()}
                      {filterLabels[project.category as keyof typeof filterLabels]}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    <span className="text-xs font-mono text-muted flex-shrink-0">{project.id}</span>
                  </div>
                  <p className="text-muted text-sm mb-4 line-clamp-2">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 4 && (
                      <Badge variant="secondary" size="sm">
                        +{project.tags.length - 4}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
                        aria-label="View source code"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Demo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 glass rounded-3xl"
          >
            <Code className="w-16 h-16 mx-auto text-muted mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted">Try selecting a different category</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mt-16"
        >
          <Button variant="outline" size="lg" leftIcon={<Github className="w-5 h-5" />}>
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}