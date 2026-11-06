import React from 'react';
import { nextChapterData } from '../data/nextChapter';
import { 
  Sparkles, 
  ArrowLeft, 
  Compass, 
  Cpu, 
  Bot, 
  Cloud, 
  Code2, 
  Rocket, 
  Star, 
  Milestone 
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export function NextChapterRoom({ onBackToHallway, onNavigateRoom }) {
  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 p-6 sm:p-10 bg-[#FAF7F2] sketch-card text-[#3C3630] animate-fadeIn">
      {/* Top Bar with Room Tag & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#3C3630]/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playDoorOpen();
              onBackToHallway();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FEE49B] hover:bg-[#FDE047] border border-[#3C3630] sketch-btn transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hallway
          </button>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047]">
            Final Mystery Door ★ The Next Chapter
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateRoom('contact')}
            className="px-2.5 py-1 rounded bg-[#FFD4E2] hover:bg-[#FBCFE8] border border-[#3C3630] font-medium cursor-pointer"
          >
            ← Contact Room
          </button>
        </div>
      </div>

      {/* Room Hero / Visual Concept: The Starlit Observatory & Horizon */}
      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FEFCE8] via-[#FEF08A] to-[#FDE047] border-2 border-[#3C3630] shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#3C3630]/30 text-xs font-bold text-[#854D0E] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#B45309]" /> The Starlit Observatory
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#713F12] tracking-tight">
              {nextChapterData.title}
            </h1>
            <p className="text-base sm:text-lg text-[#854D0E] font-semibold mt-1">
              {nextChapterData.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-[#A16207] mt-3 font-hand text-lg leading-relaxed">
              {nextChapterData.quote}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/95 border border-[#3C3630]/30 text-center shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#FEF08A] border border-[#3C3630] flex items-center justify-center mx-auto mb-2 text-[#854D0E]">
              <Star className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#854D0E]">The Horizon</p>
            <p className="text-xs font-bold text-[#713F12] mt-0.5">2025 and Beyond</p>
          </div>
        </div>
      </div>

      {/* Vision Statement */}
      <div className="my-6 p-5 rounded-2xl bg-white border border-[#3C3630]/25 shadow-xs">
        <h3 className="text-xs uppercase tracking-wider font-bold text-[#854D0E] mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D97706]" /> Personal Engineering Philosophy
        </h3>
        <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed">
          {nextChapterData.visionStatement}
        </p>
      </div>

      {/* Future Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {nextChapterData.upcomingPillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 text-xs font-bold rounded-full border border-[#3C3630]"
                  style={{ backgroundColor: '#FEF9C3', color: '#713F12' }}
                >
                  {pillar.badge}
                </span>
                <span className="text-xs font-mono text-[#854D0E] font-bold">Pillar 0{idx + 1}</span>
              </div>

              <h4 className="text-base font-bold text-[#1E293B] mb-0.5">{pillar.title}</h4>
              <p className="text-xs text-[#B45309] font-medium mb-3">{pillar.focus}</p>
              <p className="text-xs text-[#475569] leading-relaxed">{pillar.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center gap-1.5 text-xs font-semibold text-[#854D0E]">
              <Rocket className="w-3.5 h-3.5" /> High Impact Priority
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
