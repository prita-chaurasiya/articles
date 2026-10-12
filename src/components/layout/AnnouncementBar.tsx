'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Globe,
  Shield,
  Sparkles,
} from 'lucide-react';

const MARKET_TICKERS = [
  { symbol: 'S&P 500', value: '5,864.20', change: '+0.54%', isUp: true },
  { symbol: 'NASDAQ 100', value: '20,412.80', change: '+0.88%', isUp: true },
  { symbol: 'DOW JONES', value: '42,863.50', change: '+0.21%', isUp: true },
  { symbol: 'FTSE 100', value: '8,253.60', change: '+0.34%', isUp: true },
  { symbol: 'NIFTY 50', value: '25,248.90', change: '+0.68%', isUp: true },
  { symbol: 'NIKKEI 225', value: '39,582.10', change: '+0.45%', isUp: true },
  { symbol: 'BRENT CRUDE', value: '$78.42/bbl', change: '-0.32%', isUp: false },
  { symbol: 'GOLD SPOT', value: '$2,654.80/oz', change: '+0.42%', isUp: true },
];

export default function AnnouncementBar() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    );
  }, []);

  return (
    <div className="bg-[#0B1120] text-slate-300 text-[11px] border-b border-slate-800/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-8 sm:h-8.5 gap-4">
          
          {/* Left: Date & Bureau Clocks */}
          <div className="flex items-center gap-3 text-slate-400 shrink-0">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Clock className="w-3 h-3 text-blue-400" />
              <span>{currentDate || 'Global Financial Edition'}</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <Globe className="w-3 h-3 text-slate-500" />
              <span>NYC • LON • SIN • BOM • FRA</span>
            </span>
          </div>

          {/* Center: Live Financial Markets Ticker */}
          <div className="flex-1 overflow-hidden hidden md:flex items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-900/60 text-blue-300 border border-blue-700/50">
                MARKETS
              </span>
              <div className="flex items-center gap-4 animate-fadeIn">
                {MARKET_TICKERS.slice(0, 4).map((item, i) => (
                  <div key={item.symbol + i} className="flex items-center gap-1 text-[11px]">
                    <span className="font-semibold text-slate-200">{item.symbol}:</span>
                    <span className="text-slate-300">{item.value}</span>
                    <span
                      className={`flex items-center font-medium ${
                        item.isUp ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {item.isUp ? (
                        <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                      ) : (
                        <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                      )}
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Quick Links */}
          <div className="flex items-center gap-3 shrink-0 font-medium ml-auto sm:ml-0">
            <Link
              href="/advertise"
              className="hidden lg:inline text-slate-400 hover:text-slate-200 transition-colors"
            >
              Advertise
            </Link>
            <span className="hidden lg:inline text-slate-700">•</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all"
            >
              <Shield className="w-2.5 h-2.5" />
              <span>Admin Studio</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
