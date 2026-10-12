'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, BookOpen } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import {
  DUMMY_COVER_STORIES_P1,
  DUMMY_COVER_STORIES_P2,
  DUMMY_SIDEBAR_DATA,
} from '@/data/coverStoryArticles';

export default function CoverStoryView() {
  const { articles } = useArticleStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Check if user has added any custom cover stories via Admin Studio
  const userCoverStories = useMemo(() => {
    return articles
      .filter(
        (a) =>
          a.isCoverStory ||
          a.categorySlug === 'cover-story' ||
          a.category.toLowerCase().includes('cover')
      )
      .map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        category: 'COVER STORY',
        date: new Date(a.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        heroImage:
          !a.heroImage || a.heroImage.includes('517976487502')
            ? 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'
            : a.heroImage,
        excerpt: a.excerpt,
      }));
  }, [articles]);

  // Combined articles for Page 1: User added articles first, followed by dummy articles
  const page1Articles = useMemo(() => {
    if (userCoverStories.length > 0) {
      const remainingSlots = Math.max(0, 10 - userCoverStories.length);
      return [...userCoverStories, ...DUMMY_COVER_STORIES_P1.slice(0, remainingSlots)];
    }
    return DUMMY_COVER_STORIES_P1;
  }, [userCoverStories]);

  // Paginated articles
  const currentArticles = useMemo(() => {
    if (currentPage === 1) return page1Articles;
    if (currentPage === 2) return DUMMY_COVER_STORIES_P2;
    // For page 3 or 41 or other pages, provide dummy paginated slice
    return DUMMY_COVER_STORIES_P1.slice(4).concat(DUMMY_COVER_STORIES_P2);
  }, [currentPage, page1Articles]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column Layout: Articles (Col 8) + Sidebar (Col 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* ======================================================= */}
          {/* LEFT CONTENT AREA: Browsing Cover Story (Col 8)         */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            
            {/* Section Header: COVER STORIES with red accent */}
            <div className="mb-6 pb-2 border-b border-slate-200">
              <h1 className="border-l-4 border-[#DC2626] pl-3 py-0.5 text-lg sm:text-xl font-bold uppercase text-slate-900 tracking-tight font-serif flex items-center gap-1.5">
                <span>COVER STORIES:</span>
                <span className="text-slate-800">EXECUTIVE ARCHIVE</span>
              </h1>
            </div>

            {/* 2-Column Articles Grid (Matches Reference UI exactly) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {currentArticles.map((story) => (
                <article
                  key={story.id}
                  className="group flex flex-col justify-between bg-white rounded-sm overflow-hidden"
                >
                  <div>
                    {/* Hero Graphic Image (Clickable) */}
                    <Link
                      href={`/article/${story.slug}`}
                      className="block aspect-[16/9] w-full overflow-hidden bg-slate-100 rounded-sm shadow-sm border border-slate-200 relative group-hover:shadow-md transition-shadow"
                    >
                      <img
                        src={story.heroImage}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                    </Link>

                    {/* Article Title (Clickable) */}
                    <Link href={`/article/${story.slug}`} className="block mt-3 group-hover:text-[#DC2626]">
                      <h2 className="font-bold text-sm sm:text-[15px] text-slate-900 leading-snug line-clamp-2 transition-colors">
                        {story.title}
                      </h2>
                    </Link>

                    {/* Category & Date Meta */}
                    <div className="flex items-center gap-2 mt-2 text-[11px] font-semibold">
                      <span className="text-[#DC2626] uppercase font-bold tracking-wider">
                        {story.category}
                      </span>
                      <span className="text-slate-400 font-normal">—</span>
                      <span className="text-slate-500 font-normal">
                        {story.date}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 mt-2 font-normal">
                      {story.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* ======================================================= */}
            {/* PAGINATION BAR (Exact match with Reference UI)          */}
            {/* ======================================================= */}
            <div className="mt-10 pt-6 border-t border-slate-200 flex items-center gap-1.5 select-none">
              {/* Page 1 */}
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                className={`min-w-[32px] h-8 px-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer border ${
                  currentPage === 1
                    ? 'bg-[#DC2626] text-white border-[#DC2626]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                }`}
                aria-label="Go to page 1"
              >
                1
              </button>

              {/* Page 2 */}
              <button
                type="button"
                onClick={() => handlePageChange(2)}
                className={`min-w-[32px] h-8 px-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer border ${
                  currentPage === 2
                    ? 'bg-[#DC2626] text-white border-[#DC2626]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                }`}
                aria-label="Go to page 2"
              >
                2
              </button>

              {/* Page 3 */}
              <button
                type="button"
                onClick={() => handlePageChange(3)}
                className={`min-w-[32px] h-8 px-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer border ${
                  currentPage === 3
                    ? 'bg-[#DC2626] text-white border-[#DC2626]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                }`}
                aria-label="Go to page 3"
              >
                3
              </button>

              {/* Ellipsis */}
              <span className="px-2 text-slate-400 text-xs font-bold select-none">
                …
              </span>

              {/* Page 41 */}
              <button
                type="button"
                onClick={() => handlePageChange(41)}
                className={`min-w-[32px] h-8 px-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer border ${
                  currentPage === 41
                    ? 'bg-[#DC2626] text-white border-[#DC2626]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                }`}
                aria-label="Go to page 41"
              >
                41
              </button>

              {/* Next Page Arrow (>) */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage >= 41 ? 1 : currentPage + 1)}
                className="h-8 px-3 rounded-sm text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Next page"
                title="Next"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </main>

          {/* ======================================================= */}
          {/* RIGHT SIDEBAR (Exact Match with Reference Layout)       */}
          {/* ======================================================= */}
          <aside className="lg:col-span-4 space-y-8 lg:pl-2">
            
            {/* WIDGET 1: STARTUP SPOTLIGHT */}
            <div className="bg-white">
              <div className="border-b-2 border-slate-900 pb-1 mb-4">
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                  STARTUP SPOTLIGHT
                </h3>
              </div>

              {/* Featured Lead Startup Story */}
              <div className="group mb-5">
                <Link
                  href={`/article/${DUMMY_SIDEBAR_DATA.startupLead.slug}`}
                  className="block aspect-[16/9] w-full overflow-hidden bg-slate-100 rounded-sm shadow-sm border border-slate-200"
                >
                  <img
                    src={DUMMY_SIDEBAR_DATA.startupLead.heroImage}
                    alt={DUMMY_SIDEBAR_DATA.startupLead.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <Link
                  href={`/article/${DUMMY_SIDEBAR_DATA.startupLead.slug}`}
                  className="block mt-2.5 group-hover:text-[#DC2626]"
                >
                  <h4 className="font-bold text-sm text-slate-900 leading-snug transition-colors line-clamp-2">
                    {DUMMY_SIDEBAR_DATA.startupLead.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-semibold">
                  <span className="text-[#DC2626] uppercase font-bold">{DUMMY_SIDEBAR_DATA.startupLead.category}</span>
                  <span className="text-slate-400">—</span>
                  <span className="text-slate-500 font-normal">{DUMMY_SIDEBAR_DATA.startupLead.date}</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed mt-1.5 line-clamp-2">
                  {DUMMY_SIDEBAR_DATA.startupLead.excerpt}
                </p>
              </div>

              {/* Smaller Startup List Items */}
              <div className="space-y-3.5 pt-1">
                {DUMMY_SIDEBAR_DATA.startupList.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/article/${item.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded-sm border border-slate-200 shrink-0 group-hover:opacity-90"
                    />
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#DC2626] transition-colors leading-tight line-clamp-2">
                        {item.title}
                      </h5>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {item.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* WIDGET 2: LATEST DISPATCHES */}
            <div className="bg-white">
              <div className="border-b-2 border-slate-900 pb-1 mb-4">
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                  LATEST DISPATCHES
                </h3>
              </div>

              <ul className="space-y-3.5 divide-y divide-slate-100">
                {DUMMY_SIDEBAR_DATA.recentPosts.map((post, idx) => (
                  <li key={post.slug} className={idx === 0 ? 'pt-0' : 'pt-2.5'}>
                    <Link
                      href={`/article/${post.slug}`}
                      className="group block"
                    >
                      <h5 className="font-semibold text-xs text-slate-800 group-hover:text-[#DC2626] transition-colors leading-snug">
                        {post.title}
                      </h5>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {post.date}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* WIDGET 3: E-MAGAZINE PRINT COVER */}
            <div className="bg-white pt-2">
              <Link
                href="/magazine"
                className="block group relative overflow-hidden rounded-sm shadow-md border border-slate-200 hover:shadow-xl transition-all"
                title="Browse Full Magazine Edition"
              >
                <img
                  src={DUMMY_SIDEBAR_DATA.magazineCover.image}
                  alt={DUMMY_SIDEBAR_DATA.magazineCover.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <BookOpen className="w-4 h-4 text-[#DC2626]" />
                    <span>Read Full E-Magazine Edition →</span>
                  </div>
                </div>
              </Link>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
