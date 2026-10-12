import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
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

export const metadata: Metadata = {
  title: "The Enterprise Chronicle | World Business Magazine & Executive Media",
  description: "The definitive international business magazine, executive intelligence platform, and corporate media authority covering technology, AI, finance, leadership, startups, and success stories.",
  keywords: "business magazine, corporate media, executive interviews, fortune 500, enterprise technology, AI business, venture capital, success stories",
  openGraph: {
    title: "The Enterprise Chronicle | World Business Magazine & Executive Media",
    description: "Global business journalism, executive interviews, and enterprise intelligence.",
    url: "https://enterprisechronicle.com",
    siteName: "The Enterprise Chronicle",
    locale: "en_US",
    type: "website",
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
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827] font-sans antialiased selection:bg-blue-600 selection:text-white">
        <Suspense fallback={null}>
          <AnnouncementBar />
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
