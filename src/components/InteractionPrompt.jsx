import React from 'react';
import { ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

export function InteractionPrompt({ door, onEnter }) {
  if (!door) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto animate-bounce-subtle">
      <div 
        onClick={() => {
          soundManager.playDoorOpen();
          onEnter(door.id);
        }}
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border-2 border-[#3C3630] shadow-xl sketch-card cursor-pointer hover:scale-105 transition-transform"
        style={{ borderColor: '#3C3630' }}
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-[#3C3630] shrink-0"
          style={{ backgroundColor: door.color }}
        />
        <div className="text-left">
          <p className="text-[10px] uppercase font-bold tracking-wider text-[#70675D]">
            Approaching Door {door.number}
          </p>
          <p className="text-xs sm:text-sm font-extrabold text-[#2A241F]">
            {door.roomName} ({door.title})
          </p>
        </div>

        <div className="flex items-center gap-1 ml-2 px-2.5 py-1 rounded-lg bg-[#3C3630] text-white text-xs font-bold">
          <span className="hidden sm:inline font-mono mr-1">[E]</span>
          <span>Enter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
