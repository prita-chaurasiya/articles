'use client';

import React from 'react';
import { useArticleStore } from '@/store/useArticleStore';

// Section 1: Hero Editorial Tri-Column (Left 25%, Center 45%, Right 30%)
import EditorialShowcaseGrid from '@/components/home/EditorialShowcaseGrid';

// Section 2: Business Magazine Latest News
import BusinessLatestNews from '@/components/home/BusinessLatestNews';

// Section 3: Featured Companies
import FeaturedCompaniesStrip from '@/components/home/FeaturedCompaniesStrip';

// Section 4: Success Stories
import SuccessStoriesShowcase from '@/components/home/SuccessStoriesShowcase';

// Section 5 - 11, 13, 14: Category Beats
import EditorialCategorySection from '@/components/home/EditorialCategorySection';

// Section 12: Interviews (CXO & Lounge Dialogues)
import CXOInterviewSpotlight from '@/components/home/CXOInterviewSpotlight';

// Section 15: Magazine Editions
import DigitalMagazineSpotlight from '@/components/home/DigitalMagazineSpotlight';

// Section 16: Awards
import AwardsSection from '@/components/home/AwardsSection';

// Section 17: Events
import UpcomingEventsStrip from '@/components/home/UpcomingEventsStrip';

// Section 18 & 19: Popular Articles & Most Read
import PopularAndMostRead from '@/components/home/PopularAndMostRead';

// Section 20: Newsletter
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  const { articles } = useArticleStore();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Hero Editorial Section (Row 1: Left 25%, Center 45%, Right 30%) */}
      <EditorialShowcaseGrid articles={articles} />

      {/* 2. Business Magazine Latest News */}
      <BusinessLatestNews articles={articles} />

      {/* 3. Featured Companies */}
      <FeaturedCompaniesStrip articles={articles} />

      {/* 4. Success Stories */}
      <SuccessStoriesShowcase articles={articles} />

      {/* 5. Technology */}
      <EditorialCategorySection
        title="Technology"
        subtitle="Deep semiconductor physics, enterprise architectures & cloud infrastructures"
        categorySlug="technology"
        articles={articles}
        variant="featured-split"
      />

      {/* 6. AI */}
      <EditorialCategorySection
        title="AI & Automation"
        subtitle="Autonomous agent swarms, foundation models & cognitive enterprise workflows"
        categorySlug="ai"
        articles={articles}
        variant="grid-3"
      />

      {/* 7. Business */}
      <EditorialCategorySection
        title="Business"
        subtitle="Corporate strategy, antitrust litigation, governance & international trade"
        categorySlug="business"
        articles={articles}
        variant="horizontal-stack"
      />

      {/* 8. Finance */}
      <EditorialCategorySection
        title="Finance & Capital"
        subtitle="Sovereign wealth funds, private equity, debt liquidity & fintech infrastructure"
        categorySlug="finance"
        articles={articles}
        variant="featured-split"
      />

      {/* 9. Healthcare */}
      <EditorialCategorySection
        title="Healthcare & Biotech"
        subtitle="Generative oncology binders, precision medicine & life sciences innovation"
        categorySlug="healthcare"
        articles={articles}
        variant="grid-3"
      />

      {/* 10. Leadership */}
      <EditorialCategorySection
        title="Leadership"
        subtitle="C-Suite strategy, boardroom dynamics, talent density & executive culture"
        categorySlug="leadership"
        articles={articles}
        variant="horizontal-stack"
      />

      {/* 11. Startups */}
      <EditorialCategorySection
        title="Startups & Venture"
        subtitle="High-velocity scaleups, venture capital syndicates & unicorn milestones"
        categorySlug="startups"
        articles={articles}
        variant="grid-3"
      />

      {/* 12. Interviews (Lounge / CXO Dialogues) */}
      <CXOInterviewSpotlight articles={articles} />

      {/* 13. Guest Posts */}
      <EditorialCategorySection
        title="Guest Posts & Opinions"
        subtitle="Perspectives from university deans, economists, and managing directors"
        categorySlug="blog"
        articles={articles}
        variant="grid-4"
      />

      {/* 14. Press Releases */}
      <EditorialCategorySection
        title="Corporate Press Releases"
        subtitle="Official enterprise disclosures, regulatory filings & strategic partnerships"
        categorySlug="business"
        articles={articles}
        variant="horizontal-stack"
      />

      {/* 15. Magazine Editions */}
      <DigitalMagazineSpotlight />

      {/* 16. Awards */}
      <AwardsSection />

      {/* 17. Events */}
      <UpcomingEventsStrip />

      {/* 18 & 19. Popular Articles & Most Read */}
      <PopularAndMostRead articles={articles} />

      {/* 20. Newsletter CTA */}
      <NewsletterSection />
    </div>
  );
}
