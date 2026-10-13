'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Article } from '@/types';
import MagazineCardOverlay from '@/components/common/MagazineCardOverlay';

interface HomeSuccessStoriesTriSectionProps {
  articles?: Article[];
}

export const SUCCESS_STORIES_DATA = {
  // Center Column: 5 Wide Horizontal Cards
  centerStories: [
    {
      slug: 'aura-terra-holdings-land-intelligence',
      title: 'AURA TERRA PROPERTIES AND CONSTRUCTIONS PRIVATE LIMITED',
      category: 'COVER STORY',
      date: 'July 21, 2026',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Aura Terra Property Capitals: Building the Next Generation of Sustainable Wealth Through Land Intelligence and Infrastructure-Led Industrial Growth corridors across high-tech zones...',
    },
    {
      slug: 'global-foundation-academy-future-education',
      title: 'Global Foundation Academy Beyond the Classroom: Education’s Answer to an Uncertain Future',
      category: 'COVER STORY',
      date: 'July 21, 2026',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      excerpt: 'As artificial intelligence reshapes industries and traditional career paths continue to evolve, the question facing modern educators is how to build enduring intellectual agility...',
    },
    {
      slug: 'zenith-pharmaceutical-services-compliance',
      title: 'Zenith Pharma Services Corp : Dr. Rakesh Sutariya – Managing Director & CEO',
      category: 'COVER STORY',
      date: 'July 14, 2026',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Zenith: A Global Partner for Quality, Compliance, and Life Sciences Innovation. Beyond its clinical impact, Zenith delivers end-to-end statutory alignment across sovereign regulatory regimes...',
    },
    {
      slug: 'aqua-nova-sustainable-hydration-supermarket',
      title: 'BOTTLING THE FUTURE: HOW AQUA NOVA IS TRANSFORMING SUSTAINABLE HYDRATION NETWORKS®',
      category: 'COVER STORY',
      date: 'July 9, 2026',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
      excerpt: 'How One Entrepreneurial Vision Is Transforming Clean Water from a Commodity into a Powerful Brand Experience. Once considered basic sustenance, premium hydration is now an organized retail vertical...',
    },
    {
      slug: 'nordic-early-education-pedagogy-excellence',
      title: 'Nordic Schools: Reimagining Early Education By Bringing Play-Based Philosophy to Next-Gen Children',
      category: 'COVER STORY',
      date: 'June 18, 2026',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
      excerpt: 'In the foundational education space, there is a quiet shift happening across modern households. Parents are prioritizing research-backed curiosity, emotional intelligence, and stress-free learning...',
    },
  ],

  // Left Column Widget 1: Guest Post (6 text items)
  guestPosts: [
    {
      slug: 'enterprise-cloud-security-zero-trust',
      title: 'Top Cyber Security Course with Placement: Why Enterprise Leaders Prioritize Zero-Trust',
      date: 'October 8, 2026',
    },
    {
      slug: 'hyperlocal-business-presence-strategies',
      title: 'GMB & Search Presence in 2026: How Modern Enterprises Grow Footfall on Maps',
      date: 'October 7, 2026',
    },
    {
      slug: 'capital-allocation-mistakes-private-equity',
      title: '7 Capital Allocation Mistakes That Erode Long-Term Effectiveness of Enterprise Growth Plans',
      date: 'October 5, 2026',
    },
    {
      slug: 'executive-wellness-retreats-productivity',
      title: 'Mindfulness & Executive Focus: A Leader’s Strategic Guide to Restorative Weekends',
      date: 'October 5, 2026',
    },
    {
      slug: 'data-science-to-algorithmic-trading-careers',
      title: 'From Applied Mathematics to Quantitative Finance: How Modern Analytics Opens Boardroom Doors',
      date: 'October 5, 2026',
    },
    {
      slug: 'sustainable-packaging-biomaterials-commerce',
      title: 'Showing a Packaging Innovation in Motion: Biomaterials Accelerating Global Supply Chains',
      date: 'October 3, 2026',
    },
  ],

  // Left Column Widget 2: BRAND IMPACT (5 items with thumbnail)
  brandImpact: [
    {
      slug: 'elena-vance-clean-hydrogen-architecture',
      title: 'Dr. Elena Vance: The Architecture of Clean Hydrogen Infrastructure',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'julian-sterling-quantum-computing-pharma',
      title: 'Julian Sterling: Scaling Quantum Computing in Life Sciences',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'marcus-thorne-autonomous-capital-orchestration',
      title: 'Marcus Thorne: Autonomous Capital Orchestration and Venture Modeling',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'sophia-rostova-next-gen-diagnostic-ai',
      title: 'Sophia Rostova: Next-Generation Clinical Diagnostic Neural Networks',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'henrik-lindqvist-logistics-modernization',
      title: 'Henrik Lindqvist: Cross-Border Multimodal Logistics Modernization',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    },
  ],

  // Right Column Widget 1: PRESS RELEASE (7 items with thumbnail on right)
  pressReleases: [
    {
      slug: 'global-central-banks-high-tech-bonds',
      title: 'FIA PRESIDENT, H.E. MOHAMMED BEN SULAYEM ON SUSTAINABLE MOTORSPORT INNOVATION...',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'global-business-achievers-awards-2026',
      title: 'Global Business Achievers Awards 2026: Celebrating Audited Corporate Excellence...',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'vanguard-capital-clean-energy-fund',
      title: 'Big Bull Leadership Awards 2026: Prime Executives Honored in Grand Gala...',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'synapse-analytics-multi-agent-suite',
      title: 'Utilitarian Labs Launches UtilPulse 3.0 Enterprise Automation Protocol...',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'sovereign-wealth-consortium-cleanpower',
      title: 'Passing the Baton: How the Second-Generation Founders Are Scaling Industrial Legacies...',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'antitrust-compliance-generative-ai',
      title: 'What Is Next-Gen AI Compliance? A Comprehensive C-Suite Playbook...',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'enterprise-edge-computing-cloud-processing',
      title: 'Global Mirror Networks vs Traditional Cloud: Rethinking Sovereign Latency Standards...',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80',
    },
  ],

  // Right Column Widget 2: Print Magazine Feature
  printMagazine: {
    title: 'Executive Print Edition: The Vanguard Leaders Issue',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    link: '/magazine',
  },
};

export default function HomeSuccessStoriesTriSection({ articles }: HomeSuccessStoriesTriSectionProps) {
  const data = SUCCESS_STORIES_DATA;

  return (
    <section className="bg-white py-10 sm:py-14 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* 3-COLUMN MAIN LAYOUT: Left (25%) | Center (50%) | Right (25%) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR (LG: 3 COLS)                                 */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 space-y-8 lg:border-r lg:border-slate-200 lg:pr-6">
            
            {/* WIDGET 1: GUEST POST (Enclosed border box with black header banner) */}
            <div className="border border-slate-200 p-3 sm:p-4 bg-white">
              {/* Solid Black Header Banner */}
              <div className="bg-black text-white text-center py-2 px-3 mb-3">
                <h3 className="font-bold text-sm tracking-wide">
                  Guest Post
                </h3>
              </div>

              {/* 6 Text Links */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {data.guestPosts.map((post, idx) => (
                  <div key={post.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link href={`/article/${post.slug}`} className="block group">
                      <h4 className="text-xs font-semibold text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 block mt-1 font-normal">
                        {post.date}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Bottom Solid Black Button */}
              <div className="pt-4">
                <Link
                  href="/category/guest-posts"
                  className="block w-full py-2 bg-black hover:bg-slate-800 text-white text-center text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  View All Guest Post
                </Link>
              </div>
            </div>

            {/* WIDGET 2: BRAND IMPACT (Enclosed border box with top black line) */}
            <div className="border border-slate-200 p-3 sm:p-4 bg-white">
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  BRAND IMPACT
                </h3>
              </div>

              {/* 5 Thumbnail Items (Thumbnail Left) */}
              <div className="space-y-3.5 mb-4">
                {data.brandImpact.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/article/${item.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-11 object-cover border border-slate-200 shrink-0 group-hover:opacity-90"
                    />
                    <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#DC2626] transition-colors leading-tight line-clamp-2">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>

              {/* Bottom Button */}
              <Link
                href="/category/press-release"
                className="block w-full py-2 bg-black hover:bg-slate-800 text-white text-center text-xs font-bold uppercase tracking-wider transition-colors"
              >
                More from Press Release
              </Link>
            </div>

          </aside>

          {/* ========================================================= */}
          {/* CENTER COLUMN (LG: 6 COLS): 5 WIDE SUCCESS STORIES CARDS  */}
          {/* ========================================================= */}
          <main className="lg:col-span-6">
            
            {/* Section Header */}
            <div className="mb-6 pb-2">
              <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-snug">
                Best Business Magazine in India Success Stories
              </h2>
            </div>

            {/* 5 Stacked Horizontal Editorial Rows (Divider between rows) */}
            <div className="divide-y divide-slate-200">
              {data.centerStories.map((story, idx) => (
                <article
                  key={story.slug}
                  className={`group flex flex-col sm:flex-row gap-4 sm:gap-5 items-start ${idx === 0 ? 'pb-6' : 'py-6'}`}
                >
                  {/* Left: 16:10 Thumbnail with EC Magazine Brand Overlay */}
                  <Link
                    href={`/article/${story.slug}`}
                    className="block aspect-[16/10] w-full sm:w-[48%] shrink-0 overflow-hidden bg-slate-900 border border-slate-200 relative rounded-xs shadow-2xs"
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <MagazineCardOverlay categoryTag="COVER STORY" />
                  </Link>

                  {/* Right: Content */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/article/${story.slug}`}>
                      <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2 uppercase">
                        {story.title}
                      </h3>
                    </Link>

                    {/* Category & Date Meta */}
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold">
                      <Link
                        href="/success-stories"
                        className="text-[#DC2626] uppercase font-bold tracking-wider hover:underline transition-colors"
                        title="View all Success Stories"
                      >
                        {story.category}
                      </Link>
                      <span className="text-slate-400 font-normal">—</span>
                      <span className="text-slate-500 font-normal">
                        {story.date}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 mt-2 font-normal">
                      {story.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

          </main>

          {/* ========================================================= */}
          {/* RIGHT SIDEBAR (LG: 3 COLS)                                */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 space-y-8 lg:border-l lg:border-slate-200 lg:pl-6">
            
            {/* WIDGET 1: PRESS RELEASE (Enclosed or bordered with top black bar) */}
            <div className="border border-slate-200 p-3 sm:p-4 bg-white">
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  PRESS RELEASE
                </h3>
              </div>

              {/* 7 Items with Thumbnail on Right */}
              <div className="space-y-3.5 mb-4 divide-y divide-slate-100">
                {data.pressReleases.map((pr, idx) => (
                  <div key={pr.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link
                      href={`/article/${pr.slug}`}
                      className="flex items-start justify-between gap-3 group"
                    >
                      <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-3 flex-1">
                        {pr.title}
                      </h5>
                      <img
                        src={pr.image}
                        alt={pr.title}
                        className="w-14 h-10 object-cover border border-slate-200 shrink-0 group-hover:opacity-90"
                      />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Bottom Solid Black Button */}
              <Link
                href="/category/press-release"
                className="block w-full py-2 bg-black hover:bg-slate-800 text-white text-center text-xs font-bold uppercase tracking-wider transition-colors"
              >
                More from Press Release
              </Link>
            </div>

            {/* WIDGET 2: E-MAGAZINE PRINT COVER */}
            <div className="border border-slate-200 p-2 bg-white overflow-hidden">
              <Link
                href={data.printMagazine.link}
                className="block group relative overflow-hidden hover:shadow-lg transition-shadow"
                title="Read Full E-Magazine Edition"
              >
                <img
                  src={data.printMagazine.image}
                  alt={data.printMagazine.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <BookOpen className="w-4 h-4 text-[#DC2626]" />
                    <span>Read Full E-Magazine Edition →</span>
                  </div>
                </div>
              </Link>
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}
