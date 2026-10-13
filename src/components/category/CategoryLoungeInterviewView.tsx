'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, X, Sparkles, ArrowRight } from 'lucide-react';

export const LOUNGE_INTERVIEWS_ARTICLES_DATA = [
  {
    id: 'lounge-1',
    slug: 'vinayak-group-customer-experience-real-estate-award',
    title: 'Vinayak Group Wins "Outstanding Customer Experience Centre – Real Estate" Award for Kolkata, West Bengal',
    date: 'September 11, 2026',
    category: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    brief: 'Vinayak Group Wins "Outstanding Customer Experience Centre – Real Estate" Award for Kolkata, West Bengal. The recognition affirms an uncompromising customer-centric philosophy, merging transparent escrow tracking with sustainable urban architecture.',
    excerpt: 'Vinayak Group Wins "Outstanding Customer Experience Centre – Real Estate" Award for Kolkata, West Bengal. The recognition affirms a philosophy where urban homebuyers receive seamless architectural visualization, digitized escrow disclosures, and sustainable engineering...',
  },
  {
    id: 'lounge-2',
    slug: 'sp-law-chambers-litigation-corporate-advocacy',
    title: 'S & P LAW CHAMBERS: A FULL-SERVICE LITIGATION FIRM BUILT ON TRUST, EXPERTISE, AND CLIENT-FIRST SOLUTIONS',
    date: 'September 10, 2026',
    category: '20 MOST PROMISING LEGAL FIRM TO WATCH IN 2026',
    categorySlug: 'lounge-interview',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&auto=format&fit=crop&q=80',
    brief: 'S & P Law Chambers was Founded with the vision and mission to deliver strategic commercial litigation and corporate advisory solutions for fast-growing enterprises and cross-border commercial syndicates.',
    excerpt: 'S & P Law Chambers was Founded in 2022, with the vision and mission to deliver legal solutions to its clientele, combining courtroom depth with modern contract engineering and proactive risk mitigation across regulatory domains...',
  },
  {
    id: 'lounge-3',
    slug: 'ratovate-technologies-enterprise-digital-transformation',
    title: 'Ratovate: Redefining Digital Transformation: Ratovate’s Journey to Become a Trusted Global Partner',
    date: 'September 10, 2026',
    category: 'EMERGING AI & DIGITAL INNOVATION COMPANY OF THE YEAR – 2026',
    categorySlug: 'lounge-interview',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    brief: 'Ratovate Technologies Pvt Ltd is an AI-first company headquartered in central India, working on its mission to empower businesses by delivering modular autonomous microservices and resilient cloud transformation.',
    excerpt: 'Ratovate Technologies Pvt Ltd is an AI-first company headquartered in central India, working on its mission to empower businesses by converting legacy IT bottlenecks into self-orchestrating, observable microservices fabrics...',
  },
  {
    id: 'lounge-4',
    slug: 'technoshrine-bhubaneswar-ai-software-solutions',
    title: 'TECHNOSHRINE Intelligence Personified: A Bhubaneswar-based IT Firm, Engineering Growth through AI-Driven Solutions',
    date: 'September 5, 2026',
    category: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    brief: 'In 2011, while India\'s IT giants were consolidating in Bangalore and Hyderabad, visionary leader and innovator Satya Jayasingh chose to anchor deep engineering excellence in eastern India.',
    excerpt: 'In 2011, while India’s IT giants were consolidating in Bangalore and Hyderabad, a visionary leader and innovator, Satya Jayasingh, chose to engineer high-performance machine learning workflows from Bhubaneswar, servicing global clients...',
  },
  {
    id: 'lounge-5',
    slug: 'belstar-microfinance-financial-inclusion-impact',
    title: 'Belstar Microfinance Limited Building the Future, Not Just Disbursing Credit: Inside Belstar’s 18 Years of Impact',
    date: 'August 31, 2026',
    category: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80',
    brief: 'Few financial institutions manage to grow their business and stay true to a social mission at the same time. Inside Belstar\'s 18 years of pioneering sustainable financial inclusion for rural women entrepreneurs.',
    excerpt: 'Few financial institutions manage to grow their business and stay true to a social mission at the same time. Belstar Microfinance has mobilized over ₹12,000 crore in responsible capital, fostering grassroots micro-enterprises across 19 states...',
  },
  {
    id: 'lounge-6',
    slug: 'bless-living-redefining-senior-care-geriatric-living',
    title: 'Bless LIVING On A Decade-Long Mission To Redefine Senior Care In India',
    date: 'August 31, 2026',
    category: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
    brief: 'If we asked most Indians what "senior living" meant to them a decade ago, the answer usually circled back to traditional rest homes. Bless LIVING pioneered active, medical-grade residential communities.',
    excerpt: 'If we asked most Indians what “senior living” meant to them a decade ago, the answer usually circled back to old-age homes. Bless LIVING has spent ten years proving that retirement communities can offer active wellness, dignity, and specialized care...',
  },
  {
    id: 'lounge-7',
    slug: 'metamorphosis-unlimited-boardroom-leadership-coaching',
    title: 'Metamorphosis Unlimited: Dr. Ajaybir Singh Baakshi on Board Advisory & People-Driven Transformation',
    date: 'August 28, 2026',
    category: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    brief: 'Navigating executive volatility and organizational culture requires psychological acumen and disciplined boardroom governance. Dr. Ajaybir Singh Baakshi shares his leadership blueprints.',
    excerpt: 'There is a certain irony in naming a leadership consulting firm after a caterpillar’s most dramatic biological event, but for Dr. Baakshi, boardroom transformation requires deep cultural metamorphosis rather than superficial process fixes...',
  },
  {
    id: 'lounge-8',
    slug: 'kampus-market-student-first-hyperlocal-commerce',
    title: 'The Kampus Market Story: Ayaan Natterwalla on Building a Student-First Commerce Ecosystem',
    date: 'August 26, 2026',
    category: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    brief: 'Ayaan Natterwalla noticed that traditional university trade was fragmented and overpriced. Kampus Market created a verified, cashless exchange platform connecting students across 60 campuses.',
    excerpt: 'From academic textbooks and electronics to verified peer tutoring and hostel rentals, Kampus Market built a cashless ecosystem specifically engineered for the unique economic rhythms of university life...',
  },
  {
    id: 'lounge-9',
    slug: 'vatsal-soin-ai-governance-decision-singularity',
    title: 'Vatsal Soin’s 0→1 AI Governance Invention: Can It Survive AGI, ASI & Singularity?',
    date: 'August 25, 2026',
    category: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    brief: 'As AI moves from generating answers to taking consequential actions, the harder governance question is whether human-defined authority can remain in control before execution.',
    excerpt: 'As AI moves from generating answers to taking consequential actions, the harder governance question is whether human-defined authority can remain mathematically enforceable across autonomous agents before they execute...',
  },
  {
    id: 'lounge-10',
    slug: 'data-samudra-balaji-rajagopal-sovereign-cloud-infrastructure',
    title: 'Data Samudra: Balaji Rajagopal Engineering India’s Digital Future with Purpose, Precision, and Sovereign Thinking',
    date: 'August 14, 2026',
    category: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    brief: 'Data Samudra: Balaji Rajagopal Engineering India\'s Digital Future with Purpose, Precision, and Sovereign Thinking. Every industry has its hinge moments, and data sovereignty is India\'s.',
    excerpt: 'Data Samudra: Balaji Rajagopal Engineering India’s Digital Future with Purpose, Precision, and Sovereign Thinking. Every industry has its hinge moments where national digital infrastructure shifts from dependent hosting to domestic sovereignty...',
  },
];

export const LOUNGE_INTERVIEWS_SIDEBAR = {
  featured: {
    slug: 'nexora-wealth-algorithmic-portfolio-hedging',
    title: 'Nexora Wealth: Democratizing Algorithmic Portfolio Risk Management for Modern Investors',
    categoryTag: 'LOUNGE INTERVIEW',
    categorySlug: 'lounge-interview',
    date: 'October 11, 2026',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Financial market volatility demands sophisticated risk mitigation. Nexora Wealth bridges the institutional-retail divide with automated multi-factor portfolio rebalancing and volatility analytics...',
  },
  list: [
    {
      slug: 'data-samudra-balaji-rajagopal-sovereign-cloud-infrastructure',
      title: 'Data Samudra: Balaji Rajagopal on Engineering Sovereign Cloud Infrastructure',
      date: 'August 14, 2026',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'cyber-frontier-defense-systems-deeptech-resilience',
      title: 'Dr. Sameer Joshi: Defending Critical National Energy Grids from Quantum Intrusions',
      date: 'July 19, 2026',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'omnichannel-quick-commerce-micro-fulfillment-hubs',
      title: 'Vikram Malhotra: Re-Architecting Hyperlocal Supply Chains for 12-Minute Grocery Drops',
      date: 'June 08, 2026',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const LOUNGE_INTERVIEWS_RECENT_POSTS = [
  {
    slug: 'nexora-wealth-algorithmic-portfolio-hedging',
    title: 'Nexora Wealth: Democratizing Algorithmic Portfolio Risk Management for Modern Investors',
    date: 'October 11, 2026',
  },
  {
    slug: 'data-samudra-balaji-rajagopal-sovereign-cloud-infrastructure',
    title: 'Data Samudra: Balaji Rajagopal on Engineering Sovereign Cloud Infrastructure',
    date: 'August 14, 2026',
  },
  {
    slug: 'cyber-frontier-defense-systems-deeptech-resilience',
    title: 'Dr. Sameer Joshi: Defending Critical National Energy Grids from Quantum Intrusions',
    date: 'July 19, 2026',
  },
  {
    slug: 'omnichannel-quick-commerce-micro-fulfillment-hubs',
    title: 'Vikram Malhotra: Re-Architecting Hyperlocal Supply Chains for 12-Minute Grocery Drops',
    date: 'June 08, 2026',
  },
  {
    slug: 'sovereign-ai-foundational-indic-language-models',
    title: 'Dr. Ananya Roy: Training Sovereign LLMs on 22 Scheduled Indian Languages',
    date: 'May 16, 2026',
  },
];

export default function CategoryLoungeInterviewView() {
  const [activePage, setActivePage] = useState<number>(1);
  const [briefModalArticle, setBriefModalArticle] = useState<typeof LOUNGE_INTERVIEWS_ARTICLES_DATA[0] | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* ========================================================= */}
      {/* MAIN CONTAINER: Left (8 Cols) | Right Sidebar (4 Cols)    */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Section Header: Red vertical accent + BROWSING: LOUNGE INTERVIEW */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-1.5 h-6 bg-[#DC2626] inline-block shrink-0" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase font-sans">
              BROWSING: LOUNGE INTERVIEW
            </h1>
          </div>
          <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-3xl font-normal">
            Lounge Interview – <strong>Business Walkins</strong> hosts exclusive boardroom dialogues with CEOs, managing partners, founders, and industry trailblazers, exploring their breakthrough strategies, corporate governance, and vision for India&apos;s commercial frontier.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN (LG: 8 COLS): 2-COLUMN CARDS GRID           */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {LOUNGE_INTERVIEWS_ARTICLES_DATA.map((article) => (
                <article key={article.id} className="group flex flex-col justify-between">
                  <div>
                    {/* 16:10 Thumbnail with Optional BigNews! Badge */}
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

                    {/* Article Headline (Clickable) */}
                    <Link href={`/article/${article.slug}`}>
                      <h2 className="font-bold text-sm sm:text-[15px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-3 break-words">
                        {article.title}
                      </h2>
                    </Link>

                    {/* Meta: [CATEGORY] — [Date] in Signature Red */}
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
                      className="text-[11px] font-bold text-[#DC2626] hover:text-red-700 flex items-center gap-1 transition-colors"
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

            {/* ===================================================== */}
            {/* RESPONSIVE PAGINATION: [ 1 ] [ 2 ] [ 3 ] … [ 220 ] [ > ] */}
            {/* ===================================================== */}
            <div className="mt-10 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                  <button
                    onClick={() => {
                      if (activePage > 1) {
                        setActivePage((p) => p - 1);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }
                    }}
                    disabled={activePage === 1}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      activePage === 1
                        ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                        : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                    aria-label="Previous page"
                  >
                    &lt;
                  </button>

                  <button
                    onClick={() => {
                      setActivePage(1);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 1
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    1
                  </button>

                  <button
                    onClick={() => {
                      setActivePage(2);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 2
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    2
                  </button>

                  <button
                    onClick={() => {
                      setActivePage(3);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 3
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    3
                  </button>

                  <span className="px-2 text-slate-400 font-bold text-xs select-none">
                    ...
                  </span>

                  <button
                    onClick={() => {
                      setActivePage(220);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 220
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    220
                  </button>

                  <button
                    onClick={() => {
                      if (activePage < 220) {
                        setActivePage((p) => p + 1);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }
                    }}
                    disabled={activePage === 220}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      activePage === 220
                        ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                        : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                    aria-label="Next page"
                  >
                    &gt;
                  </button>
                </div>

                <div className="text-[11.5px] text-slate-500 font-medium">
                  Page <strong className="text-slate-800 font-bold">{activePage}</strong> of <strong className="text-slate-800 font-bold">220</strong>
                </div>
              </div>
            </div>
          </main>

          {/* ======================================================= */}
          {/* RIGHT SIDEBAR (LG: 4 COLS): 100% RESPONSIVE WIDGETS     */}
          {/* ======================================================= */}
          <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-slate-200 lg:pl-7">
            
            {/* WIDGET 1: STARTUP'S */}
            <div className="border border-slate-200 p-4 bg-white">
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  STARTUP&apos;S
                </h3>
              </div>

              {/* Featured Lead Item */}
              <article className="group mb-5 pb-5 border-b border-slate-200">
                <Link
                  href={`/article/${LOUNGE_INTERVIEWS_SIDEBAR.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={LOUNGE_INTERVIEWS_SIDEBAR.featured.image}
                    alt={LOUNGE_INTERVIEWS_SIDEBAR.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${LOUNGE_INTERVIEWS_SIDEBAR.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {LOUNGE_INTERVIEWS_SIDEBAR.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href={`/category/${LOUNGE_INTERVIEWS_SIDEBAR.featured.categorySlug}`}
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {LOUNGE_INTERVIEWS_SIDEBAR.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {LOUNGE_INTERVIEWS_SIDEBAR.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {LOUNGE_INTERVIEWS_SIDEBAR.featured.excerpt}
                </p>
              </article>

              {/* 3 Compact List Items */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {LOUNGE_INTERVIEWS_SIDEBAR.list.map((item, idx) => (
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
                {LOUNGE_INTERVIEWS_RECENT_POSTS.map((post, idx) => (
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

      {/* ========================================================= */}
      {/* QUICK EXECUTIVE BRIEF MODAL                               */}
      {/* ========================================================= */}
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
                Business Walkins Executive Dialogue
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
