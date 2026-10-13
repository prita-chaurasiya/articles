'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Clock, Eye, ArrowRight, Bookmark, Flame, Sparkles, Filter } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { CATEGORIES } from '@/data/categories';
import { formatDate, formatNumber } from '@/lib/utils';
import SponsoredAdBlock from '@/components/home/SponsoredAdBlock';
import TestimonialsView from '@/components/testimonials/TestimonialsView';
import CoverStoryView from '@/components/cover-story/CoverStoryView';
import CategoryNewsView from '@/components/category/CategoryNewsView';
import CategoryHealthcareView from '@/components/category/CategoryHealthcareView';
import CategoryLaunchpadView from '@/components/category/CategoryLaunchpadView';
import CategorySuccessStoriesView from '@/components/category/CategorySuccessStoriesView';
import CategoryLoungeInterviewView from '@/components/category/CategoryLoungeInterviewView';
import CategoryBlogView from '@/components/category/CategoryBlogView';

import CategoryPressReleaseView from '@/components/category/CategoryPressReleaseView';
import CategoryGuestPostsView from '@/components/category/CategoryGuestPostsView';

export default function CategoryPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] py-24 text-center text-slate-500 font-medium">Loading category archive...</div>}>
      <CategoryContent />
    </React.Suspense>
  );
}

function CategoryContent() {
  const routerParams = useParams();
  const slug = (routerParams?.slug as string) || '';

  // If blog category, render dedicated authentic Blog view matching screenshot
  if (slug.toLowerCase() === 'blog') {
    return <CategoryBlogView />;
  }

  // If press-release category, render dedicated authentic Press Release view
  if (slug.toLowerCase() === 'press-release') {
    return <CategoryPressReleaseView />;
  }

  // If guest-posts category, render dedicated authentic Guest Posts view
  if (slug.toLowerCase() === 'guest-posts') {
    return <CategoryGuestPostsView />;
  }

  // If lounge-interview category, render dedicated authentic Lounge Interview view matching screenshot
  if (slug.toLowerCase() === 'lounge-interview') {
    return <CategoryLoungeInterviewView />;
  }

  // If success-stories category, render dedicated authentic Success Stories view matching screenshot
  if (slug.toLowerCase() === 'success-stories') {
    return <CategorySuccessStoriesView />;
  }

  // If launchpad category, render dedicated authentic Launchpad view matching screenshot
  if (slug.toLowerCase() === 'launchpad') {
    return <CategoryLaunchpadView />;
  }

  // If healthcare category, render dedicated authentic Healthcare view matching screenshot
  if (slug.toLowerCase() === 'healthcare') {
    return <CategoryHealthcareView />;
  }

  // If news category, render dedicated authentic News view matching screenshot
  if (slug.toLowerCase() === 'news') {
    return <CategoryNewsView />;
  }

  // If testimonials category, render dedicated authentic Testimonials view
  if (slug.toLowerCase() === 'testimonials') {
    return <TestimonialsView />;
  }

  // If cover-story category, render dedicated authentic Cover Story view
  if (slug.toLowerCase() === 'cover-story') {
    return <CoverStoryView />;
  }

  const { articles, bookmarkedSlugs, toggleBookmark } = useArticleStore();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Match category
  const categoryInfo = CATEGORIES.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  ) || {
    id: slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
    slug: slug,
    description: 'Specialized corporate dispatches, sector intelligence, and executive perspectives.',
    color: '#0F172A',
    featuredHeadline: 'Sector Wire & Editorial Analysis',
  };

  // Filter articles belonging to this category
  const categoryArticles = useMemo(() => {
    const s = slug.toLowerCase();
    return articles.filter((a) => {
      const catSlug = (a.categorySlug || '').toLowerCase();
      const catName = (a.category || '').toLowerCase().replace(/[\s&]+/g, '-');
      
      if (s === 'lounge-interview') {
        return catSlug === 'lounge-interview' || catSlug === 'interviews' || a.category.toLowerCase().includes('interview');
      }
      if (s === 'cover-story') {
        return Boolean(a.isCoverStory) || catSlug === 'cover-story' || a.category.toLowerCase().includes('cover story');
      }
      
      return (
        catSlug === s ||
        catName === s ||
        catName.includes(s) ||
        s.includes(catName)
      );
    });
  }, [articles, slug]);

  // Extract unique subcategories
  const subcategoriesList = useMemo(() => {
    const set = new Set<string>();
    categoryArticles.forEach((a) => {
      if (a.subcategory) set.add(a.subcategory);
    });
    return ['All', ...Array.from(set)];
  }, [categoryArticles]);

  const filteredArticles = useMemo(() => {
    if (selectedSubcategory === 'All') return categoryArticles;
    return categoryArticles.filter((a) => a.subcategory === selectedSubcategory);
  }, [categoryArticles, selectedSubcategory]);

  const featuredArticle = filteredArticles.find((a) => a.isFeatured) || filteredArticles[0];
  const listArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id);

  // Trending in this category or global
  const trendingSidebar = categoryArticles.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Category Hero Banner */}
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="text-xs uppercase font-bold tracking-widest text-blue-400">
                Editorial Beat
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {categoryInfo.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Subcategory Pills */}
        {subcategoriesList.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-slate-200 text-xs font-semibold">
            <span className="text-slate-400 uppercase tracking-wider text-[11px] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter Sub-Beat:
            </span>
            {subcategoriesList.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedSubcategory === sub
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Featured Hero Article for Category */}
        {featuredArticle && (
          <div className="mb-12 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                      Featured In {categoryInfo.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <Link href={`/article/${featuredArticle.slug}`}>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-3">
                      {featuredArticle.title}
                    </h2>
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="font-semibold text-slate-800">
                      {featuredArticle.author.name}
                    </span>
                  </div>
                  <Link
                    href={`/article/${featuredArticle.slug}`}
                    className="font-bold text-blue-600 flex items-center gap-1"
                  >
                    Read Analysis →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Layout: Latest Articles Grid (8 cols) + Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Latest Dispatches ({filteredArticles.length})
              </h3>
              <span className="text-xs text-slate-400">Chronological Archive</span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-base font-semibold text-slate-700">No stories in this subcategory yet</p>
                <p className="text-xs text-slate-400 mt-1">Check back soon or create a story in Admin Studio.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {listArticles.slice(0, visibleCount).map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      <Link href={`/article/${article.slug}`} className="block aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={article.heroImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </Link>
                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span className="text-[10px] uppercase font-bold text-blue-600">
                            {article.subcategory}
                          </span>
                          <span>{article.readTime}</span>
                        </div>
                        <Link href={`/article/${article.slug}`}>
                          <h4 className="font-serif text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                            {article.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{article.author.name}</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Load More */}
            {visibleCount < listArticles.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-800 bg-white hover:bg-slate-50 shadow-sm"
                >
                  Load More Stories
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sidebar Ad Block */}
            <SponsoredAdBlock variant="sidebar" />

            {/* Trending in Beat */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 font-serif text-base font-bold text-slate-900">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Trending in {categoryInfo.name}</span>
              </div>
              <div className="space-y-4">
                {trendingSidebar.map((art, idx) => (
                  <Link
                    key={art.id}
                    href={`/article/${art.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className="font-serif font-black text-lg text-slate-300 group-hover:text-blue-600 shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h5 className="font-serif text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                        {art.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {art.readTime} • {formatNumber(art.views)} reads
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Mini Card */}
            <div className="p-6 rounded-2xl bg-blue-600 text-white shadow-md">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200 block mb-1">
                EXECUTIVE BRIEFING
              </span>
              <h4 className="font-serif text-lg font-bold text-white mb-2">
                Subscribe to {categoryInfo.name} Alerts
              </h4>
              <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                Receive weekly curated sector dossiers straight to your corporate inbox.
              </p>
              <Link
                href="/#newsletter"
                className="block text-center py-2 px-4 rounded-lg bg-white text-blue-900 text-xs font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors"
              >
                Join Free Briefing
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
