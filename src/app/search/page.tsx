'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Clock, Eye, ArrowRight, User, Tag, Layers } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate, formatNumber } from '@/lib/utils';
import { CATEGORIES } from '@/data/categories';

export default function SearchPage() {
  const { articles } = useArticleStore();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Extract authors
  const authorsList = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.author.name));
    return ['All', ...Array.from(set)];
  }, [articles]);

  // Extract tags
  const tagsList = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags?.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).slice(0, 15)];
  }, [articles]);

  // Multi-facet filtering
  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();

    return articles.filter((art) => {
      const matchQuery =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.content.toLowerCase().includes(q) ||
        art.companyProfile?.name.toLowerCase().includes(q) ||
        art.author.name.toLowerCase().includes(q);

      const matchCat =
        selectedCategory === 'All' ||
        art.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchAuthor =
        selectedAuthor === 'All' || art.author.name === selectedAuthor;

      const matchTag =
        selectedTag === 'All' ||
        art.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchQuery && matchCat && matchAuthor && matchTag;
    });
  }, [query, selectedCategory, selectedAuthor, selectedTag, articles]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Search Input */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block mb-1">
            RESEARCH ARCHIVES & TELEMETRY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Global Enterprise Search
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Search across our comprehensive editorial index of 50+ business investigations, market trends, and executive profiles.
          </p>

          <div className="mt-6 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords, companies, technologies, authors..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 shadow-sm text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        </div>

        {/* Filter Pills Grid */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm mb-8 space-y-4">
          
          {/* Category Chips */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Category Filter:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Beats
              </button>
              {CATEGORIES.slice(0, 10).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Author Chips */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Author Filter:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {authorsList.map((author) => (
                <button
                  key={author}
                  onClick={() => setSelectedAuthor(author)}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedAuthor === author
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {author}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Chips */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Tag Filter:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {tagsList.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag === 'All' ? 'All Tags' : `#${tag}`}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
            <span>
              Found <strong>{filteredResults.length}</strong> matching dispatches
            </span>
            {(query || selectedCategory !== 'All' || selectedAuthor !== 'All' || selectedTag !== 'All') && (
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                  setSelectedAuthor('All');
                  setSelectedTag('All');
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredResults.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-base font-semibold text-slate-800">
                No matching articles found
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try broadening your query or selecting another category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                        <span className="font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{article.author.name}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
