'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ThumbsUp, Quote } from 'lucide-react';

export const TESTIMONIALS_DATA = [
  {
    id: 'test-1',
    text: `Being featured in Business Walkins’s 'Fast-Growing Enterprises' edition was an extraordinary experience for our entire executive leadership. The editorial depth, market research, and sheer visibility provided our startup with immense credibility and investor inquiries. Their bureau has been prompt, professional, and thorough throughout the entire publication cycle.`,
    name: 'Marcus Sterling',
    role: 'Aura Biosystems - Founder & Chief Executive Officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-2',
    text: `A sincere note of gratitude to Business Walkins editorial desk for their masterclass in long-form business journalism. The feature captured our enterprise software journey with remarkable accuracy and intellectual nuance. The global distribution network gave our brand tremendous exposure across North America and EMEA.`,
    name: 'Elena Rostova',
    role: 'Novus Data Networks - VP of Strategic Partnerships',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-3',
    text: `Collaborating with Business Walkins on our sustainability and clean energy retrospective was seamless. Their editors took the time to truly grasp our technical differentiators and ESG benchmarks. It is rare to see a business magazine that balances technical rigor with captivating executive storytelling.`,
    name: 'Henrik Lindqvist',
    role: 'Nordic CleanPower Consortium - Chief Operating Officer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-4',
    text: `Business Walkins has proven to be a vital institutional media partner for our healthcare innovations. Their coverage of our clinical genomics breakthrough reached institutional investors and hospital networks we had been striving to engage for years. Outstanding professionalism from start to finish.`,
    name: 'Dr. Alistair Thorne',
    role: 'Apex Horizon Therapeutics - Managing Director',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-5',
    text: `Our cover feature with Business Walkins delivered immediate commercial resonance. From the initial fireside interview to the final print layout, the editorial standards were world-class. It was by far the smoothest and most rewarding media experience our executive team has had.`,
    name: 'Radhakishan Vijaykumar',
    role: 'Srishti Enterprises Global - Group Chief Executive',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-6',
    text: `Recognition in Business Walkins’s annual 'Titan 50 Innovations' list gave our water stewardship initiatives the global platform they deserved. The responsiveness, research depth, and international reach of this publication make it an indispensable voice for forward-thinking enterprises.`,
    name: 'Aditya Kumar',
    role: 'Enviro Integrated Solutions - Managing Director',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-7',
    text: `A huge appreciation to Business Walkins for spotlighting our regional logistics expansion. Their editorial rigor and ability to articulate complex supply-chain transformations into compelling business reading gave our commercial partners immense confidence. We look forward to ongoing collaboration.`,
    name: 'Pobitra Das',
    role: 'Apex Meridian Logistics - Founder & MD',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-8',
    text: `Euro Exim Bank highly values our ongoing relationship with Business Walkins. As a critical voice in cross-border trade finance and macroeconomics, their investigative dispatches and executive features consistently set the gold standard for global business media.`,
    name: 'Graham Bright',
    role: 'Euro Exim Bank - Head of Compliance & Operations',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-9',
    text: `Discovering Business Walkins was a transformative milestone for our consumer retail brand. Their team went above and beyond to capture the soul of our omnichannel expansion. We recommend any founder looking for authentic, high-impact executive media to partner with them.`,
    name: 'Arvind Prabhu',
    role: 'Olovy Commerce Group - Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
];

export default function TestimonialsView() {
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      
      {/* ======================================================= */}
      {/* 1. TOP HEADER BANNER (Matches Reference Screenshot)     */}
      {/* ======================================================= */}
      <section className="bg-white border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Banner Graphic Frame with 100% Business Walkins Branding */}
          <div className="w-full overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-r from-white via-slate-50 to-slate-100 rounded-xs relative p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[220px]">
            
            {/* Background Faint Watermark Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* Left: Official Business Walkins Masthead & Testimonials Box */}
            <div className="relative z-10 flex flex-col justify-between self-stretch w-full md:w-auto">
              {/* Top: Business Walkins Official Masthead */}
              <div className="flex items-center gap-3 sm:gap-3.5 mb-6 md:mb-10">
                <img
                  src="/images/business-walkins-logo.jpg"
                  alt="Business Walkins Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover shadow-sm border border-amber-300 shrink-0"
                />
                <div className="flex flex-col text-left">
                  <div className="flex items-baseline leading-none">
                    <span className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#111827] tracking-tight uppercase">
                      Business
                    </span>
                    <span className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#C28B30] tracking-tight ml-1.5 uppercase">
                      Walkins
                    </span>
                  </div>
                  <p className="text-[8px] sm:text-[9.5px] md:text-[10.5px] font-sans font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[#C28B30] mt-1 leading-none">
                    INSPIRING BUSINESS COMMUNITY • EMAGZINE
                  </p>
                </div>
              </div>

              {/* Bottom: Solid Navy Blue 'Testimonials' Box */}
              <div className="bg-[#002B49] text-white px-6 sm:px-8 py-3 sm:py-4 shadow-md inline-block max-w-fit">
                <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black uppercase tracking-tight leading-none font-sans">
                  Testimonials
                </h2>
              </div>
            </div>

            {/* Right: 3 Fanned-out Business Walkins Magazine Covers */}
            <div className="relative z-10 flex items-center justify-center md:justify-end gap-2 sm:gap-3 md:pr-4 overflow-visible shrink-0">
              
              {/* Cover 1: Woman Entrepreneur (Left, rotated -3deg) */}
              <div className="w-24 sm:w-32 md:w-38 aspect-[3/4] bg-white border border-slate-300 shadow-md rounded-xs overflow-hidden flex flex-col -rotate-3 hover:rotate-0 transition-transform duration-300 shrink-0">
                <div className="bg-[#E11925] text-white text-[6.5px] sm:text-[7.5px] font-black uppercase tracking-wider px-1.5 py-0.5 text-center truncate">
                  Business Walkins
                </div>
                <div className="px-1 py-0.5 flex items-center justify-between border-b border-slate-100 bg-white">
                  <span className="font-serif font-black text-[7px] sm:text-[8px] text-slate-900 leading-none uppercase">
                    BW <span className="text-[#C28B30]">Magazine</span>
                  </span>
                  <span className="text-[5.5px] text-slate-400">2026</span>
                </div>
                <div className="flex-1 relative overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                    alt="Woman Entrepreneur"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-1 sm:p-1.5 text-white">
                    <span className="text-[6px] sm:text-[7px] font-bold block leading-tight">
                      Woman Entrepreneur
                    </span>
                    <span className="text-[5px] text-amber-300 block">Excellence Award</span>
                  </div>
                </div>
              </div>

              {/* Cover 2: Executive (Center, elevated) */}
              <div className="w-26 sm:w-36 md:w-42 aspect-[3/4] bg-white border border-slate-300 shadow-lg rounded-xs overflow-hidden flex flex-col z-20 hover:scale-105 transition-transform duration-300 shrink-0 -translate-y-2">
                <div className="bg-[#E11925] text-white text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 text-center truncate">
                  Business Walkins Special
                </div>
                <div className="px-1.5 py-0.5 flex items-center justify-between border-b border-slate-100 bg-white">
                  <span className="font-serif font-black text-[8px] sm:text-[9.5px] text-slate-900 leading-none uppercase">
                    Business <span className="text-[#C28B30]">Walkins</span>
                  </span>
                  <span className="text-[6px] text-slate-400">Vol 14</span>
                </div>
                <div className="flex-1 relative overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                    alt="Executive Leader"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-1 sm:p-2 text-white">
                    <span className="text-[6.5px] sm:text-[8px] font-black uppercase block leading-tight">
                      Fluid Control
                    </span>
                    <span className="text-[5.5px] sm:text-[6.5px] text-slate-200 block truncate">
                      Precision Engineering
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover 3: Founder & CEO (Right, rotated 3deg) */}
              <div className="w-24 sm:w-32 md:w-38 aspect-[3/4] bg-white border border-slate-300 shadow-md rounded-xs overflow-hidden flex flex-col rotate-3 hover:rotate-0 transition-transform duration-300 shrink-0">
                <div className="bg-[#E11925] text-white text-[6.5px] sm:text-[7.5px] font-black uppercase tracking-wider px-1.5 py-0.5 text-center truncate">
                  Business Walkins
                </div>
                <div className="px-1 py-0.5 flex items-center justify-between border-b border-slate-100 bg-white">
                  <span className="font-serif font-black text-[7px] sm:text-[8px] text-slate-900 leading-none uppercase">
                    BW <span className="text-[#C28B30]">Edition</span>
                  </span>
                  <span className="text-[5.5px] text-slate-400">2026</span>
                </div>
                <div className="flex-1 relative overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
                    alt="Founder & CEO"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-1 sm:p-1.5 text-white">
                    <span className="text-[6px] sm:text-[7px] font-bold block leading-tight">
                      Enterprise Leaders
                    </span>
                    <span className="text-[5px] text-amber-300 block">Innovator of the Year</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Heading directly under banner (Matches Screenshot) */}
          <div className="text-center mt-8 mb-3">
            <h1 className="text-2xl sm:text-3xl md:text-[32px] font-black text-slate-900 tracking-tight font-sans">
              Business Magazine Testimonials
            </h1>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* 3. TESTIMONIAL CARDS GRID                               */}
      {/* ======================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-lg border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between relative group hover:border-slate-300"
            >
              {/* Giant Faint Quote Watermark at Top Right */}
              <div className="absolute top-3 right-4 text-slate-100 group-hover:text-red-50 transition-colors pointer-events-none select-none">
                <Quote className="w-12 h-12 stroke-[1.5] text-slate-200/90" />
              </div>

              {/* Testimonial Quote Text */}
              <div className="relative z-10 mb-6">
                <p className="text-slate-600 text-[13px] leading-relaxed font-normal text-justify">
                  {t.text}
                </p>
              </div>

              {/* Author Footer: Avatar + Name + Designation/Company */}
              <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm shrink-0 group-hover:border-[#DC2626] transition-colors"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 truncate leading-snug">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-0.5 leading-tight">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
