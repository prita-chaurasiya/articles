'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, X, ChevronRight, Eye, Calendar, Sparkles } from 'lucide-react';

export const NEWS_ARTICLES_DATA = [
  {
    id: 'news-1',
    slug: 'vedanta-share-price-corporate-action-capital-allocation',
    title: 'Vedanta Share Price in Focus: TCS Dividend, Ola Electric Rights Issue Headline a Busy Corporate-Action Week',
    date: 'October 12, 2026',
    category: 'NEWS',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    brief: 'A high-stakes corporate action week kicks off across Indian stock exchanges as major institutional heavyweights outline dividend record dates, capital debt restructurings, and rights issues.',
    excerpt: 'Indian equity markets kicked off a heavily monitored corporate-action week with multi-crore dividend announcements, rights issues, and sovereign debt syndications taking center stage across Dalal Street...',
  },
  {
    id: 'news-2',
    slug: 'nifty-today-sensex-opens-higher-crude-firm-rupee',
    title: 'Nifty Today: Sensex Opens Higher on Softer Crude and Firm Rupee, but Early Gains Fade',
    date: 'October 12, 2026',
    category: 'NEWS',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
    brief: 'Domestic benchmarks witnessed an initial surge supported by declining Brent crude prices and a resilient Rupee before intraday profit booking tempered gains.',
    excerpt: 'Benchmark equity indices Sensex and Nifty opened with robust upward momentum on Monday morning as global commodity pressures softened, though cautious sentiment in banking and IT capped early rallies...',
  },
  {
    id: 'news-3',
    slug: 'markets-slip-in-choppy-trade-banks-it-names-weigh',
    title: 'Markets Slip in Choppy Trade: Sensex Sheds 200+ Points, Nifty Slides Under 22,500 as Banks, IT Names Weigh',
    date: 'October 12, 2026',
    category: 'NEWS',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&auto=format&fit=crop&q=80',
    brief: 'Heightened foreign institutional outflows and selling pressure across tier-1 banking institutions pushed the Nifty index below key psychological support thresholds.',
    excerpt: 'Indian equity benchmarks opened the week on a firm note but could not hold on to their early gains on persistent institutional selling across banking majors, private lenders, and IT exporters...',
  },
  {
    id: 'news-4',
    slug: 'dalal-street-eyes-bounce-after-selloff-surging-crude',
    title: 'Dalal Street Eyes a Bounce After the Selloff, but Surging Crude Could Cap the Rally',
    date: 'October 9, 2026',
    category: 'NEWS',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    brief: 'Market analysts anticipate technical relief rallies following four sessions of consolidation, while global energy supply bottlenecks remain a primary headwind.',
    excerpt: 'Indian equities look set to open higher on Friday, with the benchmark indexes expected to claw back some ground after aggressive profit booking. However, surging international crude prices may limit upsides...',
  },
  {
    id: 'news-5',
    slug: 'airtel-bharti-satellite-broadband-spectrum-allocation',
    title: 'Telecom & Broadband Infrastructure: Satellite High-Throughput Spectrum Allocation Across Emerging Markets',
    date: 'October 9, 2026',
    category: 'NEWS',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    brief: 'Regulatory bodies advance statutory guidelines for non-terrestrial telecommunication networks, paving the way for commercial gigabit satellite internet services.',
    excerpt: 'The telecommunications sector is witnessing aggressive capex allocations as sovereign regulators finalize spectrum frameworks for low-earth-orbit satellite constellation operators and mobile telcos...',
  },
  {
    id: 'news-6',
    slug: 'jiohotstar-enters-middle-east-through-starzplay-partnerships',
    title: 'Global Streaming Expansion: JioHotstar Enters the Middle East Through Strategic STARZPLAY Distribution Deals',
    date: 'October 9, 2026',
    category: 'NEWS',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=80',
    brief: 'Strategic media conglomerates leapfrog standalone rollout barriers by integrating direct regional content libraries with established Middle Eastern distribution networks.',
    excerpt: 'In a decisive cross-border streaming maneuver, the entertainment conglomerate has officially inked licensing agreements to distribute premium Indian sports and original series across MENA regions...',
  },
  {
    id: 'news-7',
    slug: 'fintech-stocks-slump-paytm-digital-payment-fee-delays',
    title: 'Fintech Stocks Slump: Digital Payment Majors Face Pressure as UPI Fee Uncertainty Rattles Institutional Investors',
    date: 'October 8, 2026',
    category: 'NEWS',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=800&auto=format&fit=crop&q=80',
    brief: 'Payment service providers experience sharp declines on Dalal Street amid prolonged discussions regarding merchant discount rates and digital transaction subsidies.',
    excerpt: 'Shares of listed payment companies sold off sharply on Thursday as prolonged deliberations over merchant fee structures and sovereign subsidy caps cast uncertainty over bottom-line monetisation models...',
  },
  {
    id: 'news-8',
    slug: 'amazon-trims-corporate-jobs-stores-division-india-uk',
    title: 'Global Tech Rebalancing: Amazon Trims Corporate Headcount in Stores Division Across India and UK Operations',
    date: 'October 8, 2026',
    category: 'NEWS',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    brief: 'E-commerce and cloud conglomerates reallocate corporate expenditures toward artificial intelligence and automated fulfilment networks, scaling back traditional administrative teams.',
    excerpt: 'The global e-commerce powerhouse has initiated targeted workforce adjustments across its retail and consumer hardware divisions, prioritizing automated robotic sorting centers and AI-driven supply networks...',
  },
];

export const STARTUPS_SIDEBAR_DATA = {
  featured: {
    slug: 'nexora-wealth-algorithmic-portfolio-hedging',
    title: 'Nexora Wealth: Democratizing Algorithmic Portfolio Risk Management for Modern Investors',
    categoryTag: 'VENTURE PROFILE',
    date: 'October 11, 2026',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Financial market volatility demands sophisticated risk mitigation. Nexora Wealth bridges the institutional-retail divide with automated multi-factor portfolio rebalancing and volatility analytics...',
  },
  list: [
    {
      slug: 'artisan-roastery-heritage-supply-chains',
      title: 'Heritage Roasters: Scaling Four Decades of Artisanal Coffee Export Networks',
      date: 'September 18, 2026',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'cognitivelabs-edtech-stem-curriculums',
      title: 'CognitiveLabs EdTech: Next-Gen Adaptive STEM Curriculums for Digital Classrooms',
      date: 'August 24, 2026',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'zenith-hyperlocal-fmcg-cold-chains',
      title: 'Zenith Hyperlocal: Re-Engineering Regional FMCG Cold Chains with Micro-Fulfillment',
      date: 'July 19, 2026',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const RECENT_POSTS_SIDEBAR = [
  {
    slug: 'autonomous-enterprise-decision-swarms-operating-model',
    title: 'The Autonomous Enterprise: How AI Decision Swarms Are Rewriting Corporate Operating Models in 2026',
    date: 'October 12, 2026',
  },
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
];

export default function CategoryNewsView() {
  const [activePage, setActivePage] = useState<number>(1);
  const [briefModalArticle, setBriefModalArticle] = useState<typeof NEWS_ARTICLES_DATA[0] | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* 2. MAIN CONTAINER: Left (8 Cols) | Right Sidebar (4 Cols) */}

      {/* ========================================================= */}
      {/* 2. MAIN CONTAINER: Left (8 Cols) | Right Sidebar (4 Cols)  */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Section Heading: BROWSING: NEWS (with Left Red Vertical Accent Bar) */}
        <div className="flex items-center gap-2.5 mb-8 pb-3 border-b border-slate-200">
          <span className="w-1.5 h-6 bg-[#DC2626] inline-block" />
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight font-sans">
            BROWSING: NEWS
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN (LG: 8 COLS): EDITORIAL OVERVIEW + NEWS GRID */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            
            {/* Editorial Overview Section */}
            <div className="mb-8">
              {/* Top Banner Caption */}
              <div className="text-center mb-4">
                <span className="text-xs text-slate-400 font-sans italic">
                  News — The Enterprise Chronicle | Best Business magazine In India
                </span>
              </div>

              {/* Title with Highlighted News tag */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
                <mark className="bg-[#FFFF00] text-slate-900 px-1 py-0.5 rounded-none font-black mr-1">
                  News
                </mark>{' '}
                – The Enterprise Chronicle | Best Business Magazine In India
              </h2>

              {/* 4 Editorial Paragraphs */}
              <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-normal">
                <p>
                  <strong>The Enterprise Chronicle</strong> is a trusted source of news for businesses of all sizes and industries. With a focus on delivering timely, authoritative, and audit-verified information, the magazine keeps readers up-to-date with the latest developments, regulatory reforms, and macro trends in the business world.
                </p>
                <p>
                  The news section of <strong>The Enterprise Chronicle</strong> covers a wide range of topics, including industry updates, sovereign fiscal policy, market trends, executive leadership pivots, and venture funding. The magazine&apos;s team of experienced business journalists and sector analysts ensures that the news section is accurate, reliable, and unbiased, providing readers with a comprehensive understanding of the business landscape.
                </p>
                <p>
                  In addition to its print and digital magazine editions, <strong>The Enterprise Chronicle</strong> also offers various digital resources, including its real-time web portal, executive lounge interviews, and curated newsletters. These resources provide business leaders with continuous access to the latest news, as well as actionable insights and in-depth data analysis.
                </p>
                <p>
                  Overall, <strong>The Enterprise Chronicle&apos;s</strong> news desk is a strategic asset for business professionals looking to stay ahead of market disruptions and make informed decisions. Its timely and objective coverage of the latest developments helps leaders adapt to macroeconomic shifts and capture high-velocity growth opportunities.
                </p>
              </div>
            </div>

            {/* ===================================================== */}
            {/* 2-COLUMN NEWS ARTICLES GRID (8 CARDS TOTAL)           */}
            {/* ===================================================== */}
            <div className="pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                {NEWS_ARTICLES_DATA.map((article) => (
                  <article key={article.id} className="group flex flex-col justify-between">
                    <div>
                      {/* 16:9 Thumbnail with BigNews! Badge */}
                      <Link href={`/article/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100 border border-slate-200 mb-3">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* BigNews! Badge */}
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

                      {/* Meta: NEWS — [Date] in Red */}
                      <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold">
                        <Link
                          href="/category/news"
                          className="text-[#DC2626] uppercase font-bold tracking-wider hover:underline transition-colors"
                          title="View all News dispatches"
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

                    {/* Quick Brief Button on Click (User requested: "text pr click karu toh brief aye") */}
                    <div className="mt-3.5 pt-2 flex items-center justify-between">
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
            </div>

            {/* ===================================================== */}
            {/* RESPONSIVE PAGINATION (Matches Reference Screenshot)  */}
            {/* ===================================================== */}
            <div className="mt-10 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                {/* Page Buttons List */}
                <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                  {/* Prev Button (<) */}
                  <button
                    onClick={() => {
                      if (activePage > 1) {
                        setActivePage((p) => p - 1);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
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

                  {/* Page 1 */}
                  <button
                    onClick={() => {
                      setActivePage(1);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 1
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    1
                  </button>

                  {/* Page 2 */}
                  <button
                    onClick={() => {
                      setActivePage(2);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 2
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    2
                  </button>

                  {/* Page 3 */}
                  <button
                    onClick={() => {
                      setActivePage(3);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 3
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    3
                  </button>

                  {/* Ellipsis (...) */}
                  <span className="px-1 text-slate-400 text-xs select-none">
                    …
                  </span>

                  {/* Last Page (305) */}
                  <button
                    onClick={() => {
                      setActivePage(305);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className={`min-w-[36px] h-8 sm:min-w-[42px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 305
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    305
                  </button>

                  {/* Next Button (>) */}
                  <button
                    onClick={() => {
                      if (activePage < 305) {
                        setActivePage((p) => p + 1);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }
                    }}
                    disabled={activePage === 305}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      activePage === 305
                        ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                        : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                    aria-label="Next page"
                  >
                    &gt;
                  </button>
                </div>

                {/* Mobile / Desktop Status Text */}
                <div className="text-[11.5px] text-slate-500 font-medium">
                  Page <strong className="text-slate-800 font-bold">{activePage}</strong> of <strong className="text-slate-800 font-bold">305</strong>
                </div>

              </div>
            </div>

          </main>

          {/* ======================================================= */}
          {/* RIGHT SIDEBAR (LG: 4 COLS): STARTUP'S | RECENT | COVER  */}
          {/* ======================================================= */}
          <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-slate-200 lg:pl-7">
            
            {/* WIDGET 1: STARTUP'S */}
            <div className="border border-slate-200 p-4 bg-white">
              {/* Header with Top Black Line */}
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  STARTUP&apos;S
                </h3>
              </div>

              {/* Featured Lead Item */}
              <article className="group mb-5 pb-5 border-b border-slate-200">
                <Link
                  href={`/article/${STARTUPS_SIDEBAR_DATA.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={STARTUPS_SIDEBAR_DATA.featured.image}
                    alt={STARTUPS_SIDEBAR_DATA.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${STARTUPS_SIDEBAR_DATA.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {STARTUPS_SIDEBAR_DATA.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href="/category/lounge-interview"
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {STARTUPS_SIDEBAR_DATA.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {STARTUPS_SIDEBAR_DATA.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {STARTUPS_SIDEBAR_DATA.featured.excerpt}
                </p>
              </article>

              {/* 3 Compact List Items (Thumbnail Left, Title Right) */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {STARTUPS_SIDEBAR_DATA.list.map((item, idx) => (
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
              {/* Header with Top Black Line */}
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  RECENT POSTS
                </h3>
              </div>

              {/* List of text items with dates */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {RECENT_POSTS_SIDEBAR.map((post, idx) => (
                  <div key={post.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link href={`/article/${post.slug}`} className="block group">
                      <h5 className="font-bold text-xs leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 sm:line-clamp-3 break-words">
                        {post.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 font-normal block mt-1">
                        {post.date}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 3: PRINT MAGAZINE COVER */}
            <div className="border border-slate-200 p-2.5 bg-white overflow-hidden">
              <Link
                href="/magazine"
                className="block group relative overflow-hidden hover:shadow-lg transition-shadow"
                title="Read Full E-Magazine Edition"
              >
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
                  alt="The Enterprise Chronicle Print Edition"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <BookOpen className="w-4 h-4 text-[#DC2626]" />
                    <span>View Print Magazine Issue →</span>
                  </div>
                </div>
              </Link>
            </div>

          </aside>

        </div>

      </div>

      {/* ========================================================= */}
      {/* QUICK BRIEF MODAL (When clicking "Quick Executive Brief") */}
      {/* ========================================================= */}
      {briefModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-sm shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Executive Brief
                </h4>
              </div>
              <button
                onClick={() => setBriefModalArticle(null)}
                className="text-slate-400 hover:text-white p-1 transition-colors"
                aria-label="Close brief"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-3.5">
              <span className="text-[10.5px] font-bold text-[#DC2626] uppercase tracking-wider">
                {briefModalArticle.category} — {briefModalArticle.date}
              </span>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {briefModalArticle.title}
              </h3>

              <div className="p-3.5 bg-slate-50 border-l-4 border-[#DC2626] text-xs text-slate-700 leading-relaxed font-medium">
                {briefModalArticle.brief}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {briefModalArticle.excerpt}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setBriefModalArticle(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>

              <Link
                href={`/article/${briefModalArticle.slug}`}
                className="px-4 py-2 bg-black hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                Read Full Story →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
