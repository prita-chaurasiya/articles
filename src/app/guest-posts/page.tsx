'use client';

import React from 'react';
import CategoryGuestPostsView from '@/components/category/CategoryGuestPostsView';

export default function GuestPostsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white py-24 text-center text-slate-500 font-medium">Loading Guest Posts archive...</div>}>
      <CategoryGuestPostsView />
    </React.Suspense>
  );
}
