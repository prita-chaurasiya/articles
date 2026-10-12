'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Eye, Sparkles, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { Article } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';

interface HeroFeaturedProps {
  articles: Article[];
}

export default function HeroFeatured({ articles }: HeroFeaturedProps) {
  // Find cover story or featured story
  const coverStory =
    articles.find((a) => a.isCoverStory) ||
    articles.find((a) => a.isFeatured) ||
    articles[0];

  const secondaryStories = articles
    .filter((a) => a.id !== coverStory?.id && a.isFeatured)
    .slice(0, 2);

  const rapidWires = articles
    .filter((a) => a.id !== coverStory?.id && !secondaryStories.some((s) => s.id === a.id))
    .slice(0, 4);

  if (!coverStory) return null;

  return (
    <section className="py-6 sm:py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Live Wire Indicator */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-slate-900">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
              Lead Enterprise Stories & Global Wire
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-500 font-medium">
            Updated Continuous Feed • 50+ Live Dispatches
          </span>
        </div>

        {/* 3-Column Editorial Grid: Lead Cover (7 cols) + Secondary Stack (3 cols) + Live Wire (2 cols) on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Main Lead Cover Story (Col 1-7) */}
          <div className="lg:col-span-7 group">
            <Link href={`/article/${coverStory.slug}`} className="block">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-slate-900 mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                <img
                  src={coverStory.heroImage}
                  alt={coverStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-600 text-white shadow">
                    {coverStory.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-amber-300 backdrop-blur-sm border border-amber-400/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Cover Story
                  </span>
                </div>

                {/* Overlaid Bottom Details */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                  <div className="flex items-center gap-3 text-xs text-slate-300 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {coverStory.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {formatNumber(coverStory.views)} Reads
                    </span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight mb-2 group-hover:text-blue-300 transition-colors">
                    {coverStory.title}
                  </h2>
                </div>
              </div>

              {/* Cover Story Excerpt & Author Row */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4">
                {coverStory.excerpt}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={coverStory.author.avatar}
                    alt={coverStory.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{coverStory.author.name}</h4>
                    <p className="text-[11px] text-slate-500">{coverStory.author.role}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Investigation <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>

          {/* Secondary Featured Stories Stack (Col 8-10 / 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {secondaryStories.map((story) => (
              <div
                key={story.id}
                className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <Link href={`/article/${story.slug}`} className="block">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {story.category}
                        </span>
                        {story.companyProfile && (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Enterprise Spotlight
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                        {story.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>{story.author.name}</span>
                        <span>•</span>
                        <span>{formatDate(story.publishedAt)}</span>
                      </div>
                    </div>
                    <img
                      src={story.heroImage}
                      alt={story.title}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-102 transition-transform"
                    />
                  </div>
                </Link>
              </div>
            ))}

            {/* Wire Feed Banner */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Rapid Wire Dispatch
                </span>
                <span className="text-[10px] text-slate-400">Real-Time</span>
              </div>
              <div className="space-y-2.5">
                {rapidWires.map((wire) => (
                  <Link
                    key={wire.id}
                    href={`/article/${wire.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-[11px] font-bold text-slate-500 shrink-0 mt-0.5">
                        {wire.readTime.split(' ')[0]}m
                      </span>
                      <p className="text-xs text-slate-300 group-hover:text-blue-300 transition-colors line-clamp-1 font-medium">
                        {wire.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
