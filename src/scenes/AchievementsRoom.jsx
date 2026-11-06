import React, { useState } from 'react';
import { achievementsData } from '../data/achievements';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  Flame, 
  Zap, 
  ShieldCheck, 
  BookOpen, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  TrendingUp, 
  Code2 
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export function AchievementsRoom({ onBackToHallway, onNavigateRoom }) {
  const [celebrated, setCelebrated] = useState(false);

  const handleCelebrate = () => {
    soundManager.playTrophyChime();
    setCelebrated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C4EED0', '#D6E6FF', '#FFDBC2', '#E0D4FC', '#FEE49B']
    });
    setTimeout(() => setCelebrated(false), 2500);
  };

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
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#C4EED0] hover:bg-[#A7F3D0] border border-[#3C3630] sketch-btn transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hallway
          </button>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
            Door 04 • Pastel Mint Green
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateRoom('projects')}
            className="px-2.5 py-1 rounded bg-[#FFDBC2] hover:bg-[#FED7AA] border border-[#3C3630] font-medium cursor-pointer"
          >
            ← Projects
          </button>
          <button
            onClick={() => onNavigateRoom('contact')}
            className="px-2.5 py-1 rounded bg-[#FFD4E2] hover:bg-[#FBCFE8] border border-[#3C3630] font-medium cursor-pointer"
          >
            Contact →
          </button>
        </div>
      </div>

      {/* Room Hero / Visual Concept: The Mountain of Achievements & Trophy Hall */}
      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-2 border-[#3C3630] shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#3C3630]/30 text-xs font-bold text-[#047857] mb-3">
              <Trophy className="w-3.5 h-3.5 text-[#059669]" /> The Milestone Summit & Trophy Pedestal
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#064E3B] tracking-tight">
              Competitive Milestones & Honors
            </h1>
            <p className="text-base sm:text-lg text-[#047857] font-semibold mt-1">
              250+ LeetCode • 90+ CodeChef • Hackathons & Certifications
            </p>
            <p className="text-xs sm:text-sm text-[#065F46] mt-3 leading-relaxed">
              Every badge is proof of discipline: consistent practice, algorithmic optimization, and resilience under timed constraints.
            </p>
          </div>

          <button
            onClick={handleCelebrate}
            className="p-4 rounded-xl bg-white border-2 border-[#3C3630] text-center shrink-0 sketch-btn hover:bg-[#C4EED0] transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-[#C4EED0] border border-[#3C3630] flex items-center justify-center mx-auto mb-2 text-[#047857]">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#065F46]">
              {celebrated ? "🎉 Confetti Launched!" : "Celebrate Milestones"}
            </p>
            <p className="text-[10px] text-[#047857] mt-0.5">Click for celebration chime</p>
          </button>
        </div>
      </div>

      {/* Primary Competitive Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {achievementsData.codingStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-0.5 text-xs font-bold rounded-full border border-[#3C3630]"
                  style={{ backgroundColor: stat.pastel }}
                >
                  {stat.badge}
                </span>
                <span className="text-xs font-mono text-[#059669] flex items-center gap-1 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <h3 className="text-base font-bold text-[#1E293B]">{stat.platform}</h3>
              <p className="text-3xl sm:text-4xl font-black text-[#047857] my-2">
                {stat.count}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#065F46] mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-[#475569] leading-relaxed">
                {stat.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#059669]">
              <span>Problem Solving Track</span>
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            </div>
          </div>
        ))}
      </div>

      {/* Trophy Pedestals */}
      <div className="mb-8">
        <h3 className="text-sm uppercase tracking-wider font-bold text-[#065F46] mb-4 flex items-center gap-2">
          <Award className="w-4 h-4" /> Personal Trophy Case
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievementsData.trophies.map((trophy, idx) => (
            <div
              key={idx}
              onClick={handleCelebrate}
              className="p-4 rounded-xl bg-white border border-[#3C3630]/25 text-center sketch-card cursor-pointer hover:border-[#10B981]"
            >
              <div className="w-10 h-10 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center mx-auto mb-2 text-[#059669]">
                {idx === 0 && <Flame className="w-5 h-5 text-[#EA580C]" />}
                {idx === 1 && <Zap className="w-5 h-5 text-[#8B5CF6]" />}
                {idx === 2 && <ShieldCheck className="w-5 h-5 text-[#059669]" />}
                {idx === 3 && <BookOpen className="w-5 h-5 text-[#3B82F6]" />}
              </div>
              <h4 className="text-xs font-bold text-[#1E293B]">{trophy.name}</h4>
              <p className="text-[11px] text-[#64748B] mt-1">{trophy.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Boards */}
      <div className="p-6 rounded-2xl bg-white border border-[#3C3630]/25 shadow-xs">
        <h3 className="text-sm uppercase tracking-wider font-bold text-[#065F46] mb-4">
          Milestone Timeline & Hackathons
        </h3>
        <div className="space-y-4">
          {achievementsData.milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#3C3630]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#059669]" />
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E293B]">{m.title}</h4>
                </div>
                <p className="text-xs text-[#64748B] mt-1 pl-4">{m.details}</p>
              </div>
              <div className="flex items-center gap-2 pl-4 sm:pl-0 shrink-0">
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#065F46]">
                  {m.category}
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">{m.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
