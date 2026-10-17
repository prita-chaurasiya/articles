'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, X, Sparkles, ArrowRight } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate } from '@/lib/utils';
import EditorialPagination from '@/components/common/EditorialPagination';

export const SUCCESS_STORIES_ARTICLES_DATA = [
  {
    id: 'succ-1',
    slug: 'from-friends-to-founders-bootstrapped-enterprise-scaling',
    title: "From Friends to Founders: The Incredible Stories Behind India's Biggest Startup Successes",
    date: 'August 4, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    brief: 'From Friends to Founders: The Incredible Stories Behind India\'s Biggest Startup Successes. An in-depth analysis of how childhood companions and university lab partners turned mutual trust into sovereign-scale technology conglomerates without diluting early governance.',
    excerpt: "From Friends to Founders: The Incredible Stories Behind India's Biggest Startup Successes \"Some people find a business partner. Others build lasting technology empires alongside college dormmates and childhood confidants...\"",
  },
  {
    id: 'succ-2',
    slug: 'autonomous-ai-architecture-teen-prodigy-global-dossier',
    title: 'Who Is Jainam Jain? The Teen Entrepreneur Behind an AI Startup in Burj Khalifa',
    date: 'June 26, 2026',
    category: 'NEWS',
    categorySlug: 'news',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    brief: 'Meet Jainam Jain: The Teen Entrepreneur Redefining Success. While most teenagers spend their days attending school and preparing for examinations, this young neural architecture specialist engineered enterprise autonomous intelligence platforms headquartered in Dubai.',
    excerpt: 'Meet Jainam Jain: The Teen Entrepreneur Redefining Success While most teenagers spend their days attending school, preparing for exams, or exploring conventional degrees, prodigies are licensing autonomous agent swarms to global logistics giants...',
  },
  {
    id: 'succ-3',
    slug: 'creator-to-direct-to-consumer-omnichannel-retail-empire',
    title: "Kusha Kapila's ₹150 Crore D2C Success Story: From Creator to Entrepreneur",
    date: 'June 23, 2026',
    category: 'SUCCESS STORIES',
    categorySlug: 'success-stories',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    brief: 'From content creator to commanding nationwide FMCG shelf presence, documenting the strategic transition from organic digital storytelling to high-margin omnichannel beauty and consumer lifestyle dominance.',
    excerpt: 'Kusha Kapila was born in Delhi on September 19, 1989, into a middle-class Pitampura Punjabi family. Documenting how authentic community engagement and modern product formulation scaled into a ₹150 crore lifestyle enterprise...',
  },
  {
    id: 'succ-4',
    slug: 'hyperlocal-domestic-logistics-fleet-scale-playbook',
    title: 'Meet Aayush Agarwal: The Man Who Quit a Dream Job to Fix Your Maid Problem',
    date: 'June 12, 2026',
    category: 'NEWS',
    categorySlug: 'news',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    brief: 'How an ex-Zepto executive turned a personal frustration into India\'s fastest-scaling home services startup, backed by $112 million in funding and serving 50,000 homes every single day across metropolitan regions.',
    excerpt: "How an ex-Zepto executive turned a personal frustration – unreliable house help – into India's fastest-scaling home services startup, backed by $112 million in venture syndication and serving 50,000 households every single day...",
  },
  {
    id: 'succ-5',
    slug: 'circular-packaging-sustainable-materials-b2b-growth',
    title: 'Zero-Waste Bio-Packaging: How Two Chemical Engineers Built an Eco-Industrial Powerhouse',
    date: 'May 30, 2026',
    category: 'SUCCESS STORIES',
    categorySlug: 'success-stories',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    brief: 'Replacing petroleum-derived bubblewrap with agricultural-residue mycelium composites, this manufacturing trailblazer secured supply agreements with over 400 top enterprise exporters.',
    excerpt: 'Replacing single-use petrochemical plastics with biodegradable mycelium packaging, two college engineers scaled from a basement incubator to a multi-state supply network protecting sensitive high-value exports...',
  },
  {
    id: 'succ-6',
    slug: 'farm-to-chiller-cold-chain-dairy-farmer-prosperity',
    title: 'From 20 Liters to 200,000 Liters: The Solar Cold-Chain Revolution Empowering Dairy Hamlets',
    date: 'May 18, 2026',
    category: 'SUCCESS STORIES',
    categorySlug: 'success-stories',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    brief: 'Decentralized solar milk-cooling micro-stations placed directly at village clusters halted dairy spoilage, providing direct digital payments and recurring prosperity to 15,000 farming families.',
    excerpt: 'Eliminating middleman deductions and transit milk souring, decentralized solar-powered cooling chambers placed across remote rural routes unlocked daily liquidity and enhanced cooperative farming yields...',
  },
  {
    id: 'succ-7',
    slug: 'fintech-algorithmic-risk-hedging-retail-investors',
    title: 'Democratizing Derivatives: How Former Desk Traders Built Algorithmic Hedging for Retail Portfolios',
    date: 'May 04, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    brief: 'Delivering institutional-grade algorithmic risk metrics and volatility hedging directly to smartphone equity traders without cumbersome institutional minimums.',
    excerpt: 'Institutional derivatives analysts banded together to build automated volatility hedges for retail investors, converting hedge-fund algorithmic models into intuitive automated execution workflows...',
  },
  {
    id: 'succ-8',
    slug: 'fleet-electrification-heavy-commercial-turnaround',
    title: 'Electrifying Highway Freight: How a Precision Engineering Crew Retrofitted 1,200 Heavy Haulers',
    date: 'April 22, 2026',
    category: 'SUCCESS STORIES',
    categorySlug: 'success-stories',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    brief: 'Converting legacy diesel freight trucks into high-efficiency dual-motor electric haulers with swappable battery chassis, lowering transit freight costs by 42% on core commercial highways.',
    excerpt: 'Commercial freight operators traditionally resisted new EV fleet capex. By pioneering dual-motor retrofit assemblies with 6-minute modular battery swaps, this startup achieved instant operating profitability...',
  },
];

export const SUCCESS_STORIES_SIDEBAR = {
  featured: {
    slug: 'from-debt-to-market-dominance-industrial-machinery-turnaround',
    title: 'From Near-Bankruptcy to Market Dominance: How a Precision Engineering Foundry Scaled EBITDA by 310%',
    categoryTag: 'SUCCESS STORY',
    categorySlug: 'success-stories',
    date: 'August 18, 2026',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Facing debt restructuring and obsolete pneumatic machinery, this second-generation family manufacturing workshop retooled into high-tolerance aerospace valve fabrication...',
  },
  list: [
    {
      slug: 'ai-customer-service-hypergrowth-bootstrapped-scaling',
      title: 'Bootstrapped to $80M ARR: The CX Automation Platform Redefining Enterprise Support',
      date: 'July 14, 2026',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'organic-beverage-brand-omnichannel-expansion-playbook',
      title: 'Brewing Clean Success: Cold-Pressed Beverage Pioneer Expands into 4,000 Retail Doors',
      date: 'June 29, 2026',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'fleet-electrification-heavy-commercial-turnaround',
      title: 'Retrofitting 1,200 Heavy Freight Haulers: The Zero-Emissions Transport Scale Story',
      date: 'April 22, 2026',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const SUCCESS_STORIES_RECENT_POSTS = [
  {
    slug: 'from-debt-to-market-dominance-industrial-machinery-turnaround',
    title: 'From Debt to Market Dominance: Precision Engineering Foundry Scaled EBITDA by 310%',
    date: 'August 18, 2026',
  },
  {
    slug: 'ai-customer-service-hypergrowth-bootstrapped-scaling',
    title: 'Bootstrapped to $80M ARR: The Customer Experience Automation Platform Redefining Support',
    date: 'July 14, 2026',
  },
  {
    slug: 'organic-beverage-brand-omnichannel-expansion-playbook',
    title: 'Brewing Clean Success: Cold-Pressed Beverage Pioneer Expands into 4,000 Retail Doors',
    date: 'June 29, 2026',
  },
  {
    slug: 'rural-fintech-micro-credit-disruption-underbanked-merchants',
    title: 'Banking the Unbanked: The Micro-Credit Mesh Empowering Tier-3 Kirana Shop Owners',
    date: 'May 30, 2026',
  },
  {
    slug: 'fleet-electrification-heavy-commercial-turnaround',
    title: 'Electrifying Highway Freight: How a Precision Engineering Crew Retrofitted 1,200 Heavy Haulers',
    date: 'April 22, 2026',
  },
];

export default function CategorySuccessStoriesView() {
  const { articles } = useArticleStore();
  const [activePage, setActivePage] = useState<number>(1);
  const [briefModalArticle, setBriefModalArticle] = useState<any>(null);

  const ITEMS_PER_PAGE = 6;

  // Filter dynamic articles published to Success Stories or having Company Profile
  const dynamicSuccessStories = useMemo(() => {
    return articles
      .filter(
        (a) =>
          a.status === 'published' &&
          (a.category?.toLowerCase() === 'success stories' ||
            a.categorySlug?.toLowerCase() === 'success-stories' ||
            Boolean(a.companyProfile)) &&
          !SUCCESS_STORIES_ARTICLES_DATA.some((s) => s.slug === a.slug)
      )
      .map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        date: formatDate(a.publishedAt),
        category: a.category?.toUpperCase() || 'SUCCESS STORIES',
        categorySlug: 'success-stories',
        badge: a.isTrending ? 'Trending' : a.isFeatured ? 'Featured' : 'Success Story',
        image:
          a.heroImage ||
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        brief: a.excerpt || a.title,
        excerpt: a.excerpt || a.title,
      }));
  }, [articles]);

  const allArticles = useMemo(() => {
    return [...dynamicSuccessStories, ...SUCCESS_STORIES_ARTICLES_DATA];
  }, [dynamicSuccessStories]);

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
        {/* Section Header: Red vertical accent + BROWSING: SUCCESS STORIES */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-1.5 h-6 bg-[#DC2626] inline-block shrink-0" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase font-sans">
              BROWSING: SUCCESS STORIES
            </h1>
          </div>
          <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-3xl font-normal">
            Success Stories – <strong>Business Walkins</strong> is a leading business publication that chronicles transformative corporate breakthroughs, visionary founder journeys, bootsrapped hyper-scaling, and sustainable leadership playbooks across India and global commercial corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN (LG: 8 COLS): 2-COLUMN CARDS GRID           */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {paginatedArticles.map((article) => (
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
                      <h2 className="font-bold text-sm sm:text-[15px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-3">
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
                  href={`/article/${SUCCESS_STORIES_SIDEBAR.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={SUCCESS_STORIES_SIDEBAR.featured.image}
                    alt={SUCCESS_STORIES_SIDEBAR.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${SUCCESS_STORIES_SIDEBAR.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {SUCCESS_STORIES_SIDEBAR.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href={`/category/${SUCCESS_STORIES_SIDEBAR.featured.categorySlug}`}
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {SUCCESS_STORIES_SIDEBAR.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {SUCCESS_STORIES_SIDEBAR.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {SUCCESS_STORIES_SIDEBAR.featured.excerpt}
                </p>
              </article>

              {/* 3 Compact List Items */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {SUCCESS_STORIES_SIDEBAR.list.map((item, idx) => (
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

            {/* WIDGET 2: RECENT POSTS (Fully responsive, break-words, smooth scaling) */}
            <div className="border border-slate-200 p-4 bg-white">
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  RECENT POSTS
                </h3>
              </div>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {SUCCESS_STORIES_RECENT_POSTS.map((post, idx) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    Latest Edition
                  </span>
                  <h4 className="font-bold text-sm text-white leading-tight">
                    Innovators Shaping The Decade
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

            <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 font-sans">
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
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {briefModalArticle.brief}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">
                Business Walkins Intelligence Brief
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
