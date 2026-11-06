import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { ProjectModal } from '../components/ProjectModal';
import { CircularProjectCarousel } from '../components/CircularProjectCarousel';
import { 
  Sparkles, 
  ExternalLink, 
  ArrowLeft, 
  CheckCircle2, 
  Lightbulb,
  Compass,
  LayoutGrid
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { soundManager } from '../utils/audio';

export function ProjectsRoom({ onBackToHallway, onNavigateRoom }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayMode, setDisplayMode] = useState('standway'); // 'standway' | 'grid'

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'featured') return p.isFeatured;
    return true;
  });

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
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FFDBC2] hover:bg-[#FED7AA] border border-[#3C3630] sketch-btn transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hallway
          </button>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#FFF0E6] text-[#C2410C] border border-[#FFD8C2]">
            Door 03 • Pastel Peach ★ Centerpiece
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateRoom('skills')}
            className="px-2.5 py-1 rounded bg-[#E0D4FC] hover:bg-[#C4B5FD] border border-[#3C3630] font-medium cursor-pointer"
          >
            ← Skills
          </button>
          <button
            onClick={() => onNavigateRoom('achievements')}
            className="px-2.5 py-1 rounded bg-[#C4EED0] hover:bg-[#A7F3D0] border border-[#3C3630] font-medium cursor-pointer"
          >
            Achievements →
          </button>
        </div>
      </div>

      {/* Room Hero / Visual Concept: The Invention Workshop & Idea Lab */}
      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFF5EC] to-[#FFE0CE] border-2 border-[#3C3630] shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#3C3630]/30 text-xs font-bold text-[#EA580C] mb-3">
              <Lightbulb className="w-3.5 h-3.5" /> The Invention Workshop & Prototype Lab
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#7C2D12] tracking-tight">
              Featured Systems & Inventions
            </h1>
            <p className="text-base sm:text-lg text-[#C2410C] font-semibold mt-1">
              ShopSense • Career Ladder • AI Finance Coach • ReturnShield AI • e-GovDrishti
            </p>
            <p className="text-xs sm:text-sm text-[#9A3412] mt-3 leading-relaxed">
              From AI-powered multi-vendor e-commerce analytics (ShopSense) and Gemini career mentoring (Career Ladder) to FinTech refund risk scoring, GovTech accessibility, and autonomous multi-agent healthcare architectures — practical engineering built to solve real-world problems.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/95 border border-[#3C3630]/30 text-center shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#FFDBC2] border border-[#3C3630] flex items-center justify-center mx-auto mb-2 text-[#EA580C]">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">Flagship Systems</p>
            <p className="text-xs font-bold text-[#7C2D12] mt-0.5">ShopSense & Career Ladder</p>
            <p className="text-[10px] text-[#9A3412] mt-0.5 font-medium">{projectsData.length} Built & Concept Systems</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Display Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-8 pb-4 border-b border-[#3C3630]/15">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#3C3630] cursor-pointer transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#FFDBC2] text-[#3C3630]'
                : 'bg-white hover:bg-[#F4EFE6] text-[#70675D]'
            }`}
          >
            All Projects ({projectsData.length})
          </button>
          <button
            onClick={() => setActiveFilter('featured')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#3C3630] cursor-pointer transition-colors ${
              activeFilter === 'featured'
                ? 'bg-[#FFDBC2] text-[#3C3630]'
                : 'bg-white hover:bg-[#F4EFE6] text-[#70675D]'
            }`}
          >
            Flagships & AI ({projectsData.filter(p => p.isFeatured).length})
          </button>
        </div>

        {/* View Switcher: Circular Standway vs Grid */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border-2 border-[#3C3630] shadow-xs">
          <button
            onClick={() => {
              soundManager.playHover();
              setDisplayMode('standway');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              displayMode === 'standway'
                ? 'bg-[#FFDBC2] text-[#7C2D12] shadow-xs'
                : 'text-[#70675D] hover:text-[#3C3630]'
            }`}
            title="360° Circular Rotating Standway Carousel"
          >
            <Compass className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Circular Standway</span>
          </button>

          <button
            onClick={() => {
              soundManager.playHover();
              setDisplayMode('grid');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              displayMode === 'grid'
                ? 'bg-[#FFDBC2] text-[#7C2D12] shadow-xs'
                : 'text-[#70675D] hover:text-[#3C3630]'
            }`}
            title="Classic Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* Main Exhibition Area */}
      {displayMode === 'standway' ? (
        <CircularProjectCarousel
          projects={filteredProjects}
          onSelectProject={setSelectedProject}
        />
      ) : (
        /* Classic Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundManager.playDoorOpen();
                setSelectedProject(project);
              }}
              className="group p-6 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card cursor-pointer flex flex-col justify-between hover:border-[#EA580C]"
            >
              <div>
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className="px-2.5 py-1 text-xs font-bold rounded-full border border-[#3C3630]"
                      style={{ backgroundColor: project.pastel, color: '#3C3630' }}
                    >
                      {project.badge}
                    </span>
                    {project.status && (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-[#FAF7F2] text-[#475569] border border-[#CBD5E1]">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#70675D]">{project.category}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#EA580C] transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs font-hand text-base text-[#64748B] mb-3">
                  {project.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4 line-clamp-3">
                  {project.overview}
                </p>

                {/* Problem / Solution preview pills */}
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#3C3630]/15 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#EA580C] mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Solution Highlight
                  </div>
                  <p className="text-[11px] text-[#334155] line-clamp-2">
                    {project.solution}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#334155]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#94A3B8]">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Action footer */}
              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                <span className="font-bold text-[#EA580C] group-hover:underline flex items-center gap-1">
                  Open Blueprint & Code →
                </span>
                <div className="flex items-center gap-2 text-[#64748B]">
                  {project.github && <GithubIcon className="w-4 h-4" />}
                  {project.liveDemo && <ExternalLink className="w-4 h-4 text-[#EA580C]" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Project Full Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
