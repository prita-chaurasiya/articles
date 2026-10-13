-- =========================================================
-- Business Walkins: Supabase Database Schema
-- Run this script in your Supabase Project -> SQL Editor
-- =========================================================

-- 1. Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  category TEXT NOT NULL,
  "categorySlug" TEXT NOT NULL,
  subcategory TEXT DEFAULT '',
  author JSONB NOT NULL DEFAULT '{}'::jsonb,
  "publishedAt" TEXT DEFAULT now()::text,
  "readTime" TEXT DEFAULT '4 min read',
  views BIGINT DEFAULT 1,
  "isFeatured" BOOLEAN DEFAULT false,
  "isTrending" BOOLEAN DEFAULT false,
  "isEditorPick" BOOLEAN DEFAULT false,
  "isCoverStory" BOOLEAN DEFAULT false,
  "heroImage" TEXT DEFAULT '',
  "companyProfile" JSONB DEFAULT NULL,
  tags TEXT[] DEFAULT '{}',
  "videoUrl" TEXT DEFAULT NULL,
  comments JSONB DEFAULT '[]'::jsonb,
  "sharesCount" BIGINT DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create index on slug and categorySlug for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_slug ON public.articles("categorySlug");

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 4. Policies: Allow public read access to everyone
DROP POLICY IF EXISTS "Public articles are viewable by everyone" ON public.articles;
CREATE POLICY "Public articles are viewable by everyone" 
ON public.articles FOR SELECT 
USING (true);

-- 5. Policies: Allow publish/edit/delete from Admin Studio
DROP POLICY IF EXISTS "Enable insert for all users" ON public.articles;
CREATE POLICY "Enable insert for all users" 
ON public.articles FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON public.articles;
CREATE POLICY "Enable update for all users" 
ON public.articles FOR UPDATE 
USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.articles;
CREATE POLICY "Enable delete for all users" 
ON public.articles FOR DELETE 
USING (true);
