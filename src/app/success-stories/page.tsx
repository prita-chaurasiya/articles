'use client';

import React from 'react';
import CategorySuccessStoriesView from '@/components/category/CategorySuccessStoriesView';

export default function SuccessStoriesPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white py-24 text-center text-slate-500 font-medium">Loading Success Stories...</div>}>
      <CategorySuccessStoriesView />
    </React.Suspense>
  );
}
