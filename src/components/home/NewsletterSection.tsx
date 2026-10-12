'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#0B0F19] text-white overflow-hidden p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <Mail className="w-3.5 h-3.5" />
              <span>The Executive Intelligence Briefing</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Direct to Your Inbox Before the Markets Open
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
              Join 140,000+ Fortune 500 executives, venture partners, and corporate directors receiving our daily 06:00 EST briefing on AI, macroeconomic capital, and enterprise strategy.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-300 text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You are subscribed! Your first briefing will arrive tomorrow at 06:00 EST.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your corporate email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-colors shadow-lg cursor-pointer shrink-0"
                >
                  Subscribe Free
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-6 pt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Zero Spam • Unsubscribe Anytime
              </span>
              <span>•</span>
              <span>Verified C-Suite Readership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
