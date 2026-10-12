'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EditorialHeroQuadProps {
  articles: Article[];
}

export default function EditorialHeroQuad({ articles }: EditorialHeroQuadProps) {
  if (!articles || articles.length === 0) return null;

  // 1. Center Main Lead Story (Image 2 Center Cover Story)
  // Look for S & P Law Chambers or cover story or featured story
  const mainLead =
    articles.find((a) => a.slug === 'sp-law-chambers-full-service-litigation-firm-trust-expertise') ||
    articles.find((a) => a.isCoverStory) ||
    articles[0];

  // 2. Left Column "Fresh Stories" (hand-picked articles)
  // Ensure we pick fresh stories that aren't the main lead
  const freshList = articles
    .filter((a) => a.id !== mainLead.id && a.categorySlug !== 'blog')
    .slice(0, 3);

  // 3. Center-Right Column: 2 Stacked Spotlight / Lounge Interviews
  const spotlightStories = articles
    .filter(
      (a) =>
        a.id !== mainLead.id &&
        !freshList.some((f) => f.id === a.id) &&
        (a.categorySlug === 'interviews' || a.category === 'Lounge Interview' || a.subcategory.includes('Interview'))
    )
    .slice(0, 2);

  // Fallback if specific interview stories are fewer than 2
  const fallbackSpotlight = spotlightStories.length === 2
    ? spotlightStories
    : [
        ...spotlightStories,
        ...articles.filter((a) => a.id !== mainLead.id && !freshList.some((f) => f.id === a.id)).slice(0, 2 - spotlightStories.length)
      ];

  // 4. Right Column: Best Business Magazine list (Blogs & Success Stories with red badges)
  const sidebarStories = [
    // Story 1: WhatsApp Jan Koum (BLOG)
    articles.find((a) => a.slug === 'from-poverty-to-a-billionaire-inspiring-story-of-whatsapp-co-founder') ||
    articles.find((a) => a.categorySlug === 'blog') ||
    articles[1],

    // Story 2: Rishi Sunak (SUCCESS STORIES)
    articles.find((a) => a.slug === 'meet-indian-origin-youngest-prime-minister-of-britain-rishi-sunak') ||
    articles.find((a) => a.categorySlug === 'success-stories') ||
    articles[2],

    // Story 3: Vineeta Singh (SUCCESS STORIES)
    articles.find((a) => a.slug === 'untold-story-of-vineeta-singh-rejected-one-crore-job-offer') ||
    articles.find((a) => a.tags?.includes('Vineeta Singh')) ||
    articles[3],

    // Story 4: Muniba Mazari (BLOG)
    articles.find((a) => a.slug === 'life-lessons-from-muniba-mazari-story-embrace-gratitude-after-adversity') ||
    articles.find((a) => a.tags?.includes('Muniba Mazari')) ||
    articles[4],
  ].filter(Boolean) as Article[];

  return (
    <section className="bg-white border-b border-slate-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-COLUMN EDITORIAL GRID MATCHING REFERENCE NEWSPAPER/MAGAZINE DESIGN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          
          {/* ========================================================= */}
          {/* COLUMN 1 (LG: 3 COLS): FRESH STORIES                      */}
          {/* ========================================================= */}
          <div className="lg:col-span-3 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 pr-0 md:pr-5">
            <div className="mb-4">
              <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-slate-900 leading-none">
                Fresh Stories
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-1.5">
                Today: Browse our editor&apos;s hand picked articles!
              </p>
            </div>

            {freshList[0] && (
              <div className="group mb-5">
                <Link href={`/article/${freshList[0].slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded bg-slate-100 border border-slate-200 mb-2.5">
                    <img
                      src={freshList[0].heroImage}
                      alt={freshList[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 text-white text-[9px] font-bold uppercase tracking-wider rounded">
                      Featured
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-[13px] font-extrabold uppercase leading-snug text-slate-900 group-hover:text-red-600 transition-colors line-clamp-3">
                    {freshList[0].title}
                  </h3>
                </Link>
              </div>
            )}

            <div className="border-t border-slate-200 my-4"></div>

            {freshList[1] && (
              <div className="group mb-4">
                <Link href={`/article/${freshList[1].slug}`} className="block">
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                    {freshList[1].title}
                  </h3>
                  <div className="mt-2">
                    <span className="inline-block bg-[#0B0F19] text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-sm shadow-sm">
                      {freshList[1].subcategory || 'EMERGING INNOVATION OF THE YEAR'}
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {freshList[2] && (
              <>
                <div className="border-t border-slate-100 my-3"></div>
                <div className="group">
                  <Link href={`/article/${freshList[2].slug}`} className="block">
                    <h3 className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                      {freshList[2].title}
                    </h3>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {formatDate(freshList[2].publishedAt)}
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2 (LG: 4 COLS): CENTER MAIN LEAD STORY             */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 pr-0 md:pr-5">
            <div className="group">
              <Link href={`/article/${mainLead.slug}`} className="block">
                <div className="relative aspect-[16/11] overflow-hidden rounded bg-slate-900 border border-slate-200 mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={mainLead.heroImage}
                    alt={mainLead.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded shadow">
                    Cover Story
                  </div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-black uppercase leading-tight text-slate-900 group-hover:text-red-600 transition-colors mb-2.5">
                  {mainLead.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-4 font-normal mb-4">
                  {mainLead.excerpt}
                </p>

                <div className="inline-block px-4 py-2 border border-slate-400 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white text-slate-800 text-[11px] font-black uppercase tracking-wider transition-all rounded-sm">
                  READ MORE
                </div>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 3 (LG: 2.5 COLS): STACKED SPOTLIGHT / INTERVIEWS   */}
          {/* ========================================================= */}
          <div className="lg:col-span-2.5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 pr-0 lg:pr-5 space-y-5">
            {fallbackSpotlight.map((spot, idx) => (
              <div key={spot.id} className="group">
                <Link href={`/article/${spot.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded bg-slate-100 border border-slate-200 mb-2.5">
                    <img
                      src={spot.heroImage}
                      alt={spot.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-red-600/90 text-white text-[9px] font-bold uppercase tracking-wider rounded">
                      Lounge Interview
                    </div>
                  </div>

                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                    {spot.title}
                  </h4>

                  <span className="text-[11px] text-slate-500 font-medium my-1 block">
                    {formatDate(spot.publishedAt)}
                  </span>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {spot.excerpt}
                  </p>
                </Link>

                {idx === 0 && (
                  <div className="border-t border-slate-200 mt-5 pt-1"></div>
                )}
              </div>
            ))}
          </div>

          {/* ========================================================= */}
          {/* COLUMN 4 (LG: 2.5 COLS): BEST BUSINESS MAGAZINE SIDEBAR   */}
          {/* ========================================================= */}
          <div className="lg:col-span-2.5">
            <div className="text-center mb-5 pb-2 border-b border-cyan-100">
              <h3 className="font-extrabold text-xl sm:text-[22px] text-[#00AEEF] leading-tight tracking-tight">
                Best Business Magazine In India
              </h3>
            </div>

            <div className="space-y-4">
              {sidebarStories.map((story, i) => {
                const isBlog = story.categorySlug === 'blog' || story.tags?.includes('Blog');
                const badgeText = isBlog ? 'BLOG' : 'SUCCESS STORIES';

                return (
                  <div key={story.id || i} className="group pb-3.5 border-b border-slate-100 last:border-b-0 last:pb-0">
                    <Link href={`/article/${story.slug}`} className="block">
                      <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                        {story.title}
                      </h4>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-block bg-[#DC2626] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm shrink-0">
                          {badgeText}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {formatDate(story.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Quick Link to Success Stories & Blogs */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href="/category/blog"
                className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1 text-[11px]"
              >
                <span>All Blogs</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/success-stories"
                className="font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 text-[11px]"
              >
                <span>All Success Stories</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
