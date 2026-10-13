'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, X, Sparkles, ArrowRight } from 'lucide-react';

export const PRESS_RELEASE_ARTICLES_DATA = [
  {
    id: 'pr-1',
    slug: 'landmark-communique-offer18-acquires-offershub',
    title: 'A Landmark Communique: Strategic Enterprise Software Acquisition Announced in MarTech',
    date: 'October 12, 2026',
    category: 'PRESS RELEASE',
    categorySlug: 'press-release',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
    brief: 'Strategic acquisition consolidating performance marketing infrastructure, attribution analytics, and global enterprise partner networks under a unified software umbrella.',
    excerpt: 'Strategic acquisition consolidating performance marketing infrastructure, attribution analytics, and global enterprise partner networks under a unified software umbrella across EMEA and APAC...',
  },
  {
    id: 'pr-2',
    slug: 'vedanta-share-price-corporate-action-capital-allocation',
    title: 'Vedanta & TCS Announce Landmark Capital Reallocation and Shareholder Dividend Frameworks',
    date: 'October 12, 2026',
    category: 'PRESS RELEASE',
    categorySlug: 'press-release',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    brief: 'Corporate boardroom disclosures highlight record quarterly payouts, green energy demergers, and capital expansion roadmaps for sovereign infrastructure assets.',
    excerpt: 'Corporate boardroom disclosures highlight record quarterly payouts, green energy demergers, and capital expansion roadmaps for sovereign infrastructure assets across national manufacturing belts...',
  },
  {
    id: 'pr-3',
    slug: 'commercial-ev-fast-charging-network-statewide-corridor-debut',
    title: 'National Clean Transit Consortium Commissions 500 High-Power Commercial EV Charging Corridors',
    date: 'October 8, 2026',
    category: 'PRESS RELEASE',
    categorySlug: 'press-release',
    badge: 'Press Release',
    image: 'https://images.unsplash.com/photo-1558441719-7b3b44b20e18?w=800&auto=format&fit=crop&q=80',
    brief: 'Tri-party infrastructure joint venture activates megawatt charging plazas linking key industrial manufacturing clusters to deepwater container ports.',
    excerpt: 'Tri-party infrastructure joint venture activates megawatt charging plazas linking key industrial manufacturing clusters to deepwater container ports, accelerating zero-emission freight transitions...',
  },
  {
    id: 'pr-4',
    slug: 'eshipz-intelliproof-post-delivery-automation-focus',
    title: 'eShipz Unveils IntelliProof: Next-Gen AI Post-Delivery Supply Chain Verification Platform',
    date: 'October 6, 2026',
    category: 'PRESS RELEASE',
    categorySlug: 'press-release',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    brief: 'Logistics technology leader launches computerized vision verification for high-value freight transit, slashing last-mile claim fraud by 85%.',
    excerpt: 'Logistics technology leader launches computerized vision verification for high-value freight transit, slashing last-mile claim fraud by 85% across enterprise ecommerce networks...',
  },
  {
    id: 'pr-5',
    slug: 'sustainable-hydrogen-fuel-cell-light-commercial-truck',
    title: 'Sovereign Clean Mobility Initiative Announces 1,000 Heavy Hydrogen Truck Deployment',
    date: 'October 1, 2026',
    category: 'PRESS RELEASE',
    categorySlug: 'press-release',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80',
    brief: 'Commercial fleet consortium signs multi-year procurement agreement for zero-emission long-haul transport backed by state green energy subsidies.',
    excerpt: 'Commercial fleet consortium signs multi-year procurement agreement for zero-emission long-haul transport backed by state green energy subsidies and hydrogen refueling stations...',
  },
  {
    id: 'pr-6',
    slug: 'quantum-resistant-hardware-security-module-banking-terminals',
    title: 'FinTech Security Alliance Releases Lattice-Based Cryptography Chips for Enterprise Banking',
    date: 'September 25, 2026',
    category: 'PRESS RELEASE',
    categorySlug: 'press-release',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    brief: 'Banking technology hardware developers partner with apex clearing corporations to deploy quantum-secure payment modules protecting retail transaction rails.',
    excerpt: 'Banking technology hardware developers partner with apex clearing corporations to deploy quantum-secure payment modules protecting retail transaction rails from emerging cyber threats...',
  },
  {
    id: 'pr-7',
    slug: 'biopharma-oncology-monoclonal-antibody-manufacturing-facility',
    title: 'Pan-Asian Biopharma Giant Inaugurates $240M Monoclonal Antibody Production Facility',
    date: 'September 18, 2026',
    category: 'PRESS RELEASE',
    categorySlug: 'press-release',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    brief: 'State-of-the-art sterile biomanufacturing complex receives US FDA and EU GMP validations, expanding global export capacity for affordable cancer immunotherapies.',
    excerpt: 'State-of-the-art sterile biomanufacturing complex receives US FDA and EU GMP validations, expanding global export capacity for affordable cancer immunotherapies across emerging economies...',
  },
  {
    id: 'pr-8',
    slug: 'solid-state-portable-power-stations-clean-energy-outdoors',
    title: 'Clean Energy Technology Group Completes Commercialization of Solid-State Energy Storage',
    date: 'September 12, 2026',
    category: 'PRESS RELEASE',
    categorySlug: 'press-release',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80',
    brief: 'Commercial release of ultra-dense solid-state battery architecture eliminates flammable liquid electrolytes, ensuring industrial clean power for mission-critical fieldwork.',
    excerpt: 'Commercial release of ultra-dense solid-state battery architecture eliminates flammable liquid electrolytes, ensuring industrial clean power for mission-critical fieldwork and disaster recovery...',
  },
];

export const PRESS_RELEASE_SIDEBAR = {
  featured: {
    slug: 'omniroute-technologies-series-a-cross-border-logistics',
    title: 'OmniRoute Technologies Secures $14M Series A for Cross-Border Logistics Orchestration',
    categoryTag: 'PRESS RELEASE',
    categorySlug: 'press-release',
    date: 'October 10, 2026',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Cross-border container tracking and customs telemetry startup OmniRoute closes institutional round backed by sovereign trade funds and supply chain syndicates...',
  },
  list: [
    {
      slug: 'hyperscale-quantum-closing-pre-ipo-funding',
      title: 'HyperScale Quantum: Closes Pre-IPO Institutional Round Led by Global Sovereign Funds',
      date: 'September 28, 2026',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'zenith-green-hydrogen-industrial-supply-pacts',
      title: 'Zenith Green Hydrogen: Inks 20-Year Heavy Industry Clean Supply Agreements',
      date: 'September 14, 2026',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'biomatrix-therapeutics-patent-fast-track',
      title: 'BioMatrix Therapeutics: Receives Accelerated Clearance for mRNA Delivery Vehicles',
      date: 'August 29, 2026',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const PRESS_RELEASE_RECENT_POSTS = [
  {
    slug: 'landmark-communique-offer18-acquires-offershub',
    title: 'A Landmark Communique: Strategic Enterprise Software Acquisition Announced in MarTech',
    date: 'October 12, 2026',
  },
  {
    slug: 'vedanta-share-price-corporate-action-capital-allocation',
    title: 'Vedanta & TCS Announce Landmark Capital Reallocation and Shareholder Dividend Frameworks',
    date: 'October 12, 2026',
  },
  {
    slug: 'commercial-ev-fast-charging-network-statewide-corridor-debut',
    title: 'National Clean Transit Consortium Commissions 500 High-Power Commercial EV Charging Corridors',
    date: 'October 8, 2026',
  },
  {
    slug: 'eshipz-intelliproof-post-delivery-automation-focus',
    title: 'eShipz Unveils IntelliProof: Next-Gen AI Post-Delivery Supply Chain Verification Platform',
    date: 'October 6, 2026',
  },
  {
    slug: 'sustainable-hydrogen-fuel-cell-light-commercial-truck',
    title: 'Sovereign Clean Mobility Initiative Announces 1,000 Heavy Hydrogen Truck Deployment',
    date: 'October 1, 2026',
  },
];

export default function CategoryPressReleaseView() {
  const [activePage, setActivePage] = useState<number>(1);
  const [briefModalArticle, setBriefModalArticle] = useState<typeof PRESS_RELEASE_ARTICLES_DATA[0] | null>(null);

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
            
            {/* Header: Red vertical accent + BROWSING: PRESS RELEASE */}
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-1.5 h-6 bg-[#DC2626] inline-block shrink-0" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase font-sans">
                BROWSING: PRESS RELEASE
              </h1>
            </div>

            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-3xl font-normal mb-8">
              Press Release – <strong>The Enterprise Chronicle</strong> is the premier verified wire service for enterprise disclosures, cross-border M&amp;A transactions, technology debuts, regulatory announcements, and institutional corporate communiques.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {PRESS_RELEASE_ARTICLES_DATA.map((article) => (
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

                    {/* Meta: [PRESS RELEASE] — [Date] in Signature Red */}
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

            {/* RESPONSIVE PAGINATION */}
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
                      setActivePage(88);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 88
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    88
                  </button>

                  <button
                    onClick={() => {
                      if (activePage < 88) {
                        setActivePage((p) => p + 1);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }
                    }}
                    disabled={activePage === 88}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      activePage === 88
                        ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                        : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                    aria-label="Next page"
                  >
                    &gt;
                  </button>
                </div>

                <div className="text-[11.5px] text-slate-500 font-medium">
                  Page <strong className="text-slate-800 font-bold">{activePage}</strong> of <strong className="text-slate-800 font-bold">88</strong>
                </div>
              </div>
            </div>
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
                  href={`/article/${PRESS_RELEASE_SIDEBAR.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={PRESS_RELEASE_SIDEBAR.featured.image}
                    alt={PRESS_RELEASE_SIDEBAR.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${PRESS_RELEASE_SIDEBAR.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {PRESS_RELEASE_SIDEBAR.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href={`/category/${PRESS_RELEASE_SIDEBAR.featured.categorySlug}`}
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {PRESS_RELEASE_SIDEBAR.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {PRESS_RELEASE_SIDEBAR.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {PRESS_RELEASE_SIDEBAR.featured.excerpt}
                </p>
              </article>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {PRESS_RELEASE_SIDEBAR.list.map((item, idx) => (
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
                {PRESS_RELEASE_RECENT_POSTS.map((post, idx) => (
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
                  alt="The Enterprise Chronicle Print Issue"
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
                The Enterprise Chronicle Corporate Wire
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
