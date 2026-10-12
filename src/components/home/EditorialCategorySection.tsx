'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Article } from '@/types';
import {
  LargeFeaturedCard,
  MediumHorizontalCard,
  SmallVerticalCard,
  SidebarCard,
} from '@/components/common/ArticleCards';

interface EditorialCategorySectionProps {
  title: string;
  subtitle?: string;
  categorySlug: string;
  articles: Article[];
  variant?: 'featured-split' | 'grid-3' | 'grid-4' | 'horizontal-stack';
}

export default function EditorialCategorySection({
  title,
  subtitle,
  categorySlug,
  articles,
  variant = 'featured-split',
}: EditorialCategorySectionProps) {
  // Filter matching category articles
  const categoryArticles = articles.filter((a) => {
    const slug = a.categorySlug?.toLowerCase() || '';
    const cat = a.category?.toLowerCase() || '';
    const target = categorySlug.toLowerCase();

    return (
      slug.includes(target) ||
      cat.includes(target) ||
      (target === 'ai' && (slug.includes('ai') || cat.includes('ai') || cat.includes('data'))) ||
      (target === 'interviews' && (slug.includes('interview') || cat.includes('interview') || a.subcategory?.includes('Interview'))) ||
      (target === 'press-release' && (slug.includes('press') || cat.includes('press') || cat.includes('business')))
    );
  });

  // Fallback to general articles if category has fewer than 3
  const displayArticles =
    categoryArticles.length >= 3
      ? categoryArticles
      : [...categoryArticles, ...articles.filter((a) => !categoryArticles.includes(a))].slice(0, 4);

  if (displayArticles.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3.5 mb-6 sm:mb-8 border-b-2 border-slate-900">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]"></span>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <Link
            href={`/category/${categorySlug}`}
            className="text-xs font-bold text-[#DC2626] hover:text-slate-900 flex items-center gap-1 uppercase tracking-wider transition-colors shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ======================================================== */}
        {/* VARIANT 1: FEATURED SPLIT (1 Large + 2 Horizontal/Small) */}
        {/* ======================================================== */}
        {variant === 'featured-split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <LargeFeaturedCard article={displayArticles[0]} />
            </div>
            <div className="lg:col-span-5 space-y-4">
              {displayArticles.slice(1, 4).map((art) => (
                <MediumHorizontalCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VARIANT 2: GRID-3 (3 Small Vertical Cards)              */}
        {/* ======================================================== */}
        {variant === 'grid-3' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.slice(0, 3).map((art) => (
              <SmallVerticalCard key={art.id} article={art} />
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* VARIANT 3: GRID-4 (4 Small Cards)                       */}
        {/* ======================================================== */}
        {variant === 'grid-4' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayArticles.slice(0, 4).map((art) => (
              <SmallVerticalCard key={art.id} article={art} />
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* VARIANT 4: HORIZONTAL STACK (Stacked Horizontal Cards)   */}
        {/* ======================================================== */}
        {variant === 'horizontal-stack' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayArticles.slice(0, 4).map((art) => (
              <MediumHorizontalCard key={art.id} article={art} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
