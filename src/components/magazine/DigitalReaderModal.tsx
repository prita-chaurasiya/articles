'use client';

import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
} from 'lucide-react';
import { MagazineIssue } from '@/types';

interface DigitalReaderModalProps {
  issue: MagazineIssue;
  onClose: () => void;
}

export default function DigitalReaderModal({ issue, onClose }: DigitalReaderModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = issue.pagesCount;
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const pagesData = [
    {
      title: issue.title,
      type: 'Cover & Masthead',
      body: `Volume 48 • October 2026 Executive Edition. Published by The Enterprise Chronicle Media Group. Special Investigation: Cognitive Agent Architectures in the Global 2000.`,
      image: issue.coverImage,
    },
    {
      title: 'Editor’s Dispatch & Table of Contents',
      type: 'Editorial Column',
      body: `As global conglomerates deploy multi-agent cognitive swarms, the traditional enterprise balance sheet undergoes its greatest re-allocation since the invention of the microchip. In this issue, our foreign correspondents and sector editors delve into the hardware, software, and geopolitical dynamics powering modern capitalism.`,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
    },
    {
      title: 'The Terawatt Transition: Clean Industrial Infrastructure',
      type: 'Sector Deep Dive',
      body: `Green hydrogen at scale, tandem perovskite photovoltaics, and small modular nuclear reactors. We profile the chief executives turning clean physics into sovereign industrial contracts.`,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80',
    },
    {
      title: 'The Sovereign AI Race: National Security & Foundational Compute',
      type: 'Geopolitical Report',
      body: `Why France, Japan, and the UAE are declining reliance on foreign neural weights, investing sovereign treasury funds into state-controlled semiconductor fabrication and computational independence.`,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    },
  ];

  const activePageData = pagesData[(currentPage - 1) % pagesData.length];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between animate-fadeIn">
      {/* Top Reader Controls */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base leading-tight">
              {issue.title}
            </h3>
            <span className="text-[11px] text-slate-400">
              {issue.issueNumber} • {issue.monthYear}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleDownload}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>PDF Issue</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close reader"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Reader Stage */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-800 text-slate-900 aspect-[16/11]">
          {/* Left Page (Image Preview) */}
          <div className="w-full md:w-1/2 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            <img
              src={activePageData.image}
              alt={activePageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>

          {/* Right Page (Editorial Content) */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between bg-[#FDFBF7]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600">
                  {activePageData.type}
                </span>
                <span className="text-xs font-serif italic text-slate-400">
                  The Enterprise Chronicle
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-4">
                {activePageData.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mb-6">
                {activePageData.body}
              </p>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">Executive Summary Takeaway:</span>
                <p>
                  Full feature available in print archive and complete PDF dossier format.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500">
              <span>{issue.issueNumber}</span>
              <span className="font-bold">Page {currentPage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Paging Bar */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex items-center justify-between text-white text-xs">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        <span className="text-slate-400 font-medium">
          Reading Page <strong className="text-white">{currentPage}</strong> of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors font-semibold"
        >
          <span>Next Page</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
