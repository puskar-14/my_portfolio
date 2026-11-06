import React, { useState } from 'react';
import { doorsData } from '../data/doors';
import { profileData } from '../data/profile';
import { 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Compass, 
  FileDown, 
  Sparkles, 
  Menu, 
  X, 
  Home 
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export function Navbar({
  currentView = '3d',
  onToggleView,
  activeRoom = null,
  onSelectDoor,
  onReturnToHallway
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleLofi = () => {
    const playing = soundManager.toggleAmbientLofi();
    setIsLofiPlaying(playing);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b-2 border-[#3C3630]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playHover();
              onReturnToHallway();
            }}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FFDBC2] border-2 border-[#3C3630] flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
              <span className="text-base font-black font-sans text-[#3C3630]">P</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-[#2A241F] font-sans">
                  {profileData.domain}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981]" />
              </div>
              <p className="text-[11px] font-hand text-[#70675D] -mt-0.5 tracking-wider">
                {profileData.tagline}
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Quick Door Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => {
              soundManager.playHover();
              onReturnToHallway();
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeRoom === null
                ? 'bg-[#3C3630] text-[#FAF7F2] border-[#3C3630]'
                : 'bg-transparent text-[#70675D] hover:text-[#3C3630] border-transparent hover:border-[#3C3630]/20'
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Hallway
          </button>

          {doorsData.map((door) => (
            <button
              key={door.id}
              onClick={() => {
                soundManager.playDoorOpen();
                onSelectDoor(door.id);
              }}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                activeRoom === door.id
                  ? 'border-[#3C3630] shadow-xs scale-105'
                  : 'border-transparent hover:border-[#3C3630]/30 hover:bg-[#F4EFE6] text-[#554B42]'
              }`}
              style={{
                backgroundColor: activeRoom === door.id ? door.color : 'transparent',
                color: activeRoom === door.id ? '#1E293B' : undefined
              }}
            >
              <span className="font-mono text-[10px] opacity-70 mr-1">{door.number}</span>
              {door.title}
            </button>
          ))}
        </nav>

        {/* Right Action Tools: Sound, Mode Switch, Resume */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Lofi Ambient Synthesizer Button */}
          <button
            onClick={handleToggleLofi}
            className={`px-2.5 py-1.5 rounded-lg border border-[#3C3630]/40 text-xs font-bold flex items-center gap-1.5 sketch-btn cursor-pointer transition-all ${
              isLofiPlaying ? 'bg-[#FFE5D4] text-[#C2410C]' : 'bg-[#FAF7F2] text-[#70675D]'
            }`}
            title="Cozy Pentatonic Ambient Chimes"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isLofiPlaying ? 'animate-spin' : ''}`} />
            <span>{isLofiPlaying ? 'Lofi On' : 'Play Ambient'}</span>
          </button>

          {/* Sound FX Mute toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#3C3630]/40 sketch-btn cursor-pointer text-[#3C3630]"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#EF4444]" /> : <Volume2 className="w-4 h-4 text-[#10B981]" />}
          </button>

          {/* View Mode Switcher (3D vs 2D Reader) */}
          <button
            onClick={onToggleView}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#3C3630] text-xs font-bold text-[#3C3630] sketch-btn flex items-center gap-1.5 cursor-pointer hover:bg-[#F4EFE6]"
          >
            {currentView === '3d' ? (
              <>
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Storybook Mode</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>3D Hallway Mode</span>
              </>
            )}
          </button>

          {/* Resume CTA */}
          <button
            onClick={() => {
              soundManager.playTrophyChime();
              alert(`Puskar's Resume: Final-Year B.Tech CSE (College of Engineering & Management, Kolaghat). Contact: ${profileData.email}`);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#3C3630] text-white hover:bg-[#25201B] text-xs font-bold flex items-center gap-1.5 sketch-btn cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleView}
            className="p-1.5 rounded-lg border border-[#3C3630] bg-white text-xs font-bold"
            title="Toggle Reader Mode"
          >
            {currentView === '3d' ? <BookOpen className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white border border-[#3C3630] text-[#3C3630]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 py-4 bg-[#FAF7F2] border-t border-[#3C3630]/20 space-y-2 animate-fadeIn">
          <button
            onClick={() => {
              onReturnToHallway();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg font-bold text-xs bg-white border border-[#3C3630] flex items-center justify-between"
          >
            <span>🏠 Main Hallway Corridor</span>
            <span className="text-[10px] text-[#70675D]">Home</span>
          </button>

          {doorsData.map((door) => (
            <button
              key={door.id}
              onClick={() => {
                soundManager.playDoorOpen();
                onSelectDoor(door.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-bold text-xs border border-[#3C3630] flex items-center justify-between"
              style={{ backgroundColor: door.color }}
            >
              <span>{door.title}</span>
              <span className="text-[10px] font-mono opacity-80">{door.number}</span>
            </button>
          ))}

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#3C3630]/20">
            <button
              onClick={handleToggleLofi}
              className="flex-1 py-1.5 text-xs font-bold rounded-lg border border-[#3C3630] bg-white text-center"
            >
              {isLofiPlaying ? '🔊 Lofi Playing' : '🎵 Play Lofi'}
            </button>
            <button
              onClick={() => {
                alert(`Puskar's Resume: B.Tech CSE (College of Engineering & Management, Kolaghat)`);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-1.5 text-xs font-bold rounded-lg bg-[#3C3630] text-white text-center"
            >
              Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
