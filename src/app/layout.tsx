import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Suryansh Singh | Cyber Security | Software Developer",
    template: "%s | Suryansh Singh",
  },
  description: "Computer Science Undergraduate specializing in Cyber Security, Software Development and Photography. Building secure systems with clean code and creative vision.",
  keywords: [
    "Cyber Security",
    "Software Developer",
    "Java Developer",
    "Computer Science Student",
    "Photography",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Network Security",
    "Data Structures & Algorithms",
  ],
  authors: [{ name: "Suryansh Singh" }],
  creator: "Suryansh Singh",
  publisher: "Suryansh Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suryansh-singh.dev",
    title: "Suryansh Singh | Cyber Security | Software Developer",
    description: "Computer Science Undergraduate specializing in Cyber Security, Software Development and Photography.",
    siteName: "Suryansh Singh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Suryansh Singh Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suryansh Singh | Cyber Security | Software Developer",
    description: "Computer Science Undergraduate specializing in Cyber Security, Software Development and Photography.",
    images: ["/og-image.png"],
    creator: "@SuryanshSingh",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#08080B" },
    { media: "(prefers-color-scheme: dark)", color: "#08080B" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}