'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Mic, ArrowRight, Video, Sparkles } from 'lucide-react';
import { Article } from '@/types';

interface CXOInterviewSpotlightProps {
  articles: Article[];
}

export default function CXOInterviewSpotlight({ articles }: CXOInterviewSpotlightProps) {
  const interviews = articles
    .filter((a) => a.category.toLowerCase().includes('interview') || a.subcategory.toLowerCase().includes('dialogue'))
    .slice(0, 3);

  if (interviews.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1">
                <Mic className="w-3 h-3 text-rose-500" />
                The CXO Studio
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Executive Dialogues & Video Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Unfiltered, sit-down conversations with corporate chairpersons and venture partners
            </p>
          </div>
          <Link
            href="/category/interviews"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider"
          >
            All Executive Dialogues <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interviews.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group block rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 overflow-hidden transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-blue-600 text-slate-900 group-hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-sm">
                  Executive Brief
                </div>
              </div>

              <div className="p-5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 mb-1.5 block">
                  {article.subcategory}
                </span>
                <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Host: {article.author.name}</span>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    Watch Dialogue →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
