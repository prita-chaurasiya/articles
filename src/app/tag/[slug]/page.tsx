'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Tag as TagIcon,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
  Bookmark,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate } from '@/lib/utils';

function TagPageContent() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || '';
  const decodedTag = decodeURIComponent(rawSlug).replace(/-/g, ' ').toLowerCase();

  const { articles, toggleBookmark, bookmarkedSlugs } = useArticleStore();

  const matchingArticles = useMemo(() => {
    return articles
      .filter((a) => {
        return a.tags.some((t) => {
          const cleanT = t.toLowerCase();
          return (
            cleanT === decodedTag ||
            cleanT.replace(/\s+/g, '-') === rawSlug.toLowerCase() ||
            cleanT.includes(decodedTag) ||
            decodedTag.includes(cleanT)
          );
        });
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [articles, decodedTag, rawSlug]);

  // Aggregate popular tags for discovery
  const allPopularTags = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      a.tags.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name, count]) => ({ name, count }));
  }, [articles]);

  const displayTagName = decodedTag
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400">Editorial Topics & Tags</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">#{displayTagName}</span>
          </div>
        </div>
      </div>

      {/* Tag Hero Header */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <TagIcon className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Topic Dossier
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 mb-2">
            #{displayTagName}
          </h1>

          <p className="text-sm text-slate-600 max-w-2xl mb-6">
            Curated dispatches, executive investigations, and market analyses focused on {displayTagName}.
          </p>

          {/* Popular Tag Pills */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Related Editorial Tags:
            </span>
            <div className="flex flex-wrap gap-2">
              {allPopularTags.map((t) => {
                const tagSlug = t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const isCurrent = tagSlug === rawSlug.toLowerCase();
                return (
                  <Link
                    key={t.name}
                    href={`/tag/${tagSlug}`}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    #{t.name} <span className="text-[10px] opacity-60">({t.count})</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tag Articles Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-slate-200">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Stories Tagged with #{displayTagName} ({matchingArticles.length})
            </h2>
            <Link
              href="/#fresh-stories"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              All Fresh Stories →
            </Link>
          </div>

          {matchingArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingArticles.map((article) => {
                const isSaved = bookmarkedSlugs.includes(article.slug);

                return (
                  <article
                    key={article.id}
                    className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div>
                      <Link
                        href={`/article/${article.slug}`}
                        className="block relative aspect-[16/10] overflow-hidden bg-slate-900"
                      >
                        <img
                          src={article.heroImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm">
                            {article.category}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(article.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                        </div>

                        <Link href={`/article/${article.slug}`}>
                          <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                            {article.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
                          {article.author.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleBookmark(article.slug)}
                          className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${
                            isSaved ? 'text-blue-600' : 'text-slate-400'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                        <Link
                          href={`/article/${article.slug}`}
                          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <TagIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                No articles found with tag #{displayTagName}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Explore popular categories and fresh dispatches.
              </p>
              <Link
                href="/#fresh-stories"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold"
              >
                View Fresh Stories
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function TagPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen py-20 text-center text-slate-400">Loading topic tag...</div>}>
      <TagPageContent />
    </React.Suspense>
  );
}
