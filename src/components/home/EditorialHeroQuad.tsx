'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import MagazineCardOverlay from '@/components/common/MagazineCardOverlay';
import { formatDate } from '@/lib/utils';

interface EditorialHeroQuadProps {
  articles?: Article[];
}

export const HERO_QUAD_DATA = {
  // Column 1: Fresh Stories (3 Items matching screenshot)
  freshStories: [
    {
      id: 'fresh-1',
      slug: 'sp-law-chambers-litigation-firm-trust-solutions',
      title: 'S & P LAW CHAMBERS: A FULL-SERVICE LITIGATION FIRM BUILT ON TRUST, EXPERTISE, AND CLIENT-FIRST SOLUTIONS',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
      badge: '20 MOST PROMISING LEGAL FIRM TO WATCH IN 2026',
      caption: 'Advocate Luv Shah – Partner • Parth Patel – Managing Partner • Advocate Vineet Sheth – Partner',
    },
    {
      id: 'fresh-2',
      slug: 'ratovate-redefining-digital-transformation',
      title: 'Ratovate: Redefining Digital Transformation: Ratovate’s...',
      badge: 'EMERGING AI & DIGITAL INNOVATION COMPANY OF THE YEAR – 2026',
      date: 'September 10, 2026',
    },
    {
      id: 'fresh-3',
      slug: 'novatech-intelligence-personified-cloud-architecture',
      title: 'NovaTech Intelligence Personified: Scalable Cloud Architecture...',
      badge: 'LOUNGE INTERVIEW',
      date: 'September 5, 2026',
    },
  ],

  // Column 2: Center Main Lead Cover Story
  mainLead: {
    slug: 'sp-law-chambers-full-service-litigation-firm',
    title: 'S & P LAW CHAMBERS: A FULL-SERVICE LITIGATION FIRM BUILT ON TRUST,...',
    excerpt: 'S & P Law Chambers was Founded in 2022, with the vision and mission to deliver legal solutions its clientele, that are effective, comprehensive, and resilient across regulatory boundaries...',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
    badge: '20 MOST PROMISING LEGAL FIRM TO WATCH IN 2026',
    caption: 'Advocate Luv Shah – Partner • Parth Patel – Managing Partner • Advocate Vineet Sheth – Partner',
    buttonText: 'READ MORE',
  },

  // Column 3: Center-Right Stacked Spotlight Features (2 Cards matching screenshot)
  stackedSpotlight: [
    {
      slug: 'technoshrine-intelligence-personified-bhubaneswar-it-firm',
      title: 'TECHNOSHRINE Intelligence Personified: A Bhubaneswar-...',
      brandTitle: 'TECHNOSHRINE Intelligence Personified',
      brandSubtitle: 'A Bhubaneswar-based IT Firm, Engineering Growth through AI-Driven Solutions',
      executiveName: 'Satya Jayasingh',
      executiveRole: 'Chief Executive Officer and Founder',
      executiveAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      date: 'September 5, 2026',
      excerpt: 'In 2011, while India\'s IT giants were consolidating legacy architectures, Technoshrine engineered modular AI frameworks...',
    },
    {
      slug: 'belstar-microfinance-limited-building-the-future',
      title: 'Belstar Microfinance Limited Building the Future, Not Just...',
      brandTitle: 'Belstar Microfinance Limited',
      brandSubtitle: 'Building the Future, Not Just Disbursing Credit: Inside Belstar\'s 18 Years of Impact',
      executiveName: 'B. Balakrishnan',
      executiveRole: 'Whole Time Director & Chief Executive Officer',
      executiveAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      date: 'August 31, 2026',
      excerpt: 'Few financial institutions manage to grow their balance sheet while maintaining 99% grassroots repayment rates across 18 years...',
    },
  ],

  // Column 4: Rightmost List (5 Items with Cyan Header & Red Badges matching screenshot)
  magazineList: [
    {
      slug: 'from-poverty-to-billionaire-inspiring-story-whatsapp-co-founder',
      title: 'From poverty to a billionaire; Inspiring Story of WhatsApp Co-...',
      badge: 'BLOG',
      date: 'November 1, 2021',
    },
    {
      slug: 'meet-youngest-prime-minister-britain-rishi-sunak',
      title: 'Meet Indian Origin & Youngest Prime Minister of Britain- Rishi...',
      badge: 'SUCCESS STORIES',
      date: 'October 28, 2022',
    },
    {
      slug: 'untold-story-vineeta-singh-sugar-cosmetics',
      title: 'Untold Story of Vineeta Singh: Rejected One Crore Job Offer',
      badge: 'SUCCESS STORIES',
      date: 'February 17, 2024',
    },
    {
      slug: 'life-lessons-muniba-mazari-iron-lady',
      title: 'Life Lessons from Muniba Mazari Story: Embrace Gratitude After...',
      badge: 'SUCCESS STORIES',
      date: 'September 23, 2024',
    },
    {
      slug: 'persuasive-story-industrial-tenacity-national-brand',
      title: 'Persuasive Story of Industrial Tenacity: Scaling a National Consumer Brand',
      badge: 'SUCCESS STORIES',
      date: 'July 16, 2025',
    },
  ],
};

export default function EditorialHeroQuad({ articles }: EditorialHeroQuadProps) {
  const data = HERO_QUAD_DATA;

  // Support newly published stories dynamically
  const userCover = (articles || []).find(
    (a) => a.status === 'published' && a.isCoverStory && a.slug !== HERO_QUAD_DATA.mainLead.slug
  );
  const mainLead = userCover
    ? {
        slug: userCover.slug,
        title: userCover.title,
        excerpt: userCover.excerpt,
        image: userCover.heroImage,
        badge: userCover.subcategory?.toUpperCase() || userCover.category.toUpperCase(),
        caption: `By ${userCover.author?.name || 'Editorial Board'} • ${userCover.author?.role || 'Contributor'}`,
        buttonText: 'READ MORE',
      }
    : HERO_QUAD_DATA.mainLead;

  const userPublished = (articles || []).filter(
    (a) =>
      a.status === 'published' &&
      !HERO_QUAD_DATA.freshStories.some((f) => f.slug === a.slug) &&
      mainLead.slug !== a.slug
  );

  const freshStories = [
    ...userPublished.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      image: a.heroImage,
      badge: a.subcategory?.toUpperCase() || a.category.toUpperCase(),
      date: formatDate(a.publishedAt),
      caption: `By ${a.author?.name || 'Staff'} • ${a.author?.role || 'Author'}`,
    })),
    ...HERO_QUAD_DATA.freshStories,
  ].slice(0, 3);

  return (
    <section className="bg-white border-b border-slate-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* EXACT 4-COLUMN ROW MATCHING REFERENCE SCREENSHOT          */}
        {/* Left (3 Cols) | Center-Lead (4 Cols) | Stacked (3 Cols) | List (2 Cols) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          
          {/* ========================================================= */}
          {/* COLUMN 1: FRESH STORIES (3 Cols in 12-col grid)           */}
          {/* ========================================================= */}
          <div className="lg:col-span-3 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 pr-0 md:pr-5 flex flex-col justify-between h-full space-y-4">
            <div>
              {/* Header Title + Subtitle */}
              <div className="mb-3.5">
                <Link href="/news" className="group block">
                  <h2 className="text-2xl sm:text-[27px] font-black tracking-tight text-slate-900 group-hover:text-[#E11925] transition-colors leading-none font-sans">
                    Fresh Stories
                  </h2>
                  <p className="text-xs font-semibold text-slate-700 mt-1.5 leading-snug group-hover:text-slate-900 transition-colors">
                    Today: Browse our editor&apos;s hand picked articles!
                  </p>
                </Link>
              </div>

              {/* Item 1: Magazine Card with EC Logo & LOUNGE Interview Header Strip */}
              <div className="group pb-3.5 border-b border-slate-100">
                <Link href={`/article/${freshStories[0].slug}`} className="block">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 border border-slate-200 mb-2 relative rounded-xs shadow-2xs">
                    <img
                      src={freshStories[0].image}
                      alt={freshStories[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Official Magazine Interview Overlay (EC Logo + Seal + LOUNGE Interview Badge) */}
                    <MagazineCardOverlay
                      badge={freshStories[0].badge}
                      categoryTag="LOUNGE Interview"
                      caption={freshStories[0].caption}
                      showMonogram
                      monogramLetter="S"
                      monogramSubtext="LAW CHAMBERS"
                    />
                  </div>

                  <h3 className="font-extrabold text-xs sm:text-[13px] uppercase leading-snug text-slate-900 group-hover:text-[#E11925] transition-colors line-clamp-3">
                    {freshStories[0].title}
                  </h3>
                </Link>
              </div>

              {/* Item 2: Title + Black Tag Pill + Date */}
              <div className="group pt-3 pb-3 border-b border-slate-100">
                <Link href={`/article/${freshStories[1].slug}`} className="block">
                  <h4 className="font-bold text-xs leading-snug text-slate-900 group-hover:text-[#E11925] transition-colors line-clamp-2">
                    {freshStories[1].title}
                  </h4>
                  
                  <div className="mt-2">
                    <span className="inline-block bg-black text-white text-[9.5px] font-black uppercase px-2 py-0.5 tracking-wider rounded-2xs">
                      {freshStories[1].badge}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1 font-normal">
                      {freshStories[1].date}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Item 3: Title + Black Pill Badge + Date */}
              <div className="group pt-3">
                <Link href={`/article/${freshStories[2].slug}`} className="block">
                  <h4 className="font-bold text-xs leading-snug text-slate-900 group-hover:text-[#E11925] transition-colors line-clamp-2">
                    {freshStories[2].title}
                  </h4>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-block bg-black text-white text-[9.5px] font-black uppercase px-2 py-0.5 tracking-wider rounded-2xs">
                      {freshStories[2].badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {freshStories[2].date}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2: CENTER MAIN LEAD STORY (4 Cols in 12-col grid)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 pr-0 md:pr-5">
            <div className="group">
              <Link href={`/article/${mainLead.slug}`} className="block">
                {/* 16:10 Main Lead Image with EC Magazine Brand Overlay */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 border border-slate-200 mb-3 relative shadow-sm group-hover:shadow-md transition-shadow rounded-xs">
                  <img
                    src={mainLead.image}
                    alt={mainLead.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Official Magazine Interview Overlay (Matches User Screenshot 100%) */}
                  <MagazineCardOverlay
                    badge={mainLead.badge}
                    categoryTag="LOUNGE Interview"
                    caption={mainLead.caption}
                    showMonogram
                    monogramLetter="S"
                    monogramSubtext="LAW CHAMBERS"
                  />
                </div>

                {/* Big Bold Headline */}
                <h3 className="font-sans text-lg sm:text-[20px] font-black uppercase leading-snug text-slate-900 group-hover:text-[#E11925] transition-colors mb-2.5">
                  {mainLead.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3 font-normal mb-4">
                  {mainLead.excerpt}
                </p>

                {/* [ READ MORE ] Box Button */}
                <div className="inline-block px-4 py-1.5 border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 text-[11px] font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer">
                  {mainLead.buttonText}
                </div>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 3: STACKED SPOTLIGHT (3 Cols in 12-col grid)       */}
          {/* Matches Screenshot 3: White card with EC Logo + Round Pic */}
          {/* ========================================================= */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 pr-0 lg:pr-5 space-y-5">
            {data.stackedSpotlight.map((spot, idx) => (
              <div key={spot.slug} className="group">
                <Link href={`/article/${spot.slug}`} className="block">
                  
                  {/* Framed Interview Card with EC Logo & Circular Portrait (Matches Screenshot 100%) */}
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-50 border border-slate-200 mb-2 relative rounded-xs shadow-2xs p-3 pt-8 flex items-center justify-between">
                    
                    {/* Top Strip with EC Logo (Left) and LOUNGE Interview (Right) */}
                    <div className="absolute top-0 inset-x-0 bg-white/95 backdrop-blur-xs px-2.5 py-1 flex items-center justify-between border-b border-slate-200 z-20">
                      <div className="flex items-center gap-1.5 select-none">
                        <img
                          src="/images/business-walkins-logo.jpg"
                          alt="BW"
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full object-cover border border-amber-300 shrink-0"
                        />
                        <span className="text-[9px] sm:text-[10px] font-bold text-[#111827] tracking-tight leading-none uppercase">
                          Business <span className="text-[#C28B30]">Walkins</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#E11925] text-white px-1.5 py-0.5 rounded-2xs text-[7.5px] font-bold uppercase tracking-wider">
                        <span>LOUNGE</span>
                        <span className="italic font-serif">Interview</span>
                      </div>
                    </div>

                    {/* Left Side: Brand Headline & Subtitle */}
                    <div className="pr-2 max-w-[65%] flex flex-col justify-center">
                      <h5 className="font-extrabold text-[11px] sm:text-xs text-[#006699] uppercase tracking-tight leading-tight line-clamp-1">
                        {spot.brandTitle}
                      </h5>
                      <p className="text-[9.5px] text-slate-600 line-clamp-2 mt-1 leading-snug font-normal">
                        {spot.brandSubtitle}
                      </p>
                      <div className="mt-2 pt-1 border-t border-slate-200">
                        <span className="text-[9px] font-bold text-slate-800 block truncate">
                          {spot.executiveName}
                        </span>
                        <span className="text-[7.5px] text-slate-500 block truncate">
                          {spot.executiveRole}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Round Circular Executive Portrait */}
                    <div className="shrink-0 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200">
                        <img
                          src={spot.executiveAvatar}
                          alt={spot.executiveName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Headline */}
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#E11925] transition-colors leading-snug line-clamp-2">
                    {spot.title}
                  </h4>

                  {/* Date */}
                  <span className="text-[11px] text-slate-400 font-normal my-1 block">
                    {spot.date}
                  </span>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {spot.excerpt}
                  </p>
                </Link>

                {idx === 0 && (
                  <div className="border-t border-slate-200 mt-4 pt-1"></div>
                )}
              </div>
            ))}
          </div>

          {/* ========================================================= */}
          {/* COLUMN 4: BEST BUSINESS MAGAZINE LIST (2 Cols in 12-col)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-2">
            {/* Bright Cyan / Aqua Header (3 Lines matching screenshot) */}
            <div className="text-center mb-4">
              <Link href="/magazine" className="group block">
                <h3 className="font-extrabold text-xl text-[#00BCD4] group-hover:text-[#E11925] transition-colors leading-tight tracking-tight uppercase">
                  Best Business<br />
                  Magazine In<br />
                  India
                </h3>
              </Link>
            </div>

            {/* 5 Stacked Articles with Red Category Badges */}
            <div className="space-y-3.5 divide-y divide-slate-100">
              {data.magazineList.map((story, idx) => (
                <div key={story.slug} className={`group ${idx === 0 ? '' : 'pt-3'}`}>
                  <Link href={`/article/${story.slug}`} className="block">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#E11925] transition-colors leading-snug line-clamp-2">
                      {story.title}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="inline-block bg-[#E11925] text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-2xs shrink-0">
                        {story.badge}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal truncate">
                        {story.date}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
