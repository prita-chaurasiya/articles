import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/lib/supabase';
import { Article } from '@/types';

// GET /api/articles - Fetch all articles from Supabase
export async function GET() {
  const supabase = getServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ articles: [] });
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('publishedAt', { ascending: false });

    if (error) {
      console.error('Error fetching articles from Supabase:', error.message);
      return NextResponse.json({ articles: [], error: error.message });
    }

    return NextResponse.json({ articles: (data as Article[]) || [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json({ articles: [], error: message }, { status: 500 });
  }
}

// POST /api/articles - Publish or save new article to Supabase
export async function POST(request: NextRequest) {
  const supabase = getServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 500 });
  }

  try {
    const article: Article = await request.json();
    if (!article || !article.id) {
      return NextResponse.json({ error: 'Invalid article data' }, { status: 400 });
    }

    const { error } = await supabase
      .from('articles')
      .upsert(article, { onConflict: 'id' });

    if (error) {
      console.error('Error saving article to Supabase:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, article });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save article';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/articles - Update existing article
export async function PUT(request: NextRequest) {
  const supabase = getServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 500 });
  }

  try {
    const { id, updates } = await request.json();
    if (!id || !updates) {
      return NextResponse.json({ error: 'Missing id or updates' }, { status: 400 });
    }

    const { error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update article';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/articles?id=... - Delete article from Supabase
export async function DELETE(request: NextRequest) {
  const supabase = getServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing article id' }, { status: 400 });
    }

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete article';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
