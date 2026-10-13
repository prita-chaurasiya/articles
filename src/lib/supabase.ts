import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Article } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

let cachedServerClient: SupabaseClient | null = null;

// Only used on the server (Node.js runtime / Next.js API routes)
export function getServerSupabaseClient(): SupabaseClient | null {
  if (cachedServerClient) return cachedServerClient;
  if (!supabaseUrl || !supabaseKey) return null;

  try {
    cachedServerClient = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
    return cachedServerClient;
  } catch (err) {
    console.error('Failed to create server Supabase client:', err);
    return null;
  }
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

// Fetch all articles: Client calls Next.js API; Server queries Supabase directly
export async function fetchSupabaseArticles(): Promise<Article[]> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/articles', { cache: 'no-store' });
      if (!res.ok) return [];
      const json = await res.json();
      return json.articles || [];
    } catch {
      return [];
    }
  }

  // Server-side
  const client = getServerSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('articles')
      .select('*')
      .order('publishedAt', { ascending: false });

    if (error) {
      console.warn('Server Supabase fetch error:', error.message);
      return [];
    }
    return (data as Article[]) || [];
  } catch (err) {
    console.warn('Failed to fetch from Supabase on server:', err);
    return [];
  }
}

// Save or publish new article
export async function saveSupabaseArticle(article: Article): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  // Server-side
  const client = getServerSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('articles')
      .upsert(article, { onConflict: 'id' });

    if (error) {
      console.error('Server Supabase save error:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Update existing article
export async function updateSupabaseArticle(
  id: string,
  updates: Partial<Article>
): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  // Server-side
  const client = getServerSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('articles').update(updates).eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// Delete article
export async function deleteSupabaseArticle(id: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/articles?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  // Server-side
  const client = getServerSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('articles').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}
