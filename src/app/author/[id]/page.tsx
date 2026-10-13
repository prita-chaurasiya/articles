'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  User,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
  Globe,
  Share2,
  Mail,
  Bookmark,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate, formatNumber } from '@/lib/utils';

function AuthorContent() {
  const params = useParams();
  const rawId = (params?.id as string) || '';
  const decodedId = decodeURIComponent(rawId).toLowerCase();

  const { articles, toggleBookmark, bookmarkedSlugs } = useArticleStore();

  // Find author by ID or by slugified name
  const authorArticles = useMemo(() => {
    return articles.filter((a) => {
      const authId = a.author.id.toLowerCase();
      const authSlug = a.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const authName = a.author.name.toLowerCase();
      return (
        authId === decodedId ||
        authSlug === decodedId ||
        authName.includes(decodedId) ||
        decodedId.includes(authSlug)
      );
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [articles, decodedId]);

  const author = authorArticles[0]?.author || {
    id: rawId,
    name: rawId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    role: 'Senior Editorial Contributor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Senior editor and investigative correspondent covering enterprise technology, capital flows, and global corporate strategy at Business Walkins.',
  };

  const totalReads = authorArticles.reduce((acc, a) => acc + (a.views || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400">Editorial Staff & Contributors</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">{author.name}</span>
          </div>
        </div>
      </div>

      {/* Author Profile Masthead Header */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8">
            <div className="relative shrink-0">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-slate-200 shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 p-1.5 bg-blue-600 rounded-lg text-white shadow-md">
                <Award className="w-4 h-4" />
              </span>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60">
                  Verified Editorial Correspondent
                </span>
                <span className="text-xs text-slate-400">• Bureau Contributor</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                {author.name}
              </h1>

              <p className="text-sm font-semibold text-blue-600 mb-3">
                {author.role}
              </p>

              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mb-6">
                {author.bio}
              </p>

              {/* Author Stat Counters */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Articles Published</span>
                  <span className="text-lg font-bold text-slate-900">{authorArticles.length} Stories</span>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Total Reads</span>
                  <span className="text-lg font-bold text-slate-900">{formatNumber(totalReads)}</span>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Publication Bureau</span>
                  <span className="text-lg font-bold text-slate-900">London & New York</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Stories Listing */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-slate-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Published Dispatches & Reporting ({authorArticles.length})
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                All investigative essays, cover stories, and enterprise briefings by {author.name}
              </p>
            </div>
          </div>

          {authorArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authorArticles.map((article) => {
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

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-500">
                        {article.subcategory}
                      </span>
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
                          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <span>Read Story</span>
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
              <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                No articles found for this author
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Explore the latest publications across the magazine directory.
              </p>
              <Link
                href="/#fresh-stories"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold"
              >
                Explore Fresh Stories
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function AuthorPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen py-20 text-center text-slate-400">Loading author profile...</div>}>
      <AuthorContent />
    </React.Suspense>
  );
}
