'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Clock, Eye, ArrowRight, Share2, Bookmark, Sparkles } from 'lucide-react';
import { Article } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';
import { useArticleStore } from '@/store/useArticleStore';

interface LatestStoriesStreamProps {
  articles: Article[];
}

export default function LatestStoriesStream({ articles }: LatestStoriesStreamProps) {
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

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') {
      return articles;
    }
    return articles.filter(
      (a) =>
        a.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        a.subcategory.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [articles, selectedCategory]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  return (
    <section id="latest-stories" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filter Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Continuous Stream
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Latest Stories & Enterprise Wire
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time journalism, executive investigations, and market movements
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
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === tab
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Editorial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article) => {
            const isSaved = bookmarkedSlugs.includes(article.slug);

            return (
              <article
                key={article.id}
                className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Card Thumbnail */}
                  <Link href={`/article/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm">
                        {article.category}
                      </span>
                      {article.isFeatured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>

                    <Link href={`/article/${article.slug}`}>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-6 h-6 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {article.author.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(article.slug)}
                      className={`p-1.5 rounded-md hover:bg-slate-200 transition-colors ${
                        isSaved ? 'text-blue-600' : 'text-slate-400'
                      }`}
                      aria-label="Bookmark article"
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                    <Link
                      href={`/article/${article.slug}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredArticles.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all shadow-sm"
            >
              Load More Stories ({filteredArticles.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
