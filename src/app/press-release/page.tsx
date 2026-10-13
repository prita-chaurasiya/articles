'use client';

import React from 'react';
import CategoryPressReleaseView from '@/components/category/CategoryPressReleaseView';

export default function PressReleasePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white py-24 text-center text-slate-500 font-medium">Loading Press Release archive...</div>}>
      <CategoryPressReleaseView />
    </React.Suspense>
  );
}
