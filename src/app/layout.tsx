import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./retro.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "suryansh@portfolio: ~/dev",
  description:
    "Suryansh Singh - Full-Stack Engineer, Cyber Security & AI Systems Developer. Cosmic Relativistic Black Hole Retro CRT Terminal.",
  keywords: [
    "Suryansh Singh",
    "Cyber Security",
    "Full Stack Developer",
    "AI Systems",
    "Nyayantra",
    "Razorpay AI Buildathon",
    "PSIT Kanpur",
  ],
  authors: [{ name: "Suryansh Singh" }],
  creator: "Suryansh Singh",
};

export const viewport: Viewport = {
  themeColor: "#000103",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${ibmPlexMono.variable}`}>
      <head />
      <body className="antialiased min-h-screen bg-[#000103] text-[#eafff1]">
        {children}
      </body>
    </html>
  );
}
