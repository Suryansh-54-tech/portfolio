"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Loader2, Code, FileText, ExternalLink, Instagram } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    
    // TODO: Replace with actual API call to EmailJS, Resend, or your preferred email service
    // Example with EmailJS:
    // const response = await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_PUBLIC_KEY');
    // Example with Resend:
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "suryansh.18535@gmail.com", href: "mailto:suryansh.18535@gmail.com" },
    { icon: MapPin, label: "Location", value: "Kanpur, Uttar Pradesh, India", href: null },
    { icon: Phone, label: "Phone", value: "Not Public", href: null },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <Badge variant="primary" dot className="mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Let&apos;s <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            Fill out the form or reach out through any of the channels below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-6 h-full text-center hover:border-primary/30 transition-all">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">{item.label}</h3>
                {item.href ? (
                  <a href={item.href} className="text-muted hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-muted">{item.value}</p>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-2 gap-12"
        >
          <div>
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  name="name"
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  disabled={status === "submitting"}
                  required
                  autoComplete="name"
                />
                <Input
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={status === "submitting"}
                  required
                  autoComplete="email"
                />
              </div>
              <Input
                name="subject"
                label="Subject"
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                disabled={status === "submitting"}
                required
              />
              <Textarea
                name="message"
                label="Message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                disabled={status === "submitting"}
                required
                rows={5}
              />
              <Button
                type="submit"
                size="lg"
                rightIcon={status === "submitting" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                loading={status === "submitting"}
                className="w-full sm:w-auto"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </Button>
              
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 glass rounded-xl border-green-500/30 bg-green-500/10"
                  role="alert"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-green-300">Message sent successfully!</p>
                    <p className="text-sm text-muted">I&apos;ll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}
              
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 glass rounded-xl border-red-500/30 bg-red-500/10"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-red-300">Failed to send message</p>
                    <p className="text-sm text-muted">Please try again or email me directly.</p>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
            <p className="text-muted mb-8">
              I&apos;m active on various platforms. Feel free to connect, follow, or reach out
              through any of these channels.
            </p>
            <div className="space-y-4 mb-10">
              {socialLinks.map((social) => {
                const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                  github: Github,
                  linkedin: Linkedin,
                  twitter: Twitter,
                  mail: Mail,
                  instagram: Instagram,
                };
                const Icon = IconMap[social.icon] || Github;
                const iconColors: Record<string, string> = {
                  github: 'text-[#24292e]',
                  linkedin: 'text-[#0077B5]',
                  twitter: 'text-[#1DA1F2]',
                  mail: 'text-[#EA4335]',
                  instagram: 'text-[#E4405F]',
                };
                const bgColors: Record<string, string> = {
                  github: 'from-[#24292e]20 to-[#24292e]40',
                  linkedin: 'from-[#0077B5]20 to-[#0077B5]40',
                  twitter: 'from-[#1DA1F2]20 to-[#1DA1F2]40',
                  mail: 'from-[#EA4335]20 to-[#EA4335]40',
                  instagram: 'from-[#E4405F]20 to-[#E4405F]40',
                };
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group"
                    aria-label={social.label}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform bg-gradient-to-br ${bgColors[social.icon] || bgColors.github}`}>
                      <Icon className={`w-6 h-6 ${iconColors[social.icon] || iconColors.github}`} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{social.name}</p>
                      <p className="text-sm text-muted">{social.label}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted group-hover:text-primary transition-colors" aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <Card variant="glass" className="p-6">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-3">
                <a href="#projects" className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors text-sm">
                  <Code className="w-4 h-4" aria-hidden="true" />
                  View Projects
                </a>
                <a href="https://github.com/Suryansh-54-tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors text-sm">
                  <Github className="w-4 h-4" aria-hidden="true" />
                  GitHub Profile
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors text-sm">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  Download Resume
                </a>
                <a href="mailto:suryansh.18535@gmail.com" className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors text-sm">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Direct Email
                </a>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}