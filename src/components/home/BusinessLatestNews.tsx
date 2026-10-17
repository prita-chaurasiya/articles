'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import MagazineCardOverlay from '@/components/common/MagazineCardOverlay';
import { formatDate } from '@/lib/utils';

interface BusinessLatestNewsProps {
  articles?: Article[];
}

export const LATEST_NEWS_GRID_DATA = [
  // ROW 1 (4 Cards)
  {
    id: 'bln-1',
    slug: 'kinetic-aero-ventures-hybrid-propulsion',
    title: 'Kinetic Aero Ventures Opc Pvt. Ltd. : A visionary enterprise scaling ripples across aerospace...',
    author: 'admin',
    date: 'August 4, 2026',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
    excerpt: 'The field of aerospace mobility is diverse and competitive. Here, the role of hybrid propulsion architectures is transforming regional flight benchmarks...',
  },
  {
    id: 'bln-2',
    slug: 'from-research-labs-to-unicorns-deeptech-founders',
    title: 'From Research to Founders: The Incredible Stories Behind DeepTech Unicorn Breakthroughs...',
    author: 'admin',
    date: 'August 4, 2026',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    excerpt: 'From scientific laboratory discoveries to billion-dollar platforms, these visionary founders prove how perseverance translates into enterprise dominance...',
  },
  {
    id: 'bln-3',
    slug: 'ascent-autonomous-logistics-synapse-ai',
    title: 'The Rise of the Autonomous Enterprise: How Synapse AI Is Redefining Decision Intelligence...',
    author: 'admin',
    date: 'July 29, 2026',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Artificial intelligence has entered a new phase. The conversation has moved beyond automating repetitive tasks into full multi-agent orchestration...',
  },
  {
    id: 'bln-4',
    slug: 'terra-verde-infrastructure-green-smart-cities',
    title: 'TERRA VERDE PROPERTIES AND INFRASTRUCTURE PRIVATE LIMITED',
    author: 'admin',
    date: 'July 21, 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Terra Verde Capitals: Building Next-Generation Sustainable Wealth Through Land Intelligence and Sovereign Infrastructure-Led Urban Corridors...',
  },

  // ROW 2 (4 Cards)
  {
    id: 'bln-5',
    slug: 'oxford-global-leadership-academy-ethical-executives',
    title: 'Global Leadership Academy Beyond the Classroom: Education’s Answer to an Uncertain Future',
    author: 'admin',
    date: 'July 18, 2026',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    excerpt: 'As market disruptions multiply, modern boardroom leaders require intellectual resilience, crisis agility, and deep governance principles to guide organizations...',
  },
  {
    id: 'bln-6',
    slug: 'alliance-urban-architecture-sustainable-redevelopment',
    title: 'Alliance City Urban Architects: Building More Than Commercial Structures',
    author: 'admin',
    date: 'July 12, 2026',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Urban renewal projects across major financial capitals are moving away from monolithic high-rises toward human-centric biophilic spaces that harmonize life...',
  },
  {
    id: 'bln-7',
    slug: 'aura-illumination-technologies-heritage-lighting',
    title: 'A Zero-Impact Approach to Heritage Illumination and Architectural Marvels',
    author: 'admin',
    date: 'July 5, 2026',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Balancing historical preservation with ultra-efficient photonic projection, modern illumination brings timeless heritage sites to vibrant nocturnal life...',
  },
  {
    id: 'bln-8',
    slug: 'vanguard-petcare-networks-high-tech-ecosystem',
    title: 'VANGUARD HEALTH: BUILDING A STRONGER, SMARTER GLOBAL CARE ECOSYSTEM',
    author: 'admin',
    date: 'June 28, 2026',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Combining genetic profiling with automated diagnostic telemetry, forward-thinking health consortiums are modernizing specialized clinical networks worldwide...',
  },
];

export default function BusinessLatestNews({ articles }: BusinessLatestNewsProps) {
  const dynamicItems = (articles || [])
    .filter((a) => a.status === 'published' && !LATEST_NEWS_GRID_DATA.some((d) => d.slug === a.slug))
    .slice(0, 4)
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      author: a.author?.name || 'admin',
      date: formatDate(a.publishedAt),
      image: a.heroImage,
      excerpt: a.excerpt,
    }));

  const displayList = [...dynamicItems, ...LATEST_NEWS_GRID_DATA].slice(0, 8);

  return (
    <section className="bg-black text-white py-12 sm:py-16 border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================= */}
        {/* SECTION TITLE: Centered Bold Bright Cyan/Aqua Headline  */}
        {/* ======================================================= */}
        <div className="text-center mb-10 sm:mb-12">
          <Link href="/news" className="group inline-block">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#00BCD4] group-hover:text-[#DC2626] hover:text-[#DC2626] transition-colors tracking-tight font-sans">
              Business Magazine Latest News
            </h2>
          </Link>
        </div>

        {/* ======================================================= */}
        {/* 4-COLUMN × 2-ROW GRID (Exactly matches reference layout)*/}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {displayList.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between"
            >
              <div>
                {/* 16:10 / 16:9 Aspect Ratio Thumbnail */}
                <Link
                  href={`/article/${item.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-black rounded-sm border border-neutral-800 group-hover:border-[#DC2626]/60 transition-colors shadow-sm relative"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <MagazineCardOverlay categoryTag="LATEST NEWS" />
                </Link>

                {/* Article Headline - Turns Red on Card Hover & Direct Hover */}
                <Link
                  href={`/article/${item.slug}`}
                  className="block mt-3"
                >
                  <h3 className="font-bold text-sm sm:text-[14.5px] leading-snug text-white group-hover:text-[#DC2626] hover:text-[#DC2626] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>

                {/* Author Meta: By admin — Date */}
                <div className="text-[11.5px] text-neutral-400 mt-1.5 flex items-center gap-1 font-normal">
                  <span>By</span>
                  <Link
                    href={`/article/${item.slug}`}
                    className="font-bold text-white group-hover:text-[#DC2626] hover:text-[#DC2626] transition-colors"
                  >
                    {item.author}
                  </Link>
                  <span>—</span>
                  <span>{item.date}</span>
                </div>

                {/* Excerpt */}
                <p className="text-neutral-300 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 mt-2.5 font-normal">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
