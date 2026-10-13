import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Article } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    if (!supabaseUrl || !supabaseAnonKey) return null;
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  if (cachedClient) return cachedClient;

  if (supabaseUrl && supabaseAnonKey) {
    cachedClient = createClient(supabaseUrl, supabaseAnonKey);
    return cachedClient;
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl) &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey)
  );
}

// Fetch all articles from Supabase
export async function fetchSupabaseArticles(): Promise<Article[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('articles')
      .select('*')
      .order('publishedAt', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return [];
    }

    return (data as Article[]) || [];
  } catch (err) {
    console.warn('Failed to fetch from Supabase:', err);
    return [];
  }
}

// Save or publish new article to Supabase
export async function saveSupabaseArticle(article: Article): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('articles')
      .upsert(article, { onConflict: 'id' });

    if (error) {
      console.error('Supabase upsert error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to save to Supabase:', err);
    return false;
  }
}

// Update existing article in Supabase
export async function updateSupabaseArticle(id: string, updates: Partial<Article>): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('articles')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to update in Supabase:', err);
    return false;
  }
}

// Delete article from Supabase
export async function deleteSupabaseArticle(id: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to delete in Supabase:', err);
    return false;
  }
}
