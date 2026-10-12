'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Users,
  Globe,
  TrendingUp,
  Download,
  Building2,
  Mail,
  Send,
  ArrowRight,
} from 'lucide-react';

export default function AdvertisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('$25,000 - $50,000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Banner */}
      <div className="bg-[#0F172A] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Corporate Media Partnership
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Reach 1.4 Million Decision-Makers Across Global Enterprise
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            Position your brand before Fortune 500 chairpersons, sovereign wealth trustees, venture partners, and technology pioneers who control corporate budgets.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Audience Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">1.4M+</span>
            <span className="text-xs text-slate-500 font-medium">Monthly Active Readers</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <Building2 className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">68%</span>
            <span className="text-xs text-slate-500 font-medium">C-Suite & Board Members</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <Globe className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">42</span>
            <span className="text-xs text-slate-500 font-medium">Countries With Direct Bureaus</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <TrendingUp className="w-6 h-6 text-rose-600 mx-auto mb-2" />
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">$4.2B+</span>
            <span className="text-xs text-slate-500 font-medium">Avg Portfolio Managed</span>
          </div>
        </div>

        {/* Partnership Form & Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Media Partnership Formats
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">FORMAT 01</span>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">
                  Executive Corporate Dossier & Success Story Profile
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  An audited 1,200-word investigative company profile highlighting your enterprise breakthroughs, milestone trajectory, and leadership team published across all main channels.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">FORMAT 02</span>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">
                  Homepage Leaderboard & Premium In-Feed Ad Blocks
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-visibility luxury placements rendered exclusively above the fold to targeted executive IP blocks and institutional readers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">FORMAT 03</span>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">
                  The Executive Morning Briefing Exclusive Takeover
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct dedicated broadcast to our 240,000+ newsletter subscribers delivered at 06:00 EST with 46% verified open rates.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
              Request Media Kit & Rate Card
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our corporate media director will reply within four business hours.
            </p>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Inquiry received. Media kit sent to your email.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Sterling"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Corporate Organization</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Apex Global Enterprises"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m.sterling@apex.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Quarterly Media Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000 - $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Media Kit Request</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
