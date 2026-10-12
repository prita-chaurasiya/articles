'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, ArrowRight, ShieldCheck, Eye, Clock } from 'lucide-react';
import { Article } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';

interface EditorsPicksProps {
  articles: Article[];
}

export default function EditorsPicks({ articles }: EditorsPicksProps) {
  const picks = articles
    .filter((a) => a.isEditorPick)
    .slice(0, 4);

  if (picks.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Curated Journalism
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Editor's Picks: High-Impact Dispatches
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Deep investigative inquiries and long-form analytical essays hand-selected by the editorial board
            </p>
          </div>
          <Link
            href="/#fresh-stories"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase tracking-wider"
          >
            All Editorials <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {picks.map((article) => (
            <div
              key={article.id}
              className="group bg-slate-800/80 rounded-2xl border border-slate-700/80 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <Link href={`/article/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 text-blue-300 border border-blue-400/30">
                      {article.category}
                    </span>
                  </div>
                </Link>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>

                  <Link href={`/article/${article.slug}`}>
                    <h3 className="font-serif text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 leading-snug mb-2">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-700/50 mt-2">
                <span className="text-xs text-slate-400 truncate mr-2">
                  By {article.author.name}
                </span>
                <Link
                  href={`/article/${article.slug}`}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0"
                >
                  Read <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
