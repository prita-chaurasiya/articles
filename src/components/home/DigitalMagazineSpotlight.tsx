'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Download, Sparkles, ArrowRight, Check, Eye } from 'lucide-react';
import { MAGAZINE_ISSUES } from '@/data/magazineIssues';
import DigitalReaderModal from '@/components/magazine/DigitalReaderModal';

export default function DigitalMagazineSpotlight() {
  const [activeIssue, setActiveIssue] = useState(MAGAZINE_ISSUES[0]);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <>
      <section className="py-14 sm:py-20 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#0B1120] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Magazine 3D Cover Mockup */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group cursor-pointer" onClick={() => setIsReaderOpen(true)}>
                  <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                    <img
                      src={activeIssue.coverImage}
                      alt={activeIssue.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Cover Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-between p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src="/images/business-walkins-logo.jpg"
                            alt="Business Walkins"
                            className="w-7 h-7 rounded-full object-contain bg-white p-0.5 shadow-sm"
                          />
                          <span className="font-serif font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow">
                            Business Walkins
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-400/40">
                          {activeIssue.issueNumber}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                          {activeIssue.monthYear} Edition
                        </span>
                        <h4 className="font-serif text-lg font-black text-white leading-tight drop-shadow-md">
                          {activeIssue.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Click to Flip Tag */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wider uppercase shadow-lg flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Click to Open Reader</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Details, Featured In This Issue, Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      E-Magazine Exclusive
                    </span>
                    <span className="text-xs text-slate-400">
                      {activeIssue.pagesCount} Pages • High-Resolution Print Dossier
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    {activeIssue.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                    {activeIssue.description}
                  </p>
                </div>

                {/* Featured In This Issue Bullets */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Lead Feature Investigations In This Issue:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                    {activeIssue.featuredArticles.map((art, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                        <span className="line-clamp-1">{art}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setIsReaderOpen(true)}
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Issue Online</span>
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all border border-slate-700 flex items-center gap-2"
                  >
                    {downloadSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">PDF Download Started</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-slate-400" />
                        <span>Download Executive PDF</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/magazine"
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 ml-auto"
                  >
                    View All 48 Archives →
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Interactive Reader Modal */}
      {isReaderOpen && (
        <DigitalReaderModal
          issue={activeIssue}
          onClose={() => setIsReaderOpen(false)}
        />
      )}
    </>
  );
}
