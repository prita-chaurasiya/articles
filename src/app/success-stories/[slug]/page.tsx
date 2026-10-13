'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Building2,
  Calendar,
  Globe,
  MapPin,
  TrendingUp,
  Award,
  CheckCircle2,
  Users,
  Compass,
  Target,
  ArrowRight,
  ShieldCheck,
  Star,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';

export default function CompanyProfileDetailPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] py-24 text-center text-slate-500 font-medium">Loading corporate dossier...</div>}>
      <CompanyProfileContent />
    </React.Suspense>
  );
}

function CompanyProfileContent() {
  const routerParams = useParams();
  const slug = (routerParams?.slug as string) || '';

  const { articles } = useArticleStore();
  const article = articles.find((a) => a.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!article || !article.companyProfile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
          Corporate Profile Not Found
        </h2>
        <Link
          href="/success-stories"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Return to Success Stories
        </Link>
      </div>
    );
  }

  const profile = article.companyProfile;

  // Find related companies
  const relatedCompanies = articles
    .filter((a) => a.companyProfile && a.slug !== slug)
    .slice(0, 3);

  // Corporate Milestones Timeline
  const timelineMilestones = [
    {
      year: profile.founded || '2019',
      title: 'Founding & Research Incubation',
      desc: `${profile.name} was established by ${profile.founder} with initial seed capital and intellectual property incubation in ${profile.hq}.`,
    },
    {
      year: '2021',
      title: 'Proprietary Validation & Initial Contracts',
      desc: 'Completed technical validation milestones, deployed first-generation enterprise pilots, and secured anchor commercial contracts.',
    },
    {
      year: '2023',
      title: 'Series B Expansion & Global Bureaus',
      desc: `Rapid international expansion into tier-one metropolitan hubs, surpassing annual contract value benchmarks and expanding to 300+ enterprise clients.`,
    },
    {
      year: '2026',
      title: 'Enterprise Valuation & Market Leadership',
      desc: `Attained current enterprise valuation of ${profile.valuation || profile.revenue}, establishing clear defensibility across multinational supply chains.`,
    },
  ];

  // Corporate FAQs
  const corporateFaqs = [
    {
      q: `What is the core proprietary advantage of ${profile.name}?`,
      a: `${profile.name} distinguishes itself through vertically integrated proprietary architectures that reduce deployment cycle latency by over 70% while satisfying stringent regulatory and security compliance frameworks across North America, Europe, and APAC.`,
    },
    {
      q: `How does ${profile.name} ensure enterprise scalability and uptime?`,
      a: `Through redundant high-availability infrastructure, patented zero-failover clusters, and audited 99.999% SLA benchmarks, ensuring multinational clients experience zero interruption in mission-critical environments.`,
    },
    {
      q: `What are the current commercial partnerships and client tiers?`,
      a: `The company serves leading Fortune 500 enterprises, government agencies, and sovereign investment consortia, with primary engagements spanning multi-year software licenses and bespoke infrastructure deployments.`,
    },
    {
      q: `What are the primary roadmap objectives for 2026–2030?`,
      a: profile.futurePlans || `Aggressive expansion into sovereign AI infrastructure, autonomous robotics integrations, and next-generation clean manufacturing initiatives globally.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/success-stories" className="hover:text-blue-600 font-semibold text-slate-700">
              Success Stories
            </Link>
            <span>/</span>
            <span className="text-slate-400 truncate">{profile.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Dossier Header */}
      <div className="bg-[#0B1120] text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <img
                src={profile.logo}
                alt={profile.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-white border-2 border-slate-700 shadow-xl"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Enterprise Laureate
                  </span>
                  <span className="text-xs text-slate-400">
                    Founded {profile.founded}
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-sm text-slate-300 mt-1 font-medium">
                  {profile.industry}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Enterprise Valuation
                </span>
                <span className="text-lg font-black text-amber-400">
                  {profile.valuation || profile.revenue}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-0.5">Founders:</span>
              <strong className="text-white text-sm">{profile.founder}</strong>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-0.5">Global Headquarters:</span>
              <strong className="text-white text-sm">{profile.hq}</strong>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-0.5">Annual Revenue:</span>
              <strong className="text-emerald-400 text-sm">{profile.revenue || '$500M+'}</strong>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-0.5">Official Portal:</span>
              <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-400 font-bold text-sm hover:underline">
                Visit Enterprise Web ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dossier Body Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main 800-1500 words dossier column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Hero Image & Executive Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 mb-6">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">
                About {profile.name}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans mb-4">
                {profile.summary || article.excerpt}
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Operating at the intersection of scientific discipline and rigorous capital allocation, {profile.name} has fundamentally transformed modern industry expectations through patented breakthroughs and operational execution across global markets.
              </p>
            </div>

            {/* CEO / Founder Spotlight Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Executive Leadership & Founder Profile
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <img
                  src={article.author.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'}
                  alt={profile.founder}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-slate-200 shadow shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Chief Executive Officer & Founder
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                    {profile.founder}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 mb-3">
                    Head of Global Strategy • {profile.hq}
                  </p>
                  <blockquote className="text-xs sm:text-sm text-slate-700 italic border-l-2 border-blue-600 pl-3">
                    "{profile.vision || 'We measure our success not by financial valuation alone, but by the tangible efficiency breakthroughs delivered across the global economy.'}"
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Vision & Mission Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4 text-blue-600" />
                  Corporate Vision
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {profile.vision}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  Strategic Mission
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {profile.mission}
                </p>
              </div>
            </div>

            {/* 3. The Genesis & Growth Journey */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-slate-900 pb-2 border-b border-slate-100">
                Growth Journey & Retrospective
              </h2>
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                {profile.growthStory}
              </div>
            </div>

            {/* 4. Core Solutions, Products & Services */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-slate-900 pb-2 border-b border-slate-100">
                Products, Services & Proprietary Architecture
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {profile.services.map((srv, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {srv}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Key Institutional Achievements */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-slate-900 pb-2 border-b border-slate-100">
                Landmark Achievements & Impact
              </h2>
              <div className="space-y-3 pt-2">
                {profile.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chronological Milestone Timeline */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Corporate Timeline & Major Milestones
                </h3>
              </div>

              <div className="relative border-l-2 border-blue-600/30 ml-4 space-y-8 pl-6">
                {timelineMilestones.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h4 className="font-serif text-base font-bold text-slate-900 mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            {profile.gallery && profile.gallery.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 className="font-serif text-2xl font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Facilities & Photographic Archive
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {profile.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 group">
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions (FAQs) Accordion */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Frequently Asked Questions (FAQs)
                </h3>
              </div>

              <div className="space-y-3">
                {corporateFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Future Plans & Horizon */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
                THE NEXT DECADE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Future Plans & Commercial Horizon
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {profile.futurePlans}
              </p>
            </div>

            {/* Related Companies */}
            {relatedCompanies.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Related Enterprise Dossiers
                  </h3>
                  <Link href="/success-stories" className="text-xs font-semibold text-blue-600 hover:underline">
                    View All Directory →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCompanies.map((c) => {
                    const comp = c.companyProfile!;
                    return (
                      <Link
                        key={c.slug}
                        href={`/success-stories/${c.slug}`}
                        className="group p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <img
                            src={comp.logo}
                            alt={comp.name}
                            className="w-10 h-10 rounded-lg object-cover mb-3 border border-slate-100"
                          />
                          <h4 className="font-serif text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {comp.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            {comp.industry}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-amber-600 mt-3 block">
                          {comp.valuation || comp.revenue}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Editorial Conclusion */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                Editorial Conclusion: The Strategic Takeaway
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-serif italic border-l-4 border-amber-500 pl-4 my-4">
                "The ascent of {profile.name} underscores an enduring economic truth: sustainable enterprise valuation is not achieved through speculative narratives, but through relentless engineering excellence and uncompromising alignment with global physical realities."
              </p>
              <p className="text-xs text-slate-500">
                — Audited and compiled by Business Walkins Editorial Board.
              </p>
            </div>

          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Awards & Honors */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 font-serif text-base font-bold text-slate-900">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Awards & Industry Honors</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {profile.awards.map((award, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 fill-amber-500" />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Marquee Client Portfolio */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 font-serif text-base font-bold text-slate-900">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Client Portfolio & Partners</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {profile.clientBase.map((client, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-medium">
                    {client}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dossier Download Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F172A] to-slate-900 text-white shadow-lg space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                INVESTMENT BRIEF
              </span>
              <h4 className="font-serif text-lg font-bold text-white">
                Download Official Executive Dossier
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete printable PDF package containing financial metrics, audited balance sheet ratios, and intellectual property filings.
              </p>
              <button
                type="button"
                onClick={() => alert('Executive dossier downloaded.')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download Executive PDF</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
