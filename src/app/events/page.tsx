'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';

const SUMMITS = [
  {
    title: 'World Executive Conclave 2026',
    date: 'November 18–20, 2026',
    location: 'Zurich Convention Center, Switzerland',
    badge: 'Flagship Event',
    description: 'Over 800 heads of state, sovereign fund trustees, and technology innovators convene to deliberate on sovereign compute, digital trade, and industrial decarbonization.',
    speakers: ['Frank Conroy (Atlantic Energy)', 'Dr. Vivienne Vance (Aetheria Dynamics)', 'Soraya Al-Mansoor (Global Markets)'],
  },
  {
    title: 'The Global Enterprise Awards 2026 Gala',
    date: 'December 04, 2026',
    location: 'The Dorchester, Mayfair, London',
    badge: 'Annual Gala',
    description: 'A black-tie assembly honoring the 50 corporations and visionaries who reshaped global commerce in 2026.',
    speakers: ['Editorial Board', 'Sovereign Fund Partners', 'Chamber of Commerce Deans'],
  },
  {
    title: 'Asia DeepTech & Semiconductor Conclave',
    date: 'January 14–15, 2027',
    location: 'Marina Bay Sands, Singapore',
    badge: 'Hardware Summit',
    description: 'Addressing the future of silicon fabrication, robotic cleanrooms, and quantum computing materials across Asia and Europe.',
    speakers: ['Rajesh Nair (Nexus Advanced)', 'Wei Kang (Apex Ocean)', 'TSMC Advisory Engineers'],
  },
];

export default function EventsPage() {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
            <Calendar className="w-3.5 h-3.5" />
            Executive Conclaves
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Global Summits & Roundtables
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            High-level international assemblies where global decision-makers debate the structural transformations reshaping sovereign and private capital.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          {SUMMITS.map((event, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                    {event.badge}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" /> {event.location}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <strong>Dates:</strong> <span>{event.date}</span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => alert(`Registration request received for ${event.title}. Delegate credentials will follow.`)}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  Request Delegate Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
