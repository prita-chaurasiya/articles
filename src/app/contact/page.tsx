'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Globe, MapPin, Send, CheckCircle2, Shield, Phone } from 'lucide-react';

const BUREAUS = [
  { 
    city: 'Varanasi (Corporate Headquarters & Editorial Desk)', 
    address: 'SA 1/177 TN, Pandeypur, Varanasi, Uttar Pradesh – 221002 (Official Venue: Hotel Taj Ganges, Darbar Hall)', 
    email: 'enquiry@businesswalkins.com',
    phone: '+91 92504 30016 / +91 70076 67808'
  },
  { city: 'New York (Americas Bureau)', address: '1270 Avenue of the Americas, Suite 2400, New York, NY 10020', email: 'americas@businesswalkins.com' },
  { city: 'London (European Bureau)', address: '1 Canada Square, Canary Wharf, London E14 5AA, United Kingdom', email: 'europe@businesswalkins.com' },
  { city: 'Singapore (Asia-Pacific HQ)', address: '10 Collyer Quay, Ocean Financial Centre, Singapore 049315', email: 'apac@businesswalkins.com' },
  { city: 'Mumbai (South Asia Bureau)', address: 'Bandra-Kurla Complex, Platinum Tower, Mumbai 400051, India', email: 'india@businesswalkins.com' },
  { city: 'Frankfurt (Industrial Bureau)', address: 'Taunusanlage 8, 60329 Frankfurt am Main, Germany', email: 'germany@businesswalkins.com' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
            <Globe className="w-3.5 h-3.5" />
            Global Editorial Network
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Editorial Bureaus & Press Inquiries
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            Contact our editorial boards, submit verified corporate tips, request media accreditation, or inquire about syndication rights.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Bureau Addresses */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-slate-900 pb-2 border-b border-slate-200">
              International Editorial Bureaus
            </h2>
            <div className="space-y-4">
              {BUREAUS.map((b, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h3 className="font-serif text-base font-bold text-slate-900 mb-1">
                    {b.city}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </p>
                  <p className="text-xs text-blue-600 font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{b.email}</span>
                  </p>
                  {b.phone && (
                    <p className="text-xs text-slate-700 font-semibold flex items-center gap-1.5 mt-1">
                      <Phone className="w-3.5 h-3.5 text-amber-600" />
                      <span>{b.phone}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
              Direct Editorial Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Confidential submissions protected under journalist privilege codes.
            </p>

            {sent ? (
              <div className="p-4 bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Message routed to the appropriate bureau desk.</span>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <input type="text" required placeholder="Full Name" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs" />
                <input type="email" required placeholder="Email Address" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs" />
                <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white">
                  <option>Press Release Submission</option>
                  <option>Confidential Executive Whistleblower Tip</option>
                  <option>Syndication & Licensing Inquiry</option>
                  <option>Fact Check & Correction Request</option>
                  <option>Other Editorial Matter</option>
                </select>
                <textarea rows={4} required placeholder="Message details..." className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs" />
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Bureau Desk</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
