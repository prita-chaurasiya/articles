'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import MagazineCardOverlay from '@/components/common/MagazineCardOverlay';

interface HomeLoungeInterviewSectionProps {
  articles?: Article[];
}

export const LOUNGE_INTERVIEWS = [
  // ROW 1
  {
    id: 'lounge-1',
    slug: 'aura-living-infrastructure-next-gen-smart-precincts',
    title: 'Aura Living Infrastructure: Designing Next-Generation Mixed-Use Smart Precincts',
    author: 'admin',
    date: 'September 11, 2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Aura Living has earned premier industry acclaim for sustainable biophilic development, integrating zero-carbon construction with active community engagement...',
  },
  {
    id: 'lounge-2',
    slug: 'veritas-global-counsel-corporate-advisory-sovereign-law',
    title: 'Veritas Global Counsel: Modern Corporate Advisory Built on Governance & Sovereign Law',
    author: 'admin',
    date: 'September 10, 2026',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Founded by senior corporate litigators, Veritas Global Counsel combines multi-jurisdictional depth with proactive boardroom advisory to safeguard enterprise mergers...',
  },
  {
    id: 'lounge-3',
    slug: 'cognitivex-ai-redefining-digital-transformation',
    title: 'CognitiveX AI: Redefining Digital Transformation for Global Enterprise Scale',
    author: 'admin',
    date: 'September 10, 2026',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    excerpt: 'CognitiveX Technologies is an AI-first venture delivering cognitive orchestration engines that automate legacy workflow pipelines across financial and medical verticals...',
  },

  // ROW 2
  {
    id: 'lounge-4',
    slug: 'novatech-ai-solutions-scalable-cloud-infrastructure',
    title: 'NovaTech AI Solutions: Engineering High-Performance Scalable Cloud Infrastructure',
    author: 'admin',
    date: 'September 5, 2026',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Consolidating deep technical talent across high-growth corridors, NovaTech delivers fault-tolerant distributed cloud pipelines to global enterprise operators...',
  },
  {
    id: 'lounge-5',
    slug: 'vanguard-microcapital-inclusive-regional-entrepreneurs',
    title: 'Vanguard Microcapital: Democratizing Inclusive Microcredit for Regional Entrepreneurs',
    author: 'admin',
    date: 'August 31, 2026',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Few modern fintech institutions manage to blend sustained capital returns with grassroots socioeconomic impact as effectively as Vanguard Microcapital over 18 years...',
  },
  {
    id: 'lounge-6',
    slug: 'elysian-senior-residences-holistic-assisted-living',
    title: 'Elysian Senior Residences: A Decade-Long Mission to Redefine Holistic Assisted Living',
    author: 'admin',
    date: 'August 31, 2026',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Senior living has moved far beyond clinical care into vibrant wellness-driven communities, offering active engagement, nutritional science, and round-the-clock medical care...',
  },

  // ROW 3
  {
    id: 'lounge-7',
    slug: 'synergy-executive-coaching-boardroom-leadership-teams',
    title: 'Synergy Executive Coaching: Unlocking Resilient Boardroom Leadership and High Teams',
    author: 'admin',
    date: 'August 29, 2026',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Under strategic guidance, Synergy Executive Coaching empowers senior directors and founders to navigate high-stakes market volatility and team alignment...',
  },
  {
    id: 'lounge-8',
    slug: 'nexus-student-marketplace-campus-commerce-enterprise',
    title: 'Nexus Student Marketplace: Empowering Campus Commerce and Next-Gen Youth Enterprise',
    author: 'admin',
    date: 'August 29, 2026',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Founded by collegiate visionaries, Nexus is an interactive peer-to-peer commerce and skill-exchange engine tailored specifically to university ecosystems nationwide...',
  },
  {
    id: 'lounge-9',
    slug: 'axiom-governance-protocols-trust-generative-intelligence',
    title: 'Axiom Governance Protocols: Architecting Trust and Ethical Alignment in Generative AI',
    author: 'admin',
    date: 'August 25, 2026',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Can automated systems remain resilient against unintended drift? Axiom Governance introduces deterministic guardrails for sovereign enterprises deploying autonomous AI...',
  },
];

export const LAUNCHPAD_DATA = {
  featured: {
    slug: 'global-tech-summit-silicon-breakthroughs',
    badge: 'NEWS',
    title: 'Global Tech Expo: Next-Generation Silicon Architectures Unveiled at Annual Innovation Summit',
    author: 'admin',
    date: 'October 6, 2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  },
  list: [
    {
      slug: 'upcoming-hybrid-suv-commuter-mobility',
      title: 'Upcoming Hybrid SUV Facelift: What Urban Commuters & Fleet Owners Can Expect',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'all-terrain-hybrid-drivetrains-market-leaders',
      title: 'All-Terrain Adventure Vehicles: Why Rugged Hybrid Drivetrains Now Lead the Market',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'flagship-enterprise-5g-smartphone-security',
      title: 'Flagship 5G Smartphones: High-Throughput Benchmarks and Enterprise Hardware Security',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'commercial-electric-utility-fleets-urban-logistics',
      title: 'Commercial Electric Utility Pickups Launched for Zero-Emission Urban Freight',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'adventure-touring-motorcycles-telematics',
      title: 'Adventure Touring Motorcycles: Cross-Country Endurance Meets Modern Telematics',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'next-gen-foldable-devices-productivity',
      title: 'Next-Gen Foldable Displays: Boardroom Multitasking and Productivity Benchmarks',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const LATEST_EDITION_DATA = [
  {
    slug: 'titanium-metallurgical-alloys-aerospace',
    title: 'Titanium Advanced Metallurgical Alloys for Aerospace',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'medtech-horizons-precision-robotic-surgery',
    title: 'MedTech Horizons: Precision Surgical Robotic Systems',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'enterprise-tax-statutory-compliance-platform',
    title: 'Enterprise Tax & Statutory Digital Compliance Engine',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'omnichannel-growth-automation-suite',
    title: 'OmniChannel Growth & Automated Customer Orchestration',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80',
  },
];

export default function HomeLoungeInterviewSection({ articles }: HomeLoungeInterviewSectionProps) {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* MAIN GRID: Left (9 cols) | Right Sidebar (3 cols)         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT 9 COLUMNS: LOUNGE INTERVIEW (3 COLS × 3 ROWS = 9)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-9">
            
            {/* Header: Title + Red Underline + [ View More ] Button */}
            <div className="flex items-center justify-between pb-4 mb-7 border-b border-slate-200">
              <div>
                <Link href="/category/lounge-interview" className="group inline-block">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#DC2626] tracking-tight uppercase font-sans">
                    LOUNGE INTERVIEW
                  </h2>
                  <div className="w-16 h-1 bg-[#DC2626] mt-1.5" />
                </Link>
              </div>

              <Link
                href="/category/lounge-interview"
                className="px-4 py-1.5 rounded-full border border-slate-300 hover:border-slate-400 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                View More
              </Link>
            </div>

            {/* 3 Columns × 3 Rows Grid (9 Interview Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {LOUNGE_INTERVIEWS.map((card) => (
                <article key={card.id} className="group">
                  <Link href={`/article/${card.slug}`} className="block">
                    {/* 16:10 Thumbnail with EC Magazine Brand Overlay */}
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow relative rounded-xs">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <MagazineCardOverlay categoryTag="LOUNGE Interview" />
                    </div>

                    {/* Headline */}
                    <h3 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors mt-3 line-clamp-2">
                      {card.title}
                    </h3>

                    {/* Author & Date */}
                    <div className="text-[11.5px] text-slate-400 font-normal mt-1.5 flex items-center gap-1">
                      <span>By <strong className="font-semibold text-slate-700">{card.author}</strong></span>
                      <span>—</span>
                      <span>{card.date}</span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 mt-2 font-normal">
                      {card.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT 3 COLUMNS: SIDEBAR (Launchpad + Latest Edition)      */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 space-y-8 lg:border-l lg:border-slate-200 lg:pl-6">
            
            {/* WIDGET 1: LAUNCHPAD */}
            <div className="border border-slate-200 bg-white">
              {/* Solid Black Header Banner */}
              <div className="bg-black text-white text-center py-2 px-3">
                <Link href="/category/launchpad" className="hover:text-red-400 transition-colors inline-block w-full">
                  <h3 className="font-bold text-sm tracking-wide">
                    Launchpad
                  </h3>
                </Link>
              </div>

              {/* Featured Top Card with Red NEWS Badge */}
              <div className="relative group overflow-hidden border-b border-slate-200">
                <Link href={`/article/${LAUNCHPAD_DATA.featured.slug}`} className="block">
                  <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-900">
                    <img
                      src={LAUNCHPAD_DATA.featured.image}
                      alt={LAUNCHPAD_DATA.featured.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Red NEWS Badge */}
                    <span className="absolute top-2 left-2 bg-[#DC2626] text-white text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider">
                      {LAUNCHPAD_DATA.featured.badge}
                    </span>

                    {/* Overlay Title & Meta */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3 text-white">
                      <h4 className="font-bold text-xs sm:text-sm leading-snug line-clamp-3 group-hover:text-red-300 transition-colors">
                        {LAUNCHPAD_DATA.featured.title}
                      </h4>
                      <span className="text-[10px] text-slate-300 mt-1 block">
                        {LAUNCHPAD_DATA.featured.author} — {LAUNCHPAD_DATA.featured.date}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* 6 Compact List Items (Thumbnail on Right) */}
              <div className="p-3 space-y-3 divide-y divide-slate-100">
                {LAUNCHPAD_DATA.list.map((item, idx) => (
                  <div key={item.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link
                      href={`/article/${item.slug}`}
                      className="flex items-start justify-between gap-2.5 group"
                    >
                      <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2 flex-1">
                        {item.title}
                      </h5>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-10 object-cover border border-slate-200 shrink-0 group-hover:opacity-90"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 2: LATEST EDITION */}
            <div className="border border-slate-200 bg-white p-3.5">
              {/* Header with Red Accent Vertical Bar */}
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                <span className="w-1.5 h-5 bg-[#DC2626] inline-block" />
                <Link href="/magazine" className="hover:text-[#DC2626] transition-colors">
                  <h3 className="font-black text-lg text-slate-900 tracking-tight font-sans">
                    Latest Edition
                  </h3>
                </Link>
              </div>

              {/* 4 Items (Thumbnail on Right) */}
              <div className="space-y-3.5 mb-4 divide-y divide-slate-100">
                {LATEST_EDITION_DATA.map((edition, idx) => (
                  <div key={edition.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link
                      href={`/article/${edition.slug}`}
                      className="flex items-start justify-between gap-3 group"
                    >
                      <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2 flex-1">
                        {edition.title}
                      </h5>
                      <img
                        src={edition.image}
                        alt={edition.title}
                        className="w-14 h-10 object-cover border border-slate-200 shrink-0 group-hover:opacity-90"
                      />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Bottom Solid Black Button */}
              <Link
                href="/category/magazine"
                className="block w-full py-2 bg-black hover:bg-slate-800 text-white text-center text-xs font-bold uppercase tracking-wider transition-colors"
              >
                More from Latest Edition
              </Link>
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}
