'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Cpu,
  Shield,
  Layers,
  Award,
  Globe,
  Radio,
  FileText,
  Mail,
  Zap,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { CATEGORIES } from '@/data/categories';

export default function MegaMenu() {
  const { isMegaMenuOpen, setIsMegaMenuOpen, articles } = useArticleStore();

  if (!isMegaMenuOpen) return null;

  const featuredStories = articles.filter((a) => a.isFeatured).slice(0, 3);

  const sectionsCol1 = [
    { name: 'Fresh Stories', href: '/#fresh-stories', icon: Zap },
    { name: 'Success Stories', href: '/success-stories', icon: Award, highlight: true },
    { name: 'Business', href: '/category/business', icon: Globe },
    { name: 'Technology', href: '/category/technology', icon: Cpu },
    { name: 'AI & Automation', href: '/category/ai', icon: Sparkles },
    { name: 'Startups', href: '/category/startups', icon: TrendingUp },
    { name: 'Finance', href: '/category/finance', icon: Layers },
  ];

  const sectionsCol2 = [
    { name: 'Leadership & Strategy', href: '/category/leadership' },
    { name: 'Healthcare & Biotech', href: '/category/healthcare' },
    { name: 'Education & EdTech', href: '/category/education' },
    { name: 'Manufacturing & Robotics', href: '/category/manufacturing' },
    { name: 'Real Estate & PropTech', href: '/category/real-estate' },
    { name: 'Automobile & EV', href: '/category/automobile' },
    { name: 'Marketing & Branding', href: '/category/marketing' },
    { name: 'Human Resources (HR)', href: '/category/hr' },
  ];

  const sectionsCol3 = [
    { name: 'Cyber Security', href: '/category/cyber-security', icon: Shield },
    { name: 'Cloud & Infrastructure', href: '/category/cloud', icon: Layers },
    { name: 'Innovation & DeepTech', href: '/category/innovation', icon: Sparkles },
    { name: 'Executive Interviews', href: '/category/interviews' },
    { name: 'Global Awards 2026', href: '/awards' },
    { name: 'Upcoming Events & Summits', href: '/events' },
    { name: 'Videos & Executive Podcasts', href: '/category/interviews' },
    { name: 'Guest Posts & Opinions', href: '/contact' },
    { name: 'Corporate Press Releases', href: '/category/business' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-b border-slate-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Header row inside mega menu */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-blue-600 rounded-sm"></span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Global Editorial Directory & Sections
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 4-Column Mega Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
            
            {/* Column 1: Core Beats */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4 pb-1 border-b border-blue-100 flex items-center justify-between">
                <span>Core Business Beats</span>
                <span className="text-[10px] text-slate-400">01</span>
              </h3>
              <ul className="space-y-2">
                {sectionsCol1.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all group ${
                          item.highlight
                            ? 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
                            : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {Icon && <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />}
                          {item.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 2: Industry Verticals */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>Enterprise Verticals</span>
                <span className="text-[10px] text-slate-400">02</span>
              </h3>
              <ul className="space-y-1.5">
                {sectionsCol2.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="block px-3 py-1.5 rounded-md text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Tech Frontiers & Media */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>Special Reports & Media</span>
                <span className="text-[10px] text-slate-400">03</span>
              </h3>
              <ul className="space-y-1.5">
                {sectionsCol3.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="block px-3 py-1.5 rounded-md text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Magazine & Featured Highlights */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                  Latest Edition
                </span>
                <Link
                  href="/magazine"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View Archive →
                </Link>
              </div>

              <div className="relative group overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-slate-900 shadow">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80"
                  alt="Magazine Issue 48"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Issue #48 • October 2026
                  </span>
                  <h4 className="text-white text-sm font-bold font-serif leading-tight">
                    The Cognitive Enterprise & Autonomous AI Frontier
                  </h4>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/magazine"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Read Digital Magazine Online</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>Publish Article (Admin Studio)</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom quick ticker */}
          <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-6">
              <Link href="/advertise" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-blue-600">
                Media Kit & Advertising
              </Link>
              <Link href="/contact" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-blue-600">
                Editorial Bureaus & Press
              </Link>
              <Link href="/awards" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-blue-600">
                Enterprise Awards 2026
              </Link>
            </div>
            <p className="text-[11px] text-slate-400">
              Business Walkins Emagzine • Ideas • People • Progress
            </p>
          </div>

        </div>
      </div>
      
      {/* Background click to dismiss */}
      <div className="h-full w-full" onClick={() => setIsMegaMenuOpen(false)} />
    </div>
  );
}
