'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Clock,
  Eye,
  Share2,
  Bookmark,
  Check,
  Copy,
  Printer,
  ArrowLeft,
  ArrowRight,
  Building2,
  Award,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  User,
  Send,
  Calendar,
} from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDate, formatNumber } from '@/lib/utils';
import SponsoredAdBlock from '@/components/home/SponsoredAdBlock';

import { getCoverStoryOrSidebarArticle } from '@/data/coverStoryArticles';

export default function ArticlePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] py-24 text-center text-slate-500 font-medium">Loading dispatch...</div>}>
      <ArticleContent />
    </React.Suspense>
  );
}

function ArticleContent() {
  const routerParams = useParams();
  const slug = (routerParams?.slug as string) || '';

  const {
    articles,
    incrementViews,
    toggleBookmark,
    bookmarkedSlugs,
    addComment,
  } = useArticleStore();

  const [copiedLink, setCopiedLink] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const article = articles.find((a) => a.slug === slug) || getCoverStoryOrSidebarArticle(slug);

  useEffect(() => {
    if (article) {
      incrementViews(article.slug);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
          Article Not Found
        </h2>
        <p className="text-slate-600 mb-8">
          The requested dispatch may have been archived or updated.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  const isSaved = bookmarkedSlugs.includes(article.slug);

  // Related articles in same category
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Find previous and next articles
  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentContent.trim()) {
      addComment(article.slug, {
        authorName: commentName,
        authorEmail: commentEmail || 'reader@executive.com',
        content: commentContent,
      });
      setCommentContent('');
      setCommentName('');
      setCommentEmail('');
      setCommentSubmitted(true);
      setTimeout(() => setCommentSubmitted(false), 5000);
    }
  };

  return (
    <article className="min-h-screen bg-[#F8FAFC]">
      {/* Top Breadcrumb & Metadata */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href={`/category/${article.categorySlug}`} className="hover:text-blue-600 font-semibold text-slate-700">
              {article.category}
            </Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-xs">{article.subcategory}</span>
          </div>
        </div>
      </div>

      {/* Article Header Container */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">
              {article.subcategory}
            </span>
            {article.isFeatured && (
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                Featured Editorial
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-sans mb-6">
            {article.subtitle || article.excerpt}
          </p>

          {/* Author Byline & Social Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
              />
              <div>
                <Link
                  href={`/author/${article.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  {article.author.name}
                </Link>
                <p className="text-xs text-slate-500">{article.author.role}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(article.publishedAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {formatNumber(article.views)} Reads
                  </span>
                </div>
              </div>
            </div>

            {/* Share / Save Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-xs font-semibold flex items-center gap-1"
                title="Copy Article Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
              <button
                onClick={() => toggleBookmark(article.slug)}
                className={`p-2 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1 ${
                  isSaved
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Save Article"
              >
                <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
              <button
                onClick={() => typeof window !== 'undefined' && window.print()}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                title="Print Article"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Hero Image Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 my-8">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] bg-slate-900">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2 text-center italic">
          Photographic dispatch: The Enterprise Chronicle Global Visual Archive • High-Resolution Media
        </p>
      </div>

      {/* Main Reading Column */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        
        {/* Company Profile Callout Widget (if present) */}
        {article.companyProfile && (
          <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={article.companyProfile.logo}
                  alt={article.companyProfile.name}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-700 bg-white"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                    CORPORATE DOSSIER
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {article.companyProfile.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {article.companyProfile.industry} • HQ: {article.companyProfile.hq}
                  </p>
                </div>
              </div>
              <Link
                href={`/success-stories/${article.slug}`}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                Full Company Profile →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Founder:</span>
                <span className="font-bold text-white">{article.companyProfile.founder}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Founded:</span>
                <span className="font-bold text-white">{article.companyProfile.founded}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Valuation:</span>
                <span className="font-bold text-amber-300">{article.companyProfile.valuation || 'Private'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Revenue:</span>
                <span className="font-bold text-emerald-400">{article.companyProfile.revenue || 'Undisclosed'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Formatted Article Body */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base sm:text-lg">
            
            {/* Opening with Drop Cap */}
            <p className="drop-cap text-slate-700 font-serif leading-relaxed mb-6">
              {article.content.split('\n\n')[0].replace(/^#+\s*/, '')}
            </p>

            {/* Remaining Body Paragraphs */}
            <div className="space-y-6 text-slate-700 font-sans text-base sm:text-lg leading-relaxed">
              {article.content
                .split('\n\n')
                .slice(1)
                .map((paragraph, index) => {
                  // Subheading
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3
                        key={index}
                        className="font-serif text-2xl font-bold text-slate-900 pt-6 pb-2 border-b border-slate-100"
                      >
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  // Pullquote
                  if (paragraph.startsWith('> ')) {
                    return (
                      <blockquote
                        key={index}
                        className="my-8 p-6 bg-slate-50 rounded-xl border-l-4 border-amber-500 font-serif text-xl sm:text-2xl italic text-slate-800 shadow-sm"
                      >
                        {paragraph.replace('> ', '')}
                      </blockquote>
                    );
                  }
                  // Simple Markdown Table rendering
                  if (paragraph.includes('|')) {
                    const rows = paragraph.trim().split('\n').filter(r => !r.includes(':---'));
                    return (
                      <div key={index} className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
                        <table className="w-full text-xs sm:text-sm text-left">
                          <tbody>
                            {rows.map((row, rIdx) => {
                              const cells = row.split('|').filter(c => c.trim().length > 0);
                              return (
                                <tr key={rIdx} className={rIdx === 0 ? 'bg-slate-100 font-bold text-slate-900' : 'border-t border-slate-200'}>
                                  {cells.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-4 py-3">
                                      {cell.trim()}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  return (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
            </div>

            {/* Strategic Takeaways Box */}
            <div className="my-8 p-6 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Strategic Executive Takeaways
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                <li>Direct structural implications for Fortune 500 operating margins and capital expenditure.</li>
                <li>Regulatory scrutiny intensifying across transatlantic competition authorities.</li>
                <li>Strategic advantage consolidating around verified technological sovereignty and proprietary datasets.</li>
              </ul>
            </div>

            {/* Tags Cloud */}
            <div className="pt-8 border-t border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Categorization & Indexing Tags:
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => {
                  const tagSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <Link
                      key={tag}
                      href={`/tag/${tagSlug}`}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                    >
                      #{tag}
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Author Bio Box */}
        <div className="my-10 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl shadow-sm border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-slate-700 shrink-0"
          />
          <div className="flex-1 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block mb-1">
              EDITORIAL BOARD CONTRIBUTOR
            </span>
            <h3 className="font-serif text-xl font-bold text-white mb-1">
              {article.author.name}
            </h3>
            <p className="text-xs text-slate-400 mb-3">{article.author.role}</p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {article.author.bio}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-blue-400">
              {article.author.twitter && (
                <span className="hover:underline">{article.author.twitter}</span>
              )}
              {article.author.linkedin && (
                <span className="hover:underline">{article.author.linkedin}</span>
              )}
            </div>
          </div>
        </div>

        {/* Previous & Next Article Navigation */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/article/${prevArticle.slug}`}
              className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Dispatch
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2">
                {prevArticle.title}
              </h4>
            </Link>
          ) : (
            <div></div>
          )}

          {nextArticle && (
            <Link
              href={`/article/${nextArticle.slug}`}
              className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors group text-right"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
                Next Dispatch <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2">
                {nextArticle.title}
              </h4>
            </Link>
          )}
        </div>

        {/* Interactive Comments Section */}
        <div className="my-10 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Executive Discussions ({article.comments.length})
            </h3>
            <span className="text-xs text-slate-400">Moderated Forum</span>
          </div>

          {/* Comment submission form */}
          <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name / Designation"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                required
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Corporate Email"
                value={commentEmail}
                onChange={(e) => setCommentEmail(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <textarea
              rows={3}
              placeholder="Contribute your executive perspective or analysis..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400">
                Comments appear live across reader sessions.
              </p>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Remark</span>
              </button>
            </div>
            {commentSubmitted && (
              <p className="text-xs font-semibold text-emerald-600">
                Remark published successfully to the live executive thread.
              </p>
            )}
          </form>

          {/* Comments List */}
          <div className="space-y-4 divide-y divide-slate-100">
            {article.comments.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 italic">
                Be the first C-suite leader to open discussions on this dispatch.
              </p>
            ) : (
              article.comments.map((comment) => (
                <div key={comment.id} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900">
                      {comment.authorName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Articles 3-Column Grid */}
        {relatedArticles.length > 0 && (
          <div className="my-12">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
              Related Dispatches in {article.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/article/${rel.slug}`}
                  className="group block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1 block">
                      {rel.subcategory}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
