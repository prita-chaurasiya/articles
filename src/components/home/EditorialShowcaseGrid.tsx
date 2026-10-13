'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  Mail,
  Flame,
  CheckCircle2,
  Calendar,
  Building2,
  Bookmark,
} from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { useArticleStore } from '@/store/useArticleStore';

interface EditorialShowcaseGridProps {
  articles: Article[];
}

export default function EditorialShowcaseGrid({ articles }: EditorialShowcaseGridProps) {
  const { toggleBookmark, bookmarkedSlugs } = useArticleStore();
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [quickEmail, setQuickEmail] = useState('');

  // 1. Center: Large Featured Story
  const centerFeatured =
    articles.find((a) => a.isCoverStory && a.companyProfile) ||
    articles.find((a) => a.isFeatured && a.companyProfile) ||
    articles[0];

  // 2. Left Column: Fresh Stories, Editor's Picks & Latest Headlines
  const leftFreshStories = articles
    .filter((a) => a.id !== centerFeatured?.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  const leftEditorsPicks = articles
    .filter((a) => a.isEditorPick && a.id !== centerFeatured?.id)
    .slice(0, 2);

  const leftLatestHeadlines = articles
    .filter((a) => a.category.toLowerCase().includes('technology') || a.category.toLowerCase().includes('finance'))
    .slice(0, 3);

  // 3. Right Column: Trending Stories, Success Stories & Magazine Promo
  const rightTrending = articles
    .filter((a) => a.isTrending && a.id !== centerFeatured?.id)
    .slice(0, 3);

  const rightSuccessStory = articles.find((a) => a.companyProfile && a.id !== centerFeatured?.id);

  if (!centerFeatured) return null;

  const isSaved = bookmarkedSlugs.includes(centerFeatured.slug);

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b-2 border-slate-900 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-[#DC2626] rounded-sm"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Editorial Showcase & Executive Dispatch
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Business Walkins Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fresh investigations, central cover story, and real-time boardroom trends
            </p>
          </div>
          <Link
            href="/#fresh-stories"
            className="text-xs font-bold text-[#DC2626] hover:text-slate-900 flex items-center gap-1 uppercase tracking-wider transition-colors"
          >
            <span>All Live Wires</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-COLUMN EDITORIAL ARCHITECTURE (25% / 45% / 30%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN (25%): Fresh Stories, Editor's Picks, Headlines */}
          {/* ======================================================= */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* 1. Fresh Stories Stream */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b-2 border-slate-900">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Fresh Stories</span>
                </h3>
                <span className="text-[10px] text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                  Live Feed
                </span>
              </div>

              <div className="space-y-3 divide-y divide-slate-100">
                {leftFreshStories.map((item, idx) => (
                  <article key={item.id} className={idx === 0 ? '' : 'pt-3'}>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                      <span className="font-bold uppercase text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                    <Link href={`/article/${item.slug}`}>
                      <h4 className="font-serif text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* 2. Editor's Picks */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-2 border-b-2 border-purple-600">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-purple-600" />
                  <span>Editor's Picks</span>
                </h3>
                <span className="text-[10px] text-slate-400">Hand-Picked</span>
              </div>

              <div className="space-y-3 divide-y divide-slate-100">
                {leftEditorsPicks.map((item, idx) => (
                  <article key={item.id} className={idx === 0 ? '' : 'pt-3'}>
                    <Link href={`/article/${item.slug}`}>
                      <h4 className="font-serif text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </Link>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* 3. Latest Headlines Wire */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-2 border-b-2 border-slate-900">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Latest Headlines</span>
                </h3>
              </div>

              <div className="space-y-2.5">
                {leftLatestHeadlines.map((item) => (
                  <Link
                    key={item.id}
                    href={`/article/${item.slug}`}
                    className="block group border-l-2 border-slate-200 hover:border-blue-600 pl-2.5 py-0.5 transition-colors"
                  >
                    <span className="text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-tight block">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* CENTER COLUMN (45%): Large Featured Story & Hero Presentation */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between hover-lift">
            <div>
              {/* Top Meta & Badges */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                    Lead Cover Feature
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Corporate Retrospective
                  </span>
                </div>

                {centerFeatured.companyProfile && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/60">
                    {centerFeatured.companyProfile.valuation || centerFeatured.companyProfile.revenue}
                  </span>
                )}
              </div>

              {/* Large Cover Hero Image with Zoom Effect */}
              <Link
                href={`/article/${centerFeatured.slug}`}
                className="block relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-900 mb-5 group"
              >
                <img
                  src={centerFeatured.heroImage}
                  alt={centerFeatured.title}
                  className="w-full h-full object-cover img-zoom"
                />

                {/* Company Logo Badge on Cover if Available */}
                {centerFeatured.companyProfile && (
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-md flex items-center gap-2">
                    <img
                      src={centerFeatured.companyProfile.logo}
                      alt={centerFeatured.companyProfile.name}
                      className="w-5 h-5 rounded object-cover"
                    />
                    <span className="text-xs font-bold text-slate-900">
                      {centerFeatured.companyProfile.name}
                    </span>
                  </div>
                )}
              </Link>

              {/* Cover Headline & Standfirst */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
                    {centerFeatured.category}
                  </span>
                  <span>•</span>
                  <span>{formatDate(centerFeatured.publishedAt)}</span>
                  <span>•</span>
                  <span>{centerFeatured.readTime}</span>
                </div>

                <Link href={`/article/${centerFeatured.slug}`}>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#DC2626] hover:text-[#DC2626] transition-colors leading-tight">
                    {centerFeatured.title}
                  </h3>
                </Link>

                {centerFeatured.subtitle && (
                  <p className="text-sm font-semibold text-slate-700 leading-snug">
                    {centerFeatured.subtitle}
                  </p>
                )}

                <p className="text-sm text-slate-600 leading-relaxed font-sans line-clamp-3">
                  {centerFeatured.excerpt}
                </p>
              </div>
            </div>

            {/* Bottom Author & Action Strip */}
            <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={centerFeatured.author.avatar}
                  alt={centerFeatured.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    {centerFeatured.author.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {centerFeatured.author.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleBookmark(centerFeatured.slug)}
                  className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${
                    isSaved ? 'text-[#DC2626]' : 'text-slate-400'
                  }`}
                  title="Bookmark story"
                >
                  <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                </button>

                <Link
                  href={`/article/${centerFeatured.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* RIGHT COLUMN (30%): Trending, Success Stories & Magazine */}
          {/* ======================================================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Trending Stories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b-2 border-rose-600">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                  <span>Trending Stories</span>
                </h3>
                <span className="text-[10px] text-slate-400">High Reads</span>
              </div>

              <div className="space-y-3 divide-y divide-slate-100">
                {rightTrending.map((item, idx) => (
                  <article key={item.id} className={idx === 0 ? '' : 'pt-3'}>
                    <div className="flex items-start gap-2.5">
                      <span className="font-serif font-black text-xl text-slate-300 leading-none">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                          {item.category}
                        </span>
                        <Link href={`/article/${item.slug}`}>
                          <h4 className="font-serif text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* 2. Success Story Spotlight */}
            {rightSuccessStory && rightSuccessStory.companyProfile && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    Featured Enterprise
                  </span>
                  <span className="text-xs font-bold text-amber-900">
                    {rightSuccessStory.companyProfile.valuation}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={rightSuccessStory.companyProfile.logo}
                    alt={rightSuccessStory.companyProfile.name}
                    className="w-9 h-9 rounded-lg object-cover bg-white border border-amber-200"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-slate-900">
                      {rightSuccessStory.companyProfile.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 block">
                      Founder: {rightSuccessStory.companyProfile.founder}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {rightSuccessStory.companyProfile.summary}
                </p>

                <Link
                  href={`/success-stories/${rightSuccessStory.slug}`}
                  className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1 pt-1 block"
                >
                  <span>Read Corporate Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* 3. Magazine Promotion Teaser Card */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-400">
                <span>E-Magazine Spotlight</span>
                <span>Issue #48</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80"
                  alt="Issue 48"
                  className="w-14 h-18 rounded object-cover shadow border border-slate-700 shrink-0"
                />
                <div>
                  <h4 className="font-serif font-bold text-xs text-white leading-tight mb-1">
                    The Cognitive Enterprise & AI Frontier
                  </h4>
                  <span className="text-[10px] text-slate-400 block">
                    96 Pages • High-Res Flipbook
                  </span>
                </div>
              </div>

              <Link
                href="/magazine"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Digital Reader</span>
              </Link>
            </div>

            {/* 4. Executive Newsletter Quick Form */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2.5">
              <h4 className="font-serif font-bold text-slate-900 text-xs">
                The Executive Briefing
              </h4>
              <p className="text-[11px] text-slate-500 leading-tight">
                Daily private intelligence briefing delivered to your inbox at 06:00 EST.
              </p>

              {emailSubscribed ? (
                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 p-2 rounded">
                  ✓ Subscribed! Welcome to the morning dispatch.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (quickEmail) setEmailSubscribed(true);
                  }}
                  className="space-y-1.5"
                >
                  <input
                    type="email"
                    required
                    placeholder="name@enterprise.com"
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
