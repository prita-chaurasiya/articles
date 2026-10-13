'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Volume2,
  VolumeX,
  Search,
  Check,
  BookOpen,
} from 'lucide-react';
import { MagazineIssue } from '@/types';

interface DigitalReaderModalProps {
  issue: MagazineIssue;
  onClose: () => void;
}

export default function DigitalReaderModal({ issue, onClose }: DigitalReaderModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = issue.pagesCount || 64;
  const [pageInput, setPageInput] = useState('1');
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100%, 1.25, 1.5
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Play synthesized crisp paper-rustle audio
  const playPageTurnSound = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const bufferSize = Math.floor(ctx.sampleRate * 0.14);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1400;
      filter.Q.value = 1.2;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio autoplay or web audio policy catch
    }
  }, [soundEnabled]);

  const goToPage = useCallback((targetPage: number, dir: 'next' | 'prev' = 'next') => {
    if (targetPage < 1 || targetPage > totalPages || isFlipping) return;
    setFlipDirection(dir);
    setIsFlipping(true);
    playPageTurnSound();
    
    setTimeout(() => {
      setCurrentPage(targetPage);
      setPageInput(String(targetPage));
      setIsFlipping(false);
    }, 280);
  }, [totalPages, isFlipping, playPageTurnSound]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1, 'next');
    }
  }, [currentPage, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1, 'prev');
    }
  }, [currentPage, goToPage]);

  const firstPage = useCallback(() => {
    goToPage(1, 'prev');
  }, [goToPage]);

  const lastPage = useCallback(() => {
    goToPage(totalPages, 'next');
  }, [totalPages, goToPage]);

  // Keyboard navigation & Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        firstPage();
      } else if (e.key === 'End') {
        e.preventDefault();
        lastPage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, firstPage, lastPage, onClose]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Handle Page input submission
  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      goToPage(parsed, parsed >= currentPage ? 'next' : 'prev');
    } else {
      setPageInput(String(currentPage));
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextPage();
    } else if (diff < -50) {
      prevPage();
    }
    touchStartX.current = null;
  };

  // Get current page editorial content
  const pagesList = issue.pages && issue.pages.length > 0 ? issue.pages : [];
  const activePageItem = pagesList.find((p) => p.pageNumber === currentPage) || {
    pageNumber: currentPage,
    title: `${issue.title} • Feature Analysis`,
    section: `Edition Section ${Math.ceil(currentPage / 4)}`,
    headline: currentPage === 1 ? issue.title : `Strategic Leadership & Enterprise Velocity`,
    bodySnippet: `In-depth investigation and executive telemetry featured in the ${issue.monthYear} digital edition.`,
    image: issue.coverImage,
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#242424] text-white flex flex-col justify-between select-none animate-fadeIn font-sans"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================= */}
      {/* TOP BAR: LOGO (LEFT), SEARCH (RIGHT), CLOSE (FAR RIGHT)   */}
      {/* Matches user Screenshot 3 top bar layout                  */}
      {/* ========================================================= */}
      <header className="bg-[#1C1C1C] border-b border-[#333333] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between z-40">
        
        {/* Left: Business Walkins Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/business-walkins-logo.jpg"
            alt="Business Walkins Logo"
            className="w-8 h-8 rounded-full object-contain bg-white p-0.5 shadow-sm"
          />
          <div className="h-5 w-[1.5px] bg-slate-600 mx-1 hidden sm:block" />
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold tracking-tight text-white uppercase leading-none font-serif">
              {issue.brandName || 'Business Walkins'}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-tight">
              {issue.monthYear} • {issue.issueNumber}
            </span>
          </div>
        </div>

        {/* Right: Search Box + Close Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in magazine..."
              className="bg-[#2D2D2D] hover:bg-[#333333] focus:bg-[#383838] text-xs text-white placeholder-slate-400 pl-3 pr-8 py-1.5 rounded border border-transparent focus:border-[#E11925] focus:outline-none transition-all w-36 sm:w-56"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close 3D reader"
            title="Close (Esc)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3D FLIPBOOK STAGE (MAIN CENTER DISPLAY)                   */}
      {/* Center 3D perspective flip with navigation chevrons       */}
      {/* ========================================================= */}
      <main className="flex-1 relative flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        
        {/* Left Screen Edge Navigation Button (<) */}
        <button
          type="button"
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full text-white/80 hover:text-white hover:bg-black/50 transition-all z-30 cursor-pointer ${
            currentPage === 1 ? 'opacity-20 pointer-events-none' : 'opacity-90 hover:scale-110'
          }`}
          aria-label="Previous Page"
          title="Previous Page (Left Arrow)"
        >
          <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.8} />
        </button>

        {/* Right Screen Edge Navigation Button (>) */}
        <button
          type="button"
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full text-white/80 hover:text-white hover:bg-black/50 transition-all z-30 cursor-pointer ${
            currentPage === totalPages ? 'opacity-20 pointer-events-none' : 'opacity-90 hover:scale-110'
          }`}
          aria-label="Next Page"
          title="Next Page (Right Arrow)"
        >
          <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.8} />
        </button>

        {/* 3D BOOK STAGE CONTAINER */}
        <div
          className="relative transition-transform duration-300 ease-out flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel})`,
            perspective: '1800px',
          }}
        >
          {/* THE FLIPBOOK PAGE CONTAINER */}
          <div
            className={`relative bg-[#FDFBF7] text-slate-900 shadow-2xl shadow-black/80 rounded-sm overflow-hidden select-none transition-all duration-300 ${
              isFlipping
                ? flipDirection === 'next'
                  ? 'rotate-y-[-12deg] -translate-x-2'
                  : 'rotate-y-[12deg] translate-x-2'
                : 'rotate-y-0 translate-x-0'
            }`}
            style={{
              width: 'min(90vw, 560px)',
              height: 'min(78vh, 790px)',
              aspectRatio: '1 / 1.414', // Standard international DIN / A4 Magazine Ratio
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)',
            }}
          >
            {/* Spine Depth Shadow on Left Edge */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-20" />
            
            {/* Page Sheen & Paper Lighting */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none z-20" />

            {/* Click Left / Right Zones to turn page */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1/3 z-30 cursor-w-resize"
              onClick={prevPage}
              title="Click to turn previous"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 z-30 cursor-e-resize"
              onClick={nextPage}
              title="Click to turn next"
            />

            {/* ================================================= */}
            {/* PAGE CONTENT LOGIC                                */}
            {/* Page 1 = Full Cover, Other Pages = Rich Layout    */}
            {/* ================================================= */}
            {currentPage === 1 ? (
              // FRONT COVER PAGE (Realistic Magazine Mockup)
              <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between overflow-hidden">
                <img
                  src={issue.coverImage}
                  alt={issue.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Vignette Overlay for Crisp Typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

                {/* Top Cover Banner */}
                <div className="relative z-10 p-5 sm:p-7 pt-4">
                  <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2 text-[9px] uppercase tracking-widest text-white/80 font-bold">
                    <span>www.businesswalkins.com</span>
                    <span>ISSN 2814-9981</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/business-walkins-logo.jpg"
                        alt="Business Walkins"
                        className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shadow-md"
                      />
                      <div className="h-6 w-[1.5px] bg-white/40 mx-1" />
                      <div className="flex flex-col">
                        <span className="font-bold text-lg sm:text-2xl text-white tracking-tight leading-none font-serif">
                          <span className="text-[#E11925]">Business</span> Walkins
                        </span>
                        <span className="text-[8px] uppercase tracking-[0.2em] text-white/90 font-semibold">
                          EMAGZINE • IDEAS | PEOPLE | PROGRESS
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-amber-300">
                    <span className="bg-[#E11925] text-white px-2 py-0.5 rounded-xs">
                      {issue.monthYear} Edition
                    </span>
                    <span>{issue.issueNumber}</span>
                  </div>
                </div>

                {/* Bottom Cover Story Headlines */}
                <div className="relative z-10 p-5 sm:p-7 pb-6 space-y-2.5">
                  {issue.executiveName && (
                    <div className="text-right">
                      <span className="text-lg sm:text-xl font-serif font-bold text-white block leading-tight drop-shadow">
                        {issue.executiveName}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-amber-300 tracking-wider">
                        {issue.executiveRole}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/20">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#E11925] bg-white px-1.5 py-0.5 rounded-xs inline-block mb-1">
                      EXCLUSIVE FEATURE
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-white leading-tight uppercase drop-shadow-md">
                      {issue.brandName || issue.title}
                    </h2>
                    <p className="text-xs text-white/90 line-clamp-2 mt-1 leading-snug drop-shadow">
                      {issue.description}
                    </p>
                  </div>

                  {/* Barcode & Issue Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[8px] text-white/70 font-mono">
                    <span>DIGITAL REPRODUCTION 2026</span>
                    <div className="flex items-center gap-1 bg-white px-1 py-0.5 rounded-xs text-black font-mono">
                      <span>||||| ||| |||||||</span>
                      <span className="font-sans font-bold">BW-MAG</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // INSIDE EDITORIAL PAGES (High Fidelity Magazine Interior)
              <div className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between overflow-hidden bg-[#FDFBF7]">
                
                {/* Page Running Header */}
                <div className="flex items-center justify-between border-b border-slate-300 pb-2 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  <span className="text-[#E11925] font-black">{activePageItem.section}</span>
                  <span className="font-serif italic text-slate-600">Business Walkins Emagzine • {issue.monthYear}</span>
                </div>

                {/* Main Editorial Body */}
                <div className="my-auto space-y-4">
                  {/* Headline & Subhead */}
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-600 block mb-1">
                      {activePageItem.title}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                      {activePageItem.headline || issue.title}
                    </h3>
                  </div>

                  {/* Mid-page Photo or Graphic */}
                  {activePageItem.image && (
                    <div className="relative w-full h-44 sm:h-52 rounded overflow-hidden shadow-sm border border-slate-200">
                      <img
                        src={activePageItem.image}
                        alt="Editorial Graphic"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs p-2 text-[9px] text-white">
                        Executive Brief: Certified Field Dossier • Global Executive Council
                      </div>
                    </div>
                  )}

                  {/* Text Columns */}
                  <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed space-y-2">
                    <p className="first-letter:text-3xl first-letter:font-serif first-letter:font-black first-letter:text-[#E11925] first-letter:float-left first-letter:mr-2">
                      {activePageItem.bodySnippet || issue.description}
                    </p>
                    <p className="hidden sm:block">
                      As global enterprises scale cognitive infrastructure and private equity pipelines, strategic clarity becomes the ultimate competitive moat. This special dossier details direct founder telemetry and board-level directives.
                    </p>
                  </div>

                  {/* Callout Box */}
                  <div className="p-3 bg-amber-50/80 border-l-4 border-amber-500 rounded-r text-[11px] text-slate-800 italic">
                    &ldquo;Success is not sustained by market consensus, but by high-conviction velocity and unwavering customer loyalty.&rdquo;
                  </div>
                </div>

                {/* Page Running Footer */}
                <div className="flex items-center justify-between border-t border-slate-300 pt-3 text-[11px] text-slate-500 font-medium">
                  <span>{issue.issueNumber}</span>
                  <span className="font-bold text-slate-900">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* THUMBNAIL DRAWER SLIDE-UP (When Grid Icon Clicked) */}
        {showThumbnails && (
          <div className="absolute bottom-0 inset-x-0 bg-[#1A1A1A]/95 backdrop-blur-md border-t border-[#333333] p-4 z-40 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                All Pages ({totalPages})
              </span>
              <button
                type="button"
                onClick={() => setShowThumbnails(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Drawer
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
              {Array.from({ length: Math.min(totalPages, 24) }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={pNum}
                  type="button"
                  onClick={() => {
                    goToPage(pNum);
                    setShowThumbnails(false);
                  }}
                  className={`shrink-0 w-16 sm:w-20 aspect-[1/1.4] rounded border transition-all text-center flex flex-col justify-between p-1 cursor-pointer ${
                    currentPage === pNum
                      ? 'border-[#E11925] bg-white text-black font-bold scale-105 shadow-lg'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-400'
                  }`}
                >
                  <span className="text-[8px] uppercase tracking-tighter opacity-80">
                    {pNum === 1 ? 'Cover' : `Page ${pNum}`}
                  </span>
                  <BookOpen className="w-4 h-4 mx-auto opacity-60" />
                  <span className="text-[9px] font-bold">{pNum}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* BOTTOM CONTROL TOOLBAR (MATCHES SCREENSHOT 3 EXACTLY)     */}
      {/* Left: Grid, Zoom, Sound                                   */}
      {/* Center: First, Prev, Input [1/64], Next, Last             */}
      {/* Right: Share, Download, Fullscreen                        */}
      {/* ========================================================= */}
      <footer className="bg-[#1C1C1C] border-t border-[#333333] px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between z-40 text-slate-300">
        
        {/* LEFT TOOLBAR ICONS: Thumbnails Grid, Zoom, Sound */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Thumbnails Grid Icon */}
          <button
            type="button"
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-2 rounded hover:bg-white/10 transition-colors cursor-pointer ${
              showThumbnails ? 'text-[#E11925]' : 'text-slate-300 hover:text-white'
            }`}
            title="Toggle Page Thumbnails"
            aria-label="Toggle Page Thumbnails"
          >
            <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Zoom In/Out Icon */}
          <button
            type="button"
            onClick={() => setZoomLevel((z) => (z >= 1.4 ? 1 : z + 0.2))}
            className="p-2 rounded hover:bg-white/10 transition-colors cursor-pointer text-slate-300 hover:text-white"
            title={`Zoom (${Math.round(zoomLevel * 100)}%)`}
            aria-label="Toggle Zoom"
          >
            {zoomLevel > 1 ? (
              <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Sound Audio Toggle Icon */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded hover:bg-white/10 transition-colors cursor-pointer text-slate-300 hover:text-white"
            title={soundEnabled ? 'Page-Turn Sound ON' : 'Page-Turn Sound MUTED'}
            aria-label="Toggle Flip Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E11925]" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 opacity-60" />
            )}
          </button>
        </div>

        {/* CENTER PAGING CONTROLS: |<<, <, [1/64] input, >, >>| */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* |<< First Page */}
          <button
            type="button"
            onClick={firstPage}
            disabled={currentPage === 1}
            className="p-1.5 sm:p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-slate-300 hover:text-white"
            title="First Page"
            aria-label="Go to First Page"
          >
            <ChevronsLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* < Previous Page */}
          <button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-1.5 sm:p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-slate-300 hover:text-white"
            title="Previous Page"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Interactive Page Input Box: e.g. [ 1/64 ] */}
          <form onSubmit={handlePageInputSubmit} className="flex items-center">
            <div className="bg-white text-black px-2 py-0.5 sm:py-1 rounded flex items-center shadow-xs">
              <input
                type="text"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={() => setPageInput(String(currentPage))}
                className="w-7 sm:w-9 text-center font-bold text-xs sm:text-sm bg-transparent text-black focus:outline-none"
                aria-label="Current page number"
              />
              <span className="text-slate-600 text-xs sm:text-sm font-semibold select-none">
                /{totalPages}
              </span>
            </div>
          </form>

          {/* > Next Page */}
          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-1.5 sm:p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-slate-300 hover:text-white"
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* >>| Last Page */}
          <button
            type="button"
            onClick={lastPage}
            disabled={currentPage === totalPages}
            className="p-1.5 sm:p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-slate-300 hover:text-white"
            title="Last Page"
            aria-label="Go to Last Page"
          >
            <ChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* RIGHT TOOLBAR ICONS: Share, Download, Fullscreen */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded hover:bg-white/10 transition-colors cursor-pointer text-slate-300 hover:text-white"
            title={shareSuccess ? 'Link Copied!' : 'Share Issue'}
            aria-label="Share Issue"
          >
            {shareSuccess ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="p-2 rounded hover:bg-white/10 transition-colors cursor-pointer text-slate-300 hover:text-white"
            title={downloadSuccess ? 'Downloaded!' : 'Download PDF Dossier'}
            aria-label="Download PDF"
          >
            {downloadSuccess ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            ) : (
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded hover:bg-white/10 transition-colors cursor-pointer text-slate-300 hover:text-white"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

      </footer>
    </div>
  );
}
