'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Bookmark, Sparkles, Flame, Radio, Calendar, CheckCircle2 } from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { useArticleStore } from '@/store/useArticleStore';

interface FreshStoriesStreamProps {
  articles: Article[];
}

export default function FreshStoriesStream({ articles }: FreshStoriesStreamProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const { toggleBookmark, bookmarkedSlugs } = useArticleStore();

  const filterTabs = [
    'All',
    'Technology',
    'AI & Automation',
    'Finance',
    'Leadership',
    'Startups',
    'Healthcare',
    'Manufacturing',
    'Business',
  ];

  // ALWAYS sort strictly by publishedAt in descending order (newest published first)
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const timeA = new Date(a.publishedAt).getTime();
      const timeB = new Date(b.publishedAt).getTime();
      return timeB - timeA;
    });
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') {
      return sortedArticles;
    }
    return sortedArticles.filter(
      (a) =>
        a.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        a.subcategory.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [sortedArticles, selectedCategory]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  // Top 4 newest dispatches get the vibrant Fresh badge
  const isFresh = (_article: Article, index: number) => {
    return index < 4;
  };

  return (
    <section id="fresh-stories" className="py-14 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
      {/* Backwards-compatibility anchor for latest-stories links */}
      <div id="latest-stories" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-5 border-b border-slate-200 gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/60">
                Live Editorial Feed
              </span>
              <span className="text-xs text-slate-400">• Newest Dispatches First</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>Fresh Stories</span>
              <span className="hidden sm:inline-block text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {articles.length} Published
              </span>
            </h2>
            
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Real-time dispatches, executive investigations, and market movements. Automatically updated the instant a new story is published.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-semibold">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setSelectedCategory(tab);
                  setVisibleCount(9);
                }}
                className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab
                    ? 'bg-[#0F172A] text-white shadow-sm font-bold scale-[1.02]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Fresh Stories Grid */}
        {displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article, idx) => {
              const isSaved = bookmarkedSlugs.includes(article.slug);
              const freshBadge = isFresh(article, idx);

              return (
                <article
                  key={article.id}
                  className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                >
                  <div>
                    {/* Card Thumbnail */}
                    <Link
                      href={`/article/${article.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-slate-900"
                    >
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                        <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 backdrop-blur-sm shadow-sm">
                          {article.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {freshBadge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-md flex items-center gap-1 animate-pulse">
                              <Sparkles className="w-2.5 h-2.5" />
                              Fresh
                            </span>
                          )}
                          {article.isFeatured && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white shadow-sm">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                        <span className="flex items-center gap-1 text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(article.publishedAt)}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {article.companyProfile && (
                            <Link
                              href={`/success-stories/${article.slug}`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/70 text-[10px] font-bold transition-colors"
                              title={`${article.companyProfile.name} Enterprise Dossier`}
                            >
                              <img
                                src={article.companyProfile.logo}
                                alt={article.companyProfile.name}
                                className="w-3.5 h-3.5 rounded object-cover"
                              />
                              <span className="truncate max-w-[90px]">{article.companyProfile.name}</span>
                            </Link>
                          )}
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>

                      <Link href={`/article/${article.slug}`}>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2.5">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0 border border-slate-200"
                      />
                      <div className="truncate">
                        <span className="text-xs font-semibold text-slate-800 block truncate leading-tight">
                          {article.author.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {article.subcategory}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleBookmark(article.slug)}
                        className={`p-1.5 rounded-md hover:bg-slate-200 transition-colors cursor-pointer ${
                          isSaved ? 'text-blue-600' : 'text-slate-400'
                        }`}
                        aria-label="Bookmark article"
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>

                      <Link
                        href={`/article/${article.slug}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Radio className="w-10 h-10 text-slate-400 mx-auto mb-3 animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
              No stories found in this beat
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Try switching categories or view all fresh stories published across the publication.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              View All Fresh Stories
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredArticles.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <span>Load More Fresh Stories</span>
              <span className="text-[11px] font-mono text-slate-500">
                ({filteredArticles.length - visibleCount} remaining)
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
