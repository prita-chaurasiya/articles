'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { MAGAZINE_ISSUES } from '@/data/magazineIssues';
import { formatDate } from '@/lib/utils';

// Brand Social Media SVGs
function FacebookIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  const { articles } = useArticleStore();
  const latestPosts = articles.slice(0, 3);

  // Magazine Covers Slider state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalIssues = MAGAZINE_ISSUES.length;

  // Auto-play timer for slider (cycles every 3.5 seconds when not hovered)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 2 >= totalIssues ? 0 : prev + 2));
    }, 3500);
    return () => clearInterval(timer);
  }, [totalIssues, isPaused]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 2 < 0 ? Math.max(0, totalIssues - 2) : prev - 2));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 2 >= totalIssues ? 0 : prev + 2));
  };

  // Get current pair of visible magazine issues
  const visibleIssues = [
    MAGAZINE_ISSUES[currentSlideIndex % totalIssues],
    MAGAZINE_ISSUES[(currentSlideIndex + 1) % totalIssues],
  ].filter(Boolean);

  return (
    <footer className="bg-[#ECEEF2] text-slate-800 border-t border-slate-300 text-sm select-none">
      
      {/* ======================================================= */}
      {/* 1. TOP SUB-NAV BAR (Matches Reference Screenshot)       */}
      {/* ======================================================= */}
      <div className="border-b border-slate-300/80 bg-[#ECEEF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Left: Brand Logo & Subtitle */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-black text-[#DC2626] tracking-tighter">
                  EC
                </span>
                <div>
                  <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-[#0F172A] leading-none block">
                    The Enterprise Chronicle
                  </span>
                  <span className="text-[8.5px] uppercase tracking-[0.2em] text-slate-500 font-semibold block mt-0.5">
                    INSPIRING GLOBAL BUSINESS LEADERSHIP
                  </span>
                </div>
              </div>
            </Link>

            {/* Right: Horizontal Quick Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center lg:justify-end gap-x-3 sm:gap-x-4 gap-y-2 text-xs font-semibold text-slate-700">
              <Link href="/" className="hover:text-[#DC2626] transition-colors">Home</Link>
              <span className="text-slate-400">|</span>
              <Link href="/category/business" className="hover:text-[#DC2626] transition-colors">About us</Link>
              <span className="text-slate-400">|</span>
              <Link href="/advertise" className="hover:text-[#DC2626] transition-colors">Advertise with us!</Link>
              <span className="text-slate-400">|</span>
              <Link href="/contact" className="hover:text-[#DC2626] transition-colors">Submit Your Article</Link>
              <span className="text-slate-400">|</span>
              <Link href="/category/testimonials" className="hover:text-[#DC2626] transition-colors">Testimonials</Link>
              <span className="text-slate-400">|</span>
              <Link href="/contact" className="hover:text-[#DC2626] transition-colors">Career</Link>
              <span className="text-slate-400">|</span>
              <Link href="/author/julian-vance-stowe" className="hover:text-[#DC2626] transition-colors">Editorial Team</Link>
              <span className="text-slate-400">|</span>
              <Link href="/contact" className="hover:text-[#DC2626] transition-colors">Contact Us</Link>
            </nav>

          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 2. MAIN FOOTER CONTENT GRID (Matches Reference Columns) */}
      {/* ======================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* COLUMN 1: About us & Social Icons (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif font-black text-slate-900 text-lg sm:text-xl tracking-tight">
              About us
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              The Enterprise Chronicle is an international executive business media platform covering visionary leaders, high-growth enterprises, and pivotal global economic trends.
            </p>
            {/* Social Media Circular Black Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#0F172A] hover:bg-[#DC2626] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#0F172A] hover:bg-[#DC2626] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#0F172A] hover:bg-[#DC2626] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full bg-[#0F172A] hover:bg-[#DC2626] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#0F172A] hover:bg-[#DC2626] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: Latest Posts (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif font-black text-slate-900 text-lg sm:text-xl tracking-tight">
              Latest Posts
            </h3>
            <div className="space-y-3.5">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/article/${post.slug}`}
                  className="block group border-b border-slate-300/80 pb-2.5 last:border-b-0 last:pb-0"
                >
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors">
                    {post.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {formatDate(post.publishedAt)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 3: Quick Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif font-black text-slate-900 text-lg sm:text-xl tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 font-medium">
              <li>
                <Link href="/" className="hover:text-[#DC2626] transition-colors block">Home</Link>
              </li>
              <li>
                <Link href="/category/business" className="hover:text-[#DC2626] transition-colors block">About us</Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-[#DC2626] transition-colors block">Advertise with us!</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DC2626] transition-colors block">Submit Your Article</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DC2626] transition-colors block">Career</Link>
              </li>
              <li>
                <Link href="/author/julian-vance-stowe" className="hover:text-[#DC2626] transition-colors block">Editorial Team</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DC2626] transition-colors block">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact Informations (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif font-black text-slate-900 text-lg sm:text-xl tracking-tight">
              Contact Informations
            </h3>
            
            <div className="space-y-3.5 text-xs sm:text-[13px]">
              {/* Email */}
              <div className="pb-3 border-b border-slate-300/80">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-0.5">
                  <Mail className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Email</span>
                </div>
                <a
                  href="mailto:editorial@enterprisechronicle.com"
                  className="text-slate-600 hover:text-[#DC2626] transition-colors break-all text-[12px] block"
                >
                  editorial@enterprisechronicle.com
                </a>
              </div>

              {/* Phone */}
              <div className="pb-3 border-b border-slate-300/80">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-0.5">
                  <Phone className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Phone Number</span>
                </div>
                <div className="text-slate-600 text-[12px] leading-tight">
                  +1 (212) 849-3000 / +44 20 7946 0192
                </div>
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-0.5">
                  <MapPin className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Address</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  747 Third Avenue, 28th Floor, New York, NY 10017
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 5: Magazine Covers Slider / Carousel (Col span 2) */}
          <div 
            className="lg:col-span-2 space-y-3"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-black text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                E-Magazines
              </h3>
              {/* Slider Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="p-1 rounded bg-slate-300 hover:bg-[#DC2626] hover:text-white text-slate-700 transition-colors cursor-pointer"
                  aria-label="Previous Magazine Covers"
                  title="Previous"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="p-1 rounded bg-slate-300 hover:bg-[#DC2626] hover:text-white text-slate-700 transition-colors cursor-pointer"
                  aria-label="Next Magazine Covers"
                  title="Next"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Side-by-side Magazine Covers Showcase */}
            <div className="grid grid-cols-2 gap-2 relative overflow-hidden p-0.5">
              {visibleIssues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/magazine?year=${issue.monthYear.slice(-4)}`}
                  className="group relative block aspect-[3/4] bg-slate-900 rounded-sm overflow-hidden shadow-md border border-slate-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  title={`${issue.title} - ${issue.monthYear}`}
                >
                  <img
                    src={issue.coverImage}
                    alt={issue.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-1.5">
                    <span className="text-[9px] font-bold text-white uppercase truncate block">
                      {issue.monthYear}
                    </span>
                    <span className="text-[8px] text-slate-300 truncate block">
                      {issue.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Active page indicators */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {Array.from({ length: Math.ceil(totalIssues / 2) }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx * 2)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    Math.floor(currentSlideIndex / 2) === idx
                      ? 'w-4 bg-[#DC2626]'
                      : 'w-1.5 bg-slate-400 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-center pt-0.5">
              <Link
                href="/magazine"
                className="text-[11px] font-bold text-[#DC2626] hover:underline inline-flex items-center gap-1"
              >
                <span>Browse All Editions →</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================= */}
      {/* 3. BOTTOM COPYRIGHT BAR                                 */}
      {/* ======================================================= */}
      <div className="border-t border-slate-300/80 bg-[#E5E7EB] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <div className="text-center sm:text-left">
            © 2026 All Rights Reserved by The Enterprise Chronicle Media Group
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1 font-semibold text-slate-700 hover:text-[#DC2626] transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin Studio</span>
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
