import React, { useState } from 'react';
import { doorsData } from '../data/doors';
import { profileData } from '../data/profile';
import { EducationRoom } from '../scenes/EducationRoom';
import { SkillsRoom } from '../scenes/SkillsRoom';
import { ProjectsRoom } from '../scenes/ProjectsRoom';
import { AchievementsRoom } from '../scenes/AchievementsRoom';
import { ContactRoom } from '../scenes/ContactRoom';
import { NextChapterRoom } from '../scenes/NextChapterRoom';
import { 
  BookOpen, 
  ArrowRight, 
  Compass 
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export function StorybookReader({ onSwitchTo3D }) {
  const [selectedChapter, setSelectedChapter] = useState(null);

  const renderActiveRoom = () => {
    switch (selectedChapter) {
      case 'education':
        return <EducationRoom onBackToHallway={() => setSelectedChapter(null)} onNavigateRoom={setSelectedChapter} />;
      case 'skills':
        return <SkillsRoom onBackToHallway={() => setSelectedChapter(null)} onNavigateRoom={setSelectedChapter} />;
      case 'projects':
        return <ProjectsRoom onBackToHallway={() => setSelectedChapter(null)} onNavigateRoom={setSelectedChapter} />;
      case 'achievements':
        return <AchievementsRoom onBackToHallway={() => setSelectedChapter(null)} onNavigateRoom={setSelectedChapter} />;
      case 'contact':
        return <ContactRoom onBackToHallway={() => setSelectedChapter(null)} onNavigateRoom={setSelectedChapter} />;
      case 'next-chapter':
        return <NextChapterRoom onBackToHallway={() => setSelectedChapter(null)} onNavigateRoom={setSelectedChapter} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* If a room chapter is opened */}
      {selectedChapter ? (
        <div>
          <button
            onClick={() => {
              soundManager.playDoorOpen();
              setSelectedChapter(null);
            }}
            className="mb-6 px-4 py-2 rounded-xl bg-[#FAF7F2] border-2 border-[#3C3630] font-bold text-xs sketch-btn flex items-center gap-2 cursor-pointer"
          >
            ← Return to Storybook Index
          </button>
          {renderActiveRoom()}
        </div>
      ) : (
        <>
          {/* Storybook Cover / Introduction */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border-2 border-[#3C3630] sketch-card text-center mb-10 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFE5D4] border border-[#3C3630] text-xs font-bold text-[#EA580C] mb-4">
              <BookOpen className="w-3.5 h-3.5" /> Illustrated Developer Storybook
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#2A241F] tracking-tight font-sans">
              {profileData.name}
            </h1>
            <p className="text-lg sm:text-xl font-hand text-[#70675D] tracking-wide mt-1">
              {profileData.role}
            </p>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#475569] leading-relaxed mt-4">
              {profileData.shortBio}
            </p>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-6">
              {profileData.stats.map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#3C3630]/20 text-center">
                  <p className="text-xl sm:text-2xl font-black text-[#2A241F]">{st.value}</p>
                  <p className="text-[10px] uppercase font-bold text-[#70675D]">{st.label}</p>
                </div>
              ))}
            </div>

            {/* 3D Hallway prompt button */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onSwitchTo3D}
                className="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm sketch-btn flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" /> Switch to 3D Walking Hallway
              </button>
            </div>
          </div>

          {/* Chapter Doors List */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2A241F] mb-1">
              Hallway Doorways & Chapters
            </h2>
            <p className="text-xs sm:text-sm text-[#70675D]">
              Choose a doorway to step inside and explore that chapter of my engineering journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doorsData.map((door) => (
              <div
                key={door.id}
                onClick={() => {
                  soundManager.playDoorOpen();
                  setSelectedChapter(door.id);
                }}
                className="p-6 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card cursor-pointer flex flex-col justify-between group hover:scale-[1.02] transition-all"
                style={{
                  borderLeftWidth: '8px',
                  borderLeftColor: door.color
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 text-xs font-bold rounded-full border border-[#3C3630]"
                      style={{ backgroundColor: door.color }}
                    >
                      Door {door.number}
                    </span>
                    <span className="text-xs font-mono text-[#70675D] font-medium">
                      {door.side.toUpperCase()} WING
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1E293B] group-hover:text-[#EA580C] transition-colors">
                    {door.roomName}
                  </h3>
                  <p className="text-xs font-bold text-[#70675D] uppercase tracking-wider mt-0.5 mb-2">
                    {door.title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {door.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-bold text-[#EA580C]">
                  <span>Step Inside →</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
