'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Eye, ArrowUpRight, Clock } from 'lucide-react';
import { Article } from '@/types';
import { formatNumber } from '@/lib/utils';

interface TrendingStoriesProps {
  articles: Article[];
}

export default function TrendingStories({ articles }: TrendingStoriesProps) {
  const trendingList = articles
    .filter((a) => a.isTrending)
    .slice(0, 5);

  if (trendingList.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Trending Stories Across the Enterprise
              </h2>
              <p className="text-xs text-slate-400">
                Highest reader engagement, institutional shares, and boardroom commentary
              </p>
            </div>
          </div>
          <Link
            href="/#fresh-stories"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            All Trending <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Column Numbered Cards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingList.map((article, index) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group block relative p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition-all duration-200"
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-serif text-3xl font-black text-slate-600 group-hover:text-blue-400 transition-colors">
                  0{index + 1}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/60">
                  {article.category}
                </span>
              </div>

              <h3 className="font-serif text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-3 mb-4 leading-snug">
                {article.title}
              </h3>

              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate mr-2 text-slate-300">{article.author.name}</span>
                <span className="flex items-center gap-1 shrink-0 text-slate-400">
                  <Eye className="w-3 h-3" />
                  {formatNumber(article.views)}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
