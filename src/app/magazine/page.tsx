'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BookOpen, Download, Check, Filter } from 'lucide-react';
import { MAGAZINE_ISSUES } from '@/data/magazineIssues';
import DigitalReaderModal from '@/components/magazine/DigitalReaderModal';
import { MagazineIssue } from '@/types';

export default function MagazineArchivePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] py-24 text-center text-slate-500 font-medium">Loading magazine portal...</div>}>
      <MagazineArchiveContent />
    </React.Suspense>
  );
}

function MagazineArchiveContent() {
  const searchParams = useSearchParams();
  const yearQuery = searchParams.get('year');

  const [selectedYear, setSelectedYear] = useState<string>(yearQuery || 'All');
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  useEffect(() => {
    if (yearQuery) {
      setSelectedYear(yearQuery);
    }
  }, [yearQuery]);

  const yearsList = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  const filteredIssues = useMemo(() => {
    if (selectedYear === 'All') return MAGAZINE_ISSUES;
    return MAGAZINE_ISSUES.filter((issue) => issue.monthYear.includes(selectedYear));
  }, [selectedYear]);

  const handleDownload = (id: string) => {
    setDownloadSuccessId(id);
    setTimeout(() => setDownloadSuccessId(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="bg-[#0B1120] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            E-Magazine Edition Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Digital Magazine Portal
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans">
            Read complete monthly editions online with interactive flip page reading mode or download print-ready high-resolution executive PDF dossiers.
          </p>

          {/* Year Filter Buttons */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-red-500" /> Filter Year:
            </span>
            {yearsList.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setSelectedYear(y)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedYear === y
                    ? 'bg-[#DC2626] text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {y === 'All' ? 'All Years' : `${y} Editions`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {selectedYear === 'All' ? 'Complete Magazine Archive' : `${selectedYear} Digital Editions`}
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredIssues.length} issues
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Cover Mockup */}
                <div
                  className="relative aspect-[3/4] bg-slate-950 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedIssue(issue)}
                >
                  <img
                    src={issue.coverImage}
                    alt={issue.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-black text-lg text-white uppercase drop-shadow">
                        CHRONICLE
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-400/40">
                        {issue.issueNumber}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                        {issue.monthYear} • {issue.pagesCount} Pages
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white leading-tight drop-shadow">
                        {issue.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {issue.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Highlights:
                    </span>
                    {issue.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 line-clamp-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedIssue(issue)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Online</span>
                </button>

                <button
                  onClick={() => handleDownload(issue.id)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-slate-300 cursor-pointer"
                >
                  {downloadSuccessId === issue.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  <span>PDF</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedIssue && (
        <DigitalReaderModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
}
