'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Star, CheckCircle2, Trophy, Shield, ArrowRight, Send } from 'lucide-react';

const HONOREES_2026 = [
  { company: 'Aetheria Dynamics', category: 'CleanTech Industrial Titan of the Year', founder: 'Dr. Vivienne Vance', valuation: '$12.4B' },
  { company: 'Nexus Advanced Systems', category: 'Global Semiconductor Robotics Breakthrough', founder: 'Rajesh Nair', valuation: '$6.8B' },
  { company: 'Lumina Health', category: 'MedTech Diagnostic Innovation Laureate', founder: 'Dr. Sophia Sterling', valuation: '$4.5B' },
  { company: 'Apex Ocean Logistics', category: 'Supply Chain Decarbonization Champion', founder: 'Wei Kang', valuation: '$8.2B' },
  { company: 'Solaris Materials', category: 'Advanced Materials & Perovskite Solar Pioneer', founder: 'Dame Eleanor Vance', valuation: '$2.4B' },
];

export default function AwardsPage() {
  const [nominated, setNominated] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0B1120] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
            <Trophy className="w-3.5 h-3.5 fill-amber-400" />
            Annual Corporate Recognition
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Global Enterprise Awards 2026
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            Honoring the world's most resilient corporations, disruptive tech innovators, and visionary chief executives who demonstrate audited excellence.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
            Current Year Laureates & Honorees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HONOREES_2026.map((h, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      2026 Laureate
                    </span>
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                    {h.company}
                  </h3>
                  <p className="text-xs text-blue-600 font-semibold mb-3">
                    {h.category}
                  </p>
                  <div className="text-xs text-slate-500 space-y-1 pt-3 border-t border-slate-100">
                    <div>Founder: <strong className="text-slate-800">{h.founder}</strong></div>
                    <div>Enterprise Value: <strong className="text-emerald-600">{h.valuation}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nomination Form */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 text-center">
            Nominate an Enterprise for the 2027 Honors
          </h3>
          <p className="text-xs text-slate-500 text-center mb-6">
            Nominations are reviewed confidentially by our independent editorial panel.
          </p>

          {nominated ? (
            <div className="p-4 bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-xl text-center">
              Nomination submitted successfully to the awards committee.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setNominated(true); }} className="space-y-4">
              <input type="text" required placeholder="Company Name" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs" />
              <input type="text" required placeholder="Founder / CEO Name" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs" />
              <input type="email" required placeholder="Your Corporate Email" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs" />
              <textarea rows={3} required placeholder="Reason for nomination (growth milestones, IP breakthroughs, ESG achievements)..." className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs" />
              <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors">
                Submit Corporate Nomination
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
