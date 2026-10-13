'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface SponsoredAdBlockProps {
  variant?: 'banner' | 'sidebar' | 'inline';
}

export default function SponsoredAdBlock({ variant = 'banner' }: SponsoredAdBlockProps) {
  if (variant === 'sidebar') {
    return (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md">
        <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3">
          <span>SPONSORED BRIEF</span>
          <Link href="/advertise" className="hover:text-blue-400">Ad</Link>
        </div>
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold mb-3">
          AP
        </div>
        <h4 className="font-serif font-bold text-sm text-white mb-1.5 leading-snug">
          Apex Private Capital & Sovereign Advisory
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Bespoke balance sheet liquidity and private equity syndicated solutions for ultra-high-net-worth family offices.
        </p>
        <Link
          href="/advertise"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
        >
          <span>Request Private Briefing</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="my-8 p-6 rounded-2xl bg-slate-100 border border-slate-300/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block mb-1">
            CORPORATE PARTNER DISPATCH
          </span>
          <h4 className="font-serif font-bold text-base text-slate-900 leading-snug">
            CloudScale: Hyperscale Compute for Sovereign AI Enterprises
          </h4>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Deploy deterministic GPU clusters across tier-IV European data centers with zero egress latency.
          </p>
        </div>
        <Link
          href="/advertise"
          className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 shrink-0 transition-colors"
        >
          Explore Solutions →
        </Link>
      </div>
    );
  }

  // Full-width banner
  return (
    <div className="py-6 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 text-blue-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                  GLOBAL MEDIA ADVERTISING
                </span>
                <span className="text-[9px] text-blue-400 font-medium">• Reach 1.2M+ Decision Makers</span>
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                Position Your Enterprise Across Business Walkins Media Network
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/advertise"
              className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow"
            >
              Request Media Kit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
