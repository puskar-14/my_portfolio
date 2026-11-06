import React, { useState, useMemo } from 'react';
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
  Calendar,
  Moon
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export function AchievementsRoom({ onBackToHallway, onNavigateRoom }) {
  const [celebrated, setCelebrated] = useState(false);

  // Generate deterministic twinkling stars across the night sky canvas
  const nightStars = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => {
      const top = (i * 37) % 96;
      const left = (i * 59) % 97;
      const size = (i % 4 === 0) ? 3 : (i % 2 === 0) ? 2 : 1.5;
      const duration = 2.2 + (i % 5) * 0.6;
      const delay = ((i * 0.27) % 3.5).toFixed(1);
      const isGold = i % 4 === 0;
      const isCyan = i % 7 === 0;
      const color = isGold ? '#FDE047' : isCyan ? '#BAE6FD' : '#FFFFFF';
      return { id: i, top, left, size, duration, delay, color };
    });
  }, []);

  const handleCelebrate = () => {
    soundManager.playTrophyChime();
    setCelebrated(true);
    // Celestial Night Sky Star Confetti
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#FDE047', '#FEF08A', '#FBBF24', '#FFFFFF', '#67E8F9', '#E0E7FF'],
      shapes: ['star', 'circle']
    });
    setTimeout(() => setCelebrated(false), 2500);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 p-6 sm:p-10 bg-[#070A14] text-slate-100 rounded-3xl border-2 border-amber-400/35 shadow-[0_0_60px_rgba(7,10,20,0.9),0_0_25px_rgba(253,224,71,0.12)] overflow-hidden animate-fadeIn">
      {/* Atmospheric Night Sky Nebula Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Twinkling Starfield in the Night Sky */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {nightStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`
            }}
          />
        ))}

        {/* Shooting Stars Streaking Across the Night Sky */}
        <div className="absolute top-10 left-[10%] w-36 h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-white rounded-full pointer-events-none animate-shooting-star opacity-80" />
        <div className="absolute top-44 left-[38%] w-48 h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-white rounded-full pointer-events-none animate-shooting-star-delayed opacity-75" />
      </div>

      {/* Top Bar with Room Tag & Navigation */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playDoorOpen();
              onBackToHallway();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(253,224,71,0.15)] hover:shadow-[0_0_18px_rgba(253,224,71,0.35)] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hallway
          </button>
          <span className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-[#0B1224]/80 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 shadow-[0_0_10px_rgba(253,224,71,0.15)]">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-spin-slow" /> Door 04 • Stars in the Night Sky
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateRoom('projects')}
            className="px-3 py-1 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-amber-200 border border-slate-700 font-medium cursor-pointer transition-colors"
          >
            ← Projects
          </button>
          <button
            onClick={() => onNavigateRoom('contact')}
            className="px-3 py-1 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-pink-200 border border-slate-700 font-medium cursor-pointer transition-colors"
          >
            Contact →
          </button>
        </div>
      </div>

      {/* Room Hero / Night Sky Observatory */}
      <div className="relative z-10 mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0D152A]/90 via-[#101C38]/90 to-[#0A0F1E]/95 border-2 border-amber-400/35 shadow-[0_0_35px_rgba(253,224,71,0.15)] overflow-hidden backdrop-blur-md">
        {/* Constellation Overlay Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
          <polyline
            points="50,40 160,95 290,65 440,115 600,45 760,105 880,50"
            fill="none"
            stroke="#FDE047"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="50" cy="40" r="3" fill="#FDE047" />
          <circle cx="160" cy="95" r="3.5" fill="#FDE047" />
          <circle cx="290" cy="65" r="4" fill="#FDE047" />
          <circle cx="440" cy="115" r="3" fill="#FDE047" />
          <circle cx="600" cy="45" r="4" fill="#FDE047" />
          <circle cx="760" cy="105" r="3.5" fill="#FDE047" />
          <circle cx="880" cy="50" r="3" fill="#FDE047" />
        </svg>

        {/* Crescent Moon & Sparkling Starlight in Header */}
        <div className="absolute top-4 right-6 text-amber-200 opacity-70 pointer-events-none flex items-center gap-2 animate-soft-pulse">
          <Moon className="w-8 h-8 fill-amber-300/30 text-amber-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.6)]" />
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-400/40 text-xs font-bold text-amber-300 mb-3 shadow-[0_0_10px_rgba(253,224,71,0.2)]">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> Stars in the Night Sky • Engineering Constellations
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 tracking-tight drop-shadow-[0_0_18px_rgba(253,224,71,0.3)]">
              Night Sky Milestones & Honors
            </h1>
            <p className="text-sm sm:text-base text-amber-300/90 font-semibold mt-1 flex items-center gap-2 flex-wrap">
              <span>⭐ 250+ LeetCode Constellation</span>
              <span>•</span>
              <span>Infosys & ServiceNow Internships</span>
              <span>•</span>
              <span>5-Star Verified Credentials</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Every milestone is a radiant star mapped into my night sky: disciplined algorithmic problem-solving on LeetCode, enterprise full-stack development at Infosys, and autonomous agent workflows at ServiceNow shining together.
            </p>
          </div>

          <button
            onClick={handleCelebrate}
            className="p-4 rounded-xl bg-[#090D1A]/90 border-2 border-amber-400/50 text-center shrink-0 hover:bg-[#121B33] hover:border-amber-300 transition-all cursor-pointer group shadow-[0_0_20px_rgba(253,224,71,0.18)]"
          >
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-400/60 flex items-center justify-center mx-auto mb-2 text-amber-300 group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-[0_0_14px_rgba(253,224,71,0.35)]">
              <Star className="w-6 h-6 fill-amber-300 text-amber-300 animate-spin-slow" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {celebrated ? "⭐ Star Shower Launched! ⭐" : "Make a Wish / Star Shower"}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Click for celestial star chime & shower</p>
          </button>
        </div>
      </div>

      {/* SECTION 1: Stellar Virtual Internships */}
      <div className="relative z-10 my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm uppercase tracking-wider font-bold text-amber-300 flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> Stellar Industry Internships (2 Programs)
          </h3>
          <span className="text-xs font-mono text-amber-400/90 font-bold hidden sm:inline-block">★ Verified Enterprise Systems ★</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.internships.map((internship, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0B1224]/85 backdrop-blur-md border border-indigo-500/30 hover:border-amber-400/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:shadow-[0_0_25px_rgba(253,224,71,0.15)] group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="px-2.5 py-0.5 text-xs font-bold rounded-full border border-amber-400/40 bg-amber-950/70 text-amber-300 flex items-center gap-1 shadow-[0_0_8px_rgba(253,224,71,0.15)]"
                  >
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" /> {internship.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5" /> {internship.period}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">{internship.company}</h4>
                    <p className="text-xs font-bold text-amber-400 mb-3">{internship.role}</p>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-indigo-950/70 border border-indigo-500/40 flex items-center justify-center shrink-0 text-amber-300">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {internship.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300 mt-1 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="text-slate-300">{internship.type}</span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed Credential
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Star Standing & Competitive Problem Solving */}
      <div className="relative z-10 my-8">
        <h3 className="text-sm uppercase tracking-wider font-bold text-amber-300 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" /> Star Problem Solving & Academic Constellations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsData.codingStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0B1224]/85 backdrop-blur-md border border-indigo-500/30 hover:border-amber-400/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:shadow-[0_0_25px_rgba(253,224,71,0.15)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full border border-amber-400/40 bg-amber-950/70 text-amber-300 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" /> {stat.badge}
                  </span>
                  <span className="text-xs font-mono text-amber-400 flex items-center gap-1 font-bold tracking-wider">
                    ★★★★★
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{stat.platform}</h3>
                <p className="text-3xl sm:text-4xl font-black text-amber-300 my-2 flex items-center gap-1.5 drop-shadow-[0_0_12px_rgba(253,224,71,0.4)]">
                  {stat.count}
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="text-amber-300">Star Standing</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: 5-Star Verified Industry Certifications */}
      <div className="relative z-10 my-8">
        <h3 className="text-sm uppercase tracking-wider font-bold text-amber-300 mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> 5-Star Verified Technical Certifications (5)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementsData.certificationsList.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0B1224]/75 backdrop-blur-sm border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between hover:shadow-[0_0_20px_rgba(253,224,71,0.12)] group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" /> {cert.category}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold tracking-wider">★★★★★</span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">{cert.title}</h4>
                <p className="text-xs font-semibold text-amber-400 mb-2">{cert.issuer}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{cert.details}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Verified Credential
                </span>
                <span className="font-mono text-slate-400 text-[10px]">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Personal Constellation Star Trophies */}
      <div className="relative z-10 mb-8">
        <h3 className="text-sm uppercase tracking-wider font-bold text-amber-300 mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" /> Personal Constellation Star Trophies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievementsData.trophies.map((trophy, idx) => (
            <div
              key={idx}
              onClick={handleCelebrate}
              className="p-4 rounded-xl bg-[#0B1224]/80 border border-slate-800 text-center cursor-pointer hover:border-amber-400/60 transition-all hover:shadow-[0_0_20px_rgba(253,224,71,0.15)] group"
            >
              <div className="w-10 h-10 rounded-full bg-amber-950/80 border border-amber-400/50 flex items-center justify-center mx-auto mb-2 text-amber-300 group-hover:rotate-12 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(253,224,71,0.25)]">
                {idx === 0 && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                {idx === 1 && <Zap className="w-5 h-5 text-indigo-400" />}
                {idx === 2 && <Star className="w-5 h-5 fill-amber-300 text-amber-300" />}
                {idx === 3 && <Flame className="w-5 h-5 text-orange-400" />}
              </div>
              <h4 className="text-xs font-bold text-white flex items-center justify-center gap-1">
                ⭐ {trophy.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">{trophy.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Constellation Timeline & Milestones */}
      {achievementsData.milestones && (
        <div className="relative z-10 p-6 rounded-2xl bg-[#0B1224]/85 backdrop-blur-md border border-indigo-500/30">
          <h3 className="text-sm uppercase tracking-wider font-bold text-amber-300 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> Constellation Timeline & Milestones in the Night Sky
          </h3>
          <div className="space-y-4">
            {achievementsData.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0F172A]/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-amber-400/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-bold text-white">{m.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 pl-5.5">{m.details}</p>
                </div>
                <div className="flex items-center gap-2 pl-5.5 sm:pl-0 shrink-0">
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-950/70 border border-amber-400/40 text-amber-300">
                    {m.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
