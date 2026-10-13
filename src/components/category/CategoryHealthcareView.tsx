'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, X, Sparkles } from 'lucide-react';

export const HEALTHCARE_ARTICLES_DATA = [
  {
    id: 'health-1',
    slug: 'preventive-trichology-follicle-wellness-therapies-leaders',
    title: 'Top 6 Preventive Hair & Scalp Wellness Formulations for Healthy, Flake-Free Vitality',
    date: 'September 10, 2026',
    category: 'HEALTHCARE',
    badge: 'BigNews!',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    brief: 'Clinical dermatologists reveal advanced topical botanical actives and micronutrient therapies to counteract executive stress-induced hair thinning and persistent scalp inflammation.',
    excerpt: 'Persistent flakes and scalp sensitivity are frequently accelerated by prolonged corporate cortisol surges and poor environmental air quality. Modern dermatological formulations now target the follicular microbiome...',
  },
  {
    id: 'health-2',
    slug: 'digital-pharmacy-logistics-discounts-regulatory-standards',
    title: 'Which Online Pharmacy Networks Deliver Verified Medicine Quality and Safe Logistics in India?',
    date: 'September 3, 2026',
    category: 'HEALTHCARE',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    brief: 'An investigative evaluation of licensed digital pharmacy platforms, comparing cold-chain integrity, statutory prescription validation, and legitimate consumer pricing discounts.',
    excerpt: 'Procuring maintenance medications through certified digital pharmacies has transitioned into an essential consumer habit. However, verifying statutory batch certifications and temperature-controlled storage remains vital...',
  },
  {
    id: 'health-3',
    slug: 'laser-refractive-eye-surgery-clinical-safety-precision',
    title: 'How Safe Is Modern Wavefront Laser Surgery for Permanent Vision Correction?',
    date: 'May 28, 2026',
    category: 'HEALTHCARE',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    brief: 'Ophthalmic surgeons assess femtosecond corneal procedures, addressing long-term visual stability, flapless procedures, and candidate eligibility for high-screen-time professionals.',
    excerpt: 'Imagine waking up with razor-sharp 20/20 vision without reaching for prescription lenses or dealing with digital eye strain. Modern refractive surgical suites utilize topography-guided lasers with sub-micron accuracy...',
  },
  {
    id: 'health-4',
    slug: 'healthcare-economics-catastrophic-medical-costs-insurance',
    title: 'Why Healthcare Inflation Threatens Middle-Class Wealth: The Critical Need for Comprehensive Medical Cover',
    date: 'May 19, 2026',
    category: 'HEALTHCARE',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    brief: 'A healthcare economic briefing examining hospital fee trajectories, surgical room rate caps, and the necessity of high-sum super top-up policies against sudden medical debt.',
    excerpt: 'A sudden tertiary hospitalization can erode decades of household capital in a matter of days. As advanced oncology and robotic surgical treatments command premium fees, structured health protection is no longer optional...',
  },
  {
    id: 'health-5',
    slug: 'micronutrient-bioavailability-testosterone-cellular-vitality',
    title: 'Can Targeted Micronutrients & Adaptogens Elevate Metabolic Vitality in High-Stress Executives?',
    date: 'March 27, 2026',
    category: 'HEALTHCARE',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=80',
    brief: 'Endocrinology specialists dissect the physiological impact of zinc chelate, magnesium glycinate, and bioavailable Vitamin D3 on hormonal balance and sustained cognitive endurance.',
    excerpt: 'Yes — but only under verified clinical conditions and audited blood markers. Micronutrient cofactors support hypothalamic signaling, but lifestyle foundations including deep REM sleep remain the true cornerstones of metabolic health...',
  },
  {
    id: 'health-6',
    slug: 'critical-mistakes-to-avoid-buying-online-pharmaceuticals',
    title: 'Top Mistakes To Avoid When Purchasing Critical Medications from E-Commerce Portals',
    date: 'January 30, 2026',
    category: 'HEALTHCARE',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80',
    brief: 'A consumer health advisory outlining red flags in unverified online sellers, expired chemical salts, and missing pharmacovigilance documentation.',
    excerpt: 'Ordering pharmaceuticals through third-party aggregators has become immensely popular, yet thousands of consumers unknowingly bypass batch verification, risking degraded active pharmaceutical ingredients...',
  },
  {
    id: 'health-7',
    slug: 'ergonomic-spine-biomechanics-non-invasive-physiotherapy',
    title: 'STRONGER THAN SURGERY: Non-Invasive Regenerative Protocols for Modern Cervical & Lumbar Spine Health',
    date: 'January 15, 2026',
    category: 'HEALTHCARE',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
    brief: 'Spine rehabilitation specialists explore automated spinal decompression, core postural stabilization, and targeted physical therapy as first-line alternatives to invasive fusion surgeries.',
    excerpt: 'Sedentary desk lifestyles have created an epidemic of lumbar disc compression and chronic cervical strain. Clinical spine centers are now demonstrating that over 85% of cases can resolve without open surgery...',
  },
  {
    id: 'health-8',
    slug: 'reproductive-endocrinology-fertility-preservation-milestones',
    title: 'Modern Reproductive Science: Advances in Fertility Preservation, IVF Genomics & Family Planning',
    date: 'January 5, 2026',
    category: 'HEALTHCARE',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    brief: 'Next-generation embryology laboratories integrate artificial intelligence embryonic grading with pre-implantation genetic testing to maximize clinical live-birth ratios.',
    excerpt: 'Couples navigating delayed parenthood have access to unprecedented clinical breakthroughs. From vitrification protocols to non-invasive genetic screening, modern reproductive medicine is rewriting patient outcomes...',
  },
];

export const HEALTHCARE_STARTUPS_SIDEBAR = {
  featured: {
    slug: 'biopharma-oncology-monoclonal-antibody-manufacturing-facility',
    title: 'AuraBiotech: $240M Sterile Monoclonal Antibody Facility Commissioned for Oncology',
    categoryTag: 'BIOPHARMA WIRE',
    date: 'October 10, 2026',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Receiving dual US FDA and EU GMP validations, this advanced biomanufacturing facility scales domestic formulation of targeted immunotherapies...',
  },
  list: [
    {
      slug: 'preventive-trichology-follicle-wellness-therapies-leaders',
      title: 'DermalMicrobiome Labs: Clinical Trichology Formulations for Executive Stress',
      date: 'September 26, 2026',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'wearable-biometric-continuous-glucose-metabolic-ring',
      title: 'NanoBiosense: Non-Invasive Hemodynamic Optical Sensors for Preventive Wellness',
      date: 'September 15, 2026',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&auto=format&fit=crop&q=80',
    },
    {
      slug: 'digital-pharmacy-logistics-discounts-regulatory-standards',
      title: 'ColdChain MedExpress: Sovereign Temperature-Monitored Vaccine Distribution',
      date: 'August 30, 2026',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const HEALTHCARE_RECENT_POSTS = [
  {
    slug: 'preventive-trichology-follicle-wellness-therapies-leaders',
    title: 'Top 6 Preventive Hair & Scalp Wellness Formulations for Healthy, Flake-Free Vitality',
    date: 'September 10, 2026',
  },
  {
    slug: 'digital-pharmacy-logistics-discounts-regulatory-standards',
    title: 'Which Online Pharmacy Networks Deliver Verified Medicine Quality and Safe Logistics in India?',
    date: 'September 3, 2026',
  },
  {
    slug: 'biopharma-oncology-monoclonal-antibody-manufacturing-facility',
    title: 'Pan-Asian Biopharma Giant Inaugurates $240M Monoclonal Antibody Production Facility',
    date: 'September 18, 2026',
  },
  {
    slug: 'wearable-biometric-continuous-glucose-metabolic-ring',
    title: 'Non-Invasive Metabolic Health Tracking: Next-Gen Smart Titanium Ring Debuts Optical Biosensing',
    date: 'October 2, 2026',
  },
];

export default function CategoryHealthcareView() {
  const [activePage, setActivePage] = useState<number>(1);
  const [briefModalArticle, setBriefModalArticle] = useState<typeof HEALTHCARE_ARTICLES_DATA[0] | null>(null);

  return (
    <div className="min-h-screen bg-white">
      
      {/* ========================================================= */}
      {/* MAIN CONTAINER: Left (8 Cols) | Right Sidebar (4 Cols)    */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Section Heading: BROWSING: HEALTHCARE (with Left Red Vertical Accent Bar) */}
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-200">
          <span className="w-1.5 h-6 bg-[#DC2626] inline-block" />
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight font-sans">
            BROWSING: HEALTHCARE
          </h1>
        </div>

        {/* Intro Paragraph directly under title (Matches Reference Screenshot) */}
        <div className="mb-8 max-w-4xl">
          <p className="text-slate-700 text-sm sm:text-[14.5px] leading-relaxed font-normal">
            This exclusive edition will shine a spotlight on the healthcare sector in India, covering topics such as medical technology advancements, healthcare infrastructure, innovative healthcare solutions, and the impact of digital transformation in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN (LG: 8 COLS): 2-COLUMN HEALTHCARE GRID      */}
          {/* ======================================================= */}
          <main className="lg:col-span-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {HEALTHCARE_ARTICLES_DATA.map((article) => (
                <article key={article.id} className="group flex flex-col justify-between">
                  <div>
                    {/* 16:9 Thumbnail with BigNews! Badge */}
                    <Link href={`/article/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100 border border-slate-200 mb-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {article.badge && (
                        <span className="absolute top-2 right-2 bg-black/85 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 tracking-wider uppercase shadow-md border border-amber-400/30">
                          {article.badge}
                        </span>
                      )}
                    </Link>

                    {/* Article Headline (Clickable) */}
                    <Link href={`/article/${article.slug}`}>
                      <h3 className="font-bold text-sm sm:text-[15px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-3">
                        {article.title}
                      </h3>
                    </Link>

                    {/* Meta: HEALTHCARE — [Date] in Signature Red */}
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold">
                      <Link
                        href="/category/healthcare"
                        className="text-[#DC2626] uppercase font-bold tracking-wider hover:underline transition-colors"
                        title="View all Healthcare dispatches"
                      >
                        {article.category}
                      </Link>
                      <span className="text-slate-400 font-normal">—</span>
                      <span className="text-slate-500 font-normal">
                        {article.date}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 mt-2 font-normal">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Interactive Quick Brief + Full Article Links */}
                  <div className="mt-3.5 pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => setBriefModalArticle(article)}
                      className="text-[11px] font-bold text-[#DC2626] hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Quick Executive Brief →</span>
                    </button>

                    <Link
                      href={`/article/${article.slug}`}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Full Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* ===================================================== */}
            {/* RESPONSIVE PAGINATION (Matches Reference Screenshot)  */}
            {/* ===================================================== */}
            <div className="mt-10 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                {/* Page Buttons List */}
                <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                  {/* Prev Button (<) */}
                  <button
                    onClick={() => {
                      if (activePage > 1) {
                        setActivePage((p) => p - 1);
                        window.scrollTo({ top: 200, behavior: 'smooth' });
                      }
                    }}
                    disabled={activePage === 1}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      activePage === 1
                        ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                        : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                    aria-label="Previous page"
                  >
                    &lt;
                  </button>

                  {/* Page 1 */}
                  <button
                    onClick={() => {
                      setActivePage(1);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 1
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    1
                  </button>

                  {/* Page 2 */}
                  <button
                    onClick={() => {
                      setActivePage(2);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 2
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    2
                  </button>

                  {/* Page 3 */}
                  <button
                    onClick={() => {
                      setActivePage(3);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 3
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    3
                  </button>

                  {/* Ellipsis (...) */}
                  <span className="px-1 text-slate-400 text-xs select-none">
                    …
                  </span>

                  {/* Last Page (142) */}
                  <button
                    onClick={() => {
                      setActivePage(142);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`min-w-[36px] h-8 sm:min-w-[42px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all ${
                      activePage === 142
                        ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                        : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    142
                  </button>

                  {/* Next Button (>) */}
                  <button
                    onClick={() => {
                      if (activePage < 142) {
                        setActivePage((p) => p + 1);
                        window.scrollTo({ top: 200, behavior: 'smooth' });
                      }
                    }}
                    disabled={activePage === 142}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      activePage === 142
                        ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                        : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-300'
                    }`}
                    aria-label="Next page"
                  >
                    &gt;
                  </button>
                </div>

                {/* Status Text */}
                <div className="text-[11.5px] text-slate-500 font-medium">
                  Page <strong className="text-slate-800 font-bold">{activePage}</strong> of <strong className="text-slate-800 font-bold">142</strong>
                </div>

              </div>
            </div>

          </main>

          {/* ======================================================= */}
          {/* RIGHT SIDEBAR (LG: 4 COLS): STARTUP'S | RECENT | COVER  */}
          {/* ======================================================= */}
          <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-slate-200 lg:pl-7">
            
            {/* WIDGET 1: STARTUP'S */}
            <div className="border border-slate-200 p-4 bg-white">
              {/* Header with Top Black Line */}
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  STARTUP&apos;S
                </h3>
              </div>

              {/* Featured Lead Item */}
              <article className="group mb-5 pb-5 border-b border-slate-200">
                <Link
                  href={`/article/${HEALTHCARE_STARTUPS_SIDEBAR.featured.slug}`}
                  className="block aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200 mb-3"
                >
                  <img
                    src={HEALTHCARE_STARTUPS_SIDEBAR.featured.image}
                    alt={HEALTHCARE_STARTUPS_SIDEBAR.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link href={`/article/${HEALTHCARE_STARTUPS_SIDEBAR.featured.slug}`}>
                  <h4 className="font-bold text-sm sm:text-[14.5px] leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 break-words">
                    {HEALTHCARE_STARTUPS_SIDEBAR.featured.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold flex-wrap">
                  <Link
                    href="/category/lounge-interview"
                    className="text-[#DC2626] uppercase font-bold tracking-wider text-[11px] hover:underline transition-colors"
                    title="View all Lounge Interviews"
                  >
                    {HEALTHCARE_STARTUPS_SIDEBAR.featured.categoryTag}
                  </Link>
                  <span className="text-slate-400 font-normal">—</span>
                  <span className="text-slate-500 font-normal text-[11px]">
                    {HEALTHCARE_STARTUPS_SIDEBAR.featured.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal break-words">
                  {HEALTHCARE_STARTUPS_SIDEBAR.featured.excerpt}
                </p>
              </article>

              {/* 3 Compact List Items (Thumbnail Left, Title Right) */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {HEALTHCARE_STARTUPS_SIDEBAR.list.map((item, idx) => (
                  <div key={item.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link
                      href={`/article/${item.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-12 object-cover border border-slate-200 shrink-0 group-hover:opacity-90"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2 break-words">
                          {item.title}
                        </h5>
                        <span className="text-[10.5px] text-slate-400 block mt-1 font-normal">
                          {item.date}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 2: RECENT POSTS */}
            <div className="border border-slate-200 p-4 bg-white">
              {/* Header with Top Black Line */}
              <div className="border-t-2 border-black pt-2 mb-4">
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight">
                  RECENT POSTS
                </h3>
              </div>

              {/* List of text items with dates */}
              <div className="space-y-3.5 divide-y divide-slate-100">
                {HEALTHCARE_RECENT_POSTS.map((post, idx) => (
                  <div key={post.slug} className={idx === 0 ? 'pt-0' : 'pt-3'}>
                    <Link href={`/article/${post.slug}`} className="block group">
                      <h5 className="font-bold text-xs leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 sm:line-clamp-3 break-words">
                        {post.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 font-normal block mt-1">
                        {post.date}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 3: PRINT MAGAZINE COVER */}
            <div className="border border-slate-200 p-2.5 bg-white overflow-hidden">
              <Link
                href="/magazine"
                className="block group relative overflow-hidden hover:shadow-lg transition-shadow"
                title="Read Full E-Magazine Edition"
              >
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
                  alt="Business Walkins Print Edition"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <BookOpen className="w-4 h-4 text-[#DC2626]" />
                    <span>View Print Magazine Issue →</span>
                  </div>
                </div>
              </Link>
            </div>

          </aside>

        </div>

      </div>

      {/* ========================================================= */}
      {/* QUICK BRIEF MODAL (Interactive On Click)                  */}
      {/* ========================================================= */}
      {briefModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-sm shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Executive Brief
                </h4>
              </div>
              <button
                onClick={() => setBriefModalArticle(null)}
                className="text-slate-400 hover:text-white p-1 transition-colors"
                aria-label="Close brief"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-3.5">
              <span className="text-[10.5px] font-bold text-[#DC2626] uppercase tracking-wider">
                {briefModalArticle.category} — {briefModalArticle.date}
              </span>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {briefModalArticle.title}
              </h3>

              <div className="p-3.5 bg-slate-50 border-l-4 border-[#DC2626] text-xs text-slate-700 leading-relaxed font-medium">
                {briefModalArticle.brief}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {briefModalArticle.excerpt}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setBriefModalArticle(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>

              <Link
                href={`/article/${briefModalArticle.slug}`}
                className="px-4 py-2 bg-black hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                Read Full Story →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
