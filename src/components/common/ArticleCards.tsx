'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Eye, ArrowRight, Bookmark, Building2, Flame } from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { useArticleStore } from '@/store/useArticleStore';
import MagazineCardOverlay from '@/components/common/MagazineCardOverlay';

interface BaseCardProps {
  article: Article;
  className?: string;
  badgeColor?: string;
}

// ========================================================
// 1. LARGE FEATURED CARD
// ========================================================
export function LargeFeaturedCard({ article, className = '' }: BaseCardProps) {
  const { toggleBookmark, bookmarkedSlugs } = useArticleStore();
  const isSaved = bookmarkedSlugs.includes(article.slug);

  return (
    <article className={`group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${className}`}>
      <div>
        <Link href={`/article/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-900 rounded-xs">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <MagazineCardOverlay categoryTag={article.category} />

          {/* Company logo if present */}
          {article.companyProfile && (
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow border border-slate-200">
              <img
                src={article.companyProfile.logo}
                alt={article.companyProfile.name}
                className="w-4 h-4 rounded object-cover"
              />
              <span className="text-[11px] font-bold text-slate-900">
                {article.companyProfile.name}
              </span>
            </div>
          )}
        </Link>

        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <Link href={`/article/${article.slug}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#DC2626] transition-colors leading-tight">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover border border-slate-200"
          />
          <div className="leading-tight">
            <span className="text-xs font-bold text-slate-900 block">
              {article.author.name}
            </span>
            <span className="text-[10px] text-slate-500 block truncate max-w-[140px]">
              {article.author.role}
            </span>
          </div>
        </div>

        <Link
          href={`/article/${article.slug}`}
          className="text-xs font-bold text-[#DC2626] hover:text-slate-900 flex items-center gap-1 uppercase tracking-wider transition-colors"
        >
          <span>Read More</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}

// ========================================================
// 2. MEDIUM HORIZONTAL CARD
// ========================================================
export function MediumHorizontalCard({ article, className = '' }: BaseCardProps) {
  return (
    <article className={`group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all p-4 flex flex-col sm:flex-row gap-4 items-start ${className}`}>
      <Link
        href={`/article/${article.slug}`}
        className="w-full sm:w-44 md:w-48 aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 shrink-0 relative block"
      >
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#DC2626] text-white text-[9px] font-black uppercase rounded shadow">
          {article.category}
        </div>
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <Link href={`/article/${article.slug}`}>
            <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2">
              {article.title}
            </h4>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
          <span className="font-semibold text-slate-700">
            By {article.author.name}
          </span>
          <Link
            href={`/article/${article.slug}`}
            className="font-bold text-[#DC2626] hover:underline flex items-center gap-1"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ========================================================
// 3. SMALL VERTICAL CARD
// ========================================================
export function SmallVerticalCard({ article, className = '' }: BaseCardProps) {
  return (
    <article className={`group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${className}`}>
      <div>
        <Link href={`/article/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-900 rounded-xs">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <MagazineCardOverlay categoryTag={article.category} />
        </Link>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <Link href={`/article/${article.slug}`}>
            <h4 className="font-serif text-sm font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2">
              {article.title}
            </h4>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-4 pb-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>By {article.author.name}</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#DC2626] group-hover:translate-x-0.5 transition-transform" />
      </div>
    </article>
  );
}

// ========================================================
// 4. SIDEBAR CARD (RANKED / COMPACT)
// ========================================================
export function SidebarCard({ article, rank, className = '' }: BaseCardProps & { rank?: number }) {
  return (
    <article className={`group flex items-start gap-3 py-3 border-b border-slate-100 last:border-b-0 ${className}`}>
      {rank !== undefined && (
        <span className="font-serif font-black text-xl text-slate-300 group-hover:text-[#DC2626] transition-colors leading-none shrink-0 w-6">
          0{rank}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block bg-[#DC2626] text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-sm">
            {article.category}
          </span>
          <span className="text-[10px] text-slate-400">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <Link href={`/article/${article.slug}`}>
          <h5 className="font-serif text-xs font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h5>
        </Link>
      </div>
    </article>
  );
}

// ========================================================
// 5. MAGAZINE CARD
// ========================================================
export function MagazineCard({
  issueNumber,
  title,
  month,
  cover,
  pages = 96,
}: {
  issueNumber: string;
  title: string;
  month: string;
  cover: string;
  pages?: number;
}) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-900 mb-3 shadow">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#DC2626] text-white text-[10px] font-black uppercase tracking-wider rounded shadow">
          {issueNumber}
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider block">
          {month} Edition • {pages} Pages
        </span>
        <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-[#DC2626] transition-colors leading-tight line-clamp-2">
          {title}
        </h4>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100">
        <Link
          href="/magazine"
          className="w-full py-2 bg-slate-900 hover:bg-[#DC2626] text-white text-xs font-bold text-center rounded-lg block transition-colors shadow-sm"
        >
          Open 3D Reader →
        </Link>
      </div>
    </div>
  );
}
