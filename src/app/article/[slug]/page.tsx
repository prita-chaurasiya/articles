'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Clock,
  MessageSquare,
  Home as HomeIcon,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate } from '@/lib/utils';
import { getCoverStoryOrSidebarArticle } from '@/data/coverStoryArticles';

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

function PinterestIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.154-1.498-.697-2.435-2.889-2.435-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

// Sidebar: STARTUP'S Widget Data
const SIDEBAR_STARTUPS = {
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

// Sidebar: RECENT POSTS Widget Data
const SIDEBAR_RECENT_POSTS = [
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

// KEEP READING: 6 Related Cards (3x2 Grid)
const KEEP_READING_ITEMS = [
  {
    slug: 'autonomous-enterprise-decision-swarms-operating-model',
    title: 'The Autonomous Enterprise: How AI Decision Swarms Are Rewriting Corporate Operating Models in 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
  },
  {
    slug: 'small-teams-billion-dollar-companies-playbook-ai-era',
    title: 'Small Teams, Billion-Dollar Companies: The 2026 Playbook for the AI Era',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80',
  },
  {
    slug: 'how-india-used-goods-market-is-becoming-formal-business',
    title: 'How India’s Used-Goods Market Is Becoming a Formal Business Economy',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80',
  },
  {
    slug: 'the-business-opportunity-hidden-inside-india-repair-economy',
    title: 'The Business Opportunity Hidden Inside India’s High-Tech Repair Economy',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
  },
  {
    slug: 'the-next-big-indian-consumer-rising-spending-power-young',
    title: 'The Next Big Indian Consumer: Understanding the Rising Spending Power of Gen-Z',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500&auto=format&fit=crop&q=80',
  },
  {
    slug: 'the-business-of-india-night-economy-what-wins-after-10pm',
    title: 'The Business of India’s Night Economy: What Wins in Commercial Corridors After 10 PM?',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=80',
  },
];

export default function ArticlePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white py-24 text-center text-slate-500 font-medium">Loading article...</div>}>
      <ArticleContent />
    </React.Suspense>
  );
}

function ArticleContent() {
  const routerParams = useParams();
  const slug = (routerParams?.slug as string) || '';

  const {
    articles,
    incrementViews,
    toggleBookmark,
    bookmarkedSlugs,
    addComment,
  } = useArticleStore();

  const [copiedLink, setCopiedLink] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const article = articles.find((a) => a.slug === slug) || getCoverStoryOrSidebarArticle(slug);

  useEffect(() => {
    if (article) {
      incrementViews(article.slug);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
          Article Not Found
        </h2>
        <p className="text-slate-600 mb-8">
          The requested dispatch may have been archived or updated.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#DC2626] text-white rounded text-xs font-bold uppercase tracking-wider"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  const isSaved = bookmarkedSlugs.includes(article.slug);
  const categoryHref = `/category/${article.categorySlug || 'news'}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName && commentContent) {
      addComment(article.slug, {
        authorName: commentName,
        authorEmail: commentEmail,
        content: commentContent,
      });
      setCommentContent('');
      setCommentName('');
      setCommentEmail('');
      setCommentSubmitted(true);
      setTimeout(() => setCommentSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ========================================================= */}
        {/* MAIN 12-COL GRID: Left 8 Cols | Right Sidebar 4 Cols       */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* ======================================================= */}
          {/* LEFT 8 COLUMNS: MAIN ARTICLE BODY                       */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            
            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black text-slate-900 leading-tight tracking-tight mb-3 font-sans">
              {article.title}
            </h1>

            {/* Meta Row: By admin — [Date] [CATEGORY] 💬 Comments ⏱ ReadTime */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-600 mb-5 font-normal">
              <span>
                By <strong className="font-bold text-slate-900">{article.author?.name || 'admin'}</strong>
              </span>
              <span className="text-slate-400">—</span>
              <span className="text-slate-600">
                {formatDate(article.publishedAt)}
              </span>

              {/* Solid Red Badge with white text */}
              <Link
                href={categoryHref}
                className="inline-block bg-[#DC2626] hover:bg-red-700 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 tracking-wider transition-colors ml-1 shadow-xs"
                title={`View all ${article.category} dispatches`}
              >
                {article.category}
              </Link>

              <span className="inline-flex items-center gap-1 text-slate-500 ml-1">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                {article.comments?.length || 0} Comments
              </span>

              <span className="inline-flex items-center gap-1 text-slate-500 ml-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTime}
              </span>
            </div>

            {/* Hero Image with BigNews! Badge */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-6">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-black/85 text-amber-300 font-extrabold text-[10px] px-2.5 py-1 tracking-wider uppercase shadow-md border border-amber-400/30">
                BigNews!
              </span>
            </div>

            {/* Article Body Content */}
            <div className="text-slate-800 font-sans text-sm sm:text-[14.5px] leading-relaxed space-y-4 font-normal">
              {article.content
                .split('\n\n')
                .map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  // H3 / H2 Section Heading
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h2
                        key={index}
                        className="text-xl sm:text-[22px] font-bold text-slate-900 pt-5 pb-1 leading-snug tracking-tight"
                      >
                        {trimmed.replace('### ', '')}
                      </h2>
                    );
                  }

                  // H4 Subheading
                  if (trimmed.startsWith('#### ')) {
                    return (
                      <h3
                        key={index}
                        className="text-base sm:text-lg font-bold text-slate-900 pt-3 pb-1 leading-snug"
                      >
                        {trimmed.replace('#### ', '')}
                      </h3>
                    );
                  }

                  // Blockquote
                  if (trimmed.startsWith('> ')) {
                    return (
                      <blockquote
                        key={index}
                        className="my-5 p-4 bg-slate-50 border-l-4 border-[#DC2626] font-serif text-base sm:text-lg italic text-slate-800"
                      >
                        {trimmed.replace('> ', '')}
                      </blockquote>
                    );
                  }

                  // Divider
                  if (trimmed === '---') {
                    return <hr key={index} className="my-6 border-slate-200" />;
                  }

                  // Table
                  if (trimmed.includes('|')) {
                    const rows = trimmed.split('\n').filter((r) => !r.includes(':---'));
                    return (
                      <div key={index} className="overflow-x-auto my-5 border border-slate-200">
                        <table className="w-full text-xs sm:text-sm text-left">
                          <tbody>
                            {rows.map((row, rIdx) => {
                              const cells = row.split('|').filter((c) => c.trim().length > 0);
                              return (
                                <tr key={rIdx} className={rIdx === 0 ? 'bg-slate-100 font-bold text-slate-900' : 'border-t border-slate-200'}>
                                  {cells.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-4 py-2.5">
                                      {cell.trim()}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  // Normal paragraph or list
                  const lines = trimmed.split('\n');
                  return (
                    <div key={index} className="leading-relaxed text-slate-700 space-y-1">
                      {lines.map((line, lIdx) => {
                        const isBullet = line.trim().startsWith('- ');
                        const contentToParse = isBullet ? line.trim().slice(2) : line;
                        const parts = contentToParse.split(/(\*\*.*?\*\*)/g);

                        const formattedSpans = parts.map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={pIdx} className="font-bold text-slate-900">
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return part;
                        });

                        if (isBullet) {
                          return (
                            <div key={lIdx} className="flex items-start gap-2 pl-2">
                              <span className="text-slate-400 font-bold">•</span>
                              <span className="flex-1">{formattedSpans}</span>
                            </div>
                          );
                        }

                        return (
                          <p key={lIdx} className="leading-relaxed">
                            {formattedSpans}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
            </div>

            {/* Google News Callout in Signature Red */}
            <div className="my-6 pt-3">
              <a
                href="#"
                className="text-base sm:text-[17px] font-black text-[#DC2626] hover:underline"
              >
                Add Business Walkins magazine to your Google News feed
              </a>
            </div>

            {/* Read Also Section */}
            <div className="my-6 pt-2">
              <h4 className="font-bold text-base text-slate-900 mb-2">
                Read Also:
              </h4>
              <ul className="space-y-1.5 text-sm font-bold text-[#DC2626]">
                <li>
                  • <Link href="/magazine" className="hover:underline">Best business magazine in India</Link>
                </li>
                <li>
                  • <Link href="/" className="hover:underline">Business Magazine in India</Link>
                </li>
                <li>
                  • <Link href="/category/news" className="hover:underline">Top Best business magazine in India</Link>
                </li>
              </ul>
            </div>

            {/* Author Bio Box with Social Icons */}
            <div className="border-t border-b border-slate-200 py-4 my-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm sm:text-base text-slate-900">
                  {article.author?.name || 'admin'}
                </span>
                <div className="flex items-center gap-3 text-slate-600">
                  <Link href="/" title="Home" className="hover:text-[#DC2626] transition-colors">
                    <HomeIcon className="w-3.5 h-3.5" />
                  </Link>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-[#DC2626] transition-colors">
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" title="X / Twitter" className="hover:text-[#DC2626] transition-colors">
                    <XIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" title="Pinterest" className="hover:text-[#DC2626] transition-colors">
                    <PinterestIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:text-[#DC2626] transition-colors">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-[#DC2626] transition-colors">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed font-normal">
                {article.author?.bio || 'Admin is a Senior Digital Marketing & Editorial Executive at Business Walkins. With expertise in digital research and industry insights, leads strategic brand analysis and thought leadership coverage across emerging business corridors.'}
              </p>
            </div>

            {/* ===================================================== */}
            {/* KEEP READING: 6 Cards in 3x2 Grid                     */}
            {/* ===================================================== */}
            <div className="my-8">
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-sm uppercase tracking-tight text-slate-900">
                  KEEP READING
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {KEEP_READING_ITEMS.map((item) => (
                  <article key={item.slug} className="group">
                    <Link href={`/article/${item.slug}`} className="block">
                      <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="font-bold text-xs sm:text-[13px] text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-10 pt-6 border-t border-slate-200">
              <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#DC2626]" />
                Leave a Reply ({article.comments?.length || 0})
              </h3>

              <form onSubmit={handleCommentSubmit} className="space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    required
                    className="px-3.5 py-2 border border-slate-300 text-xs focus:outline-none focus:border-slate-800"
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="px-3.5 py-2 border border-slate-300 text-xs focus:outline-none focus:border-slate-800"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Your Comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 border border-slate-300 text-xs focus:outline-none focus:border-slate-800"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-black hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Post Comment
                </button>
                {commentSubmitted && (
                  <p className="text-xs font-semibold text-emerald-600 mt-2">
                    Comment submitted successfully.
                  </p>
                )}
              </form>
            </div>

          </main>

          {/* ======================================================= */}
          {/* RIGHT 4 COLUMNS: SIDEBAR (STARTUP'S | RECENT | COVER)   */}
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
                  href={`/article/${SIDEBAR_STARTUPS.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={SIDEBAR_STARTUPS.featured.image}
                    alt={SIDEBAR_STARTUPS.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${SIDEBAR_STARTUPS.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {SIDEBAR_STARTUPS.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href="/category/lounge-interview"
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {SIDEBAR_STARTUPS.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {SIDEBAR_STARTUPS.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {SIDEBAR_STARTUPS.featured.excerpt}
                </p>
              </article>

              {/* 3 Compact List Items */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {SIDEBAR_STARTUPS.list.map((item, idx) => (
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
                {SIDEBAR_RECENT_POSTS.map((post, idx) => (
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
                  alt="Business Walkins Executive Issue"
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
    </div>
  );
}
