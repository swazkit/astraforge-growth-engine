import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Astraforge — AI Systems for Ambitious Growth",
  description:
    "Astraforge engineers custom AI systems, workflow automation, and product design that help ambitious teams ship faster, cut costs, and scale operations.",
  authors: [{ name: "Astraforge" }],
  keywords: [
    "AI systems",
    "AI automation",
    "LLM",
    "workflow automation",
    "AI product design",
    "AI consulting",
    "AI agency",
    "custom AI solutions",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://astraforge.ai",
  },
  openGraph: {
    siteName: "Astraforge",
    title: "Astraforge — AI Systems for Ambitious Growth",
    description:
      "Custom-engineered AI systems, automation, and product design for teams scaling operations, content, and revenue.",
    type: "website",
    url: "https://astraforge.ai",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astraforge — AI Systems for Ambitious Growth",
    description:
      "Custom-engineered AI systems, automation, and product design for ambitious teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Astraforge",
    "description":
      "Astraforge engineers custom AI systems, automation, and product design for ambitious teams.",
    "url": "https://astraforge.ai",
    "email": "hello@astraforge.ai",
    "areaServed": "Worldwide",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US",
    },
    "sameAs": ["https://www.linkedin.com/company/astraforge"],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
