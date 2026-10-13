'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Eye, TrendingUp, ArrowRight, Award } from 'lucide-react';
import { Article } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';
import { SidebarCard, SmallVerticalCard } from '@/components/common/ArticleCards';

interface PopularAndMostReadProps {
  articles: Article[];
}

export default function PopularAndMostRead({ articles }: PopularAndMostReadProps) {
  // Sort by views descending for Most Read
  const mostReadArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  // Trending / Popular articles
  const popularArticles = articles.filter((a) => a.isTrending || a.isFeatured).slice(0, 4);

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT: POPULAR ARTICLES (8 COLS)                          */}
          {/* ======================================================== */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-3.5 mb-6 border-b-2 border-slate-900">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]"></span>
                <Link href="/news" className="hover:text-[#DC2626] transition-colors">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 hover:text-[#DC2626] transition-colors tracking-tight uppercase">
                    Popular Articles
                  </h3>
                </Link>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Audience Favorites
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {popularArticles.map((art) => (
                <div
                  key={art.id}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all p-4 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/article/${art.slug}`} className="block relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-900 mb-3">
                      <img
                        src={art.heroImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#DC2626] text-white text-[9px] font-black uppercase rounded shadow">
                        {art.category}
                      </div>
                    </Link>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                      <span>{formatDate(art.publishedAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-rose-600 font-bold">
                        <Flame className="w-3 h-3" />
                        {formatNumber(art.views)} reads
                      </span>
                    </div>

                    <Link href={`/article/${art.slug}`}>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h4>
                    </Link>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>By {art.author.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:text-[#DC2626] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: MOST READ LEADERBOARD (4 COLS)                    */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-slate-900">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#DC2626]" />
                <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight uppercase">
                  Most Read
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                This Week
              </span>
            </div>

            <div className="space-y-1">
              {mostReadArticles.map((art, idx) => (
                <SidebarCard key={art.id} article={art} rank={idx + 1} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
