'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Tag, User, Layers, ArrowUpRight, Clock } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate } from '@/lib/utils';

export default function SearchModal() {
  const { isSearchModalOpen, setIsSearchModalOpen, articles } = useArticleStore();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(!isSearchModalOpen);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  // Extract all unique categories and tags from articles
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.category));
    return ['All', ...Array.from(set)];
  }, [articles]);

  const tagsList = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags?.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).slice(0, 10)];
  }, [articles]);

  // Instant filter
  const searchResults = useMemo(() => {
    if (!query.trim() && selectedCategory === 'All' && selectedTag === 'All') {
      return articles.slice(0, 6); // default popular recommendations
    }

    const q = query.toLowerCase().trim();

    return articles.filter((art) => {
      const matchQuery =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.author.name.toLowerCase().includes(q) ||
        art.companyProfile?.name.toLowerCase().includes(q) ||
        art.tags.some((t) => t.toLowerCase().includes(q));

      const matchCat =
        selectedCategory === 'All' ||
        art.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchTag =
        selectedTag === 'All' ||
        art.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchQuery && matchCat && matchTag;
    });
  }, [query, selectedCategory, selectedTag, articles]);

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-fadeIn flex justify-center items-start pt-16">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 p-4 sm:p-5 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across 50+ enterprise stories, companies, authors, keywords..."
            className="w-full bg-transparent text-base sm:text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-200/60"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Bar: Category & Tag Pills */}
        <div className="p-4 bg-slate-100/60 border-b border-slate-200 space-y-2">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Beat:
            </span>
            {categoriesList.slice(0, 7).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Tag Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Tag:
            </span>
            {tagsList.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-slate-900 text-white'
                    : 'bg-white/80 text-slate-500 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span>
              {query || selectedCategory !== 'All' || selectedTag !== 'All'
                ? `Showing ${searchResults.length} matching articles`
                : 'Top Curated & Recommended Stories'}
            </span>
            <span>Press ESC to exit</span>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-base font-semibold text-slate-700">No matching articles found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for keywords like "AI", "Hydrogen", "Semiconductor", or "Venture".
              </p>
            </div>
          ) : (
            searchResults.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-start gap-4 pt-3 group hover:bg-slate-50 p-2.5 rounded-xl transition-colors"
              >
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg shrink-0 border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 font-serif">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                    <span className="font-medium text-slate-600">{article.author.name}</span>
                    <span>•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0 self-center" />
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 flex items-center justify-between px-6">
          <span>Search index updated live from CMS</span>
          <Link
            href="/search"
            onClick={() => setIsSearchModalOpen(false)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Open Dedicated Advanced Search Page →
          </Link>
        </div>

      </div>
    </div>
  );
}
