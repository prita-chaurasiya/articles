'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import MagazineCardOverlay from '@/components/common/MagazineCardOverlay';
import { formatDate } from '@/lib/utils';

interface EditorialHeroQuadProps {
  articles?: Article[];
}

/**
 * Ensures headlines render in clean, readable Title Case matching businessconnectindia.in
 * while preserving acronyms (AI, IT, USD, FY26, AEC, etc.)
 */
function formatDisplayTitle(title: string): string {
  if (!title) return '';
  const lettersOnly = title.replace(/[^a-zA-Z]/g, '');
  if (lettersOnly.length > 5 && lettersOnly === lettersOnly.toUpperCase()) {
    const acronyms = new Set(['AI', 'IT', 'USD', 'FY26', 'AEC', 'BIM', 'CEO', 'S&P', 'S', 'P', 'CSR']);
    return title
      .toLowerCase()
      .split(' ')
      .map((word) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9&]/g, '').toUpperCase();
        if (acronyms.has(cleanWord)) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
  return title;
}

/**
 * Formats badge into a clean single category tag matching businessconnectindia.in
 * and prevents horizontal overflow for compound category strings like "OPINION | BIM..."
 */
function formatBadge(badge?: string): string {
  if (!badge) return 'LOUNGE INTERVIEW';
  const cleaned = badge.split(/[|•,\-–]/)[0].trim();
  if (cleaned.length > 20) {
    return cleaned.slice(0, 18) + '...';
  }
  return cleaned || 'LOUNGE INTERVIEW';
}

export const HERO_QUAD_DATA = {
  // Column 1: Fresh Stories (3 Items matching screenshot)
  freshStories: [
    {
      id: 'fresh-1',
      slug: 'sp-law-chambers-litigation-firm-trust-solutions',
      title: 'S & P Law Chambers: A Full-Service Litigation Firm Built on Trust, Expertise, and Client-First Solutions',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
      badge: '20 MOST PROMISING LEGAL FIRM TO WATCH IN 2026',
      caption: 'Advocate Luv Shah – Partner • Parth Patel – Managing Partner • Advocate Vineet Sheth – Partner',
    },
    {
      id: 'fresh-2',
      slug: 'newgen-software-strengthens-foundational-computer-literacy',
      title: 'Newgen Software Strengthens Foundational Computer Literacy...',
      badge: 'LOUNGE INTERVIEW',
      date: 'October 15, 2026',
    },
    {
      id: 'fresh-3',
      slug: 'vinayak-group-wins-outstanding-customer-experience-centre',
      title: 'Vinayak Group Wins "Outstanding Customer Experience Centre -..."',
      badge: 'LOUNGE INTERVIEW',
      date: 'September 11, 2026',
    },
  ],

  // Column 2: Center Main Lead Cover Story
  mainLead: {
    slug: 'sp-law-chambers-full-service-litigation-firm',
    title: 'S & P Law Chambers: A Full-Service Litigation Firm Built on Trust...',
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
      badge: a.subcategory?.toUpperCase() || a.category.toUpperCase() || 'LOUNGE INTERVIEW',
      date: formatDate(a.publishedAt),
      caption: `By ${a.author?.name || 'Staff'} • ${a.author?.role || 'Author'}`,
    })),
    ...HERO_QUAD_DATA.freshStories,
  ].slice(0, 3);

  return (
    <section className="bg-white border-b border-slate-200 py-5 sm:py-7">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* EXACT 4-COLUMN ROW MATCHING REFERENCE SCREENSHOT          */}
        {/* Col 1 (21%) | Col 2 (36%) | Col 3 (23%) | Col 4 (20%)      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[21fr_36fr_23fr_20fr] gap-6 lg:gap-7 items-start">
          
          {/* ========================================================= */}
          {/* COLUMN 1: FRESH STORIES (3 Items matching screenshot)     */}
          {/* Exact #F2F2F2 Background from businessconnectindia.in     */}
          {/* ========================================================= */}
          <div className="min-w-0 bg-[#F2F2F2] p-3 sm:p-3.5 md:p-4 pt-4 pb-4 flex flex-col justify-between h-full space-y-3 overflow-hidden rounded-xs">
            <div>
              {/* Header Title + Subtitle matching businessconnectindia.in */}
              <div className="mb-3.5">
                <Link href="/news" className="group block">
                  <h2 className="text-[22px] sm:text-[24px] lg:text-[26px] font-black tracking-tight text-[#424242] group-hover:text-[#E11925] transition-colors leading-none font-worksans whitespace-nowrap">
                    Fresh Stories
                  </h2>
                  <p className="text-[13px] sm:text-[13.5px] font-bold text-[#181818] mt-2 leading-[18px] font-worksans">
                    Today: Browse our editor&apos;s hand picked articles!
                  </p>
                </Link>
              </div>

              {/* Item 1: Magazine Card with BW Logo & LOUNGE Interview Header Strip */}
              {freshStories[0] && (
                <div className="group pb-3.5">
                  <Link href={`/article/${freshStories[0].slug}`} className="block">
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 border border-[#DEDEDE] mb-2.5 relative rounded-xs shadow-2xs">
                      <img
                        src={freshStories[0].image}
                        alt={freshStories[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Official Magazine Interview Overlay */}
                      <MagazineCardOverlay
                        badge={freshStories[0].badge}
                        categoryTag="LOUNGE Interview"
                        caption={freshStories[0].caption}
                        showMonogram
                        monogramLetter="S"
                        monogramSubtext="LAW CHAMBERS"
                      />
                    </div>

                    {/* Title matching businessconnectindia.in (16px Roboto Bold Title Case) */}
                    <h3 className="font-bold text-[15px] sm:text-[15.5px] leading-[1.35] text-[#1a1a1a] group-hover:text-[#E11925] transition-colors mt-2 font-roboto break-words line-clamp-2">
                      {formatDisplayTitle(freshStories[0].title)}
                    </h3>
                  </Link>
                </div>
              )}

              {/* Item 2: Title + Black Tag Badge + Date */}
              {freshStories[1] && (
                <div className="group pt-3.5 pb-3.5 border-t border-[#DEDEDE]">
                  <Link href={`/article/${freshStories[1].slug}`} className="block">
                    <h4 className="font-bold text-[14.5px] sm:text-[15px] leading-[1.35] text-[#1a1a1a] group-hover:text-[#E11925] transition-colors mb-2 font-roboto break-words line-clamp-2">
                      {formatDisplayTitle(freshStories[1].title)}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 min-w-0">
                      <span className="inline-block max-w-[70%] truncate bg-[#242424] text-white text-[9.5px] sm:text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider leading-none font-roboto shrink-0">
                        {formatBadge(freshStories[1].badge)}
                      </span>
                      {freshStories[1].date && (
                        <span className="text-[12px] text-[#767676] font-normal leading-none font-body truncate">
                          {freshStories[1].date}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              )}

              {/* Item 3: Title + Black Tag Badge + Date matching screenshot */}
              {freshStories[2] && (
                <div className="group pt-3.5 border-t border-[#DEDEDE]">
                  <Link href={`/article/${freshStories[2].slug}`} className="block">
                    <h4 className="font-bold text-[14.5px] sm:text-[15px] leading-[1.35] text-[#1a1a1a] group-hover:text-[#E11925] transition-colors mb-2 font-roboto break-words line-clamp-2">
                      {formatDisplayTitle(freshStories[2].title)}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 min-w-0">
                      <span className="inline-block max-w-[70%] truncate bg-[#242424] text-white text-[9.5px] sm:text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider leading-none font-roboto shrink-0">
                        {formatBadge(freshStories[2].badge)}
                      </span>
                      {freshStories[2].date && (
                        <span className="text-[12px] text-[#767676] font-normal leading-none font-body truncate">
                          {freshStories[2].date}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2: CENTER MAIN LEAD STORY (Dominant Hero Column)   */}
          {/* ========================================================= */}
          <div className="min-w-0">
            <div className="group">
              <Link href={`/article/${mainLead.slug}`} className="block">
                {/* 16:10 Main Lead Image with Magazine Brand Overlay */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 border border-slate-200 mb-3 relative shadow-xs group-hover:shadow-md transition-shadow rounded-xs">
                  <img
                    src={mainLead.image}
                    alt={mainLead.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Official Magazine Interview Overlay */}
                  <MagazineCardOverlay
                    badge={mainLead.badge}
                    categoryTag="LOUNGE Interview"
                    caption={mainLead.caption}
                    showMonogram
                    monogramLetter="S"
                    monogramSubtext="LAW CHAMBERS"
                  />
                </div>

                {/* Big Bold Headline matching businessconnectindia.in (24px, 33px line-height, bold, title case) */}
                <h3 className="font-roboto text-[21px] sm:text-[23px] lg:text-[24px] font-bold leading-[1.3] text-[#1a1a1a] group-hover:text-[#E11925] transition-colors mb-2.5 tracking-tight break-words line-clamp-4">
                  {formatDisplayTitle(mainLead.title)}
                </h3>

                {/* Excerpt matching businessconnectindia.in (15px Work Sans, #666) */}
                <p className="text-[14px] sm:text-[15px] text-[#666666] leading-[1.6] line-clamp-3 font-normal mb-4 font-body">
                  {mainLead.excerpt}
                </p>

                {/* [ READ MORE ] Box Button */}
                <div className="inline-block px-4 py-1.5 border border-[#d0d0d0] hover:border-[#111111] bg-white hover:bg-slate-50 text-[#333333] hover:text-[#111111] text-[12px] font-semibold uppercase tracking-wider rounded-none transition-colors font-roboto">
                  {mainLead.buttonText}
                </div>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 3: STACKED SPOTLIGHT (2 Cards with Avatars)        */}
          {/* ========================================================= */}
          <div className="min-w-0 space-y-5">
            {data.stackedSpotlight.map((spot, idx) => (
              <div key={spot.slug} className="group">
                <Link href={`/article/${spot.slug}`} className="block">
                  
                  {/* Framed Interview Card with BW Logo & Circular Portrait */}
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-50 border border-[#EDEDED] mb-2 relative rounded-xs shadow-2xs p-3 pt-8 flex items-center justify-between">
                    
                    {/* Top Strip with Logo (Left) and LOUNGE Interview (Right) */}
                    <div className="absolute top-0 inset-x-0 bg-white/95 backdrop-blur-xs px-2.5 py-1 flex items-center justify-between border-b border-[#EDEDED] z-20">
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
                      <h5 className={`font-extrabold text-[11px] sm:text-xs uppercase tracking-tight leading-tight line-clamp-1 ${idx === 1 ? 'text-[#A81B24]' : 'text-[#006699]'}`}>
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
                  <h4 className="text-[15px] sm:text-[16px] font-bold text-[#1a1a1a] group-hover:text-[#E11925] transition-colors leading-[1.35] line-clamp-2 mt-2 font-roboto">
                    {formatDisplayTitle(spot.title)}
                  </h4>

                  {/* Date */}
                  <span className="text-[11.5px] text-[#767676] font-normal my-1 block font-body">
                    {spot.date}
                  </span>

                  {/* Excerpt */}
                  <p className="text-[13px] sm:text-[13.5px] text-[#666666] line-clamp-2 leading-relaxed font-body">
                    {spot.excerpt}
                  </p>
                </Link>

                {idx === 0 && (
                  <div className="border-t border-[#EDEDED] mt-4 pt-1"></div>
                )}
              </div>
            ))}
          </div>

          {/* ========================================================= */}
          {/* COLUMN 4: BEST BUSINESS MAGAZINE IN INDIA LIST            */}
          {/* ========================================================= */}
          <div className="min-w-0">
            {/* Bright Cyan / Aqua Header (3 Lines matching screenshot) */}
            <div className="text-center mb-4">
              <Link href="/magazine" className="group block">
                <h3 className="font-black text-[22px] sm:text-[24px] text-[#00BCD4] group-hover:text-[#E11925] transition-colors leading-[1.15] tracking-tight font-roboto">
                  Best Business<br />
                  Magazine In<br />
                  India
                </h3>
              </Link>
            </div>

            {/* Stacked Articles with Red Category Badges */}
            <div className="space-y-4">
              {data.magazineList.slice(0, 4).map((story, idx) => (
                <div key={story.slug} className={`group ${idx === 0 ? '' : 'pt-3 border-t border-[#EDEDED]'}`}>
                  <Link href={`/article/${story.slug}`} className="block">
                    <h4 className="text-[14px] sm:text-[14.5px] font-bold text-[#1a1a1a] group-hover:text-[#E11925] transition-colors leading-[1.35] line-clamp-2 mb-1.5 font-roboto">
                      {formatDisplayTitle(story.title)}
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block bg-[#CC0000] text-white text-[9px] sm:text-[9.5px] font-bold uppercase px-2 py-0.5 rounded-none shrink-0 font-roboto">
                        {story.badge}
                      </span>
                      <span className="text-[11px] sm:text-[11.5px] text-[#767676] font-normal truncate font-body">
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
