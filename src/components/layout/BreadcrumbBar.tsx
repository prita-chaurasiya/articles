'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';
import { useArticleStore } from '@/store/useArticleStore';

export default function BreadcrumbBar() {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const { articles } = useArticleStore();

  // If on root home page, show clean "Home" or current presence
  const isHome = pathname === '/';

  // Helper to format category title
  const getCategoryTitle = (slug: string) => {
    const found = CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
    if (found) return found.name;
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Determine breadcrumb segments
  const renderBreadcrumbs = () => {
    if (isHome) {
      return (
        <span className="text-slate-500 font-normal">Home</span>
      );
    }

    // 1. Category Page (/category/[slug])
    if (pathname.startsWith('/category/') || pathname === '/testimonials') {
      const slug = pathname === '/testimonials' ? 'testimonials' : pathname.replace('/category/', '').split('/')[0];
      const categoryName = getCategoryTitle(slug);
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <span className="text-slate-500 font-normal">
            Category: &quot;{categoryName}&quot;
          </span>
        </>
      );
    }

    // 2. Magazine Page (/magazine)
    if (pathname === '/magazine') {
      const year = searchParams?.get('year');
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          {year ? (
            <>
              <Link href="/magazine" className="text-slate-500 hover:text-[#DC2626] transition-colors">
                Magazine
              </Link>
              <span className="text-slate-400 mx-2 select-none">»</span>
              <span className="text-slate-500 font-normal">
                Archive: &quot;{year} Editions&quot;
              </span>
            </>
          ) : (
            <span className="text-slate-500 font-normal">Magazine</span>
          )}
        </>
      );
    }

    // 3. Article Detail Page (/article/[slug])
    if (pathname.startsWith('/article/')) {
      const slug = pathname.replace('/article/', '').split('/')[0];
      const article = articles.find((a) => a.slug === slug);
      const categoryName = article?.category || 'News';
      const categorySlug = article?.categorySlug || 'news';
      const articleTitle = article?.title || slug;

      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <Link
            href={`/category/${categorySlug}`}
            className="text-slate-500 hover:text-[#DC2626] transition-colors"
          >
            Category: &quot;{categoryName}&quot;
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <span className="text-slate-600 font-medium truncate max-w-xs sm:max-w-md lg:max-w-xl">
            &quot;{articleTitle}&quot;
          </span>
        </>
      );
    }

    // 4. Success Stories (/success-stories or /success-stories/[slug])
    if (pathname.startsWith('/success-stories')) {
      const sub = pathname.replace('/success-stories', '').replace('/', '');
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          {sub ? (
            <>
              <Link href="/success-stories" className="text-slate-500 hover:text-[#DC2626] transition-colors">
                Success Stories
              </Link>
              <span className="text-slate-400 mx-2 select-none">»</span>
              <span className="text-slate-500 font-normal">
                &quot;{sub.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}&quot;
              </span>
            </>
          ) : (
            <span className="text-slate-500 font-normal">Success Stories</span>
          )}
        </>
      );
    }

    // 5. Search Page (/search)
    if (pathname === '/search') {
      const q = searchParams?.get('q') || '';
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <span className="text-slate-500 font-normal">
            Search: {q ? `"${q}"` : 'All Articles'}
          </span>
        </>
      );
    }

    // 6. Awards (/awards)
    if (pathname === '/awards') {
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <span className="text-slate-500 font-normal">Global Enterprise Awards 2026</span>
        </>
      );
    }

    // 7. Contact (/contact)
    if (pathname === '/contact') {
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <span className="text-slate-500 font-normal">Contact Us</span>
        </>
      );
    }

    // 8. Advertise (/advertise)
    if (pathname === '/advertise') {
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <span className="text-slate-500 font-normal">Advertise with us!</span>
        </>
      );
    }

    // 9. Admin CMS (/admin)
    if (pathname === '/admin') {
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <span className="text-slate-500 font-normal">Admin Studio &amp; CMS</span>
        </>
      );
    }

    // 10. Author (/author/[id])
    if (pathname.startsWith('/author/')) {
      const id = pathname.replace('/author/', '').split('/')[0];
      const authorName = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return (
        <>
          <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 mx-2 select-none">»</span>
          <span className="text-slate-500 font-normal">
            Author: &quot;{authorName}&quot;
          </span>
        </>
      );
    }

    // 11. Generic fallback
    const segments = pathname.split('/').filter(Boolean);
    return (
      <>
        <Link href="/" className="text-slate-500 hover:text-[#DC2626] transition-colors">
          Home
        </Link>
        {segments.map((seg, idx) => (
          <React.Fragment key={idx}>
            <span className="text-slate-400 mx-2 select-none">»</span>
            <span className="text-slate-500 font-normal capitalize">
              {seg.replace(/-/g, ' ')}
            </span>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="bg-white border-b border-slate-200/90 py-2.5 px-4 sm:px-6 lg:px-8 text-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-y-1">
        <span className="text-[#DC2626] font-bold text-xs uppercase tracking-wide mr-2.5 shrink-0">
          YOU ARE AT:
        </span>
        <div className="flex items-center flex-wrap gap-y-1 text-slate-500 text-xs">
          {renderBreadcrumbs()}
        </div>
      </div>
    </div>
  );
}
