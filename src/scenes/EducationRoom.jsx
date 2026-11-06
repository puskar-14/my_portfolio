import React, { useState } from 'react';
import { educationData } from '../data/education';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  LibraryBig 
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export function EducationRoom({ onBackToHallway, onNavigateRoom }) {
  const [activeTab, setActiveTab] = useState('timeline');

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
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#C2DBFE] hover:bg-[#93C5FD] border border-[#3C3630] sketch-btn transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hallway
          </button>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#EBF4FE] text-[#1E40AF] border border-[#BFDBFE]">
            Door 01 • Pastel Blue
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#70675D]">Jump to Room:</span>
          <button
            onClick={() => onNavigateRoom('skills')}
            className="px-2.5 py-1 rounded bg-[#E0D4FC] hover:bg-[#C4B5FD] border border-[#3C3630] font-medium cursor-pointer"
          >
            Skills →
          </button>
        </div>
      </div>

      {/* Room Hero / Visual Concept: Cozy Library & Courtyard */}
      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#EBF4FE] to-[#D6E6FF] border-2 border-[#3C3630] shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#3C3630]/30 text-xs font-bold text-[#1E40AF] mb-3">
              <LibraryBig className="w-3.5 h-3.5" /> The Scholar's Library & Courtyard
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1E3A8A] tracking-tight">
              {educationData.degree}
            </h1>
            <p className="text-base sm:text-lg text-[#1D4ED8] font-semibold mt-1">
              {educationData.field}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#3B82F6] font-medium mt-3">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#1D4ED8]" /> {educationData.institution}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1D4ED8]" /> {educationData.period} ({educationData.status})
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/95 border-2 border-[#3C3630] text-center shrink-0 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#C2DBFE] border border-[#3C3630] flex items-center justify-center mx-auto mb-2 text-[#1E40AF]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#1E40AF]">Academic Standing</p>
            <p className="text-xl sm:text-2xl font-black text-[#1E3A8A] mt-0.5">{educationData.overallCGPA} CGPA</p>
            <p className="text-[11px] text-[#475569] font-medium mt-0.5">{educationData.status}</p>
          </div>
        </div>
      </div>

      {/* Narrative Quote */}
      <div className="my-6 p-4 rounded-xl bg-[#FFFDF9] border border-[#3C3630]/30 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm italic font-hand text-base text-[#475569] leading-relaxed">
          "{educationData.narrative}"
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex border-b border-[#3C3630]/20 gap-4 mb-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`pb-2.5 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'timeline'
              ? 'border-b-2 border-[#1E40AF] text-[#1E40AF]'
              : 'text-[#70675D] hover:text-[#3C3630]'
          }`}
        >
          <Calendar className="w-4 h-4" /> Academic Timeline
        </button>
        <button
          onClick={() => setActiveTab('coursework')}
          className={`pb-2.5 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'coursework'
              ? 'border-b-2 border-[#1E40AF] text-[#1E40AF]'
              : 'text-[#70675D] hover:text-[#3C3630]'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Core CS Foundations
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`pb-2.5 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'certifications'
              ? 'border-b-2 border-[#1E40AF] text-[#1E40AF]'
              : 'text-[#70675D] hover:text-[#3C3630]'
          }`}
        >
          <Award className="w-4 h-4" /> Certifications & Training
        </button>
      </div>

      {/* Tab 1: Timeline */}
      {activeTab === 'timeline' && (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C2DBFE] space-y-6">
          {educationData.timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#3B82F6] border-2 border-white shadow-xs group-hover:scale-125 transition-transform" />
              <div className="p-4 rounded-xl bg-white border border-[#3C3630]/25 shadow-xs hover:border-[#3B82F6] transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#1E3A8A]">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#EBF4FE] text-[#1E40AF] border border-[#BFDBFE]">
                    {item.year}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <p className="text-xs text-[#64748B] font-medium">{item.institution}</p>
                  {item.grade && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                      {item.grade}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Core Foundations */}
      {activeTab === 'coursework' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {educationData.focusAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#3C3630]/25 flex items-center gap-3 shadow-xs hover:border-[#3B82F6] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EBF4FE] text-[#1E40AF] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#1E3A8A]">{area}</p>
                <p className="text-[11px] text-[#64748B]">Rigorous coursework at CEMK</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Certifications & Training */}
      {activeTab === 'certifications' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {educationData.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-[#3C3630]/25 flex flex-col justify-between shadow-xs hover:border-[#3B82F6] transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EBF4FE] border border-[#BFDBFE] text-[#1E40AF] flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#1E3A8A] mb-1">{cert.title}</h4>
                <p className="text-xs text-[#2563EB] font-medium mb-3">{cert.issuer}</p>
                <p className="text-xs text-[#475569] leading-relaxed">{cert.focus}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center gap-1.5 text-[11px] text-[#10B981] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Completion
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
