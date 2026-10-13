'use client';

import React from 'react';
import CategoryBlogView from '@/components/category/CategoryBlogView';

export default function BlogPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white py-24 text-center text-slate-500 font-medium">Loading Blog archive...</div>}>
      <CategoryBlogView />
    </React.Suspense>
  );
}
