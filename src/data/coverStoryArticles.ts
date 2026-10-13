import { Article } from '@/types';
import { ALL_BESPOKE_ARTICLES } from './bespokeArticlesData';

export const DUMMY_COVER_STORIES_P1 = [
  {
    id: 'cs-dummy-1',
    slug: 'aura-horizon-enterprises-infrastructure-intelligence',
    title: 'AURA HORIZON ENTERPRISES: ADVANCING GLOBAL INFRASTRUCTURE & SMART LIVING',
    category: 'COVER STORY',
    date: 'July 21, 2026',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Aura Horizon Enterprises: Building the Next Generation of Sustainable Urban Wealth Through Land Intelligence and Smart Infrastructure-Led Growth. Precision development meeting modern capital...',
  },
  {
    id: 'cs-dummy-2',
    slug: 'vanguard-global-academy-education-future',
    title: 'Vanguard Global Academy Beyond the Classroom: Education’s Answer to an Uncertain Future',
    category: 'COVER STORY',
    date: 'July 21, 2026',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    excerpt: 'As artificial intelligence reshapes industries and traditional career paths continue to evolve, the question facing modern educators is no longer what to teach, but how to teach intellectual agility...',
  },
  {
    id: 'cs-dummy-3',
    slug: 'zenith-life-sciences-healthcare-compliance',
    title: 'Zenith Life Sciences Corp : Dr. Julian Sterling – Founder & Managing Director',
    category: 'COVER STORY',
    date: 'July 14, 2026',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Zenith Life Sciences: A Global Partner for Quality, Compliance, and Healthcare Innovation Beyond its impact on clinical outcomes and patient wellbeing across multiple regulatory zones...',
  },
  {
    id: 'cs-dummy-4',
    slug: 'aqua-nova-sustainable-hydration-retail',
    title: 'BOTTLING THE FUTURE: HOW AQUA NOVA IS TRANSFORMING SUSTAINABLE HYDRATION NETWORKS',
    category: 'COVER STORY',
    date: 'July 9, 2026',
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    excerpt: 'How One Entrepreneurial Vision Is Transforming Water from a Commodity into a Powerful Brand Experience. Once considered basic sustenance, clean hydration is now an organized retail vertical...',
  },
  {
    id: 'cs-dummy-5',
    slug: 'nordic-early-learning-pedagogy',
    title: 'Nordic Early Learning: Reimagining Foundational Education for Next-Gen Leaders',
    category: 'COVER STORY',
    date: 'June 18, 2026',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    excerpt: 'In early childhood education, forward-looking institutions are merging cognitive play-based research with global pedagogical excellence to cultivate joyful and resilient minds...',
  },
  {
    id: 'cs-dummy-6',
    slug: 'genomix-research-diagnostics-ecosystem',
    title: 'Genomix Research: Building the First Organized Clinical Diagnostic Ecosystem',
    category: 'COVER STORY',
    date: 'June 16, 2026',
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Precision diagnostics and molecular pathology are expanding rapidly across emerging biotech frontiers, redefining preventive healthcare and patient prognosis worldwide...',
  },
  {
    id: 'cs-dummy-7',
    slug: 'apex-design-studios-workspace-architecture',
    title: 'Apex Design Studios: The Modern Workspace as Your Most Powerful Business Asset',
    category: 'COVER STORY',
    date: 'June 9, 2026',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    excerpt: 'The office is no longer an operational cost center. Leading spatial designers are creating collaborative environments built for deep focus, team cohesion, and innovation...',
  },
  {
    id: 'cs-dummy-8',
    slug: 'lex-innovatio-safeguarding-intellectual-property',
    title: 'Lex Innovatio: Redefining How Intellectual Property & Enterprise Patents Are Safeguarded',
    category: 'COVER STORY',
    date: 'May 30, 2026',
    heroImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    excerpt: 'In an era defined by artificial intelligence and rapid technological disruption, scientific breakthroughs and commercial trademarks demand rigorous sovereign legal protection...',
  },
  {
    id: 'cs-dummy-9',
    slug: 'artisan-living-interiors-crafting-sanctuaries',
    title: 'The Architects of Soul & Space: Engineering Contemporary Luxury Interiors',
    category: 'COVER STORY',
    date: 'May 28, 2026',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Modern residential and commercial architecture transforms physical structures into soulful spaces of human harmony, tactile authenticity, and enduring aesthetic balance...',
  },
  {
    id: 'cs-dummy-10',
    slug: 'ecoventure-holdings-sustainable-rural-regeneration',
    title: 'ECOVENTURE HOLDINGS: Transforming Corporate Success Into Sustainable Rural Regeneration',
    category: 'COVER STORY',
    date: 'May 26, 2026',
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    excerpt: 'We often read about leaders who build companies, but rare are the visionaries who cultivate long-term self-sustaining community ecosystems and grass-roots prosperity...',
  },
];

export const DUMMY_COVER_STORIES_P2 = [
  {
    id: 'cs-dummy-11',
    slug: 'solaris-energy-grid-decarbonization',
    title: 'Solaris Grid Systems: Engineering the Zero-Loss Clean Energy Superhighway',
    category: 'COVER STORY',
    date: 'May 18, 2026',
    heroImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Next-generation solid-state battery topologies combined with high-voltage direct current grid interconnects are ushering in 24/7 renewable baseload reliability...',
  },
  {
    id: 'cs-dummy-12',
    slug: 'quantum-core-robotics-precision-cleanrooms',
    title: 'Quantum Core Systems: The Advanced Robotics Pioneer Powering 2nm Semiconductor Cleanrooms',
    category: 'COVER STORY',
    date: 'May 04, 2026',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    excerpt: 'High-vacuum magnetic levitation wafer manipulators and sub-micron automated materials handling are ensuring unprecedented yield efficiency for next-gen silicon...',
  },
  {
    id: 'cs-dummy-13',
    slug: 'helios-logistics-autonomous-maritime-freight',
    title: 'Helios Ocean Logistics: Autonomous Navigational Intelligence for Global Container Shipping',
    category: 'COVER STORY',
    date: 'April 22, 2026',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Satellite route optimization, automated bunker consumption modeling, and port terminal synchronization reduce global maritime emissions while speeding delivery cycles...',
  },
  {
    id: 'cs-dummy-14',
    slug: 'biogen-therapeutics-synthetic-biology-frontiers',
    title: 'BioGen Therapeutics: Accelerating Protein Design With Generative Molecular Computing',
    category: 'COVER STORY',
    date: 'April 10, 2026',
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Translating genomic sequencing into targeted therapeutic candidates in weeks rather than decades is revitalizing rare oncology and autoimmune treatment pipelines...',
  },
];

export const DUMMY_SIDEBAR_DATA = {
  startupLead: {
    slug: 'nextgen-fintech-trading-intelligence',
    title: 'NextGen FinTech: Empowering Modern Retail Investors with AI Trading Intelligence',
    category: 'LOUNGE INTERVIEW',
    date: 'September 20, 2025',
    heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    excerpt: 'The fast-changing nature of financial markets creates challenges for retail investors navigating macroeconomic turbulence with automated risk intelligence...',
  },
  startupList: [
    {
      slug: 'culinary-heritage-group-global-expansion',
      title: 'Culinary Heritage Group: Scaling Authentic Cuisine Globally',
      date: 'May 12, 2025',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=80',
    },
    {
      slug: 'quantum-smartlabz-stem-education',
      title: 'Quantum Smartlabz: Transforming Hands-on STEM Education',
      date: 'June 24, 2021',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80',
    },
    {
      slug: 'premier-urban-stores-neighbourhood-retail',
      title: 'Premier Urban Stores: Modern Neighbourhood Commerce',
      date: 'May 29, 2019',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop&q=80',
    },
  ],
  recentPosts: [
    {
      slug: 'landmark-enterprise-communique-strategic-merger',
      title: 'A Landmark Communique: Strategic Enterprise Software Merger Completed',
      date: 'October 12, 2026',
    },
    {
      slug: 'global-equity-markets-corporate-action-focus',
      title: 'Equity Markets in Focus: Key Corporate Dividends and Rights Issues Headline the Week',
      date: 'October 12, 2026',
    },
    {
      slug: 'benchmark-indices-market-wrap-crude-moderation',
      title: 'Benchmark Indices Today: Markets Trade Firm on Softer Crude Oil and Strong Bond Yields',
      date: 'October 12, 2026',
    },
    {
      slug: 'sectoral-rotation-tech-banking-rally',
      title: 'Sectoral Rotation Trends: Financial Heavyweights Lead Broad Index Recovery',
      date: 'October 12, 2026',
    },
    {
      slug: 'high-growth-teams-playbook-for-the-ai-era',
      title: 'High-Efficiency Teams: The Strategic Leadership Playbook for the Next Industrial Era',
      date: 'October 9, 2026',
    },
  ],
  magazineCover: {
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    title: 'Business Walkins Executive Print Issue',
  },
};

export function getCoverStoryOrSidebarArticle(slug: string): Article | null {
  const allDummy = [
    ...DUMMY_COVER_STORIES_P1,
    ...DUMMY_COVER_STORIES_P2,
    DUMMY_SIDEBAR_DATA.startupLead,
    ...DUMMY_SIDEBAR_DATA.startupList.map((item) => ({
      id: item.slug,
      slug: item.slug,
      title: item.title,
      category: 'STARTUP DISPATCH',
      date: item.date,
      heroImage: item.image,
      excerpt: `${item.title}. In-depth executive feature on strategic growth and industry leadership.`,
    })),
    ...DUMMY_SIDEBAR_DATA.recentPosts.map((item) => ({
      id: item.slug,
      slug: item.slug,
      title: item.title,
      category: 'NEWS WIRE',
      date: item.date,
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      excerpt: `${item.title}. Real-time business reporting, market dispatches, and corporate disclosures.`,
    })),
    // 4-Column Hero New Articles
    {
      id: 'valiant-global-partners',
      slug: 'valiant-global-partners-autonomous-venture-strategy',
      title: 'VALIANT GLOBAL PARTNERS: PIONEERING AUTONOMOUS VENTURE STRATEGY & STRATEGIC ADVISORY',
      category: 'FRESH STORIES',
      date: 'October 12, 2026',
      heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Valiant Global Partners: Redefining Cross-Border Enterprise Scaling through Machine Intelligence and Sovereign Capital Orchestration across emerging financial corridors...',
    },
    {
      id: 'nexus-advanced-dynamics',
      slug: 'nexus-advanced-dynamics-zero-latency-intelligence',
      title: 'NEXUS ADVANCED DYNAMICS: A FULL-SCALE ENTERPRISE ARCHITECTURE BUILT ON TRUST, RESILIENCE, AND AUTONOMOUS EXECUTION',
      category: 'COVER STORY',
      date: 'October 10, 2026',
      heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
      excerpt: 'Nexus Advanced Dynamics was Founded in 2022, with the vision and mission to deliver enterprise software solutions to its global clientele that are effective, resilient, and commercially unassailable across regulatory domains...',
    },
    {
      id: 'aura-cognitive-labs',
      slug: 'aura-cognitive-labs-decentralized-ai-agents',
      title: 'AURA COGNITIVE LABS Intelligence Personified: Engineering Enterprise Growth Through Autonomous Agent Swarms',
      category: 'LOUNGE INTERVIEW',
      date: 'September 5, 2026',
      heroImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
      excerpt: 'In 2021, while global tech conglomerates were consolidating legacy ERP workflows, Aura Cognitive pioneered self-orchestrating agent fabrics...',
    },
    {
      id: 'vanguard-capital-solutions',
      slug: 'vanguard-capital-solutions-sovereign-infrastructure',
      title: 'Vanguard Capital Solutions Limited: Building the Future of Sustainable Sovereign Infrastructure',
      category: 'LOUNGE INTERVIEW',
      date: 'August 31, 2026',
      heroImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Few institutional finance powerhouses manage to blend stringent environmental governance with accelerated multi-billion dollar capital deployment...',
    },
    {
      id: 'garage-prototype-to-40-billion',
      slug: 'garage-prototype-to-40-billion-cloud-empire',
      title: 'From poverty to a billionaire; Inspiring Story of WhatsApp Co-Founder Jan Koum',
      category: 'BLOG',
      date: 'November 1, 2021',
      heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      excerpt: 'The transformative journey from economic hardship to founding one of the world\'s most ubiquitous real-time messaging networks...',
    },
    {
      id: 'quantum-physicist-clean-lithium',
      slug: 'quantum-physicist-revolutionizing-clean-lithium-extraction',
      title: 'Meet Indian Origin & Youngest Prime Minister of Britain- Rishi Sunak',
      category: 'SUCCESS STORIES',
      date: 'October 28, 2022',
      heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      excerpt: 'An insightful retrospective on leadership, political governance, and economic statecraft during pivotal macroeconomic shifts...',
    },
    {
      id: 'strategic-mindset-evelyn-vance',
      slug: 'strategic-mindset-evelyn-vance-green-hydrogen',
      title: 'Untold Story of Vineeta Singh: Rejected One Crore Job Offer',
      category: 'SUCCESS STORIES',
      date: 'February 17, 2024',
      heroImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Why choosing visionary founder equity over executive security laid the foundation for an iconic direct-to-consumer beauty powerhouse...',
    },
    {
      id: 'lessons-in-visionary-tenacity',
      slug: 'lessons-in-visionary-tenacity-apex-horizon',
      title: 'Life Lessons from Muniba Mazari Story: Embrace Gratitude After Adversity',
      category: 'SUCCESS STORIES',
      date: 'September 23, 2024',
      heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Turning physical trials into profound human empathy and universal artistic resonance on global humanitarian platforms...',
    },
    // Business Magazine Latest News Grid (8 items)
    {
      id: 'bln-1',
      slug: 'kinetic-aero-ventures-hybrid-propulsion',
      title: 'Kinetic Aero Ventures Opc Pvt. Ltd. : A visionary enterprise scaling ripples across aerospace...',
      category: 'BUSINESS NEWS',
      date: 'August 4, 2026',
      heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
      excerpt: 'The field of aerospace mobility is diverse and competitive. Here, the role of hybrid propulsion architectures is transforming regional flight benchmarks...',
    },
    {
      id: 'bln-2',
      slug: 'from-research-labs-to-unicorns-deeptech-founders',
      title: 'From Research to Founders: The Incredible Stories Behind DeepTech Unicorn Breakthroughs...',
      category: 'BUSINESS NEWS',
      date: 'August 4, 2026',
      heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      excerpt: 'From scientific laboratory discoveries to billion-dollar platforms, these visionary founders prove how perseverance translates into enterprise dominance...',
    },
    {
      id: 'bln-3',
      slug: 'ascent-autonomous-logistics-synapse-ai',
      title: 'The Rise of the Autonomous Enterprise: How Synapse AI Is Redefining Decision Intelligence...',
      category: 'BUSINESS NEWS',
      date: 'July 29, 2026',
      heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Artificial intelligence has entered a new phase. The conversation has moved beyond automating repetitive tasks into full multi-agent orchestration...',
    },
    {
      id: 'bln-4',
      slug: 'terra-verde-infrastructure-green-smart-cities',
      title: 'TERRA VERDE PROPERTIES AND INFRASTRUCTURE PRIVATE LIMITED',
      category: 'BUSINESS NEWS',
      date: 'July 21, 2026',
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Terra Verde Capitals: Building Next-Generation Sustainable Wealth Through Land Intelligence and Sovereign Infrastructure-Led Urban Corridors...',
    },
    {
      id: 'bln-5',
      slug: 'oxford-global-leadership-academy-ethical-executives',
      title: 'Global Leadership Academy Beyond the Classroom: Education’s Answer to an Uncertain Future',
      category: 'BUSINESS NEWS',
      date: 'July 18, 2026',
      heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      excerpt: 'As market disruptions multiply, modern boardroom leaders require intellectual resilience, crisis agility, and deep governance principles to guide organizations...',
    },
    {
      id: 'bln-6',
      slug: 'alliance-urban-architecture-sustainable-redevelopment',
      title: 'Alliance City Urban Architects: Building More Than Commercial Structures',
      category: 'BUSINESS NEWS',
      date: 'July 12, 2026',
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Urban renewal projects across major financial capitals are moving away from monolithic high-rises toward human-centric biophilic spaces that harmonize life...',
    },
    {
      id: 'bln-7',
      slug: 'aura-illumination-technologies-heritage-lighting',
      title: 'A Zero-Impact Approach to Heritage Illumination and Architectural Marvels',
      category: 'BUSINESS NEWS',
      date: 'July 5, 2026',
      heroImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Balancing historical preservation with ultra-efficient photonic projection, modern illumination brings timeless heritage sites to vibrant nocturnal life...',
    },
    {
      id: 'bln-8',
      slug: 'vanguard-petcare-networks-high-tech-ecosystem',
      title: 'VANGUARD HEALTH: BUILDING A STRONGER, SMARTER GLOBAL CARE ECOSYSTEM',
      category: 'BUSINESS NEWS',
      date: 'June 28, 2026',
      heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Combining genetic profiling with automated diagnostic telemetry, forward-thinking health consortiums are modernizing specialized clinical networks worldwide...',
    },
  ];

  // Alias mapping to ensure any homepage card opens its rich bespoke article
  const SLUG_ALIASES: Record<string, string> = {
    'sp-law-chambers-litigation-firm-trust-solutions': 'sp-law-chambers-litigation-corporate-advocacy',
    'sp-law-chambers-full-service-litigation-firm': 'sp-law-chambers-litigation-corporate-advocacy',
    'sp-law-chambers-full-service-litigation-firm-trust-expertise': 'sp-law-chambers-litigation-corporate-advocacy',
    'ratovate-redefining-digital-transformation': 'ratovate-technologies-enterprise-digital-transformation',
    'technoshrine-intelligence-personified-bhubaneswar-it-firm': 'technoshrine-bhubaneswar-ai-software-solutions',
    'technoshrine-intelligence-personified-it-firm-engineering-growth': 'technoshrine-bhubaneswar-ai-software-solutions',
    'belstar-microfinance-limited-building-future': 'belstar-microfinance-financial-inclusion-impact',
    'belstar-microfinance-limited-building-the-future': 'belstar-microfinance-financial-inclusion-impact',
    'belstar-microfinance-limited-building-future-financial-inclusion': 'belstar-microfinance-financial-inclusion-impact',
    'from-poverty-to-billionaire-inspiring-story-whatsapp-co-founder': 'from-poverty-to-a-billionaire-inspiring-story-of-whatsapp-co-founder',
    'from-poverty-to-billionaire-inspiring-story-whatsapp': 'from-poverty-to-a-billionaire-inspiring-story-of-whatsapp-co-founder',
    'meet-youngest-prime-minister-britain-rishi-sunak': 'meet-indian-origin-youngest-prime-minister-of-britain-rishi-sunak',
    'meet-indian-origin-youngest-prime-minister-britain': 'meet-indian-origin-youngest-prime-minister-of-britain-rishi-sunak',
    'untold-story-vineeta-singh-sugar-cosmetics': 'untold-story-of-vineeta-singh-rejected-one-crore-job-offer',
    'untold-story-vineeta-singh-rejected-one-crore-offer': 'untold-story-of-vineeta-singh-rejected-one-crore-job-offer',
    'life-lessons-muniba-mazari-iron-lady': 'life-lessons-from-muniba-mazari-story-embrace-gratitude-after-adversity',
    'life-lessons-muniba-mazari-embrace-gratitude': 'life-lessons-from-muniba-mazari-story-embrace-gratitude-after-adversity',
    'novatech-intelligence-personified-cloud-architecture': 'novatech-ai-solutions-scalable-cloud-infrastructure',
  };

  const targetSlug = SLUG_ALIASES[slug] || slug;

  // 1. Check ALL_BESPOKE_ARTICLES first to return rich bespoke articles
  const bespoke = ALL_BESPOKE_ARTICLES.find((b) => b.slug === targetSlug || b.slug === slug);
  if (bespoke) {
    return bespoke;
  }

  const found = allDummy.find((d) => d.slug === targetSlug || d.slug === slug);
  if (!found) {
    const formattedTitle = targetSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      id: `dummy-${slug}`,
      slug,
      title: formattedTitle,
      subtitle: 'Comprehensive Executive Dispatch & Strategic Corporate Analysis',
      excerpt: `${formattedTitle}. An exclusive investigative feature examining leadership, disruptive business models, and market expansion.`,
      content: `
### Strategic Executive Briefing

This in-depth feature examines corporate leadership, operational transformation, and market expansion strategies across key modern industries.

Organizations today operate in an increasingly volatile global landscape, where agility, data-driven intelligence, and clear governance determine lasting market relevance.

> "True corporate resilience lies in anticipating structural shifts long before they manifest on quarterly balance sheets."

### Strategic Highlights & Key Themes
1. **Sustainable Growth Models**: Integrating long-term capital stability with ethical governance.
2. **Operational Acceleration**: Utilizing automation and intelligent workflows to streamline overhead.
3. **Market Expansion**: Building resilient customer trust and cross-border strategic alliances.
`,
      category: 'Executive Dispatch',
      categorySlug: 'news',
      subcategory: 'Enterprise Leadership',
      author: {
        id: 'auth-editorial',
        name: 'Chronicle Editorial Bureau',
        role: 'Senior Executive Editor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        bio: 'The Senior Editorial Bureau curates flagship investigative profiles and boardroom analyses.',
      },
      publishedAt: '2026-10-06T09:00:00Z',
      readTime: '6 min read',
      views: 11400,
      isFeatured: true,
      isTrending: true,
      isEditorPick: true,
      isCoverStory: false,
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      tags: ['Executive Leadership', 'Enterprise Analysis', 'Corporate Strategy'],
      sharesCount: 1250,
      status: 'published',
      comments: [],
    };
  }

  return {
    id: `dummy-${found.slug}`,
    slug: found.slug,
    title: found.title,
    subtitle: 'Comprehensive Executive Dispatch & Corporate Analysis',
    excerpt: found.excerpt || found.title,
    content: `
### Strategic Executive Briefing

This in-depth feature examines corporate leadership, operational transformation, and market expansion strategies across key modern industries.

Organizations today operate in an increasingly volatile global landscape, where agility, data-driven intelligence, and clear governance determine lasting market relevance.

> "True corporate resilience lies in anticipating structural shifts long before they manifest on quarterly balance sheets."

### Strategic Highlights & Key Themes
1. **Sustainable Growth Models**: Integrating long-term capital stability with ethical governance.
2. **Operational Acceleration**: Utilizing automation and intelligent workflows to streamline overhead.
3. **Market Expansion**: Building resilient customer trust and cross-border strategic alliances.
`,
    category: found.category || 'Cover Story',
    categorySlug: 'cover-story',
    subcategory: 'Executive Leadership',
    author: {
      id: 'auth-editorial',
      name: 'Chronicle Editorial Bureau',
      role: 'Senior Executive Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'The Senior Editorial Bureau curates flagship investigative profiles and boardroom analyses.',
    },
    publishedAt: '2026-07-21T09:00:00Z',
    readTime: '6 min read',
    views: 12500,
    isFeatured: true,
    isTrending: true,
    isEditorPick: true,
    isCoverStory: true,
    heroImage: found.heroImage,
    tags: ['Cover Story', 'Enterprise Leadership', 'Business Strategy', 'Executive Analysis'],
    sharesCount: 1420,
    status: 'published',
    comments: [],
  };
}
