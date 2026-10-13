import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BreadcrumbBar from "@/components/layout/BreadcrumbBar";
import Footer from "@/components/layout/Footer";
import SearchModal from "@/components/layout/SearchModal";
import MegaMenu from "@/components/layout/MegaMenu";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "The Enterprise Chronicle | World Business Magazine & Executive Media",
    template: "%s | The Enterprise Chronicle",
  },
  description:
    "The Enterprise Chronicle is the premier international business magazine and executive intelligence platform. Explore exclusive corporate insights, C-Suite lounge interviews, technology breakthroughs, AI disruption, and inspirational startup success stories.",
  keywords: [
    "business magazine",
    "corporate media",
    "executive interviews",
    "fortune 500",
    "enterprise technology",
    "AI business",
    "venture capital",
    "startup success stories",
    "lounge interview",
    "international magazines",
    "global leadership",
  ],
  authors: [{ name: "Enterprise Chronicle Editorial Bureau", url: "https://enterprisechronicle.com" }],
  creator: "The Enterprise Chronicle Media Group",
  publisher: "The Enterprise Chronicle",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "The Enterprise Chronicle | World Business Magazine & Executive Media",
    description:
      "Global business journalism, executive interviews, annual awards, and enterprise intelligence for modern leaders.",
    url: "https://enterprisechronicle.com",
    siteName: "The Enterprise Chronicle",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "The Enterprise Chronicle Magazine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Enterprise Chronicle | World Business Magazine & Executive Media",
    description:
      "Global business journalism, executive interviews, annual awards, and enterprise intelligence.",
    images: ["https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80"],
  },
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable} scroll-smooth`}>
      <body className="min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-[#F8FAFC] text-[#111827] font-sans antialiased selection:bg-blue-600 selection:text-white">
        <Suspense fallback={null}>
          <Navbar />
          <BreadcrumbBar />
          <MegaMenu />
          <SearchModal />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
