import React, { useState } from 'react';
import { achievementsData } from '../data/achievements';
import confetti from 'canvas-confetti';
import { 
  Star,
  Sparkles,
  Trophy, 
  Award, 
  Flame, 
  Zap, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  TrendingUp,
  Briefcase,
  Calendar
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export function AchievementsRoom({ onBackToHallway, onNavigateRoom }) {
  const [celebrated, setCelebrated] = useState(false);

  const handleCelebrate = () => {
    soundManager.playTrophyChime();
    setCelebrated(true);
    // Celestial Golden Star Confetti
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FDE047', '#F59E0B', '#FEF08A', '#FBBF24', '#D97706', '#FFFFFF']
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
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FEF08A] hover:bg-[#FDE047] border border-[#3C3630] sketch-btn transition-colors cursor-pointer text-[#713F12]"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hallway
          </button>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047] flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> Door 04 • Starry Celestial Gold
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

      {/* Room Hero / Star Theme Concept: The Starlight Hall of Achievements & Constellations */}
      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border-2 border-[#3C3630] shadow-sm relative overflow-hidden">
        {/* Decorative Floating Twinkling Stars in Background */}
        <div className="absolute top-3 right-28 opacity-40 animate-pulse pointer-events-none">
          <Star className="w-5 h-5 fill-amber-300 text-amber-400" />
        </div>
        <div className="absolute bottom-4 left-44 opacity-30 animate-pulse pointer-events-none">
          <Star className="w-4 h-4 fill-amber-300 text-amber-400" />
        </div>
        <div className="absolute top-1/2 right-6 opacity-35 animate-spin-slow pointer-events-none">
          <Sparkles className="w-6 h-6 text-amber-500" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#3C3630]/30 text-xs font-bold text-[#854D0E] mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> The Starlight Hall of Achievements & Constellations
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#713F12] tracking-tight">
              Starlight Milestones & Honors
            </h1>
            <p className="text-base sm:text-lg text-[#B45309] font-semibold mt-1 flex items-center gap-1.5 flex-wrap">
              <span>⭐ 250+ LeetCode</span>
              <span>•</span>
              <span>Infosys & ServiceNow Internships</span>
              <span>•</span>
              <span>5 Star Credentials ⭐</span>
            </p>
            <p className="text-xs sm:text-sm text-[#854D0E] mt-3 leading-relaxed">
              Every milestone is a shining star in my engineering constellation: disciplined algorithmic practice, production software systems at Infosys, and enterprise automation at ServiceNow shining together.
            </p>
          </div>

          <button
            onClick={handleCelebrate}
            className="p-4 rounded-xl bg-white border-2 border-[#3C3630] text-center shrink-0 sketch-btn hover:bg-[#FEF08A] transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#FEF9C3] border border-[#3C3630] flex items-center justify-center mx-auto mb-2 text-[#D97706] group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 fill-amber-400 text-amber-500 animate-spin-slow" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#713F12]">
              {celebrated ? "⭐ Star Shower Launched! ⭐" : "Launch Star Shower"}
            </p>
            <p className="text-[10px] text-[#854D0E] mt-0.5">Click for celestial star chime</p>
          </button>
        </div>
      </div>

      {/* SECTION 1: Stellar Virtual Internships */}
      <div className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm uppercase tracking-wider font-bold text-[#854D0E] flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> Stellar Industry Internships (2 Programs)
          </h3>
          <span className="text-xs font-mono text-[#B45309] font-bold">★ Verified Practical Experience ★</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.internships.map((internship, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card relative overflow-hidden flex flex-col justify-between hover:border-[#D97706] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="px-2.5 py-0.5 text-xs font-bold rounded-full border border-[#3C3630] flex items-center gap-1"
                    style={{ backgroundColor: '#FEF9C3', color: '#713F12' }}
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> {internship.badge}
                  </span>
                  <span className="text-xs font-mono text-[#64748B] flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5" /> {internship.period}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-[#1E293B]">{internship.company}</h4>
                    <p className="text-xs font-bold text-[#D97706] mb-3">{internship.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#FEF9C3] border border-[#FDE047] flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4 text-[#854D0E]" />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {internship.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-[#334155] leading-relaxed">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500 mt-1 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#854D0E]">
                <span>{internship.type}</span>
                <span className="flex items-center gap-1 text-[11px] text-[#10B981] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed Credential
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Star Standing & Competitive Problem Solving */}
      <div className="my-8">
        <h3 className="text-sm uppercase tracking-wider font-bold text-[#854D0E] mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#D97706]" /> Star Problem Solving & Academic Track Record
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsData.codingStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card relative overflow-hidden flex flex-col justify-between hover:border-[#D97706] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full border border-[#3C3630] bg-[#FEF9C3] text-[#713F12] flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> {stat.badge}
                  </span>
                  <span className="text-xs font-mono text-[#D97706] flex items-center gap-1 font-bold">
                    ★★★★★
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1E293B]">{stat.platform}</h3>
                <p className="text-3xl sm:text-4xl font-black text-[#854D0E] my-2 flex items-center gap-1.5">
                  {stat.count}
                  <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-2">
                  {stat.label}
                </p>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {stat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#854D0E]">
                <span>Star Standing</span>
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: 5-Star Verified Industry Certifications */}
      <div className="my-8">
        <h3 className="text-sm uppercase tracking-wider font-bold text-[#854D0E] mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#D97706]" /> 5-Star Verified Technical Certifications (5)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementsData.certificationsList.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#3C3630]/25 sketch-card flex flex-col justify-between hover:border-[#D97706] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047] flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" /> {cert.category}
                  </span>
                  <span className="text-xs font-mono text-[#D97706] font-bold">★★★★★</span>
                </div>

                <h4 className="text-sm font-bold text-[#1E293B] mb-1">{cert.title}</h4>
                <p className="text-xs font-semibold text-[#B45309] mb-2">{cert.issuer}</p>
                <p className="text-xs text-[#475569] leading-relaxed">{cert.details}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] font-semibold text-[#854D0E]">
                <span className="flex items-center gap-1 text-[#10B981]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Verified Credential
                </span>
                <span className="font-mono text-[#94A3B8] text-[10px]">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Personal Constellation Trophy Case */}
      <div className="mb-8">
        <h3 className="text-sm uppercase tracking-wider font-bold text-[#854D0E] mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#D97706]" /> Personal Constellation Star Trophies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievementsData.trophies.map((trophy, idx) => (
            <div
              key={idx}
              onClick={handleCelebrate}
              className="p-4 rounded-xl bg-white border border-[#3C3630]/25 text-center sketch-card cursor-pointer hover:border-[#D97706] group"
            >
              <div className="w-10 h-10 rounded-full bg-[#FEF9C3] border border-[#FDE047] flex items-center justify-center mx-auto mb-2 text-[#D97706] group-hover:rotate-12 transition-transform">
                {idx === 0 && <ShieldCheck className="w-5 h-5 text-[#059669]" />}
                {idx === 1 && <Zap className="w-5 h-5 text-[#8B5CF6]" />}
                {idx === 2 && <Star className="w-5 h-5 fill-amber-400 text-amber-500" />}
                {idx === 3 && <Flame className="w-5 h-5 text-[#EA580C]" />}
              </div>
              <h4 className="text-xs font-bold text-[#1E293B] flex items-center justify-center gap-1">
                ⭐ {trophy.name}
              </h4>
              <p className="text-[11px] text-[#64748B] mt-1">{trophy.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Constellation Timeline & Milestones */}
      {achievementsData.milestones && (
        <div className="p-6 rounded-2xl bg-white border border-[#3C3630]/25 shadow-xs">
          <h3 className="text-sm uppercase tracking-wider font-bold text-[#854D0E] mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> Constellation Timeline & Milestones
          </h3>
          <div className="space-y-4">
            {achievementsData.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#3C3630]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#F59E0B] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#1E293B]">{m.title}</h4>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1 pl-5.5">{m.details}</p>
                </div>
                <div className="flex items-center gap-2 pl-5.5 sm:pl-0 shrink-0">
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#FEF9C3] border border-[#FDE047] text-[#854D0E]">
                    {m.category}
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
