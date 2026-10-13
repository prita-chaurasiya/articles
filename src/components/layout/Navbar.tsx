'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  BookOpen,
  ChevronDown,
  ArrowRight,
  Mail,
  Phone,
  Sparkles,
  Cpu,
  Layers,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [dropdownLeft, setDropdownLeft] = useState<number>(16);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navBarContainerRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const {
    isMegaMenuOpen,
    setIsMegaMenuOpen,
    setIsSearchModalOpen,
  } = useArticleStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Calculate positioning when dropdown opens
  const updateDropdownPosition = (name: string) => {
    const trigger = triggerRefs.current[name];
    const container = navBarContainerRef.current;
    if (trigger && container) {
      const triggerRect = trigger.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offset = triggerRect.left - containerRect.left;
      
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      if (windowWidth < 640) {
        // Mobile / Small screens: fixed margin from screen edge
        setDropdownLeft(12);
      } else {
        // Desktop / Tablet: align with the item trigger, clamped to container bounds
        const maxLeft = containerRect.width - 390;
        setDropdownLeft(Math.max(12, Math.min(offset, maxLeft > 0 ? maxLeft : 12)));
      }
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-trigger') && !target.closest('.dropdown-portal-menu')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    updateDropdownPosition(name);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  const toggleDropdown = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      updateDropdownPosition(name);
      setActiveDropdown(name);
    }
  };

  // Magazine years dropdown matching user screenshot
  const MAGAZINE_YEARS = [
    { label: '2026 Magazines', year: '2026', href: '/magazine?year=2026' },
    { label: '2025 Magazines', year: '2025', href: '/magazine?year=2025' },
    { label: '2024 Magazines', year: '2024', href: '/magazine?year=2024' },
    { label: '2023 Magazines', year: '2023', href: '/magazine?year=2023' },
    { label: '2022 Magazines', year: '2022', href: '/magazine?year=2022' },
    { label: '2021 Magazines', year: '2021', href: '/magazine?year=2021' },
    { label: '2020 Magazines', year: '2020', href: '/magazine?year=2020' },
    { label: '2019 Magazines', year: '2019', href: '/magazine?year=2019' },
    { label: '2018 Magazines', year: '2018', href: '/magazine?year=2018' },
  ];

  // Primary categories matching user reference screenshot
  const NAV_ITEMS = [
    { name: 'News', href: '/category/news' },
    { name: 'Magazine', href: '/magazine', hasDropdown: 'mag' },
    { name: 'Lounge Interview', href: '/category/lounge-interview' },
    { name: 'Blog', href: '/category/blog' },
    { name: 'Press Release', href: '/category/press-release' },
    { name: 'Guest Posts', href: '/category/guest-posts' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Launchpad', href: '/category/launchpad' },
    { name: 'Healthcare', href: '/category/healthcare' },
    { name: 'Cover Story', href: '/category/cover-story' },
    { name: 'Testimonials', href: '/category/testimonials' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        {/* ======================================================= */}
        {/* ROW 1: TOP BRANDING BAR (WHITE BACKGROUND)             */}
        {/* ======================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3.5 sm:py-4 border-b border-slate-200">
            
            {/* Left: Contact Info (Mail us & Call us) - Matches Reference Image */}
            <div className="hidden lg:flex flex-col justify-center text-xs sm:text-[13px] text-slate-800 space-y-0.5 shrink-0 font-sans">
              <div className="flex items-center leading-snug">
                <span className="font-bold text-[#111827] mr-1.5">Mail us :</span>
                <a
                  href="mailto:editorial@enterprisechronicle.com"
                  className="text-[#2b2b2b] hover:text-[#E11925] transition-colors"
                >
                  editorial@enterprisechronicle.com
                </a>
              </div>
              <div className="flex items-center leading-snug">
                <span className="font-bold text-[#111827] mr-1.5">Call us at :</span>
                <a
                  href="tel:+12128493000"
                  className="text-[#2b2b2b] hover:text-[#E11925] transition-colors"
                >
                  +1 (212) 849-3000 / +44 20 7946 0192
                </a>
              </div>
            </div>

            {/* Mobile Left: Hamburger Sections Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

            {/* Center: Brand Masthead Logo matching Reference Image */}
            <div className="text-center mx-auto lg:mx-0 min-w-0 max-w-[calc(100vw-110px)] sm:max-w-none">
              <Link href="/" className="inline-flex items-center group max-w-full">
                {/* Monogram EC with MAGAZINE text and vertical divider | */}
                <div className="flex items-center shrink-0">
                  <div className="relative flex items-center select-none">
                    <span className="text-[#E11925] text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tighter leading-none">
                      E
                    </span>
                    <div className="relative flex items-center justify-center">
                      <span className="text-[#E11925] text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tighter leading-none">
                        C
                      </span>
                      <span className="absolute text-[4px] sm:text-[5px] md:text-[6px] font-sans font-black uppercase text-slate-900 tracking-tighter -rotate-90 origin-center pointer-events-none">
                        MAGAZINE
                      </span>
                    </div>
                  </div>
                  {/* Vertical gray line divider */}
                  <div className="mx-1.5 sm:mx-2 md:mx-2.5 h-6 sm:h-7 md:h-8 w-[1.5px] bg-[#9CA3AF]/80 shrink-0" />
                </div>

                {/* Brand Name: Enterprise (Red) + Chronicle (Dark Charcoal) + Right-aligned Subtitle */}
                <div className="flex flex-col text-left min-w-0">
                  <div className="flex items-baseline leading-none whitespace-nowrap">
                    <span className="font-sans font-bold text-lg sm:text-2xl md:text-[32px] text-[#E11925] tracking-tight">
                      Enterprise
                    </span>
                    <span className="font-sans font-bold text-lg sm:text-2xl md:text-[32px] text-[#222222] tracking-tight ml-1 sm:ml-1.5 md:ml-2">
                      Chronicle
                    </span>
                  </div>
                  <p className="text-[7px] sm:text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-[0.14em] sm:tracking-[0.24em] text-slate-500 text-right mt-0.5 sm:mt-1 leading-none truncate">
                    INSPIRING GLOBAL BUSINESS LEADERSHIP
                  </p>
                </div>
              </Link>
            </div>

            {/* Right: Search Button & Red 'INTERNATIONAL MAGAZINES' Button */}
            <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
              
              {/* Search Icon Trigger (Clean standalone outline icon) */}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="p-1.5 text-[#111827] hover:text-[#E11925] transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Search publication"
                title="Search stories (⌘K)"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.4} />
              </button>

              {/* Red CTA Button: 'INTERNATIONAL MAGAZINES' (Text only, solid red, matching reference) */}
              <Link
                href="/magazine"
                className="hidden sm:inline-flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm bg-[#E11925] hover:bg-[#C9131E] text-white text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-colors shadow-none items-center justify-center"
              >
                INTERNATIONAL MAGAZINES
              </Link>

            </div>

          </div>
        </div>

        {/* ======================================================= */}
        {/* ROW 2: SOLID PITCH BLACK NAVIGATION BAR (Desktop Only)   */}
        {/* ======================================================= */}
        <div className="hidden lg:block bg-[#0B0F19] text-white border-b border-slate-900 relative z-50">
          <div ref={navBarContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            
            {/* Horizontal Nav Strip (Desktop) */}
            <nav className="flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 sm:py-3 text-xs font-bold tracking-wide">
              
              <div className="flex items-center space-x-4 sm:space-x-6 text-white whitespace-nowrap">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href)) ||
                    (item.name === 'Testimonials' && pathname === '/testimonials');
                  const isDropdown = Boolean(item.hasDropdown);
                  const isDropdownActive = activeDropdown === item.hasDropdown;

                  return (
                    <div
                      key={item.name}
                      ref={(el) => {
                        if (item.hasDropdown) {
                          triggerRefs.current[item.hasDropdown] = el;
                        }
                      }}
                      className="relative dropdown-trigger py-1"
                      onMouseEnter={() => {
                        if (item.hasDropdown) handleMouseEnter(item.hasDropdown);
                      }}
                      onMouseLeave={handleMouseLeave}
                    >
                      {isDropdown ? (
                        <button
                          type="button"
                          onClick={() => toggleDropdown(item.hasDropdown!)}
                          className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                            isActive || isDropdownActive
                              ? 'text-[#DC2626] font-black'
                              : 'text-white hover:text-[#DC2626]'
                          }`}
                          aria-expanded={isDropdownActive}
                          aria-label={`${item.name} options`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isDropdownActive ? 'rotate-180 text-[#DC2626]' : 'opacity-80'
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={`inline-flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-wider transition-colors ${
                            isActive
                              ? 'text-[#DC2626] font-black'
                              : 'text-white hover:text-[#DC2626]'
                          }`}
                        >
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sections / Directory Mega Menu Trigger on Right of Black Bar */}
              <div className="flex items-center gap-2 pl-3 sm:pl-4 border-l border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-[#DC2626] text-white text-[11px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm border border-slate-700/60 hover:border-[#DC2626]"
                  title="Browse All Magazine Sections"
                  aria-label="Open Directory Sections"
                >
                  <Menu className="w-3.5 h-3.5 text-white" />
                  <span className="hidden sm:inline">Sections</span>
                </button>
              </div>

            </nav>

            {/* ======================================================= */}
            {/* FLOATING DROPDOWN MENU PORTAL (Desktop)                 */}
            {/* ======================================================= */}
            {activeDropdown && (
              <div
                className="dropdown-portal-menu absolute top-full z-[100] pt-1.5 animate-fadeIn"
                style={{
                  left: `${dropdownLeft}px`,
                }}
                onMouseEnter={() => {
                  if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                {/* MAGAZINE DROPDOWN (Pixel-matched with Reference Image) */}
                {activeDropdown === 'mag' && (
                  <div className="w-[230px] sm:w-[250px] bg-black text-white shadow-2xl border border-neutral-900 divide-y divide-[#1e1e1e] overflow-hidden">
                    {MAGAZINE_YEARS.map((iss) => (
                      <Link
                        key={iss.year}
                        href={iss.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-6 py-3.5 text-[13px] font-semibold text-white hover:text-[#DC2626] hover:bg-neutral-900/60 transition-colors cursor-pointer tracking-wide"
                      >
                        {iss.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* ======================================================= */}
        {/* RESPONSIVE MOBILE SLIDE-OUT DRAWER (Matches Screenshot 3)*/}
        {/* ======================================================= */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Dark Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Black Drawer Panel */}
            <div className="fixed inset-y-0 left-0 w-[300px] sm:w-[350px] max-w-[85vw] bg-black text-white shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-neutral-900 z-50 animate-fadeIn">
              
              <div>
                {/* Drawer Header: Title & Close Button */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-neutral-900">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white text-black font-serif font-black rounded flex items-center justify-center text-xs">
                      EC
                    </div>
                    <div>
                      <span className="font-serif text-sm font-black tracking-tight text-white uppercase block leading-none">
                        Chronicle
                      </span>
                      <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">
                        Global Media
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Quick Search inside Drawer */}
                <div className="p-4 border-b border-neutral-900">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles, topics..."
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsSearchModalOpen(true);
                      }}
                      readOnly
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 cursor-pointer focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Vertical Navigation Items (Exact match with Screenshot 3) */}
                <nav className="divide-y divide-neutral-900/90 text-sm font-semibold tracking-wide">
                  {NAV_ITEMS.map((item) => {
                    const isDropdown = item.hasDropdown === 'mag';
                    const isExpanded = mobileAccordion === item.hasDropdown;

                    if (isDropdown) {
                      return (
                        <div key={item.name} className="border-b border-neutral-900/90">
                          <button
                            type="button"
                            onClick={() => setMobileAccordion(isExpanded ? null : item.hasDropdown!)}
                            className="w-full flex items-center justify-between px-6 py-4 text-white hover:text-[#DC2626] transition-colors cursor-pointer text-left"
                          >
                            <span className={isExpanded ? 'text-[#DC2626]' : ''}>{item.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-[#DC2626]' : 'text-slate-400'
                              }`}
                            />
                          </button>

                          {/* Accordion Year Items (Image 2 on Mobile) */}
                          {isExpanded && (
                            <div className="bg-neutral-950 divide-y divide-neutral-900/70 border-t border-neutral-900">
                              {MAGAZINE_YEARS.map((iss) => (
                                <Link
                                  key={iss.year}
                                  href={iss.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block px-8 py-3 text-xs font-semibold text-slate-300 hover:text-[#DC2626] hover:bg-neutral-900 transition-colors"
                                >
                                  {iss.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    const isItemActive =
                      pathname === item.href ||
                      (item.href !== '/' && pathname.startsWith(item.href)) ||
                      (item.name === 'Testimonials' && pathname === '/testimonials');

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-6 py-4 transition-colors ${
                          isItemActive ? 'text-[#DC2626] font-bold bg-neutral-900/50' : 'text-white hover:text-[#DC2626]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Actions: Admin Panel & Magazine & Contacts */}
              <div className="p-4 sm:p-5 border-t border-neutral-900 space-y-2.5 bg-neutral-950/90">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-between shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-white" />
                    <span>Admin Studio & CMS</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/magazine"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center justify-between shadow transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-white" />
                    <span>International Magazines</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                  <div>Mail: editorial@enterprisechronicle.com</div>
                  <div>Tel: +1 (212) 849-3000</div>
                </div>
              </div>

            </div>
          </div>
        )}

      </header>
    </>
  );
}
