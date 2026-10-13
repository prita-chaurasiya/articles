'use client';

import React from 'react';
import { Mic } from 'lucide-react';

interface MagazineCardOverlayProps {
  badge?: string;
  categoryTag?: string;
  caption?: string;
  showMonogram?: boolean;
  monogramLetter?: string;
  monogramSubtext?: string;
}

export default function MagazineCardOverlay({
  badge,
  categoryTag = 'LOUNGE Interview',
  caption,
  showMonogram,
  monogramLetter = 'S',
  monogramSubtext = 'LAW CHAMBERS',
}: MagazineCardOverlayProps) {
  return (
    <>
      {/* Top Header Bar Overlay: Business Walkins (Left) + Badge (Center) + Category (Right) */}
      <div className="absolute top-0 inset-x-0 bg-white/95 backdrop-blur-xs px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center justify-between border-b border-slate-200/90 z-20 shadow-2xs">
        {/* Left: BW Business Walkins Logo */}
        <div className="flex items-center gap-1.5 select-none shrink-0">
          <img
            src="/images/business-walkins-logo.jpg"
            alt="BW"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full object-cover border border-amber-300 shrink-0"
          />
          <span className="text-[9px] sm:text-[10px] font-bold text-[#111827] tracking-tight leading-none uppercase">
            Business <span className="text-[#C28B30]">Walkins</span>
          </span>
        </div>

        {/* Center: Award / Seal Badge (Optional) */}
        {badge && (
          <div className="hidden sm:flex items-center gap-1 text-[7.5px] sm:text-[8px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50/90 px-2 py-0.5 rounded-full border border-amber-300/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span className="truncate max-w-[130px] lg:max-w-[160px]">{badge}</span>
          </div>
        )}

        {/* Right: LOUNGE Interview Tag with Red Mic */}
        <div className="flex items-center gap-1 bg-[#E11925] text-white px-1.5 sm:px-2 py-0.5 rounded-2xs text-[7.5px] sm:text-[8px] font-bold uppercase tracking-wider shadow-2xs shrink-0">
          <Mic className="w-2.5 h-2.5 text-white" />
          <span>{categoryTag}</span>
        </div>
      </div>

      {/* Left Monogram Box (Optional, for Lead Stories) */}
      {showMonogram && (
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/95 border border-slate-200 p-1.5 shadow-sm z-10 hidden sm:flex flex-col items-center justify-center text-center w-11 h-14 rounded-xs">
          <span className="font-serif font-black text-2xl text-slate-800 leading-none">
            {monogramLetter}
          </span>
          <span className="text-[5.5px] font-bold text-slate-500 uppercase tracking-tighter mt-1 leading-tight">
            {monogramSubtext}
          </span>
        </div>
      )}

      {/* Bottom Executive Caption Strip (Optional) */}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-center border-t border-slate-200/90 z-20">
          <span className="text-[8.5px] sm:text-[9.5px] font-semibold text-slate-800 tracking-tight block truncate">
            {caption}
          </span>
        </div>
      )}
    </>
  );
}
