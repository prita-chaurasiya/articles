'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';

export default function SearchModal() {
  const router = useRouter();
  const { isSearchModalOpen, setIsSearchModalOpen, articles } = useArticleStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus input and lock body scrolling when open
  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isSearchModalOpen]);

  // Keyboard shortcut Cmd+K / Ctrl+K and Esc
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

  // Handle Enter key in input
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (query.trim()) {
        setIsSearchModalOpen(false);
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
    if (e.key === 'Escape') {
      setIsSearchModalOpen(false);
    }
  };

  // Instant filter for typed query
  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return articles.filter((art) => {
      return (
        art.title.toLowerCase().includes(q) ||
        art.excerpt?.toLowerCase().includes(q) ||
        art.author?.name?.toLowerCase().includes(q) ||
        art.companyProfile?.name?.toLowerCase().includes(q) ||
        art.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, articles]);

  // Date formatting: "October 12, 2026"
  const formatSearchDate = (dateString?: string) => {
    if (!dateString) return 'October 12, 2026';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return 'October 12, 2026';
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'October 12, 2026';
    }
  };

  if (!isSearchModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-md flex flex-col items-center justify-start pt-16 sm:pt-24 md:pt-28 px-4 sm:px-6 md:px-8 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        // Close if clicked on outer backdrop
        if (e.target === e.currentTarget) {
          setIsSearchModalOpen(false);
        }
      }}
    >
      {/* Top-Right Big Close 'X' Button - Exact Match with Reference Screenshot 1 */}
      <button
        type="button"
        onClick={() => setIsSearchModalOpen(false)}
        className="fixed top-4 right-4 sm:top-7 sm:right-7 text-white/90 hover:text-white hover:scale-110 transition-all p-2 cursor-pointer z-50 select-none"
        aria-label="Close search overlay"
      >
        <X className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
      </button>

      {/* Main Search Content Container */}
      <div className="w-full max-w-3xl flex flex-col items-start">
        
        {/* Large Prominent Search Input - Exact Match with Reference Screenshot 1 & 2 */}
        <div className="w-full">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search..."
            autoFocus
            className="w-full bg-transparent border-0 outline-none ring-0 p-0 text-4xl sm:text-6xl md:text-7xl font-bold text-white placeholder:text-neutral-300 tracking-tight caret-[#E11925]"
          />
        </div>

        {/* Subtitle Instructions - Exact Match with Reference Screenshot 1 */}
        <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-normal mt-2.5 sm:mt-3.5 select-none leading-relaxed">
          Type above and press <span className="italic font-normal">Enter</span> to search. Press <span className="italic font-normal">Esc</span> to cancel.
        </p>

        {/* Subtle Horizontal Divider Line */}
        <div className="w-full h-px bg-neutral-800/80 my-4 sm:my-6" />

        {/* Live Search Results Card Dropdown - Exact Match with Reference Screenshot 2 */}
        {query.trim().length > 0 && (
          <div className="w-full bg-black border border-neutral-800/90 shadow-2xl overflow-hidden divide-y divide-neutral-900 animate-fadeIn">
            {searchResults.length === 0 ? (
              <div className="py-12 px-6 text-center text-neutral-400">
                <p className="text-base font-semibold text-white">
                  No articles found matching &quot;{query}&quot;
                </p>
                <p className="text-xs text-neutral-500 mt-1.5">
                  Press Enter to search the entire magazine database
                </p>
              </div>
            ) : (
              <div className="max-h-[58vh] overflow-y-auto divide-y divide-neutral-900">
                {searchResults.map((article) => {
                  const displayDate = formatSearchDate(article.publishedAt);
                  const heroImg =
                    article.heroImage ||
                    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80';

                  return (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      onClick={() => setIsSearchModalOpen(false)}
                      className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 hover:bg-neutral-900/70 transition-colors group text-left w-full cursor-pointer"
                    >
                      {/* Left Rectangular Thumbnail */}
                      <div className="w-20 h-14 sm:w-28 sm:h-18 md:w-32 md:h-20 bg-neutral-900 overflow-hidden shrink-0 border border-neutral-800/60">
                        <img
                          src={heroImg}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Right Article Title & Formatted Publication Date */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#E11925] transition-colors line-clamp-2 leading-snug font-sans">
                          {article.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-neutral-400 mt-1 sm:mt-1.5 font-normal">
                          {displayDate}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
