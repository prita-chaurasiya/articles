'use client';

import React from 'react';
import CategoryLoungeInterviewView from '@/components/category/CategoryLoungeInterviewView';

export default function LoungeInterviewPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white py-24 text-center text-slate-500 font-medium">Loading Lounge Interview...</div>}>
      <CategoryLoungeInterviewView />
    </React.Suspense>
  );
}
