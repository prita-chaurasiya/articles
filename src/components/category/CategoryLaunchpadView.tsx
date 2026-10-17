'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, X, Sparkles } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate } from '@/lib/utils';
import EditorialPagination from '@/components/common/EditorialPagination';

export const LAUNCHPAD_ARTICLES_DATA = [
  {
    id: 'launch-1',
    slug: 'next-gen-flagship-silicon-smartphone-festive-debut-analysis',
    title: 'Next-Gen 3nm Neural Flagship Smartphones Announced Ahead of Nationwide Festive Retail Surge',
    date: 'October 10, 2026',
    category: 'LAUNCHPAD',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
    brief: 'Major consumer hardware manufacturers unveil next-generation smartphone architectures featuring on-device neural processing units and satellite messaging capabilities ahead of festive ecommerce rollouts.',
    excerpt: 'Major consumer hardware manufacturers unveil next-generation smartphone architectures featuring on-device neural processing units and satellite messaging capabilities ahead of festive ecommerce rollouts...',
  },
  {
    id: 'launch-2',
    slug: 'commercial-ev-fast-charging-network-statewide-corridor-debut',
    title: 'High-Speed Megawatt EV Charging Corridors Launched Across Golden Quadrilateral Highways',
    date: 'October 8, 2026',
    category: 'LAUNCHPAD',
    badge: 'Launchpad!',
    image: 'https://images.unsplash.com/photo-1558441719-7b3b44b20e18?w=800&auto=format&fit=crop&q=80',
    brief: 'Infrastructure consortiums commission 350kW commercial electric vehicle charging corridors, cutting transit freight turnaround times for intercity electric heavy haulers.',
    excerpt: 'Infrastructure consortiums commission 350kW commercial electric vehicle charging corridors, cutting transit freight turnaround times for intercity electric heavy haulers across national expressways...',
  },
  {
    id: 'launch-3',
    slug: 'enterprise-smart-glass-ar-workplace-collaboration-headset',
    title: 'Spatial Computing for Field Engineering: Lightweight AR Vision Headsets Debut for Industrial Assembly',
    date: 'October 5, 2026',
    category: 'LAUNCHPAD',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80',
    brief: 'Industrial electronics developers roll out enterprise augmented reality eyewear with real-time digital twin overlays and hands-free voice command telemetry for shop-floor technicians.',
    excerpt: 'Industrial electronics developers roll out enterprise augmented reality eyewear with real-time digital twin overlays and hands-free voice command telemetry for shop-floor technicians in precision assembly...',
  },
  {
    id: 'launch-4',
    slug: 'wearable-biometric-continuous-glucose-metabolic-ring',
    title: 'Non-Invasive Metabolic Health Tracking: Next-Gen Smart Titanium Ring Debuts Optical Biosensing',
    date: 'October 2, 2026',
    category: 'LAUNCHPAD',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    brief: 'A novel titanium health ring combines continuous PPG hemodynamic tracking with core body temperature flux algorithms, enabling preventive metabolic insights for executive wellness.',
    excerpt: 'A novel titanium health ring combines continuous PPG hemodynamic tracking with core body temperature flux algorithms, enabling preventive metabolic insights for executive wellness without screen distraction...',
  },
  {
    id: 'launch-5',
    slug: 'autonomous-agricultural-drone-sprayer-precision-farming',
    title: 'Hyper-Payload Autonomous Agri-Drones Take Flight with AI Multispectral Crop Scanning',
    date: 'September 28, 2026',
    category: 'LAUNCHPAD',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80',
    brief: 'Agritech hardware innovators launch 50-liter autonomous payload drones designed to optimize micronutrient spray delivery and reduce pesticide runoff across agricultural cooperatives.',
    excerpt: 'Agritech hardware innovators launch 50-liter autonomous payload drones designed to optimize micronutrient spray delivery and reduce pesticide runoff across agricultural cooperatives in farming belts...',
  },
  {
    id: 'launch-6',
    slug: 'quantum-resistant-hardware-security-module-banking-terminals',
    title: 'Post-Quantum Cryptographic Microchips Debut in Next-Gen Enterprise Payment Terminals',
    date: 'September 24, 2026',
    category: 'LAUNCHPAD',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    brief: 'Fintech hardware engineers debut tamper-proof POS security chips with lattice-based cryptography, protecting transactional point-of-sale data from prospective quantum decryption risks.',
    excerpt: 'Fintech hardware engineers debut tamper-proof POS security chips with lattice-based cryptography, protecting transactional point-of-sale data from prospective quantum decryption risks across banking rails...',
  },
  {
    id: 'launch-7',
    slug: 'sustainable-hydrogen-fuel-cell-light-commercial-truck',
    title: 'Zero-Emission Urban Freight: Hydrogen Fuel Cell Delivery Vans Debut for Same-Day Logistics',
    date: 'September 18, 2026',
    category: 'LAUNCHPAD',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80',
    brief: 'Commercial logistics providers unveil 500km-range green hydrogen light trucks with 8-minute refueling times, targeting zero-emission intra-city parcel distribution.',
    excerpt: 'Commercial logistics providers unveil 500km-range green hydrogen light trucks with 8-minute refueling times, targeting zero-emission intra-city parcel distribution without payload penalties...',
  },
  {
    id: 'launch-8',
    slug: 'solid-state-portable-power-stations-clean-energy-outdoors',
    title: 'Solid-State Energy Storage: Ultra-Compact 3kWh Portable Clean Power Generators Debut',
    date: 'September 12, 2026',
    category: 'LAUNCHPAD',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80',
    brief: 'Replacing combustible fuel backup generators, solid-state battery power stations offer zero sound, 10-year cycle longevity, and solar recharging for remote operations.',
    excerpt: 'Replacing combustible fuel backup generators, solid-state battery power stations offer zero sound, 10-year cycle longevity, and solar recharging for remote operations and mobile broadcast vans...',
  },
];

export const LAUNCHPAD_STARTUPS_SIDEBAR = {
  featured: {
    slug: 'next-gen-flagship-silicon-smartphone-festive-debut-analysis',
    title: 'Next-Gen 3nm Neural Flagship Silicon Debuts for High-Performance Mobile Compute',
    categoryTag: 'PRODUCT DEBUT',
    date: 'October 10, 2026',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Semiconductor innovators unveil on-device neural processing units delivering 45 TOPS of localized AI computation with 28% enhanced thermal dissipation...',
  },
  list: [
    {
      slug: 'commercial-ev-fast-charging-network-statewide-corridor-debut',
      title: 'MegaWatt Transit: 350kW High-Speed Charging Plazas Commissioned',
      date: 'October 8, 2026',
      image: 'https://images.unsplash.com/photo-1558441719-7b3b44b20e18?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'enterprise-smart-glass-ar-workplace-collaboration-headset',
      title: 'AeroVision Micro-OLED: Ultra-Light AR Glass for Industrial Diagnostics',
      date: 'October 5, 2026',
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'wearable-biometric-continuous-glucose-metabolic-ring',
      title: 'Titanium BioRing: Optical Continuous Hemodynamic & Metabolic Tracking',
      date: 'October 2, 2026',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const LAUNCHPAD_RECENT_POSTS = [
  {
    slug: 'next-gen-flagship-silicon-smartphone-festive-debut-analysis',
    title: 'Next-Gen 3nm Neural Flagship Smartphones Announced Ahead of Nationwide Festive Retail Surge',
    date: 'October 10, 2026',
  },
  {
    slug: 'commercial-ev-fast-charging-network-statewide-corridor-debut',
    title: 'High-Speed Megawatt EV Charging Corridors Launched Across Golden Quadrilateral Highways',
    date: 'October 8, 2026',
  },
  {
    slug: 'enterprise-smart-glass-ar-workplace-collaboration-headset',
    title: 'Spatial Computing for Field Engineering: Lightweight AR Vision Headsets Debut for Industrial Assembly',
    date: 'October 5, 2026',
  },
  {
    slug: 'wearable-biometric-continuous-glucose-metabolic-ring',
    title: 'Non-Invasive Metabolic Health Tracking: Next-Gen Smart Titanium Ring Debuts Optical Biosensing',
    date: 'October 2, 2026',
  },
  {
    slug: 'quantum-resistant-hardware-security-module-banking-terminals',
    title: 'Post-Quantum Cryptographic Microchips Debut in Next-Gen Enterprise Payment Terminals',
    date: 'September 24, 2026',
  },
];

export default function CategoryLaunchpadView() {
  const { articles } = useArticleStore();
  const [activePage, setActivePage] = useState<number>(1);
  const [briefModalArticle, setBriefModalArticle] = useState<any>(null);

  const ITEMS_PER_PAGE = 6;

  // Filter dynamic articles published to Launchpad
  const dynamicLaunchpad = useMemo(() => {
    return articles
      .filter(
        (a) =>
          a.status === 'published' &&
          (a.category?.toLowerCase() === 'launchpad' ||
            a.categorySlug?.toLowerCase() === 'launchpad') &&
          !LAUNCHPAD_ARTICLES_DATA.some((l) => l.slug === a.slug)
      )
      .map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        date: formatDate(a.publishedAt),
        category: a.category?.toUpperCase() || 'LAUNCHPAD',
        categorySlug: 'launchpad',
        badge: a.isTrending ? 'Trending' : a.isFeatured ? 'Featured' : 'Launchpad!',
        image:
          a.heroImage ||
          'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
        brief: a.excerpt || a.title,
        excerpt: a.excerpt || a.title,
      }));
  }, [articles]);

  const allArticles = useMemo(() => {
    return [...dynamicLaunchpad, ...LAUNCHPAD_ARTICLES_DATA];
  }, [dynamicLaunchpad]);

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
        {/* Section Header: Red vertical accent + BROWSING: LAUNCHPAD */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-1.5 h-6 bg-[#DC2626] inline-block" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase font-sans">
              BROWSING: LAUNCHPAD
            </h1>
          </div>
          <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-3xl font-normal">
            Launchpad – <strong>Business Walkins</strong> is a leading business magazine that focuses on connecting enterprises and emerging innovators with each other to foster growth and success. The magazine provides insights into high-growth product debuts, deeptech hardware, commercial mobility rollouts, consumer electronics, and seed-stage venture launches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN (LG: 8 COLS): 2-COLUMN LAUNCHPAD GRID       */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {paginatedArticles.map((article) => (
                <article key={article.id} className="group flex flex-col justify-between">
                  <div>
                    {/* 16:10 Thumbnail with BigNews! / Launchpad Badge */}
                    <Link href={`/article/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100 border border-slate-200 mb-3">
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
                      <h3 className="font-bold text-sm sm:text-[15px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-3">
                        {article.title}
                      </h3>
                    </Link>

                    {/* Meta: LAUNCHPAD — [Date] in Signature Red */}
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold">
                      <Link
                        href="/category/launchpad"
                        className="text-[#DC2626] uppercase font-bold tracking-wider hover:underline transition-colors"
                        title="View all Launchpad dispatches"
                      >
                        {article.category}
                      </Link>
                      <span className="text-slate-400 font-normal">—</span>
                      <span className="text-slate-500 font-normal">
                        {article.date}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 mt-2 font-normal">
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

          {/* ======================================================= */}
          {/* RIGHT SIDEBAR (LG: 4 COLS): STARTUP'S | RECENT | COVER  */}
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
                  href={`/article/${LAUNCHPAD_STARTUPS_SIDEBAR.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={LAUNCHPAD_STARTUPS_SIDEBAR.featured.image}
                    alt={LAUNCHPAD_STARTUPS_SIDEBAR.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${LAUNCHPAD_STARTUPS_SIDEBAR.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {LAUNCHPAD_STARTUPS_SIDEBAR.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href="/category/lounge-interview"
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {LAUNCHPAD_STARTUPS_SIDEBAR.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {LAUNCHPAD_STARTUPS_SIDEBAR.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {LAUNCHPAD_STARTUPS_SIDEBAR.featured.excerpt}
                </p>
              </article>

              {/* 3 Compact List Items */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {LAUNCHPAD_STARTUPS_SIDEBAR.list.map((item, idx) => (
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
                {LAUNCHPAD_RECENT_POSTS.map((post, idx) => (
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
            <div className="border border-slate-200 p-4 bg-white sticky top-20">
              <div className="border-t-2 border-black pt-2 mb-3">
                <h3 className="font-black text-xs uppercase tracking-tight text-slate-900">
                  PRINT ISSUE
                </h3>
              </div>

              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900 border border-slate-200 shadow-md mb-3">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
                  alt="Business Walkins Print Issue"
                  className="w-full h-full object-cover"
                />
              </div>

              <Link
                href="/magazine"
                className="block w-full py-2 bg-black hover:bg-slate-800 text-white text-center text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Explore Digital Edition
              </Link>
            </div>

          </aside>

        </div>

      </div>

      {/* ========================================================= */}
      {/* QUICK EXECUTIVE BRIEF MODAL                               */}
      {/* ========================================================= */}
      {briefModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full border border-slate-300 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setBriefModalArticle(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
              aria-label="Close brief"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Launchpad Executive Brief</span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-3">
              {briefModalArticle.title}
            </h3>

            <div className="p-3 bg-slate-50 border-l-2 border-[#DC2626] text-xs text-slate-700 leading-relaxed mb-4">
              {briefModalArticle.brief}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              {briefModalArticle.excerpt}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <span className="text-slate-500 font-medium">
                {briefModalArticle.date}
              </span>
              <Link
                href={`/article/${briefModalArticle.slug}`}
                className="font-bold text-[#DC2626] hover:underline flex items-center gap-1"
                onClick={() => setBriefModalArticle(null)}
              >
                <span>Read Full Article</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
