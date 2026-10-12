'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ThumbsUp, Quote } from 'lucide-react';

export const TESTIMONIALS_DATA = [
  {
    id: 'test-1',
    text: `Being featured in The Enterprise Chronicle’s 'Fast-Growing Enterprises' edition was an extraordinary experience for our entire executive leadership. The editorial depth, market research, and sheer visibility provided our startup with immense credibility and investor inquiries. Their bureau has been prompt, professional, and thorough throughout the entire publication cycle.`,
    name: 'Marcus Sterling',
    role: 'Aura Biosystems - Founder & Chief Executive Officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-2',
    text: `A sincere note of gratitude to The Enterprise Chronicle editorial desk for their masterclass in long-form business journalism. The feature captured our enterprise software journey with remarkable accuracy and intellectual nuance. The global distribution network gave our brand tremendous exposure across North America and EMEA.`,
    name: 'Elena Rostova',
    role: 'Novus Data Networks - VP of Strategic Partnerships',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-3',
    text: `Collaborating with The Enterprise Chronicle on our sustainability and clean energy retrospective was seamless. Their editors took the time to truly grasp our technical differentiators and ESG benchmarks. It is rare to see a business magazine that balances technical rigor with captivating executive storytelling.`,
    name: 'Henrik Lindqvist',
    role: 'Nordic CleanPower Consortium - Chief Operating Officer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-4',
    text: `The Enterprise Chronicle has proven to be a vital institutional media partner for our healthcare innovations. Their coverage of our clinical genomics breakthrough reached institutional investors and hospital networks we had been striving to engage for years. Outstanding professionalism from start to finish.`,
    name: 'Dr. Alistair Thorne',
    role: 'Apex Horizon Therapeutics - Managing Director',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-5',
    text: `Our cover feature with The Enterprise Chronicle delivered immediate commercial resonance. From the initial fireside interview to the final print layout, the editorial standards were world-class. It was by far the smoothest and most rewarding media experience our executive team has had.`,
    name: 'Radhakishan Vijaykumar',
    role: 'Srishti Enterprises Global - Group Chief Executive',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-6',
    text: `Recognition in The Chronicle’s annual 'Titan 50 Innovations' list gave our water stewardship initiatives the global platform they deserved. The responsiveness, research depth, and international reach of this publication make it an indispensable voice for forward-thinking enterprises.`,
    name: 'Aditya Kumar',
    role: 'Enviro Integrated Solutions - Managing Director',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-7',
    text: `A huge appreciation to The Enterprise Chronicle for spotlighting our regional logistics expansion. Their editorial rigor and ability to articulate complex supply-chain transformations into compelling business reading gave our commercial partners immense confidence. We look forward to ongoing collaboration.`,
    name: 'Pobitra Das',
    role: 'Apex Meridian Logistics - Founder & MD',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-8',
    text: `Euro Exim Bank highly values our ongoing relationship with The Enterprise Chronicle. As a critical voice in cross-border trade finance and macroeconomics, their investigative dispatches and executive features consistently set the gold standard for global business media.`,
    name: 'Graham Bright',
    role: 'Euro Exim Bank - Head of Compliance & Operations',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-9',
    text: `Discovering The Enterprise Chronicle was a transformative milestone for our consumer retail brand. Their team went above and beyond to capture the soul of our omnichannel expansion. We recommend any founder looking for authentic, high-impact executive media to partner with them.`,
    name: 'Arvind Prabhu',
    role: 'Olovy Commerce Group - Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
];

export default function TestimonialsView() {
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      
      {/* ======================================================= */}
      {/* 1. TOP HEADER BANNER (Original Enterprise Chronicle)    */}
      {/* ======================================================= */}
      <section className="bg-white border-b border-slate-200 overflow-hidden shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="w-full rounded-2xl overflow-hidden shadow-md border border-slate-200/90 relative bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-8 sm:p-12 md:p-14 flex flex-col items-center justify-center text-center">
            {/* Subtle decorative background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/15 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-red-600/20 text-red-400 border border-red-500/30">
                <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                Verified Partner Testimonials
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tight text-white leading-tight">
                Global Voices of Leadership &amp; Innovation
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-2xl mx-auto leading-relaxed">
                Reflections and verified endorsements from Fortune 500 executives, pioneering founders, and enterprise partners featured across The Enterprise Chronicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* 2. SECTION TITLE                                        */}
      {/* ======================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight font-serif">
          Executive &amp; Leader Testimonials
        </h1>
        <div className="w-16 h-1 bg-[#DC2626] mx-auto mt-3 rounded-full" />
      </div>

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
