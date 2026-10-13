export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
}

export interface CompanyProfile {
  name: string;
  logo: string;
  industry: string;
  founded: string;
  hq: string;
  founder: string;
  valuation?: string;
  revenue?: string;
  website: string;
  vision: string;
  mission: string;
  services: string[];
  achievements: string[];
  growthStory: string;
  awards: string[];
  clientBase: string[];
  futurePlans: string;
  gallery?: string[];
  summary?: string;
}

export interface ArticleComment {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  views: number;
  isFeatured: boolean;
  isTrending: boolean;
  isEditorPick: boolean;
  isCoverStory?: boolean;
  heroImage: string;
  companyProfile?: CompanyProfile;
  tags: string[];
  videoUrl?: string;
  comments: ArticleComment[];
  sharesCount: number;
  status: 'published' | 'draft' | 'scheduled';
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  featuredHeadline?: string;
}

export interface MagazinePage {
  pageNumber: number;
  title: string;
  section: string;
  image?: string;
  headline?: string;
  bodySnippet?: string;
}

export interface MagazineIssue {
  id: string;
  issueNumber: string;
  title: string;
  specialEditionTitle?: string;
  monthYear: string;
  coverImage: string;
  description: string;
  pagesCount: number;
  pdfUrl?: string;
  featuredArticles: string[];
  highlights: string[];
  brandName?: string;
  executiveName?: string;
  executiveRole?: string;
  pages?: MagazinePage[];
}
