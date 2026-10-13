'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import MagazineCardOverlay from '@/components/common/MagazineCardOverlay';
import { formatDate } from '@/lib/utils';

interface HomeBlogGridSectionProps {
  articles?: Article[];
}

export const HOME_BLOG_DATA = [
  // ROW 1 (4 Cards)
  {
    id: 'blog-1',
    slug: 'business-opportunity-inside-industrial-repair-economy',
    title: 'The Business Opportunity Hidden Inside India’s Repair Economy',
    date: 'October 6, 2026',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-2',
    slug: 'next-big-consumer-spending-power-young-leaders',
    title: 'The Next Big Consumer: Understanding the Rising Spending Power of Young Leaders',
    date: 'October 6, 2026',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-3',
    slug: 'business-of-night-economy-urban-commerce',
    title: 'The Business of Urban Night Economy: What Wins After 10 PM in Modern Megacities?',
    date: 'October 6, 2026',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-4',
    slug: 'why-airport-aerotropolis-economy-bigger-than-flying',
    title: 'Why The Aerotropolis Economy Is Becoming Bigger and More Profitable Than Flying',
    date: 'October 6, 2026',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80',
  },

  // ROW 2 (4 Cards)
  {
    id: 'blog-5',
    slug: 'rise-of-experience-centres-brands-off-screens',
    title: 'The Rise of Experience Centres: Why Enterprise Brands Want Customers Off Their Screens',
    date: 'October 6, 2026',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-6',
    slug: 'startup-trends-shaping-business-landscape-2027',
    title: '10 Startup Capital Trends That Could Shape The Global Business Landscape by 2027',
    date: 'October 3, 2026',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-7',
    slug: 'new-premium-consumer-paying-more-for-better-experiences',
    title: 'The New Premium Consumer: Why Discerning Buyers Are Paying More for Bespoke Quality',
    date: 'October 1, 2026',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-8',
    slug: 'molecular-diagnostics-biosafety-protocols-prevention',
    title: 'Precision Diagnostics & Biosafety: Comprehensive Playbook for Preventive Health',
    date: 'October 1, 2026',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
  },
];

export default function HomeBlogGridSection({ articles }: HomeBlogGridSectionProps) {
  const dynamicBlogs = (articles || [])
    .filter(
      (a) =>
        a.status === 'published' &&
        (a.category.toLowerCase() === 'blog' || a.tags?.some((t) => t.toLowerCase() === 'blog')) &&
        !HOME_BLOG_DATA.some((b) => b.slug === a.slug)
    )
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      date: formatDate(a.publishedAt),
      image: a.heroImage,
    }));

  const displayBlogs = [...dynamicBlogs, ...HOME_BLOG_DATA].slice(0, 8);

  return (
    <section 
      style={{ backgroundColor: '#DCEAF4' }}
      className="py-12 sm:py-16 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================= */}
        {/* SECTION HEADER: BLOG (Clean, Bold, Matches Screenshot 3)*/}
        {/* ======================================================= */}
        <div className="mb-6">
          <Link href="/category/blog" className="group inline-block">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight font-sans uppercase">
              BLOG
            </h2>
          </Link>
        </div>

        {/* ======================================================= */}
        {/* 4-COLUMN × 2-ROW GRID (Exactly matches Screenshot 3)    */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {displayBlogs.map((item) => (
            <article key={item.id} className="group">
              <Link href={`/article/${item.slug}`} className="block">
                {/* 16:9 Aspect Ratio Image with EC Magazine Brand Overlay */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 rounded-sm border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <MagazineCardOverlay categoryTag="BLOG" />
                </div>

                {/* Article Headline */}
                <h3 className="font-bold text-sm sm:text-[14px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors mt-3 line-clamp-2">
                  {item.title}
                </h3>

                {/* Publication Date */}
                <span className="text-[11px] text-slate-400 font-normal block mt-1.5">
                  {item.date}
                </span>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
