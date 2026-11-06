import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Compass,
  RotateCw,
  Eye
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { soundManager } from '../utils/audio';

export function CircularProjectCarousel({ projects = [], onSelectProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const dragStartRef = useRef(0);
  const currentDragRef = useRef(0);

  const total = projects.length;
  const anglePerItem = 360 / Math.max(1, total);

  // Resize listener for responsive radius
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optional auto-spin interval
  useEffect(() => {
    if (!isAutoSpin || isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoSpin, isDragging, total]);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth < 1024;
  const radius = isMobile ? 220 : isTablet ? 320 : 400;
  const cardWidth = isMobile ? 280 : 340;

  const rotateTo = (index) => {
    soundManager.playDoorOpen();
    setCurrentIndex((index + total) % total);
  };

  const rotateNext = () => {
    rotateTo(currentIndex + 1);
  };

  const rotatePrev = () => {
    rotateTo(currentIndex - 1);
  };

  // Drag / Swipe handling
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX;
    currentDragRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current;
    // Map pixel drag to degree rotation
    const degOffset = (deltaX / (radius * 1.2)) * 60;
    currentDragRef.current = degOffset;
    setDragOffset(degOffset);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const finalOffset = currentDragRef.current;
    setDragOffset(0);

    // If dragged enough, advance index
    if (finalOffset < -18) {
      rotateNext();
    } else if (finalOffset > 18) {
      rotatePrev();
    }
  };

  const currentRotation = -currentIndex * anglePerItem + dragOffset;
  const activeProject = projects[currentIndex] || projects[0];

  return (
    <div className="relative w-full my-6 select-none overflow-hidden">
      {/* Standway Header & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FFE5D4] border border-[#3C3630] flex items-center justify-center text-[#EA580C]">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#7C2D12] flex items-center gap-1.5">
              Circular Project Standway
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74]">
                360° Rotating Path
              </span>
            </h3>
            <p className="text-[11px] text-[#70675D]">
              Drag to spin, click any station card on the ring, or inspect the spotlight project
            </p>
          </div>
        </div>

        {/* Carousel Rotation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className={`px-2.5 py-1.5 rounded-lg border border-[#3C3630] text-xs font-semibold flex items-center gap-1 sketch-btn transition-colors cursor-pointer ${
              isAutoSpin ? 'bg-[#FFDBC2] text-[#7C2D12]' : 'bg-white text-[#70675D] hover:bg-[#FAF7F2]'
            }`}
            title="Toggle Continuous Turntable Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoSpin ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isAutoSpin ? 'Auto-Spin On' : 'Auto-Spin'}</span>
          </button>

          <button
            onClick={rotatePrev}
            className="p-2 rounded-xl bg-white hover:bg-[#FFE5D4] border-2 border-[#3C3630] sketch-btn transition-colors cursor-pointer text-[#3C3630]"
            title="Rotate Left (Previous Project)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={rotateNext}
            className="p-2 rounded-xl bg-white hover:bg-[#FFE5D4] border-2 border-[#3C3630] sketch-btn transition-colors cursor-pointer text-[#3C3630]"
            title="Rotate Right (Next Project)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D Circular Standway Stage Container */}
      <div
        className="relative w-full h-[520px] sm:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ perspective: isMobile ? '800px' : '1100px' }}
      >
        {/* Turntable Floor Dais (Circular Platform under the cards) */}
        <div
          className="absolute bottom-6 w-[340px] sm:w-[580px] h-[120px] sm:h-[180px] rounded-full border-4 border-[#3C3630] pointer-events-none transition-transform"
          style={{
            background: 'radial-gradient(ellipse at center, #FFE8D6 0%, #FFD6BA 60%, #E6B89C 100%)',
            transform: 'rotateX(68deg) translateZ(-40px)',
            boxShadow: '0 25px 50px -12px rgba(60, 54, 48, 0.35)'
          }}
        >
          {/* Inner Circular Rails & Compass Markings */}
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#C28E6A]/60" />
          <div className="absolute inset-10 rounded-full border border-[#C28E6A]/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A5A38] font-bold">
              ★ 360° Exhibition Track ★
            </span>
          </div>
        </div>

        {/* 3D Rotatable Ring Container */}
        <div
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {projects.map((project, i) => {
            const itemAngle = i * anglePerItem;
            let diff = (itemAngle + currentRotation) % 360;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            const isFront = Math.abs(diff) < 26;
            const isNearby = Math.abs(diff) < 75;
            const rad = (diff * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius - radius;
            const scale = isFront ? 1.0 : isNearby ? 0.86 : 0.72;
            const opacity = isFront ? 1.0 : isNearby ? 0.82 : 0.38;
            const zIndex = Math.round((Math.cos(rad) + 1) * 50);

            return (
              <div
                key={project.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFront) {
                    soundManager.playDoorOpen();
                    onSelectProject(project);
                  } else {
                    rotateTo(i);
                  }
                }}
                className={`absolute pointer-events-auto rounded-2xl bg-white border-2 border-[#3C3630] sketch-card cursor-pointer p-5 flex flex-col justify-between transition-shadow duration-300 ${
                  isFront
                    ? 'ring-4 ring-[#EA580C]/40 shadow-xl'
                    : 'hover:border-[#EA580C] shadow-md'
                }`}
                style={{
                  width: `${cardWidth}px`,
                  minHeight: '380px',
                  maxHeight: '430px',
                  transform: `translate3d(${x}px, 0, ${z}px) rotateY(${diff * 0.75}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease'
                }}
              >
                <div>
                  {/* Spotlight Banner on Front Card */}
                  {isFront && (
                    <div className="flex items-center justify-between gap-1 mb-2.5 pb-2 border-b border-[#FAF0E6]">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#EA580C]">
                        <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> In Spotlight
                      </span>
                      <span className="text-[10px] font-mono text-[#70675D]">
                        Station {String(i + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                      </span>
                    </div>
                  )}

                  {/* Header Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                    <span
                      className="px-2.5 py-0.5 text-[11px] font-bold rounded-full border border-[#3C3630]"
                      style={{ backgroundColor: project.pastel, color: '#1E293B' }}
                    >
                      {project.badge}
                    </span>
                    {project.status && (
                      <span className="px-2 py-0.5 text-[9px] font-mono font-semibold rounded bg-[#FAF7F2] text-[#475569] border border-[#CBD5E1]">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#70675D] font-bold mb-1">
                    {project.category}
                  </p>

                  {/* Title & Subtitle */}
                  <h4 className="text-lg font-bold text-[#1E293B] leading-tight mb-1">
                    {project.title}
                  </h4>
                  <p className="text-xs font-hand text-base text-[#64748B] mb-2.5 line-clamp-1">
                    {project.subtitle}
                  </p>

                  {/* Overview */}
                  <p className="text-xs text-[#475569] leading-relaxed mb-3 line-clamp-3">
                    {project.overview}
                  </p>

                  {/* Solution Preview */}
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#3C3630]/15 mb-3">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#EA580C] mb-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Core Solution
                    </div>
                    <p className="text-[10px] text-[#334155] line-clamp-2 leading-snug">
                      {project.solution}
                    </p>
                  </div>

                  {/* Technologies Pills */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#334155]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1 py-0.5 text-[9px] font-mono text-[#94A3B8]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                  {isFront ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playDoorOpen();
                        onSelectProject(project);
                      }}
                      className="font-bold text-[#EA580C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Inspect Blueprint →
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold text-[#70675D] flex items-center gap-1">
                      Click to Rotate Here
                    </span>
                  )}

                  <div className="flex items-center gap-2 text-[#64748B]">
                    {project.github && <GithubIcon className="w-4 h-4" />}
                    {project.liveDemo && <ExternalLink className="w-4 h-4 text-[#EA580C]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Circular Station Dials / Numbered Pedestal Buttons */}
      <div className="mt-4 pt-4 border-t border-[#3C3630]/15">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]">
            Standway Stations ({total})
          </p>
          <span className="text-xs font-mono text-[#EA580C] font-semibold">
            Currently on: {activeProject.title}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {projects.map((p, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => rotateTo(idx)}
                className={`p-2 rounded-xl text-left border-2 transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'border-[#EA580C] bg-[#FFF5EC] shadow-xs scale-102 font-bold'
                    : 'border-[#3C3630]/20 bg-white hover:border-[#EA580C] hover:bg-[#FAF7F2]'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border border-[#3C3630] flex items-center justify-center text-[10px] font-mono shrink-0 font-bold"
                  style={{ backgroundColor: p.pastel }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="truncate">
                  <p className="text-xs text-[#1E293B] truncate leading-tight font-semibold">
                    {p.title}
                  </p>
                  <p className="text-[9px] text-[#70675D] font-mono truncate">
                    {p.category.split(' ')[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
