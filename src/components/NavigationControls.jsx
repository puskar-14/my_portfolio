import React from 'react';
import { doorsData } from '../data/doors';
import { MousePointer } from 'lucide-react';
import { soundManager } from '../utils/audio';

export function NavigationControls({
  characterZ,
  onGlideToZ,
  activeDoorId,
  onSelectDoor,
  hoveredDoor
}) {
  // Compute progress along the hallway (-2 down to -34.2)
  const totalSpan = 32.2;
  const normalizedProgress = Math.min(Math.max((-characterZ - 2) / totalSpan, 0), 1);

  return (
    <div className="fixed bottom-4 left-0 right-0 z-30 pointer-events-none px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        {/* Desktop Keyboard Hints Pill */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-[#FAF7F2]/95 border-2 border-[#3C3630] shadow-md pointer-events-auto backdrop-blur-sm text-xs font-semibold text-[#3C3630]">
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-white border border-[#3C3630]/40 font-mono text-[11px]">W</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-[#3C3630]/40 font-mono text-[11px]">S</span>
            <span className="text-[#70675D] ml-1">Walk</span>
          </div>
          <span className="text-[#3C3630]/30">•</span>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-white border border-[#3C3630]/40 font-mono text-[11px]">A</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-[#3C3630]/40 font-mono text-[11px]">D</span>
            <span className="text-[#70675D] ml-1">Turn</span>
          </div>
          <span className="text-[#3C3630]/30">•</span>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-[#FFDBC2] border border-[#3C3630] font-mono text-[11px] font-bold">E</span>
            <span className="text-[#70675D] ml-1">Open Door</span>
          </div>
          <span className="text-[#3C3630]/30">•</span>
          <div className="flex items-center gap-1">
            <MousePointer className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="text-[#70675D]">Click any Door to Travel</span>
          </div>
        </div>

        {/* Interactive Corridor Dock (Doors & Hallway Track) */}
        <div className="w-full max-w-2xl px-4 py-3 rounded-2xl bg-[#FAF7F2]/95 border-2 border-[#3C3630] shadow-lg pointer-events-auto backdrop-blur-sm">
          {/* Top Row: Track & Percentage */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#70675D] mb-2 px-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Hallway Entrance
            </span>
            <span className="font-bold text-[#3C3630]">
              {Math.round(normalizedProgress * 100)}% Journey Completed
            </span>
            <span>The Horizon ★</span>
          </div>

          {/* Hallway Progress Bar with draggable or clickable scrub */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPercent = (e.clientX - rect.left) / rect.width;
              const targetZ = -2 - clickPercent * totalSpan;
              onGlideToZ(targetZ);
            }}
            className="relative w-full h-3 rounded-full bg-[#E8DFC8] border border-[#3C3630]/40 cursor-pointer overflow-hidden mb-3"
          >
            <div
              className="h-full bg-gradient-to-r from-[#C2DBFE] via-[#FFDBC2] to-[#FEE49B] transition-all duration-300"
              style={{ width: `${normalizedProgress * 100}%` }}
            />
          </div>

          {/* Door Shortcut Icons Dock */}
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
            {doorsData.map((door) => {
              const isCurrent = activeDoorId === door.id;
              const isHover = hoveredDoor === door.id;

              return (
                <button
                  key={door.id}
                  onClick={() => {
                    soundManager.playDoorOpen();
                    onSelectDoor(door.id);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`group relative p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                    isCurrent || isHover
                      ? 'border-[#3C3630] -translate-y-1 shadow-md scale-105'
                      : 'border-[#3C3630]/30 hover:border-[#3C3630] hover:bg-white/60'
                  }`}
                  style={{
                    backgroundColor: isCurrent ? door.color : '#FFFFFF'
                  }}
                  title={`Enter ${door.title}`}
                >
                  <span
                    className="w-2 h-2 rounded-full border border-[#3C3630] mb-1"
                    style={{ backgroundColor: door.color }}
                  />
                  <span className="text-[10px] sm:text-xs font-bold font-sans text-[#2A241F] truncate w-full">
                    {door.title}
                  </span>
                  <span className="hidden sm:inline text-[9px] font-mono text-[#70675D]">
                    {door.number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
