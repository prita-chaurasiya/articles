'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, X, Sparkles, ArrowRight } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate } from '@/lib/utils';
import EditorialPagination from '@/components/common/EditorialPagination';

export const BLOG_ARTICLES_DATA = [
  {
    id: 'blog-1',
    slug: 'autonomous-enterprise-decision-swarms-operating-model',
    title: 'The Autonomous Enterprise: How AI Decision Swarms Are Rewriting Corporate Operating Models in 2026',
    date: 'October 12, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    brief: 'The Autonomous Enterprise: How AI Decision Swarms Are Rewriting Corporate Operating Models in 2026. Examining how self-orchestrating agent fabrics streamline supply chain routing, treasury management, and audit telemetry.',
    excerpt: 'Corporate agility is no longer constrained by organizational headcount. Examining how forward-thinking enterprises deploy autonomous multi-agent fabrics across finance, supply chain, and compliance operations...',
  },
  {
    id: 'blog-2',
    slug: 'small-teams-billion-dollar-companies-playbook-ai-era',
    title: 'Lean Titans: The 2026 Playbook for Building High-Margin Billion-Dollar Software Ventures',
    date: 'October 9, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'In-House Blog',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    brief: 'Lean Titans: The 2026 Playbook for Building High-Margin Billion-Dollar Software Ventures. WhatsApp had just 35 engineers when Facebook acquired it. Today, autonomous multi-agent systems allow 15-person teams to scale to global enterprise valuation.',
    excerpt: 'Why extreme capital efficiency and developer leverage have replaced bloated venture rounds as the gold standard of sustainable tech entrepreneurship in the modern AI economy...',
  },
  {
    id: 'blog-3',
    slug: 'how-india-used-goods-market-is-becoming-formal-business',
    title: 'How India’s Circular Recommerce Sector Is Becoming a Formal Multi-Billion Business Economy',
    date: 'October 6, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'In-House Blog',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    brief: 'How India\'s Circular Recommerce Sector Is Becoming a Formal Business. If you plan to buy certified pre-owned vehicles or refurbished electronics, warranty-backed recommerce networks have permanently changed the consumer landscape.',
    excerpt: 'From certified refurbished electronics to industrial machinery refurbishment, warranty-backed circular platforms are capturing middle-class consumer loyalty and massive enterprise margins...',
  },
  {
    id: 'blog-4',
    slug: 'the-business-opportunity-hidden-inside-india-repair-economy',
    title: 'The Multi-Crore Business Opportunity Hidden Inside India’s Precision Hardware & Repair Economy',
    date: 'October 6, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'In-House Blog',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    brief: 'The Business Opportunity Hidden Inside India\'s Repair Economy. Right-to-repair reforms and component-level board restorations are creating massive B2B maintenance enterprise value.',
    excerpt: 'Component-level board restoration, battery cell rejuvenation, and right-to-repair frameworks are converting domestic hardware servicing into high-margin recurring enterprise revenue...',
  },
  {
    id: 'blog-5',
    slug: 'the-next-big-indian-consumer-rising-spending-power-young',
    title: 'The Next Big Consumer Shift: Understanding the Rising Purchasing Power and Digital Habits of Gen-Z',
    date: 'October 3, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'In-House Blog',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80',
    brief: 'Young Indian consumers are prioritizing experiential spending, clean-label personal care, and quick-commerce speed, redefining CMO marketing budgets.',
    excerpt: 'Young Indian consumers are prioritizing experiential spending, clean-label formulation, and quick-commerce fulfillment, fundamentally rewriting the modern Chief Marketing Officer playbook...',
  },
  {
    id: 'blog-6',
    slug: 'the-business-of-india-night-economy-what-wins-after-10pm',
    title: 'The Business of India’s Night Economy: What Wins in Commercial Corridors After 10 PM?',
    date: 'September 28, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'In-House Blog',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80',
    brief: 'Metro municipal corporations are loosening nocturnal trading restrictions, unleashing a vibrant economy that powers quick delivery hubs, coworking lounges, and 24-hour food enclaves.',
    excerpt: 'State governments loosening nocturnal trading restrictions have sparked an unprecedented surge in 24-hour cloud fulfillment kitchens, automated co-working hubs, and continuous logistics routes...',
  },
  {
    id: 'blog-7',
    slug: 'e-magazine-b2b-publishing-enterprise-growth-playbook',
    title: 'E-Magazine Publishing in the Digital Age: How High-Value B2B Journalism Drives Enterprise Growth',
    date: 'September 22, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'In-House Blog',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
    brief: 'Digital business publications have transformed from static PDFs into interactive multimedia platforms. How B2B media brands combine deep investigative profiles with sovereign digital circulation to foster enterprise trust.',
    excerpt: 'Digital business publications have transformed from static PDFs into interactive multimedia platforms. How B2B media brands combine deep investigative profiles with sovereign digital circulation...',
  },
  {
    id: 'blog-8',
    slug: 'from-friends-to-founders-bootstrapped-enterprise-scaling',
    title: 'From Friends to Founders: The Incredible Stories Behind High-Growth Bootstrapped Ventures',
    date: 'August 4, 2026',
    category: 'BLOG',
    categorySlug: 'blog',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    brief: 'From Friends to Founders: The Incredible Stories Behind India\'s Biggest Startup Successes. Some people find a business partner. Others build lasting technology empires alongside college dormmates and childhood confidants.',
    excerpt: 'Some people search endlessly for transactional co-founders on networking forums. Others build enduring technology empires alongside college dormmates and childhood confidants...',
  },
];

export const BLOG_SIDEBAR_DATA = {
  featured: {
    slug: 'nexora-wealth-algorithmic-portfolio-hedging',
    title: 'Nexora Wealth: Democratizing Algorithmic Portfolio Risk Management for Modern Investors',
    categoryTag: 'VENTURE PROFILE',
    categorySlug: 'blog',
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

export const BLOG_RECENT_POSTS = [
  {
    slug: 'autonomous-enterprise-decision-swarms-operating-model',
    title: 'The Autonomous Enterprise: How AI Decision Swarms Are Rewriting Corporate Operating Models in 2026',
    date: 'October 12, 2026',
  },
  {
    slug: 'small-teams-billion-dollar-companies-playbook-ai-era',
    title: 'Lean Titans: The 2026 Playbook for Building High-Margin Billion-Dollar Software Ventures',
    date: 'October 12, 2026',
  },
  {
    slug: 'eshipz-intelliproof-post-delivery-automation-focus',
    title: 'eShipz’s IntelliProof Puts Post-Delivery Automation in Focus',
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

export default function CategoryBlogView() {
  const { articles } = useArticleStore();
  const [activePage, setActivePage] = useState<number>(1);
  const [briefModalArticle, setBriefModalArticle] = useState<any>(null);

  const ITEMS_PER_PAGE = 6;

  // Filter dynamic articles published to Blog
  const dynamicBlog = useMemo(() => {
    return articles
      .filter(
        (a) =>
          a.status === 'published' &&
          (a.category?.toLowerCase() === 'blog' || a.categorySlug?.toLowerCase() === 'blog') &&
          !BLOG_ARTICLES_DATA.some((b) => b.slug === a.slug)
      )
      .map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        date: formatDate(a.publishedAt),
        category: a.category?.toUpperCase() || 'BLOG',
        categorySlug: 'blog',
        badge: a.isTrending ? 'Trending' : a.isFeatured ? 'Featured' : 'In-House Blog',
        image:
          a.heroImage ||
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        brief: a.excerpt || a.title,
        excerpt: a.excerpt || a.title,
      }));
  }, [articles]);

  const allArticles = useMemo(() => {
    return [...dynamicBlog, ...BLOG_ARTICLES_DATA];
  }, [dynamicBlog]);

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
        {/* 2-Column Main Grid Layout: Left 8 Cols | Right 4 Cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN (LG: 8 COLS): BROWSING + OVERVIEW + CARDS   */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            
            {/* Header: Red vertical accent + BROWSING: BLOG */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1.5 h-6 bg-[#DC2626] inline-block shrink-0" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase font-sans">
                BROWSING: BLOG
              </h1>
            </div>

            {/* Exact E-Magazine Overview matching user's screenshot */}
            <div className="text-slate-700 text-xs sm:text-[13px] leading-relaxed mb-8 font-normal space-y-3">
              <p>
                <strong>Business Walkins</strong> is a premier business publication that provides a wide range of analytical blogs catering to various aspects of modern corporate leadership. These dispatches cover topics such as entrepreneurship, corporate finance, enterprise technology, marketing innovation, and industry-specific insights. Here are some popular themes you might find:
              </p>

              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-[13px] mt-2.5 mb-0.5">
                  Entrepreneurship:
                </p>
                <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed">
                  Stories of visionary entrepreneurs<br />
                  Strategic frameworks for launching and scaling ventures<br />
                  Emerging market trends and venture funding playbooks
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-[13px] mt-2.5 mb-0.5">
                  Finance:
                </p>
                <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed">
                  Corporate treasury and working capital strategies<br />
                  Institutional equity and venture capital outlooks<br />
                  Macroeconomic policy and fiscal market analysis
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-[13px] mt-2.5 mb-0.5">
                  Technology:
                </p>
                <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed">
                  Autonomous enterprise AI and cloud orchestration<br />
                  Digital transformation impacts across traditional sectors<br />
                  Executive evaluations of emerging hardware and software
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-[13px] mt-2.5 mb-0.5">
                  Marketing:
                </p>
                <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed">
                  Brand positioning and omni-channel customer acquisition<br />
                  Data-driven attribution and retention economics<br />
                  B2B executive storytelling and thought leadership
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-[13px] mt-2.5 mb-0.5">
                  Industry Insights:
                </p>
                <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed">
                  Sector-specific regulatory and policy updates<br />
                  In-depth turnaround case studies and operational analyses<br />
                  Boardroom perspectives from industry leaders
                </p>
              </div>

              <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed pt-2">
                To access these editorial dispatches and case studies, explore Business Walkins’s digital archive below. These reports deliver actionable intelligence and strategic clarity to help founders and corporate leaders navigate today&apos;s dynamic global markets.
              </p>
            </div>

            {/* 2-Column Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {paginatedArticles.map((article) => (
                <article key={article.id} className="group flex flex-col justify-between">
                  <div>
                    {/* 16:10 Thumbnail with Optional BigNews! / In-House Blog Badge */}
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

                    {/* Meta: [BLOG] — [Date] in Signature Red */}
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
                  href={`/article/${BLOG_SIDEBAR_DATA.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={BLOG_SIDEBAR_DATA.featured.image}
                    alt={BLOG_SIDEBAR_DATA.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${BLOG_SIDEBAR_DATA.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {BLOG_SIDEBAR_DATA.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href={`/category/${BLOG_SIDEBAR_DATA.featured.categorySlug}`}
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {BLOG_SIDEBAR_DATA.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {BLOG_SIDEBAR_DATA.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {BLOG_SIDEBAR_DATA.featured.excerpt}
                </p>
              </article>

              {/* 3 Compact List Items */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {BLOG_SIDEBAR_DATA.list.map((item, idx) => (
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
                {BLOG_RECENT_POSTS.map((post, idx) => (
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
                Business Walkins Blog Dispatch
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
