'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Award, Users } from 'lucide-react';

const EVENTS_LIST = [
  {
    id: 'ev-1',
    title: 'World Executive Conclave 2026',
    date: 'November 18–20, 2026',
    location: 'Zurich, Switzerland',
    type: 'Global Summit',
    badge: 'Flagship Assembly',
    speakers: '800+ CXOs & Sovereign Fund Directors',
  },
  {
    id: 'ev-2',
    title: 'Global Enterprise Awards 2026 Gala',
    date: 'December 04, 2026',
    location: 'The Dorchester, London',
    type: 'Black-Tie Honors',
    badge: 'Annual Laureates',
    speakers: '50 Honored Multinational Corporations',
  },
  {
    id: 'ev-3',
    title: 'Asia DeepTech & Semiconductor Forum',
    date: 'January 14–15, 2027',
    location: 'Marina Bay Sands, Singapore',
    type: 'Industry Roundtable',
    badge: 'Invite-Only',
    speakers: 'Foundry Leaders & Capital Allocators',
  },
];

export default function UpcomingEventsStrip() {
  return (
    <section className="py-12 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Global Conclaves
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight">
              Executive Summits & Assemblies
            </h2>
          </div>
          <Link
            href="/events"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase tracking-wider"
          >
            Full Summit Calendar <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS_LIST.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-700 text-slate-300">
                    {event.type}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {event.badge}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white mb-2 leading-snug">
                  {event.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{event.speakers}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <Link
                  href="/events"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  Request Delegate Pass <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
