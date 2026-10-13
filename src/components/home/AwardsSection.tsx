'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Trophy, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AwardsSection() {
  const awardsList = [
    {
      category: 'Enterprise AI Pioneer of the Year',
      winner: 'Aetheria Dynamics',
      honoree: 'Dr. Vivienne Vance, CEO',
      desc: 'Recognized for achieving gigawatt-scale clean industrial hydrogen automation across North America and Europe.',
    },
    {
      category: 'Semiconductor Hardware Vanguard',
      winner: 'Vyom Robotics',
      honoree: 'Rajesh Nair, Founder',
      desc: 'Pioneering sub-2nm robotic lithography cleanroom robotics operating in tier-1 Asian fabs.',
    },
    {
      category: 'Global Biotech Innovation Laureate',
      winner: 'Lumina BioHealth',
      honoree: 'Dr. Harrison Sterling, OBE',
      desc: 'Compressing clinical oncology trials from six years to five months using de novo generative protein synthesis.',
    },
    {
      category: 'Maritime Logistics Disrupter',
      winner: 'Apex Ocean Logistics',
      honoree: 'Lars Lindqvist, CEO',
      desc: 'Zero-emission routing and berth automation saving 1.2M metric tons of bunker fuel annually.',
    },
  ];

  return (
    <section className="py-14 bg-[#0B0F19] text-white border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                Annual Corporate Honors • Class of 2026
              </span>
            </div>
            <Link href="/awards" className="group inline-block">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white group-hover:text-[#DC2626] transition-colors tracking-tight uppercase">
                Global Enterprise Awards 2026
              </h2>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Celebrating corporations and chief executives reshaping global industry, governance, and technology
            </p>
          </div>

          <Link
            href="/awards"
            className="px-4 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 shadow"
          >
            <span>View All Laureates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Awards Laureates Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awardsList.map((item, idx) => (
            <div
              key={item.category}
              className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                    0{idx + 1}
                  </span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  {item.category}
                </span>

                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-0.5">
                  {item.winner}
                </h3>

                <span className="text-xs text-slate-400 block mb-3 font-medium">
                  {item.honoree}
                </span>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <Link
                  href="/awards"
                  className="text-xs font-bold text-slate-300 hover:text-white flex items-center justify-between uppercase tracking-wider"
                >
                  <span>Citation Dossier</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
