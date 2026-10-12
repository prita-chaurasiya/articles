'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ArrowRight, TrendingUp, Award, ShieldCheck } from 'lucide-react';
import { Article } from '@/types';

interface FeaturedCompaniesStripProps {
  articles: Article[];
}

export default function FeaturedCompaniesStrip({ articles }: FeaturedCompaniesStripProps) {
  // Extract articles that have companyProfile
  const companyArticles = articles.filter((a) => a.companyProfile);

  if (companyArticles.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3.5 border-b-2 border-slate-900 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#DC2626]">
                Corporate Dossiers & Enterprise Index
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Featured Companies
            </h2>
          </div>

          <Link
            href="/success-stories"
            className="text-xs font-bold text-[#DC2626] hover:text-slate-900 flex items-center gap-1 uppercase tracking-wider transition-colors shrink-0"
          >
            <span>All Enterprise Dossiers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid of Company Dossier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {companyArticles.slice(0, 5).map((art) => {
            const comp = art.companyProfile!;

            return (
              <div
                key={art.id}
                className="group bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Logo & Industry Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {comp.industry}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-black text-slate-900 group-hover:text-[#DC2626] transition-colors leading-tight mb-1">
                    {comp.name}
                  </h3>

                  <div className="text-xs font-bold text-emerald-700 mb-2">
                    {comp.valuation || comp.revenue || 'Global Enterprise'}
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {comp.summary || art.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[10px] text-slate-400 mb-2">
                    Founder: <strong className="text-slate-700">{comp.founder}</strong>
                  </div>
                  <Link
                    href={`/success-stories/${art.slug}`}
                    className="text-xs font-bold text-[#DC2626] hover:text-slate-900 flex items-center justify-between uppercase tracking-wider"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
