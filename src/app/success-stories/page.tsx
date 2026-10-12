'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, Building2, CheckCircle2, Star, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';

export default function SuccessStoriesIndexPage() {
  const { articles } = useArticleStore();

  const successProfiles = articles.filter((a) => a.companyProfile);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            Executive Enterprise Dossiers
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Corporate Success Stories
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans">
            In-depth 800–1,500 word retrospective profiles documenting the founders, breakthroughs, intellectual property, and global scaling playbooks of today's commercial titans.
          </p>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successProfiles.map((article) => {
            const profile = article.companyProfile!;
            return (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <img
                        src={profile.logo}
                        alt={profile.name}
                        className="w-10 h-10 rounded-lg object-cover bg-white border border-white/40 shadow"
                      />
                      <span className="text-xs font-bold text-white drop-shadow">
                        {profile.name}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 shadow">
                        {profile.valuation || profile.revenue}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                        {profile.industry}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {profile.summary || article.excerpt}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <div><strong className="text-slate-700">Founder:</strong> {profile.founder}</div>
                      <div><strong className="text-slate-700">Headquarters:</strong> {profile.hq}</div>
                      <div><strong className="text-slate-700">Founded:</strong> {profile.founded}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/success-stories/${article.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <span>Read Full Profile Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
