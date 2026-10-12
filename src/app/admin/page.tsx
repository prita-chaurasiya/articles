'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  Star,
  Flame,
  Search,
  CheckCircle2,
  FileText,
  Building2,
  Layers,
  Sparkles,
  RefreshCw,
  X,
  ExternalLink,
  Shield,
  TrendingUp,
  LayoutDashboard,
  Tag as TagIcon,
  Users,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Mail,
  Megaphone,
  Globe,
  BarChart3,
  Calendar,
  Clock,
  ArrowRight,
  Copy,
  Check,
  AlertCircle,
  Download,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { CATEGORIES } from '@/data/categories';
import { MAGAZINE_ISSUES } from '@/data/magazineIssues';
import { Article } from '@/types';
import { generateSlug, formatDate, formatNumber } from '@/lib/utils';

const PRESET_IMAGES = [
  { label: 'Boardroom Executive', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1600&auto=format&fit=crop&q=80' },
  { label: 'AI & Data Cluster', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80' },
  { label: 'CleanTech Facility', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Semiconductor Lab', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Financial Trading', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Metropolitan Skyscraper', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Biotech Genomics', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Industrial Robotics', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Aerospace Systems', url: 'https://images.unsplash.com/photo-1517976487502-5f79e5f5c07c?w=1600&auto=format&fit=crop&q=80' },
];

type AdminTab =
  | 'dashboard'
  | 'articles'
  | 'drafts'
  | 'published'
  | 'scheduled'
  | 'categories'
  | 'tags'
  | 'authors'
  | 'companies'
  | 'magazine'
  | 'media'
  | 'comments'
  | 'subscribers'
  | 'ads'
  | 'seo'
  | 'analytics';

export default function AdminPage() {
  const {
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    toggleFeatured,
    toggleTrending,
    toggleEditorPick,
    resetToDefaultArticles,
  } = useArticleStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [successNotification, setSuccessNotification] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [subcategory, setSubcategory] = useState('Enterprise Strategy');
  const [authorName, setAuthorName] = useState('Julian Vance-Stowe');
  const [authorRole, setAuthorRole] = useState('Senior Technology Editor');
  const [authorAvatar, setAuthorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');
  const [heroImage, setHeroImage] = useState(PRESET_IMAGES[0].url);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('Business, Leadership, Enterprise, AI');
  const [readTime, setReadTime] = useState('6 min read');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isTrending, setIsTrending] = useState(true);
  const [isEditorPick, setIsEditorPick] = useState(false);
  const [isCoverStory, setIsCoverStory] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled'>('published');

  // Company profile fields
  const [includeCompanyProfile, setIncludeCompanyProfile] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyFounder, setCompanyFounder] = useState('');
  const [companyValuation, setCompanyValuation] = useState('$1.5 Billion');
  const [companyRevenue, setCompanyRevenue] = useState('$240 Million');
  const [companyVision, setCompanyVision] = useState('');
  const [companySummary, setCompanySummary] = useState('');

  // Mock Newsletter Subscribers
  const [subscribers, setSubscribers] = useState([
    { email: 'm.conroy@vanguardglobal.com', role: 'Managing Partner', date: '2026-10-10', tier: 'Enterprise All-Access' },
    { email: 's.chen@sequoiacap.com', role: 'General Partner', date: '2026-10-09', tier: 'Executive Briefing' },
    { email: 'k.almansoor@mubadala.ae', role: 'Chief Investment Officer', date: '2026-10-08', tier: 'Enterprise All-Access' },
    { email: 'elena.rostova@ubs.ch', role: 'Head of Global Wealth', date: '2026-10-07', tier: 'Executive Briefing' },
    { email: 'rajesh.nair@nexusclean.in', role: 'Chief Executive Officer', date: '2026-10-06', tier: 'Enterprise All-Access' },
    { email: 'david.sterling@blackrock.com', role: 'Director of Quantitative Research', date: '2026-10-05', tier: 'Executive Briefing' },
  ]);

  // Mock Comments
  const [comments, setComments] = useState([
    { id: 'c1', author: 'Dr. Michael Theron', article: 'The Autonomous Enterprise', text: 'Remarkable analysis of agent swarm architectures in legacy ERP environments.', date: '2 hours ago', status: 'Approved' },
    { id: 'c2', author: 'Alistair Finch', article: 'Aetheria Dynamics Green Hydrogen', text: 'The zero-iridium membrane metrics match what we observed in German pilot trials.', date: '5 hours ago', status: 'Approved' },
    { id: 'c3', author: 'Seraphina Vance', article: 'The 10-Person Billion-Dollar Enterprise', text: 'Unit economics here are staggering. Would love a breakdown of IP ownership models.', date: '1 day ago', status: 'Approved' },
  ]);

  const openCreateModal = (presetCategory?: string | unknown) => {
    setEditingArticleId(null);
    setTitle('');
    setSubtitle('');
    setExcerpt('');
    if (typeof presetCategory === 'string') {
      setCategory(presetCategory);
    } else {
      setCategory(CATEGORIES[0].name);
    }
    setContent(`### Strategic Context\n\nIn recent weeks, enterprise decision-makers across multinational organizations have noted unprecedented transformations in operational velocity.\n\n> "The rate of technological adoption has compressed five-year transition roadmaps into single quarters."\n\n### Performance Benchmarks and Industry Outcomes\n\nInstitutional capital continues to prioritize companies with clear defensible moats and audited unit economics.`);
    setHeroImage(PRESET_IMAGES[0].url);
    setIncludeCompanyProfile(false);
    setIsFeatured(true);
    setIsTrending(true);
    setIsCoverStory(false);
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (art: Article) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setSubtitle(art.subtitle || '');
    setCategory(art.category);
    setSubcategory(art.subcategory);
    setAuthorName(art.author.name);
    setAuthorRole(art.author.role);
    setAuthorAvatar(art.author.avatar);
    setHeroImage(art.heroImage);
    setExcerpt(art.excerpt);
    setContent(art.content);
    setTagsInput(art.tags.join(', '));
    setReadTime(art.readTime);
    setIsFeatured(art.isFeatured);
    setIsTrending(art.isTrending);
    setIsEditorPick(art.isEditorPick);
    setIsCoverStory(art.isCoverStory || false);
    setStatus(art.status);

    if (art.companyProfile) {
      setIncludeCompanyProfile(true);
      setCompanyName(art.companyProfile.name);
      setCompanyLogo(art.companyProfile.logo);
      setCompanyIndustry(art.companyProfile.industry);
      setCompanyFounder(art.companyProfile.founder);
      setCompanyValuation(art.companyProfile.valuation || '');
      setCompanyRevenue(art.companyProfile.revenue || '');
      setCompanyVision(art.companyProfile.vision || '');
      setCompanySummary(art.companyProfile.summary || '');
    } else {
      setIncludeCompanyProfile(false);
    }

    setIsModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedCat = CATEGORIES.find((c) => c.name.toLowerCase() === category.toLowerCase());
    const catSlug = matchedCat ? matchedCat.slug : generateSlug(category);
    const slug = generateSlug(title);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const companyProfileData = includeCompanyProfile && companyName
      ? {
          name: companyName,
          logo: companyLogo,
          industry: companyIndustry || 'Technology & Innovation',
          founded: '2022',
          hq: 'San Francisco & London',
          founder: companyFounder || 'Executive Leadership',
          valuation: companyValuation,
          revenue: companyRevenue,
          website: 'https://enterprise.example.com',
          summary: companySummary || excerpt,
          vision: companyVision || 'Leading global innovation with verified excellence.',
          mission: 'Delivering next-generation value to international clients.',
          services: ['Enterprise AI Integration', 'Autonomous Workflow Systems', 'Strategic Capital Advisory'],
          achievements: ['Ranked in Global Fast 500', 'Over $1B in contract transaction volume'],
          growthStory: 'From early prototype validation to global enterprise operations.',
          awards: ['Enterprise Titan Award 2026'],
          clientBase: ['Fortune 500 Enterprises', 'Sovereign Wealth Funds'],
          futurePlans: 'Expanding international operations across Europe and APAC.',
        }
      : undefined;

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title,
        subtitle,
        excerpt,
        content,
        category,
        categorySlug: catSlug,
        subcategory,
        heroImage,
        readTime,
        tags,
        isFeatured,
        isTrending,
        isEditorPick,
        isCoverStory,
        status,
        companyProfile: companyProfileData,
      });
      setSuccessNotification(`Article "${title.slice(0, 35)}..." updated successfully!`);
    } else {
      addArticle({
        slug,
        title,
        subtitle,
        excerpt: excerpt || title,
        content,
        category,
        categorySlug: catSlug,
        subcategory,
        author: {
          id: `auth-${Date.now()}`,
          name: authorName,
          role: authorRole,
          avatar: authorAvatar,
          bio: 'Journalist and contributing analyst at The Enterprise Chronicle.',
        },
        publishedAt: new Date().toISOString(),
        readTime,
        isFeatured,
        isTrending,
        isEditorPick,
        isCoverStory,
        heroImage,
        tags,
        status,
        companyProfile: companyProfileData,
      });

      setSuccessNotification(
        `Article published live! Automatically appeared on Homepage Fresh Stories, Category "${category}", Search, Author page, and Tag pages.`
      );
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessNotification(null), 6000);
  };

  // Distinct Authors
  const authorsList = useMemo(() => {
    const map = new Map<string, { author: Article['author']; count: number; totalViews: number }>();
    articles.forEach((a) => {
      const key = a.author.name;
      if (!map.has(key)) {
        map.set(key, { author: a.author, count: 0, totalViews: 0 });
      }
      const item = map.get(key)!;
      item.count += 1;
      item.totalViews += a.views || 0;
    });
    return Array.from(map.values());
  }, [articles]);

  // Distinct Companies
  const companiesList = useMemo(() => {
    return articles
      .filter((a) => a.companyProfile)
      .map((a) => ({ articleSlug: a.slug, ...a.companyProfile! }));
  }, [articles]);

  // Distinct Tags
  const tagsList = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      a.tags.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }))
      .sort((a, b) => b.count - a.count);
  }, [articles]);

  // Filtered Articles based on active tab, category, and search
  const filteredArticles = useMemo(() => {
    let list = articles;
    if (activeTab === 'drafts') {
      list = articles.filter((a) => a.status === 'draft');
    } else if (activeTab === 'published') {
      list = articles.filter((a) => a.status === 'published');
    } else if (activeTab === 'scheduled') {
      list = articles.filter((a) => a.status === 'scheduled');
    }

    if (selectedCategoryTab !== 'all') {
      list = list.filter(
        (a) =>
          a.category.toLowerCase() === selectedCategoryTab.toLowerCase() ||
          a.categorySlug.toLowerCase() === selectedCategoryTab.toLowerCase()
      );
    }

    if (!searchTableQuery.trim()) return list;
    const q = searchTableQuery.toLowerCase();
    return list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.name.toLowerCase().includes(q)
    );
  }, [articles, activeTab, selectedCategoryTab, searchTableQuery]);

  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const featuredCount = articles.filter((a) => a.isFeatured).length;
  const trendingCount = articles.filter((a) => a.isTrending).length;
  const draftsCount = articles.filter((a) => a.status === 'draft').length;
  const scheduledCount = articles.filter((a) => a.status === 'scheduled').length;

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                Admin Studio & CMS
              </span>
              <span className="text-xs text-slate-500">• Production Digital Media Suite</span>
            </div>
            <h1 className="font-serif text-3xl font-black text-slate-900 tracking-tight">
              Enterprise Editorial Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Publish and orchestrate stories, media issues, dossiers, and taxonomies with instant cross-platform reactivity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Reset store back to default 50 seed articles?')) {
                  resetToDefaultArticles();
                  setSuccessNotification('Database reset to 50 seed articles.');
                  setTimeout(() => setSuccessNotification(null), 4000);
                }
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Seed</span>
            </button>

            <button
              onClick={openCreateModal}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Article</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successNotification && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl flex items-center gap-3 shadow-sm animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs sm:text-sm font-semibold">{successNotification}</div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-slate-200">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'articles', label: `Articles (${articles.length})`, icon: FileText },
            { id: 'drafts', label: `Drafts (${draftsCount})`, icon: Clock },
            { id: 'published', label: 'Published', icon: CheckCircle2 },
            { id: 'scheduled', label: `Scheduled (${scheduledCount})`, icon: Calendar },
            { id: 'categories', label: `Categories (${CATEGORIES.length})`, icon: Layers },
            { id: 'tags', label: `Tags (${tagsList.length})`, icon: TagIcon },
            { id: 'authors', label: `Authors (${authorsList.length})`, icon: Users },
            { id: 'companies', label: `Companies (${companiesList.length})`, icon: Building2 },
            { id: 'magazine', label: `Magazine (${MAGAZINE_ISSUES.length})`, icon: BookOpen },
            { id: 'media', label: 'Media Library', icon: ImageIcon },
            { id: 'comments', label: 'Comments', icon: MessageSquare },
            { id: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: Mail },
            { id: 'ads', label: 'Advertisements', icon: Megaphone },
            { id: 'seo', label: 'SEO Settings', icon: Globe },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-sm font-bold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. DASHBOARD OVERVIEW TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Total Stories
                </span>
                <span className="text-3xl font-black text-slate-900">{articles.length}</span>
                <span className="text-[11px] text-blue-600 block mt-1 font-semibold">
                  Live & Continuous
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Cover & Featured
                </span>
                <span className="text-3xl font-black text-amber-600">{featuredCount}</span>
                <span className="text-[11px] text-slate-400 block mt-1">Hero Placement</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Trending Wire
                </span>
                <span className="text-3xl font-black text-rose-600">{trendingCount}</span>
                <span className="text-[11px] text-slate-400 block mt-1">High Engagement</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Audited Readership
                </span>
                <span className="text-3xl font-black text-slate-900">{formatNumber(totalViews)}</span>
                <span className="text-[11px] text-emerald-600 block mt-1 font-semibold">Verified Reads</span>
              </div>
            </div>

            {/* Quick Actions & Recent Wire */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Recent Stories Published (Last 5 Dispatches)
                  </h3>
                  <button
                    onClick={() => setActiveTab('articles')}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View All Articles →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {articles.slice(0, 5).map((a) => (
                    <div key={a.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={a.heroImage} alt="" className="w-12 h-10 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <Link href={`/article/${a.slug}`} className="text-xs font-bold text-slate-900 hover:text-blue-600 truncate block">
                            {a.title}
                          </Link>
                          <span className="text-[10px] text-slate-400">
                            {a.category} • {formatDate(a.publishedAt)} by {a.author.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link href={`/article/${a.slug}`} className="p-1 text-slate-400 hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => openEditModal(a)} className="p-1 text-slate-400 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Editorial Controls */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Editorial Shortcuts
                </h3>
                <button
                  onClick={() => openCreateModal('Blog')}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Blog Post</span>
                </button>
                <button
                  onClick={() => openCreateModal()}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write & Publish New Story</span>
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <ImageIcon className="w-4 h-4 text-slate-500" />
                  <span>Browse Media Library</span>
                </button>
                <button
                  onClick={() => setActiveTab('subscribers')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>Manage Executive Subscribers</span>
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span>Configure Global SEO</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. ARTICLES / DRAFTS / PUBLISHED / SCHEDULED TAB */}
        {(activeTab === 'articles' || activeTab === 'drafts' || activeTab === 'published' || activeTab === 'scheduled') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
            {/* Table Search & Action Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter by title, beat, or journalist..."
                    value={searchTableQuery}
                    onChange={(e) => setSearchTableQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={selectedCategoryTab}
                    onChange={(e) => setSelectedCategoryTab(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="all">All Categories ({articles.length})</option>
                    {CATEGORIES.map((cat) => {
                      const count = articles.filter(
                        (a) =>
                          a.category.toLowerCase() === cat.name.toLowerCase() ||
                          a.categorySlug.toLowerCase() === cat.slug.toLowerCase()
                      ).length;
                      return (
                        <option key={cat.id} value={cat.name}>
                          {cat.name} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">
                  {filteredArticles.length} stories
                </span>

                <button
                  onClick={() => openCreateModal('Blog')}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Blog</span>
                </button>

                <button
                  onClick={() => openCreateModal()}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Article</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Article</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4 text-center">Featured</th>
                    <th className="py-3 px-4 text-center">Trending</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img src={art.heroImage} alt="" className="w-10 h-8 rounded-lg object-cover shrink-0" />
                          <div className="min-w-0">
                            <span className="font-serif font-bold text-slate-900 block truncate hover:text-blue-600">
                              {art.title}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {formatDate(art.publishedAt)} • {art.readTime}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {art.category}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <img src={art.author.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-slate-800 font-medium truncate">{art.author.name}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleFeatured(art.id)}
                          className={`p-1 rounded transition-colors ${art.isFeatured ? 'text-amber-500' : 'text-slate-300 hover:text-slate-400'}`}
                        >
                          <Star className="w-4 h-4" fill={art.isFeatured ? 'currentColor' : 'none'} />
                        </button>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleTrending(art.id)}
                          className={`p-1 rounded transition-colors ${art.isTrending ? 'text-rose-500' : 'text-slate-300 hover:text-slate-400'}`}
                        >
                          <Flame className="w-4 h-4" fill={art.isTrending ? 'currentColor' : 'none'} />
                        </button>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          art.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                          art.status === 'scheduled' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {art.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/article/${art.slug}`} className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600">
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button onClick={() => openEditModal(art)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => deleteArticle(art.id)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-rose-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Publication Taxonomy & Categories ({CATEGORIES.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Editorial beats mapping to landing pages and automated sub-feeds.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => {
                const count = articles.filter((a) => a.category.toLowerCase() === cat.name.toLowerCase()).length;
                return (
                  <div key={cat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif font-bold text-slate-900 text-base">{cat.name}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {count} stories
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {cat.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                      <span className="text-[11px] font-mono text-slate-400">/{cat.slug}</span>
                      <Link href={`/category/${cat.slug}`} className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                        <span>View Beat</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. TAGS TAB */}
        {activeTab === 'tags' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Editorial Tags & Topics ({tagsList.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Semantic tags attached to articles driving search indexing and topic hubs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {tagsList.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tag/${tag.slug}`}
                  className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between group"
                >
                  <span className="font-bold text-slate-900 group-hover:text-blue-600 text-xs truncate">
                    #{tag.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-2 font-mono">
                    {tag.count} articles
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 5. AUTHORS TAB */}
        {activeTab === 'authors' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Editorial Staff & Correspondents ({authorsList.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified journalists, contributing analysts, and guest columnists.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorsList.map((item) => {
                const authorSlug = item.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <div key={item.author.name} className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 flex items-start gap-4">
                    <img src={item.author.avatar} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-slate-900 text-sm truncate">{item.author.name}</h4>
                      <p className="text-xs text-blue-600 font-semibold mb-1 truncate">{item.author.role}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">{item.author.bio}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                        <span className="text-slate-400 font-mono text-[10px]">{item.count} stories • {formatNumber(item.totalViews)} reads</span>
                        <Link href={`/author/${authorSlug}`} className="text-blue-600 font-bold hover:underline">
                          View Profile →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. COMPANIES TAB */}
        {activeTab === 'companies' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Enterprise Dossiers & Success Stories ({companiesList.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Corporate retrospectives featuring valuation, founder, and revenue breakdowns.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companiesList.map((comp) => (
                <div key={comp.articleSlug} className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img src={comp.logo} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                      <div>
                        <h4 className="font-serif font-bold text-slate-900 text-sm">{comp.name}</h4>
                        <span className="text-[10px] text-slate-500">{comp.industry}</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-slate-600 mb-4">
                      <div className="flex justify-between"><span>Founder:</span> <strong className="text-slate-800">{comp.founder}</strong></div>
                      <div className="flex justify-between"><span>Valuation:</span> <strong className="text-amber-600">{comp.valuation}</strong></div>
                      <div className="flex justify-between"><span>HQ:</span> <strong className="text-slate-800">{comp.hq}</strong></div>
                    </div>
                  </div>
                  <Link
                    href={`/success-stories/${comp.articleSlug}`}
                    className="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold text-center transition-colors"
                  >
                    Open Executive Dossier
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. MAGAZINE ISSUES TAB */}
        {activeTab === 'magazine' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Digital E-Magazine Editions ({MAGAZINE_ISSUES.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Monthly publications with interactive flipbook reader & PDF distributions.
                </p>
              </div>
              <Link href="/magazine" className="text-xs font-bold text-blue-600 hover:underline">
                View Public Magazine Archive →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MAGAZINE_ISSUES.map((issue) => (
                <div key={issue.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex gap-4">
                  <img src={issue.coverImage} alt="" className="w-20 h-28 rounded-lg object-cover shadow shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {issue.issueNumber}
                      </span>
                      <h4 className="font-serif font-bold text-slate-900 text-sm mt-1 line-clamp-2">
                        {issue.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {issue.monthYear} • {issue.pagesCount} pages
                      </span>
                    </div>
                    <Link
                      href="/magazine"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mt-2"
                    >
                      <span>Read Online</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. MEDIA LIBRARY TAB */}
        {activeTab === 'media' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Curated Editorial Media Library ({PRESET_IMAGES.length} Assets)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Royalty-free high-resolution photography ready to copy and use across articles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {PRESET_IMAGES.map((img) => (
                <div key={img.url} className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 group">
                  <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden">
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 truncate">{img.label}</span>
                    <button
                      onClick={() => copyToClipboard(img.url)}
                      className="px-2 py-1 rounded bg-slate-200 hover:bg-blue-600 hover:text-white text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedUrl === img.url ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUrl === img.url ? 'Copied' : 'Copy URL'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. COMMENTS TAB */}
        {activeTab === 'comments' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Reader Discussion & Editorial Moderation ({comments.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Approve, moderate, or remove comments left on published articles.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {comments.map((c) => (
                <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-bold text-slate-900">{c.author}</strong>
                      <span className="text-[10px] text-slate-400">• on "{c.article}"</span>
                      <span className="text-[10px] text-slate-400">• {c.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{c.text}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {c.status}
                    </span>
                    <button
                      onClick={() => setComments(comments.filter((item) => item.id !== c.id))}
                      className="p-1.5 rounded hover:bg-slate-100 text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. NEWSLETTER SUBSCRIBERS TAB */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Executive Morning Briefing Subscribers ({subscribers.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Corporate executives, fund managers, and founders receiving daily dispatches.
                </p>
              </div>
              <button
                onClick={() => alert('Exported subscribers CSV.')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Subscriber Email</th>
                    <th className="py-3 px-4">Executive Role</th>
                    <th className="py-3 px-4">Joined Date</th>
                    <th className="py-3 px-4">Membership Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscribers.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-bold text-slate-900">{s.email}</td>
                      <td className="py-3 px-4 text-slate-600">{s.role}</td>
                      <td className="py-3 px-4 text-slate-400">{s.date}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                          {s.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 11. ADVERTISEMENTS TAB */}
        {activeTab === 'ads' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Luxury Advertising Placements & Slots
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage leaderboard banners, executive native cards, and sidebar placements.
                </p>
              </div>
              <Link href="/advertise" className="text-xs font-bold text-blue-600 hover:underline">
                View Public Media Kit →
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { slot: 'Homepage Leaderboard Banner', size: '1200 x 140', impressions: '142,500', ctr: '3.4%', status: 'Active' },
                { slot: 'Editorial Sidebar Square', size: '300 x 250', impressions: '89,400', ctr: '2.8%', status: 'Active' },
                { slot: 'Article Inline Native Dispatch', size: '800 x 220', impressions: '210,000', ctr: '4.1%', status: 'Active' },
              ].map((ad, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-sm">{ad.slot}</h4>
                    <span className="text-[11px] text-slate-400">Dimensions: {ad.size}</span>
                  </div>
                  <div className="flex items-center gap-6 text-xs text-right">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Impressions:</span>
                      <strong className="text-slate-800">{ad.impressions}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">CTR:</span>
                      <strong className="text-emerald-600">{ad.ctr}</strong>
                    </div>
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {ad.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 12. SEO SETTINGS TAB */}
        {activeTab === 'seo' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn space-y-6">
            <div className="pb-4 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Search Engine Optimization (SEO) & Social Graph
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Global indexing rules, OpenGraph meta, schema markup, and search crawl configurations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Global Publication Title</label>
                  <input
                    type="text"
                    defaultValue="The Enterprise Chronicle | World Business Magazine & Executive Media"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    defaultValue="The definitive international business magazine, executive intelligence platform, and corporate media authority covering technology, AI, finance, leadership, startups, and success stories."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Canonical Root Domain</label>
                  <input
                    type="text"
                    defaultValue="https://enterprisechronicle.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Search Engine Preview
                </span>
                <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs text-emerald-700 block">https://enterprisechronicle.com</span>
                  <h4 className="text-sm font-bold text-blue-700 hover:underline">
                    The Enterprise Chronicle | World Business Magazine & Executive Media
                  </h4>
                  <p className="text-xs text-slate-600">
                    The definitive international business magazine, executive intelligence platform, and corporate media authority covering technology, AI, finance, leadership...
                  </p>
                </div>
                <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                  <div>✓ XML Sitemap generated at <code>/sitemap.xml</code></div>
                  <div>✓ Robots.txt configured for Googlebot & Bingbot</div>
                  <div>✓ JSON-LD NewsArticle structured data active on all articles</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 13. ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fadeIn space-y-6">
            <div className="pb-4 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Audience Demographics & Performance Analytics
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time reader verification across global corporate bureaus.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Avg. Session Duration</span>
                <span className="text-xl font-black text-slate-900">4m 38s</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Bounce Rate</span>
                <span className="text-xl font-black text-emerald-600">24.2%</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Desktop Readership</span>
                <span className="text-xl font-black text-slate-900">68%</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Corporate Shares</span>
                <span className="text-xl font-black text-blue-600">18,400+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                <h4 className="font-serif font-bold text-slate-900 mb-3 text-sm">Top Readership Geographies</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>United States (NYC, SF, Chicago)</span><strong>42%</strong></div>
                  <div className="flex justify-between"><span>Europe (London, Frankfurt, Zurich)</span><strong>28%</strong></div>
                  <div className="flex justify-between"><span>Asia-Pacific (Singapore, Tokyo, Mumbai)</span><strong>21%</strong></div>
                  <div className="flex justify-between"><span>Middle East (Dubai, Abu Dhabi, Riyadh)</span><strong>9%</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                <h4 className="font-serif font-bold text-slate-900 mb-3 text-sm">Top Performing Beats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Technology & Enterprise AI</span><strong>34% of volume</strong></div>
                  <div className="flex justify-between"><span>Capital Markets & Sovereign Funds</span><strong>26% of volume</strong></div>
                  <div className="flex justify-between"><span>Corporate Success Stories</span><strong>22% of volume</strong></div>
                  <div className="flex justify-between"><span>CleanTech & Energy Transition</span><strong>18% of volume</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CREATE / EDIT ARTICLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                  {editingArticleId ? 'Edit Article' : 'Publish New Article to Digital Magazine'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 space-y-6 text-xs">
              {/* Row 1: Title & Subtitle */}
              <div className="space-y-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Headline Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sovereign Wealth Funds Quietly Channel $120B Into Quantum Computing"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-serif font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Subtitle / Standfirst Deck
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Inside the high-stakes deployment of sovereign capital across European deep tech"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
                  />
                </div>
              </div>

              {/* Row 2: Category, Subcategory, Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subcategory / Beat</label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Reading Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Row 3: Hero Image Preset Picker & Custom URL */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Lead Hero Photography URL
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    required
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-slate-400 self-center mr-1">Presets:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setHeroImage(img.url)}
                      className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                        heroImage === img.url
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Role</label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Avatar URL</label>
                  <input
                    type="url"
                    value={authorAvatar}
                    onChange={(e) => setAuthorAvatar(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Row 5: Excerpt & Content */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Executive Excerpt (Lead Summary)
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="A concise 2-3 sentence overview that hooks the reader and previews core findings..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Article Body Content (Markdown Supported)
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Row 6: Tags & Publication Toggles */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="AI, Venture Capital, Enterprise, Leadership"
                />
              </div>

              {/* Toggles Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-blue-600 w-4 h-4"
                  />
                  <span className="font-semibold text-slate-700">Featured Hero</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                    className="rounded text-rose-600 w-4 h-4"
                  />
                  <span className="font-semibold text-slate-700">Trending Wire</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCoverStory}
                    onChange={(e) => setIsCoverStory(e.target.checked)}
                    className="rounded text-amber-600 w-4 h-4"
                  />
                  <span className="font-semibold text-slate-700">Cover Story</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEditorPick}
                    onChange={(e) => setIsEditorPick(e.target.checked)}
                    className="rounded text-purple-600 w-4 h-4"
                  />
                  <span className="font-semibold text-slate-700">Editor's Pick</span>
                </label>

                <div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-1 bg-white border border-slate-200 rounded text-xs font-semibold"
                  >
                    <option value="published">Status: Published</option>
                    <option value="draft">Status: Draft</option>
                    <option value="scheduled">Status: Scheduled</option>
                  </select>
                </div>
              </div>

              {/* Optional Company Profile Section */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <label className="flex items-center gap-2 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={includeCompanyProfile}
                    onChange={(e) => setIncludeCompanyProfile(e.target.checked)}
                    className="rounded text-amber-600 w-4 h-4"
                  />
                  <span className="font-bold text-slate-900 text-xs">
                    Attach Enterprise Profile & Corporate Dossier (Success Story)
                  </span>
                </label>

                {includeCompanyProfile && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Company Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Lumina Health Technologies"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Company Logo URL</label>
                      <input
                        type="url"
                        value={companyLogo}
                        onChange={(e) => setCompanyLogo(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Founder / CEO</label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Sophia Sterling"
                        value={companyFounder}
                        onChange={(e) => setCompanyFounder(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Valuation</label>
                      <input
                        type="text"
                        placeholder="e.g. $4.5 Billion"
                        value={companyValuation}
                        onChange={(e) => setCompanyValuation(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingArticleId ? 'Update Article' : 'Publish Article Now'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
