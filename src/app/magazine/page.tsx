'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BookOpen, Sparkles, Eye, ArrowRight, Check, ChevronRight } from 'lucide-react';
import { MAGAZINE_ISSUES } from '@/data/magazineIssues';
import DigitalReaderModal from '@/components/magazine/DigitalReaderModal';
import { MagazineIssue } from '@/types';

export default function MagazineArchivePage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] py-24 text-center text-slate-500 font-medium">
          Loading digital magazine archive...
        </div>
      }
    >
      <MagazineArchiveContent />
    </React.Suspense>
  );
}

function MagazineArchiveContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const yearQuery = searchParams.get('year');

  const [selectedYear, setSelectedYear] = useState<string>(yearQuery || '2026');
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue | null>(null);
  const [hoveredIssueId, setHoveredIssueId] = useState<string | null>(null);

  useEffect(() => {
    if (yearQuery) {
      setSelectedYear(yearQuery);
    }
  }, [yearQuery]);

  const yearsList = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', 'All'];

  const filteredIssues = useMemo(() => {
    if (selectedYear === 'All') return MAGAZINE_ISSUES;
    return MAGAZINE_ISSUES.filter((issue) => issue.monthYear.includes(selectedYear));
  }, [selectedYear]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (year === 'All') {
      router.push('/magazine');
    } else {
      router.push(`/magazine?year=${year}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#111827] font-sans antialiased">
      
      {/* ========================================================= */}
      {/* SECTION 1: HEADER (MATCHES USER SCREENSHOT 1)             */}
      {/* Centered "Magazine" small category + "Latest Editions"    */}
      {/* ========================================================= */}
      <div className="pt-10 sm:pt-14 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <span className="text-sm sm:text-base font-semibold text-slate-500 uppercase tracking-wider block mb-1">
          Magazine
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#222222] tracking-tight">
          {selectedYear === 'All' ? 'Latest Editions' : `${selectedYear} Latest Editions`}
        </h1>

        {/* Year Filter Switcher (2026, 2025, 2024...) */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mt-6">
          {yearsList.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => handleYearChange(y)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedYear === y
                  ? 'bg-[#E11925] text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
              }`}
            >
              {y === 'All' ? 'All Editions' : `${y} Magazines`}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: 6-COLUMN MAGAZINE COVERS GRID (SCREENSHOT 1)   */}
      {/* 6 columns per row on desktop, hover 3D tilt & slider      */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {filteredIssues.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 my-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No editions found for {selectedYear}</h3>
            <p className="text-xs text-slate-500 mt-1">Please select another year from the archive switcher above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {filteredIssues.map((issue) => {
              const isHovered = hoveredIssueId === issue.id;

              return (
                <div
                  key={issue.id}
                  className="group flex flex-col cursor-pointer select-none"
                  onMouseEnter={() => setHoveredIssueId(issue.id)}
                  onMouseLeave={() => setHoveredIssueId(null)}
                  onClick={() => setSelectedIssue(issue)}
                >
                  {/* Magazine Cover Card with 3D Tilt & Shadow */}
                  <div className="relative aspect-[1/1.38] bg-slate-900 rounded-xs overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:shadow-black/25 transition-all duration-300 transform group-hover:-translate-y-1.5 border border-slate-200/80">
                    
                    {/* Cover Image */}
                    <img
                      src={issue.coverImage}
                      alt={issue.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Realistic Glossy Cover Overlay & Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                    {/* Cover Masthead: Business Walkins Logo + Brand */}
                    <div className="absolute top-0 inset-x-0 p-2 sm:p-2.5 z-10 flex flex-col">
                      <div className="flex items-center justify-between text-[7px] text-white/80 uppercase font-bold tracking-wider border-b border-white/20 pb-0.5 mb-1">
                        <span>www.businesswalkins.com</span>
                        <span>ISSN 2814</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <img
                            src="/images/business-walkins-logo.jpg"
                            alt="BW"
                            className="w-5 h-5 rounded-full object-contain bg-white p-0.5 shadow-sm shrink-0"
                          />
                          <span className="text-[10px] sm:text-xs font-bold text-white tracking-tight leading-none font-serif">
                            <span className="text-[#E11925]">Business</span> Walkins
                          </span>
                        </div>
                      </div>
                      <span className="text-[6px] uppercase tracking-[0.16em] text-white/80 font-semibold mt-0.5">
                        EMAGZINE • IDEAS | PEOPLE | PROGRESS
                      </span>
                    </div>

                    {/* Executive Name & Role on Cover */}
                    {issue.executiveName && (
                      <div className="absolute top-1/3 right-2 text-right z-10 max-w-[80%]">
                        <span className="text-[10px] sm:text-xs font-serif font-bold text-white block leading-tight drop-shadow">
                          {issue.executiveName}
                        </span>
                        <span className="text-[7px] sm:text-[8px] font-semibold text-amber-300 block uppercase tracking-wider">
                          {issue.executiveRole}
                        </span>
                      </div>
                    )}

                    {/* Bottom Bold Brand Name / Typography (Matches Screenshot 1: SWADAR, ZENOVEL, etc.) */}
                    <div className="absolute bottom-0 inset-x-0 p-2 sm:p-2.5 z-10">
                      <div className="bg-[#E11925] text-white text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded-2xs inline-block mb-1">
                        {issue.specialEditionTitle || issue.monthYear}
                      </div>

                      <h3 className="font-serif font-black text-xs sm:text-sm md:text-base text-white uppercase tracking-tight leading-tight drop-shadow-md">
                        {issue.brandName || issue.title}
                      </h3>

                      <p className="text-[8px] text-white/80 line-clamp-1 mt-0.5">
                        {issue.description}
                      </p>
                    </div>

                    {/* Hover Action Overlay: "Read 3D Flipbook" / Slider Trigger */}
                    <div
                      className={`absolute inset-0 bg-black/60 backdrop-blur-2xs flex flex-col items-center justify-center p-3 text-center transition-opacity duration-300 z-20 ${
                        isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#E11925] text-white flex items-center justify-center mb-2 shadow-lg transform group-hover:scale-110 transition-transform">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                        Open 3D Flipbook
                      </span>
                      <span className="text-[9px] text-slate-300 mt-1 flex items-center gap-1">
                        Click to Read Online <ChevronRight className="w-3 h-3 text-[#E11925]" />
                      </span>
                    </div>

                  </div>

                  {/* Under the Cover Label (Matches Screenshot 1) */}
                  <div className="pt-2 text-center">
                    <span className="text-xs sm:text-[13px] font-semibold text-[#2B2B2B] group-hover:text-[#E11925] transition-colors line-clamp-2 leading-snug">
                      {issue.specialEditionTitle || issue.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* SECTION 3: EDITORIAL RECOGNITION (MATCHES SCREENSHOT 2)   */}
      {/* Reasons why the magazine stands out                       */}
      {/* ========================================================= */}
      <section className="bg-white border-t border-slate-200/80 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-lg sm:text-2xl font-bold text-[#111827] leading-snug mb-2">
            Business Walkins Emagzine has garnered recognition as one of the best business magazines.
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium">
            Here are some reasons why it stands out:
          </p>

          <div className="space-y-4 text-xs sm:text-[13.5px] text-slate-700 leading-relaxed">
            <div>
              <strong className="text-slate-900 font-bold">Extensive Reach:</strong>{' '}
              With a presence in 85 countries and a readership of over 12 million global decision-makers, Business Walkins has a wide and diverse audience, ensuring a global perspective while maintaining regional relevance.
            </div>

            <div>
              <strong className="text-slate-900 font-bold">Quality Content:</strong>{' '}
              The magazine covers a broad range of topics including entrepreneurship, finance, technology, marketing, artificial intelligence, and industry-specific insights. This ensures that readers get comprehensive and well-rounded information.
            </div>

            <div>
              <strong className="text-slate-900 font-bold">Industry Leaders:</strong>{' '}
              Business Walkins features interviews and articles from leading business figures, providing readers with valuable insights and real-world experiences from successful entrepreneurs and Fortune 500 executives.
            </div>

            <div>
              <strong className="text-slate-900 font-bold">Innovative Approach:</strong>{' '}
              The magazine stays ahead of trends and covers the latest developments in various industries, making it a go-to source for cutting-edge information, market telemetry, and 3D digital interactive editions.
            </div>

            <div>
              <strong className="text-slate-900 font-bold">Digital Presence:</strong>{' '}
              With a strong online platform, Business Walkins Emagzine ensures that its content is accessible to a wider audience, providing digital 3D interactive versions and maintaining an active global presence on executive media channels.
            </div>

            <div>
              <strong className="text-slate-900 font-bold">Reader Engagement:</strong>{' '}
              The magazine actively engages with its readers through various platforms, offering opportunities for feedback, discussion, and interaction, fostering a community of informed business enthusiasts.
            </div>

            <p className="pt-2 text-slate-600 italic">
              These factors contribute to Business Walkins Emagzine&rsquo;s reputation as a leading international business publication.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3D DIGITAL FLIPBOOK READER MODAL (MATCHES SCREENSHOT 3)   */}
      {/* Fullscreen 3D flipbook with bottom controls and top bar   */}
      {/* ========================================================= */}
      {selectedIssue && (
        <DigitalReaderModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}

    </div>
  );
}
