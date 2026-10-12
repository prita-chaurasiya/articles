'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Article } from '@/types';
import { LargeFeaturedCard, MediumHorizontalCard, SmallVerticalCard } from '@/components/common/ArticleCards';

interface BusinessLatestNewsProps {
  articles: Article[];
}

export default function BusinessLatestNews({ articles }: BusinessLatestNewsProps) {
  // Sort articles descending by publication date
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const leadNews = sortedArticles[0];
  const secondaryNews = sortedArticles.slice(1, 4);
  const gridNews = sortedArticles.slice(4, 8);

  if (!leadNews) return null;

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3.5 mb-8 border-b-2 border-slate-900">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]"></span>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                Business Magazine Latest News
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Up-to-the-minute executive dispatches, global markets & strategic shifts
              </p>
            </div>
          </div>

          <Link
            href="/#fresh-stories"
            className="text-xs font-bold text-[#DC2626] hover:text-slate-900 flex items-center gap-1 uppercase tracking-wider transition-colors shrink-0"
          >
            <span>Continuous Feed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Top Split: 1 Large + 3 Stacked Horizontal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          <div className="lg:col-span-7">
            <LargeFeaturedCard article={leadNews} />
          </div>
          <div className="lg:col-span-5 space-y-4">
            {secondaryNews.map((art) => (
              <MediumHorizontalCard key={art.id} article={art} />
            ))}
          </div>
        </div>

        {/* Bottom 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
          {gridNews.map((art) => (
            <SmallVerticalCard key={art.id} article={art} />
          ))}
        </div>

      </div>
    </section>
  );
}
