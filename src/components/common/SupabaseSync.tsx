'use client';

import { useEffect } from 'react';
import { useArticleStore } from '@/store/useArticleStore';

export default function SupabaseSync() {
  const syncWithSupabase = useArticleStore((state) => state.syncWithSupabase);

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  return null;
}
