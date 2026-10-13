'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';

interface HomeEntertainmentGridProps {
  articles?: Article[];
}

export const ENTERTAINMENT_RANKED_DATA = [
  // ROW 1: Ranks 1 to 4
  {
    rank: 1,
    slug: 'streaming-cinema-revolution-high-production-thrillers',
    title: 'Streaming Cinema Revolution: 8 High-Production Global Thrillers Defining This Quarter',
    category: 'ENTERTAINMENT',
    date: 'June 6, 2026',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
  },
  {
    rank: 2,
    slug: 'box-office-resurgence-theatrical-releases-record-admissions',
    title: 'Box Office Resurgence: How Sovereign Theatrical Releases Set Record Domestic Admissions',
    category: 'ENTERTAINMENT',
    date: 'May 15, 2026',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
  },
  {
    rank: 3,
    slug: 'action-spectacles-lead-box-office-returns-summer',
    title: 'Action Spectacles Lead Global Box Office Returns in High-Impact Summer Seasons',
    category: 'ENTERTAINMENT',
    date: 'April 27, 2026',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
  },
  {
    rank: 4,
    slug: 'direct-to-digital-premieres-production-licensing-bids',
    title: 'Direct-To-Digital Premieres: Inside The Multi-Million Production Licensing Bids',
    category: 'ENTERTAINMENT',
    date: 'April 9, 2026',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=80',
  },

  // ROW 2: Ranks 5 to 8
  {
    rank: 5,
    slug: 'curated-weekend-releases-groundbreaking-documentaries',
    title: 'Curated Weekend Releases: 6 Groundbreaking Documentaries & Neo-Noir Drama Series',
    category: 'ENTERTAINMENT',
    date: 'March 23, 2026',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=80',
  },
  {
    rank: 6,
    slug: 'opening-weekend-momentum-analyzing-multiplex-footfalls',
    title: 'Opening Weekend Momentum: Analyzing Theatrical Footfalls Across Urban Multiplexes',
    category: 'ENTERTAINMENT',
    date: 'March 20, 2026',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&auto=format&fit=crop&q=80',
  },
  {
    rank: 7,
    slug: 'regional-masterpieces-crossing-borders-global-audiences',
    title: 'Regional Masterpieces Crossing Borders: Why World Audiences Embrace Local Epics',
    category: 'ENTERTAINMENT',
    date: 'March 19, 2026',
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80',
  },
  {
    rank: 8,
    slug: 'high-octane-cinematic-storytelling-directors-global-spectacle',
    title: 'High-Octane Cinematic Storytelling: The Directors Driving The Next Era of Global Spectacle',
    category: 'ENTERTAINMENT',
    date: 'March 19, 2026',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&auto=format&fit=crop&q=80',
  },
];

export default function HomeEntertainmentGrid({ articles }: HomeEntertainmentGridProps) {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================= */}
        {/* SECTION HEADER: ENTERTAINMENT (Clean, Bold, Uppercase)  */}
        {/* ======================================================= */}
        <div className="mb-7 pb-2 border-b border-slate-200">
          <Link href="/category/lifestyle" className="group inline-block">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight font-sans uppercase">
              ENTERTAINMENT
            </h2>
          </Link>
        </div>

        {/* ======================================================= */}
        {/* 4-COLUMN × 2-ROW GRID (Ranked 1 to 8 Cards)             */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {ENTERTAINMENT_RANKED_DATA.map((item) => (
            <article key={item.rank} className="group">
              <Link href={`/article/${item.slug}`} className="block">
                
                {/* 16:9 Thumbnail Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Number Badge + Title */}
                <div className="flex items-start gap-2.5 mt-3">
                  {/* Red Circle Number Badge */}
                  <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {item.rank}
                  </span>

                  {/* Headline */}
                  <h3 className="font-bold text-xs sm:text-[13.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 flex-1">
                    {item.title}
                  </h3>
                </div>

                {/* Red Category & Date */}
                <div className="pl-7 mt-1 text-[11px] font-semibold text-[#DC2626]">
                  <span>{item.category}</span>
                  <span className="text-slate-400 font-normal mx-1">—</span>
                  <span className="text-slate-500 font-normal">{item.date}</span>
                </div>

              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
