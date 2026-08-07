"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, Trophy, Flame, TrendingUp, CheckCircle, Code2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyQuestions: number;
  mediumQuestions: number;
  hardQuestions: number;
  acceptanceRate: number;
  ranking: number;
  contestRating: number;
  streak: number;
  languageStats: { languageName: string; problemsSolved: number }[];
  profile?: {
    avatar?: string;
    realName?: string;
    aboutMe?: string;
    reputation?: number;
  };
}

interface LeetCodeResponse {
  success: boolean;
  data?: LeetCodeStats;
  error?: string;
}

export function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/leetcode", {
          headers: { "Accept": "application/json" },
        });

        const result: LeetCodeResponse = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.error || "Failed to fetch LeetCode stats");
        }

        setStats(result.data);
      } catch (err) {
        console.error("Failed to fetch LeetCode stats:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section id="leetcode" className="relative py-24 lg:py-32 px-6 section-ambient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <Badge variant="primary" dot className="mb-4">
              LeetCode Journey
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              <span className="text-gradient">LeetCode</span> Journey
            </h2>
            <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Tracking daily problem-solving progress and algorithmic growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <Card key={i} variant="glossy" className="p-6 text-center animate-pulse">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl" style={{ background: "linear-gradient(135deg, #7C3AED20, #A855F740)" }} />
                <div className="h-8 w-3/4 mx-auto mb-2 bg-secondary/50 rounded" />
                <div className="h-4 w-1/2 mx-auto bg-secondary/50 rounded" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section id="leetcode" className="relative py-24 lg:py-32 px-6 section-ambient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <Badge variant="primary" dot className="mb-4">
              LeetCode Journey
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              <span className="text-gradient">LeetCode</span> Journey
            </h2>
            <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Tracking daily problem-solving progress and algorithmic growth.
            </p>
          </motion.div>

          <Card variant="glass-strong" className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #EF444420, #EF444440)" }}>
              <Code2 className="w-8 h-8 text-red-400" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Unable to load live LeetCode statistics</h3>
            <p className="text-muted mb-6">The LeetCode API is currently unavailable. Please try again later.</p>
            <a
              href="https://leetcode.com/u/9vxelmrGYL/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm font-medium text-primary hover:bg-primary/10 transition-all border border-primary/30 group"
            >
              View LeetCode Profile
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </Card>
        </div>
      </section>
    );
  }

  const totalQuestions = stats.totalQuestions;
  const progress = totalQuestions > 0 ? Math.round((stats.totalSolved / totalQuestions) * 100) : 0;

  return (
    <section id="leetcode" className="relative py-24 lg:py-32 px-6 section-ambient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <Badge variant="primary" dot className="mb-4">
            LeetCode Journey
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            <span className="text-gradient">LeetCode</span> Journey
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Tracking daily problem-solving progress and algorithmic growth through consistent practice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center mb-16"
        >
          <ProgressRing
            progress={progress}
            totalSolved={stats.totalSolved}
            totalQuestions={totalQuestions}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <StatCard
            index={0}
            icon={<Code2 className="w-7 h-7 text-primary" aria-hidden="true" />}
            value={stats.totalSolved.toLocaleString()}
            label="Total Solved"
            subValue={`${progress}% of ${totalQuestions.toLocaleString()}`}
            color="#7C3AED"
          />
          <StatCard
            index={1}
            icon={<Trophy className="w-7 h-7 text-amber-400" aria-hidden="true" />}
            value={stats.contestRating > 0 ? stats.contestRating : "—"}
            label="Contest Rating"
            subValue={stats.contestRating > 0 ? `Global Rank: #${stats.ranking.toLocaleString()}` : "Not available"}
            color="#F59E0B"
          />
          <StatCard
            index={2}
            icon={<Flame className="w-7 h-7 text-orange-400" aria-hidden="true" />}
            value={stats.streak > 0 ? stats.streak : "—"}
            label="Current Streak"
            subValue={stats.streak > 0 ? "days" : "Not available"}
            color="#EF4444"
          />
          <StatCard
            index={3}
            icon={<TrendingUp className="w-7 h-7 text-green-400" aria-hidden="true" />}
            value={`${stats.acceptanceRate}%`}
            label="Acceptance Rate"
            subValue={`${stats.totalSolved} / ${totalQuestions} problems`}
            color="#10B981"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <Card variant="glossy" className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED20, #A855F740)" }}>
                <Code2 className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">Difficulty Breakdown</h3>
            </div>
            <DifficultyBreakdown
              easy={stats.easySolved}
              medium={stats.mediumSolved}
              hard={stats.hardSolved}
              total={totalQuestions}
            />
          </Card>

          <Card variant="glossy" className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED20, #A855F740)" }}>
                <Code2 className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">Language Distribution</h3>
            </div>
            <LanguageChart languages={stats.languageStats} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <a
            href="https://leetcode.com/u/9vxelmrGYL/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 glass-strong rounded-2xl text-lg font-medium text-primary hover:bg-primary/10 transition-all border border-primary/30 group glow-primary-light"
          >
            <Code2 className="w-5 h-5" aria-hidden="true" />
            View LeetCode Profile
            <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
  subValue,
  color,
  index,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  subValue?: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card variant="glossy" className="p-6 text-center group hover:border-primary/30 transition-all" style={{ minHeight: "160px" }}>
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}>
          {icon}
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold text-foreground"
        >
          {value}
        </motion.span>
        <div className="mt-2">
          <p className="font-medium text-sm text-foreground">{label}</p>
          {subValue && <p className="text-xs text-muted mt-1">{subValue}</p>}
        </div>
      </Card>
    </motion.div>
  );
}

function ProgressRing({
  progress,
  totalSolved,
  totalQuestions,
  color = "#7C3AED",
}: {
  progress: number;
  totalSolved: number;
  totalQuestions: number;
  color?: string;
}) {
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-40 h-40 mx-auto"
    >
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="10"
        />
        <motion.circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-3xl font-bold text-foreground"
        >
          {progress}%
        </motion.span>
        <span className="text-xs text-muted mt-1">
          {totalSolved} / {totalQuestions}
        </span>
      </div>
    </motion.div>
  );
}

function DifficultyBreakdown({ easy, medium, hard, total }: { easy: number; medium: number; hard: number; total: number }) {
  const difficulties = [
    { label: "Easy", count: easy, color: "#10B981", icon: CheckCircle },
    { label: "Medium", count: medium, color: "#F59E0B", icon: Code2 },
    { label: "Hard", count: hard, color: "#EF4444", icon: Trophy },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-3 gap-4"
    >
      {difficulties.map((diff, index) => (
        <motion.div
          key={diff.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
          className="glass-strong rounded-xl p-4 text-center group hover:border-primary/30 transition-all"
        >
          <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${diff.color}20, ${diff.color}40)` }}>
            <diff.icon className="w-5 h-5" style={{ color: diff.color }} aria-hidden="true" />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
            className="text-2xl font-bold text-foreground"
          >
            {diff.count}
          </motion.span>
          <p className="text-xs text-muted mt-1">{diff.label}</p>
          <div className="mt-2 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: total > 0 ? `${(diff.count / total) * 100}%` : "0%" }}
              transition={{ duration: 1, delay: index * 0.1 + 0.6, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${diff.color}, ${diff.color}dd)` }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function LanguageChart({ languages }: { languages: { languageName: string; problemsSolved: number }[] }) {
  if (!languages || languages.length === 0) {
    return (
      <div className="text-center py-8 text-muted">
        <Code2 className="w-12 h-12 mx-auto mb-3 text-muted/30" aria-hidden="true" />
        <p>No language data available</p>
      </div>
    );
  }

  const topLanguages = languages
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, 6);

  const maxCount = topLanguages[0]?.problemsSolved || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-3"
    >
      <h4 className="font-semibold text-sm text-foreground">Language Distribution</h4>
      {topLanguages.map((lang, index) => (
        <motion.div
          key={lang.languageName}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.5 }}
          className="group"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-sm font-medium text-foreground">{lang.languageName}</span>
            <span className="text-xs text-muted font-mono">{lang.problemsSolved}</span>
          </div>
          <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(lang.problemsSolved / maxCount) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.08 + 0.6, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #7C3AED, #8B5CF6, #A855F7)" }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}