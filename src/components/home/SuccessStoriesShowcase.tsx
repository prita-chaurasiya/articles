'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, Building2, CheckCircle2, TrendingUp, Sparkles, Star } from 'lucide-react';
import { Article } from '@/types';

interface SuccessStoriesShowcaseProps {
  articles: Article[];
}

export default function SuccessStoriesShowcase({ articles }: SuccessStoriesShowcaseProps) {
  const successProfiles = articles
    .filter((a) => a.companyProfile)
    .slice(0, 4);

  if (successProfiles.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-[#F1F5F9]/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b-2 border-amber-600 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                Executive Spotlight
              </span>
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Corporate Profiles
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Success Stories: Architects of Modern Industry
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Exhaustive 800–1,500 word corporate dossiers profiling hyper-growth enterprises, visionary founders, and breakthrough industrial titans.
            </p>
          </div>
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 shadow transition-colors shrink-0"
          >
            <span>View All Company Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {successProfiles.map((article) => {
            const profile = article.companyProfile!;
            return (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header Card Image */}
                  <div className="relative aspect-[16/8] overflow-hidden bg-slate-900">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    
                    {/* Company Logo Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-3">
                      <img
                        src={profile.logo}
                        alt={profile.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-white/80 shadow-lg bg-white"
                      />
                      <div className="text-white drop-shadow">
                        <h4 className="font-bold text-sm sm:text-base leading-tight">
                          {profile.name}
                        </h4>
                        <span className="text-[11px] text-slate-300">
                          {profile.industry}
                        </span>
                      </div>
                    </div>

                    {/* Valuation / Revenue Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 shadow backdrop-blur-sm">
                        {profile.valuation || profile.revenue}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                        HQ: {profile.hq} • Founded: {profile.founded}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        Founder: {profile.founder}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                      {article.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {profile.summary || article.excerpt}
                    </p>

                    {/* Bullet Highlights / Achievements */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Key Milestones:
                      </span>
                      {profile.achievements.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-600">
                      800+ Word Editorial Dossier
                    </span>
                  </div>
                  <Link
                    href={`/success-stories/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Corporate Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
