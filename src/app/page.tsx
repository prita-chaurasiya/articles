'use client';

import React from 'react';
import { useArticleStore } from '@/store/useArticleStore';

// Section 1: Hero Editorial 4-Column Grid (Fresh Stories, Center Lead, Stacked Spotlight, Best Magazine List)
import EditorialHeroQuad from '@/components/home/EditorialHeroQuad';

// Section 2: Business Magazine Latest News
import BusinessLatestNews from '@/components/home/BusinessLatestNews';

// Section 3: Best Business Magazine in India Success Stories (3-Column Layout: Left Guest Posts + Center Success Stories + Right Press Release)
import HomeSuccessStoriesTriSection from '@/components/home/HomeSuccessStoriesTriSection';

// Section 4: BLOG (4-Column x 2-Row Grid)
import HomeBlogGridSection from '@/components/home/HomeBlogGridSection';

// Section 5: LOUNGE INTERVIEW (9 Interview Cards + Right Sidebar: Launchpad & Latest Edition)
import HomeLoungeInterviewSection from '@/components/home/HomeLoungeInterviewSection';

// Section 6: Category Tri-Strip (TRAVELS | HEALTHCARE | FINANCE)
import HomeCategoryTriStrip from '@/components/home/HomeCategoryTriStrip';

// Section 7: ENTERTAINMENT (Ranked 1 to 8 Cards Grid)
import HomeEntertainmentGrid from '@/components/home/HomeEntertainmentGrid';

// Section 8: Magazine Editions (Interactive Flipbook)
import DigitalMagazineSpotlight from '@/components/home/DigitalMagazineSpotlight';

// Section 9: Awards & Recognitions
import AwardsSection from '@/components/home/AwardsSection';

// Section 10: Popular Articles & Most Read
import PopularAndMostRead from '@/components/home/PopularAndMostRead';

// Section 11: Newsletter
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  const { articles } = useArticleStore();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Hero Editorial Section (4-Column Layout: Fresh Stories | Center Lead | Stacked Spotlight | Best Magazine) */}
      <EditorialHeroQuad articles={articles} />

      {/* 2. Business Magazine Latest News (4-Column x 2-Row Dark Grid) */}
      <BusinessLatestNews articles={articles} />

      {/* 3. Best Business Magazine in India Success Stories (3-Column Layout: Left Guest Posts + Center Success Stories + Right Press Release) */}
      <HomeSuccessStoriesTriSection articles={articles} />

      {/* 4. BLOG Section (4-Column x 2-Row Grid) */}
      <HomeBlogGridSection articles={articles} />

      {/* 5. LOUNGE INTERVIEW (9 Interview Cards + Right Sidebar: Launchpad & Latest Edition) */}
      <HomeLoungeInterviewSection articles={articles} />

      {/* 6. Category Tri-Strip (TRAVELS | HEALTHCARE | FINANCE) */}
      <HomeCategoryTriStrip articles={articles} />

      {/* 7. ENTERTAINMENT (Ranked 1 to 8 Cards Grid) */}
      <HomeEntertainmentGrid articles={articles} />

      {/* 8. Magazine Editions (Interactive Digital Flipbook Reader) */}
      <DigitalMagazineSpotlight />

      {/* 9. Awards & Recognitions */}
      <AwardsSection />

      {/* 10. Popular Articles & Most Read Leaderboard */}
      <PopularAndMostRead articles={articles} />

      {/* 11. Newsletter CTA */}
      <NewsletterSection />
    </div>
  );
}
