'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, X, Sparkles, ArrowRight } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate } from '@/lib/utils';
import EditorialPagination from '@/components/common/EditorialPagination';

export const GUEST_POSTS_ARTICLES_DATA = [
  {
    id: 'gp-1',
    slug: 'oxford-global-leadership-academy-ethical-executives',
    title: 'Executive Ethics in the Algorithm Age: Why Boardroom Integrity Determines Enterprise Valuation',
    date: 'October 11, 2026',
    category: 'GUEST POSTS',
    categorySlug: 'guest-posts',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    brief: 'Guest Column by Prof. Marcus Sterling: As machine learning automates executive decisions, boards of directors must uphold human ethical standards and fiduciary duty.',
    excerpt: 'As machine learning automates executive decisions, boards of directors must uphold human ethical standards and fiduciary duty across capital allocation frameworks...',
  },
  {
    id: 'gp-2',
    slug: 'alliance-urban-architecture-sustainable-redevelopment',
    title: 'Biophilic Urbanism: How High-Density Commercial Architecture Enhances Cognitive Productivity',
    date: 'October 8, 2026',
    category: 'GUEST POSTS',
    categorySlug: 'guest-posts',
    badge: 'Guest Column',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    brief: 'Guest Contributor Ar. Vikram Sehgal explores how natural daylight harvesting and indoor micro-forests lower corporate executive stress and elevate team creativity.',
    excerpt: 'Natural daylight harvesting, acoustic baffle geometry, and indoor micro-forests lower corporate executive stress and elevate team creativity in urban headquarters...',
  },
  {
    id: 'gp-3',
    slug: 'preventive-trichology-follicle-wellness-therapies-leaders',
    title: 'Corporate Stress & Executive Longevity: The Science of Metabolic Resilience and Cortisol Control',
    date: 'October 4, 2026',
    category: 'GUEST POSTS',
    categorySlug: 'guest-posts',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    brief: 'Clinical endocrinology insights on mitigating high-pressure boardroom cortisol spikes and maintaining peak cellular energy.',
    excerpt: 'Clinical endocrinology insights on mitigating high-pressure boardroom cortisol spikes and maintaining peak cellular energy through precision biomarker audits...',
  },
  {
    id: 'gp-4',
    slug: 'fintech-options-hedging-retail-democratization',
    title: 'Retail Market Microstructure: Protecting Independent Portfolios in High-Frequency Volatility',
    date: 'September 29, 2026',
    category: 'GUEST POSTS',
    categorySlug: 'guest-posts',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    brief: 'Guest Column by Quantitative Strategist Priya Nair on algorithmic risk containment and statutory stop-loss compliance for non-institutional market participants.',
    excerpt: 'Algorithmic risk containment and statutory stop-loss compliance for non-institutional market participants operating in high-frequency derivatives markets...',
  },
  {
    id: 'gp-5',
    slug: 'circular-packaging-sustainable-materials-b2b-growth',
    title: 'Decarbonizing Global Supply Chains: The Practical Economics of Industrial Biomaterial Substitution',
    date: 'September 22, 2026',
    category: 'GUEST POSTS',
    categorySlug: 'guest-posts',
    badge: 'Guest Column',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    brief: 'Industrial engineering column analyzing how replacing petroleum bubble wrap with agricultural mycelium reduces European carbon tariff penalties.',
    excerpt: 'Replacing petroleum bubble wrap with agricultural mycelium reduces European carbon tariff penalties and unlocks immediate export profitability...',
  },
  {
    id: 'gp-6',
    slug: 'vatsal-soin-ai-governance-decision-singularity',
    title: 'Why Prompt Engineering Cannot Govern AGI: The Case for Hardware-Enforced Policy Boundaries',
    date: 'September 16, 2026',
    category: 'GUEST POSTS',
    categorySlug: 'guest-posts',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    brief: 'Theoretical computer science paper on cryptographic verification and zero-knowledge circuit enforcement for autonomous multi-agent swarms.',
    excerpt: 'Theoretical computer science perspective on cryptographic verification and zero-knowledge circuit enforcement for autonomous multi-agent swarms...',
  },
  {
    id: 'gp-7',
    slug: 'data-samudra-balaji-rajagopal-sovereign-cloud-infrastructure',
    title: 'Sovereign Compute & National Security: The Strategic Imperative of Domestic Data Vaults',
    date: 'September 10, 2026',
    category: 'GUEST POSTS',
    categorySlug: 'guest-posts',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    brief: 'Guest column on the geopolitical stakes of international data residency and Tier-IV sovereign server infrastructure in Asia.',
    excerpt: 'The geopolitical stakes of international data residency and Tier-IV sovereign server infrastructure in an increasingly fragmented digital world...',
  },
  {
    id: 'gp-8',
    slug: 'fleet-electrification-heavy-commercial-turnaround',
    title: 'Overcoming the Fleet Electrification Barrier: Dual-Motor Retrofits vs. Capital Expenditure Traps',
    date: 'September 02, 2026',
    category: 'GUEST POSTS',
    categorySlug: 'guest-posts',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    brief: 'Commercial fleet logistics analysis on achieving 42% cost savings per ton-kilometer without requiring upfront vehicle replacement debt.',
    excerpt: 'Commercial fleet logistics analysis on achieving 42% cost savings per ton-kilometer without requiring upfront vehicle replacement debt on highway routes...',
  },
];

export const GUEST_POSTS_SIDEBAR = {
  featured: {
    slug: 'oxford-global-leadership-academy-ethical-executives',
    title: 'Executive Ethics in the Algorithm Age: Why Boardroom Integrity Determines Enterprise Valuation',
    categoryTag: 'GUEST COLUMN',
    categorySlug: 'guest-posts',
    date: 'October 11, 2026',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Prof. Marcus Sterling on re-engineering board governance protocols as autonomous AI agents take over commercial credit risk assessment and corporate capital allocation...',
  },
  list: [
    {
      slug: 'alliance-urban-architecture-sustainable-redevelopment',
      title: 'Ar. Vikram Sehgal: Biophilic Architecture & Daylight Harvesting in Commercial Towers',
      date: 'October 8, 2026',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'fintech-options-hedging-retail-democratization',
      title: 'Priya Nair, CFA: Delta-Hedged Microstructure Tactics for Independent Portfolios',
      date: 'September 29, 2026',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'circular-packaging-sustainable-materials-b2b-growth',
      title: 'Dr. Ananya Sen: The Practical Economics of Industrial Biomaterial Substitution',
      date: 'September 22, 2026',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const GUEST_POSTS_RECENT_POSTS = [
  {
    slug: 'oxford-global-leadership-academy-ethical-executives',
    title: 'Executive Ethics in the Algorithm Age: Why Boardroom Integrity Determines Enterprise Valuation',
    date: 'October 11, 2026',
  },
  {
    slug: 'alliance-urban-architecture-sustainable-redevelopment',
    title: 'Biophilic Urbanism: How High-Density Commercial Architecture Enhances Cognitive Productivity',
    date: 'October 8, 2026',
  },
  {
    slug: 'preventive-trichology-follicle-wellness-therapies-leaders',
    title: 'Corporate Stress & Executive Longevity: The Science of Metabolic Resilience and Cortisol Control',
    date: 'October 4, 2026',
  },
  {
    slug: 'fintech-options-hedging-retail-democratization',
    title: 'Retail Market Microstructure: Protecting Independent Portfolios in High-Frequency Volatility',
    date: 'September 29, 2026',
  },
  {
    slug: 'circular-packaging-sustainable-materials-b2b-growth',
    title: 'Decarbonizing Global Supply Chains: The Practical Economics of Industrial Biomaterial Substitution',
    date: 'September 22, 2026',
  },
];

export default function CategoryGuestPostsView() {
  const { articles } = useArticleStore();
  const [activePage, setActivePage] = useState<number>(1);
  const [briefModalArticle, setBriefModalArticle] = useState<any>(null);

  const ITEMS_PER_PAGE = 6;

  // Filter dynamic articles published to Guest Posts
  const dynamicGuestPosts = useMemo(() => {
    return articles
      .filter(
        (a) =>
          a.status === 'published' &&
          (a.category?.toLowerCase() === 'guest posts' ||
            a.categorySlug?.toLowerCase() === 'guest-posts') &&
          !GUEST_POSTS_ARTICLES_DATA.some((g) => g.slug === a.slug)
      )
      .map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        date: formatDate(a.publishedAt),
        category: a.category?.toUpperCase() || 'GUEST POSTS',
        categorySlug: 'guest-posts',
        badge: a.isTrending ? 'Trending' : a.isFeatured ? 'Featured' : 'Guest Column',
        image:
          a.heroImage ||
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
        brief: a.excerpt || a.title,
        excerpt: a.excerpt || a.title,
      }));
  }, [articles]);

  const allArticles = useMemo(() => {
    return [...dynamicGuestPosts, ...GUEST_POSTS_ARTICLES_DATA];
  }, [dynamicGuestPosts]);

  const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return allArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [allArticles, activePage]);

  return (
    <div className="min-h-screen bg-white">
      {/* ========================================================= */}
      {/* MAIN CONTAINER: Left (8 Cols) | Right Sidebar (4 Cols)    */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 2-Column Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN (LG: 8 COLS): 2-COLUMN CARDS GRID           */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            
            {/* Header: Red vertical accent + BROWSING: GUEST POSTS */}
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-1.5 h-6 bg-[#DC2626] inline-block shrink-0" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase font-sans">
                BROWSING: GUEST POSTS
              </h1>
            </div>

            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-3xl font-normal mb-8">
              Guest Posts – <strong>Business Walkins</strong> features contributed thought leadership from global CXOs, prominent academics, venture capitalists, and industry veterans sharing rigorous perspectives on the future of business.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {paginatedArticles.map((article) => (
                <article key={article.id} className="group flex flex-col justify-between">
                  <div>
                    {/* 16:10 Thumbnail */}
                    <Link
                      href={`/article/${article.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {article.badge && (
                        <span className="absolute top-2 right-2 bg-black/85 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 tracking-wider uppercase shadow-md border border-amber-400/30">
                          {article.badge}
                        </span>
                      )}
                    </Link>

                    {/* Article Headline */}
                    <Link href={`/article/${article.slug}`}>
                      <h2 className="font-bold text-sm sm:text-[15px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-3 break-words">
                        {article.title}
                      </h2>
                    </Link>

                    {/* Meta: [GUEST POSTS] — [Date] in Signature Red */}
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                      <Link
                        href={`/category/${article.categorySlug}`}
                        className="text-[#DC2626] uppercase font-bold tracking-wider hover:underline transition-colors"
                        title={`View all ${article.category} dispatches`}
                      >
                        {article.category}
                      </Link>
                      <span className="text-slate-400 font-normal">—</span>
                      <span className="text-slate-500 font-normal text-[11.5px]">
                        {article.date}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Interactive Quick Brief + Full Article Links */}
                  <div className="mt-3.5 pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => setBriefModalArticle(article)}
                      className="text-[11px] font-bold text-[#DC2626] hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Quick Executive Brief →</span>
                    </button>

                    <Link
                      href={`/article/${article.slug}`}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Full Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* RESPONSIVE PAGINATION */}
            <EditorialPagination
              currentPage={activePage}
              totalPages={totalPages}
              onPageChange={setActivePage}
              scrollToTop={180}
            />
          </main>

          {/* RIGHT SIDEBAR (LG: 4 COLS) */}
          <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-slate-200 lg:pl-7">
            
            {/* WIDGET 1: STARTUP'S */}
            <div className="border border-slate-200 p-4 bg-white">
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  STARTUP&apos;S
                </h3>
              </div>

              <article className="group mb-5 pb-5 border-b border-slate-200">
                <Link
                  href={`/article/${GUEST_POSTS_SIDEBAR.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={GUEST_POSTS_SIDEBAR.featured.image}
                    alt={GUEST_POSTS_SIDEBAR.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${GUEST_POSTS_SIDEBAR.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {GUEST_POSTS_SIDEBAR.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href={`/category/${GUEST_POSTS_SIDEBAR.featured.categorySlug}`}
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {GUEST_POSTS_SIDEBAR.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {GUEST_POSTS_SIDEBAR.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {GUEST_POSTS_SIDEBAR.featured.excerpt}
                </p>
              </article>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {GUEST_POSTS_SIDEBAR.list.map((item, idx) => (
                  <div key={item.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link
                      href={`/article/${item.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-12 object-cover border border-slate-200 shrink-0 group-hover:opacity-90"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2 break-words">
                          {item.title}
                        </h5>
                        <span className="text-[10.5px] text-slate-400 block mt-1 font-normal">
                          {item.date}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 2: RECENT POSTS */}
            <div className="border border-slate-200 p-4 bg-white">
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  RECENT POSTS
                </h3>
              </div>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {GUEST_POSTS_RECENT_POSTS.map((post, idx) => (
                  <div key={post.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link href={`/article/${post.slug}`} className="block group">
                      <h4 className="font-semibold text-xs text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2 sm:line-clamp-3 break-words">
                        {post.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 block mt-1 font-normal">
                        {post.date}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 3: PRINT MAGAZINE ISSUE */}
            <div className="border border-slate-200 p-4 bg-white">
              <div className="border-t-2 border-black pt-2 mb-3">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  PRINT ISSUE
                </h3>
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900 border border-slate-200 mb-3 group">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
                  alt="Business Walkins Print Issue"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    Special Edition
                  </span>
                  <h4 className="font-bold text-sm text-white leading-tight">
                    Nourishing Growth and Trust with a Visionary Journey
                  </h4>
                </div>
              </div>
              <Link
                href="/magazine"
                className="w-full py-2 px-3 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Read Digital Edition</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </aside>
        </div>
      </div>

      {/* QUICK EXECUTIVE BRIEF MODAL */}
      {briefModalArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-xl w-full border-t-4 border-[#DC2626] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setBriefModalArticle(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                {briefModalArticle.category}
              </span>
              <span className="text-xs text-slate-400">
                {briefModalArticle.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 font-sans break-words">
              {briefModalArticle.title}
            </h3>

            <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden mb-4 border border-slate-200">
              <img
                src={briefModalArticle.image}
                alt={briefModalArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-slate-50 border-l-2 border-[#DC2626] p-3 mb-4">
              <p className="text-xs text-slate-700 leading-relaxed font-sans break-words">
                {briefModalArticle.brief}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">
                Business Walkins Contributor Column
              </span>
              <Link
                href={`/article/${briefModalArticle.slug}`}
                onClick={() => setBriefModalArticle(null)}
                className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
