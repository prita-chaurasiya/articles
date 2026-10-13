'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';

interface StripItem {
  slug: string;
  title: string;
  image: string;
  isHighlightRed?: boolean;
}

interface HomeCategoryTriStripProps {
  articles?: Article[];
}

export const TRI_STRIP_DATA: {
  travels: { category: string; badge: string; lead: any; items: StripItem[] };
  healthcare: { category: string; badge: string; lead: any; items: StripItem[] };
  finance: { category: string; badge: string; lead: any; items: StripItem[] };
} = {
  // COLUMN 1: TRAVELS
  travels: {
    category: 'TRAVELS',
    badge: 'TRAVELS',
    lead: {
      slug: 'global-remote-work-destinations-founders-work-life-havens',
      title: 'Global Remote Work Destinations: What Modern Founders Seek in Work-Life Havens',
      categoryTag: 'TRAVEL',
      author: 'admin',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Executive travel has evolved far beyond leisure into holistic productivity hubs. For today’s mobile founders, seamless connectivity, safety, and cultural resonance define modern travel...',
    },
    items: [
      {
        slug: 'capital-flows-foreign-institutional-buyers-lift-indices',
        title: 'Capital Inflows: Foreign Institutional Buyers Lift Sovereign Benchmark Indices',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&auto=format&fit=crop&q=80',
      },
      {
        slug: 'markets-slip-in-choppy-trade-liquidity-tightens',
        title: 'Markets Stabilize in Choppy Trade as Central Banks Intervene on Foreign Currency Swaps',
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&auto=format&fit=crop&q=80',
      },
    ],
  },

  // COLUMN 2: HEALTHCARE
  healthcare: {
    category: 'HEALTHCARE',
    badge: 'HEALTHCARE',
    lead: {
      slug: 'top-preventive-nutrition-wellness-rituals-c-suite-leaders',
      title: 'Top 6 Preventive Nutrition & Wellness Protocols for High-Velocity C-Suite Executives',
      categoryTag: 'HEALTHCARE',
      author: 'admin',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Sustained executive performance relies on metabolic resilience, sleep chronobiology, and targeted micronutrition to prevent burnout in high-stakes boardroom environments...',
    },
    items: [
      {
        slug: 'critical-mistakes-to-avoid-buying-online-pharmaceuticals',
        title: 'Top Mistakes To Avoid When Purchasing Prescriptions Online from Digital Pharmacies',
        isHighlightRed: true,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80',
      },
      {
        slug: 'precision-regenerative-orthopedics-non-surgical-spine-care',
        title: 'STRONGER THAN SURGERY: The Non-Invasive Era of Regenerative Spine & Joint Care',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&auto=format&fit=crop&q=80',
      },
    ],
  },

  // COLUMN 3: FINANCE
  finance: {
    category: 'FINANCE',
    badge: 'FINANCE',
    lead: {
      slug: 'best-enterprise-liquidity-working-capital-credit-facilities',
      title: 'Best Enterprise Liquidity & Working Capital Credit Facilities for Fast-Scaling Ventures',
      categoryTag: 'FINANCE',
      author: 'admin',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      excerpt: 'In the day-to-day cycles of corporate finance, maintaining adequate debt ratios and real-time cash visibility is the single biggest determinant of sustained venture longevity...',
    },
    items: [
      {
        slug: 'impact-of-macroeconomic-policies-institutional-crypto',
        title: 'The Impact of Sovereign Monetary Policies on Institutional Digital Asset Reserves',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=200&auto=format&fit=crop&q=80',
      },
      {
        slug: 'analyzing-bond-yield-inversions-wealth-preservation',
        title: 'Analyzing Sovereign Yield Curve Inversions and High-Net-Worth Wealth Preservation',
        image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=200&auto=format&fit=crop&q=80',
      },
    ],
  },
};

export default function HomeCategoryTriStrip({ articles }: HomeCategoryTriStripProps) {
  const columns = [
    TRI_STRIP_DATA.travels,
    TRI_STRIP_DATA.healthcare,
    TRI_STRIP_DATA.finance,
  ];

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================= */}
        {/* 3 EQUAL COLUMNS: TRAVELS | HEALTHCARE | FINANCE         */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-9 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {columns.map((col, idx) => (
            <div key={col.category} className={idx === 0 ? '' : 'pt-8 md:pt-0 md:pl-8'}>
              
              {/* Header Badge (Solid Black Box) */}
              <div className="mb-4">
                <span className="inline-block bg-black text-white text-xs font-bold uppercase px-3 py-1.5 tracking-wider">
                  {col.badge}
                </span>
              </div>

              {/* Lead Top Card */}
              <article className="group mb-6">
                <Link
                  href={`/article/${col.lead.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow"
                >
                  <img
                    src={col.lead.image}
                    alt={col.lead.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>

                {/* Headline */}
                <Link href={`/article/${col.lead.slug}`}>
                  <h3 className="font-bold text-base sm:text-[17px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors mt-3 line-clamp-2">
                    {col.lead.title}
                  </h3>
                </Link>

                {/* Meta */}
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  <Link
                    href={col.category.toLowerCase() === 'travels' ? '/category/travel' : `/category/${col.category.toLowerCase()}`}
                    className="text-[#DC2626] font-bold uppercase tracking-wider hover:underline transition-colors"
                    title={`View all ${col.category} stories`}
                  >
                    {col.lead.categoryTag}
                  </Link>
                  <span className="text-slate-400">—</span>
                  <span className="text-slate-500">
                    By <strong className="font-semibold text-slate-700">{col.lead.author}</strong>
                  </span>
                </div>

                {/* Excerpt */}
                <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 mt-2 font-normal">
                  {col.lead.excerpt}
                </p>
              </article>

              {/* 2 Compact Horizontal Items (Thumbnail Left, Title Right) */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                {col.items.map((item) => (
                  <article key={item.slug} className="group">
                    <Link
                      href={`/article/${item.slug}`}
                      className="flex items-center gap-3.5"
                    >
                      {/* Left Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-14 object-cover border border-slate-200 shrink-0 group-hover:opacity-90"
                        loading="lazy"
                      />

                      {/* Right Title */}
                      <h4 className={`font-bold text-xs leading-snug line-clamp-2 transition-colors ${
                        item.isHighlightRed 
                          ? 'text-[#DC2626] group-hover:text-red-700' 
                          : 'text-slate-900 group-hover:text-[#DC2626]'
                      }`}>
                        {item.title}
                      </h4>
                    </Link>
                  </article>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
