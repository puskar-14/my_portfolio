import { X, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { soundManager } from '../utils/audio';

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3C3630]/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] sketch-card p-6 sm:p-8 text-[#3C3630]"
        style={{ borderColor: '#3C3630' }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playHover();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F4EFE6] hover:bg-[#FFE5D4] sketch-btn transition-colors cursor-pointer"
          title="Close (ESC)"
        >
          <X className="w-5 h-5 text-[#3C3630]" />
        </button>

        {/* Header Badge & Title */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span 
            className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full border border-[#3C3630]"
            style={{ backgroundColor: project.pastel, color: '#3C3630' }}
          >
            {project.badge}
          </span>
          <span className="text-xs font-hand text-[#70675D] tracking-wide">
            {project.category}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-[#2A241F] mb-1">
          {project.title}
        </h2>
        <p className="text-base text-[#70675D] font-hand text-lg mb-6">
          {project.subtitle}
        </p>

        {/* Interactive Highlight Bar / Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-[#F4EFE6] border border-[#3C3630]/20">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <p className="text-xs uppercase tracking-wider text-[#70675D]">{m.label}</p>
                <p className="text-sm sm:text-base font-bold font-sans text-[#2A241F] mt-0.5">{m.val}</p>
              </div>
            ))}
          </div>
        )}

        {/* Overview Box */}
        <div className="mb-6 p-4 rounded-xl bg-white/70 border border-[#3C3630]/30 shadow-xs">
          <h4 className="text-xs uppercase tracking-wider font-bold text-[#70675D] mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#E28743]" /> Overview
          </h4>
          <p className="text-sm leading-relaxed text-[#3C3630] font-sans">
            {project.overview}
          </p>
        </div>

        {/* Problem Statement & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#FFF5F5] border border-[#F87171]/40">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#B91C1C] mb-2 flex items-center gap-1.5">
              <span>⚠️</span> The Problem Statement
            </h4>
            <p className="text-xs sm:text-sm text-[#4B3030] leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#4ADE80]/40">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#15803D] mb-2 flex items-center gap-1.5">
              <span>💡</span> The Solution & Impact
            </h4>
            <p className="text-xs sm:text-sm text-[#264E36] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features List */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider font-bold text-[#70675D] mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Key Features & Architecture
          </h4>
          <ul className="space-y-2.5">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3C3630]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3C3630] mt-1.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used Badges */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-wider font-bold text-[#70675D] mb-2.5">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-[#F4EFE6] border border-[#3C3630]/30 text-[#2A241F]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#3C3630]/20">
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#3C3630] text-[#FAF7F2] hover:bg-[#25201B] transition-colors cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" /> View GitHub Repository
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#FFE5D4] hover:bg-[#FFD2B8] text-[#3C3630] border border-[#3C3630] transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-[#EA580C]" /> Live Demo
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#70675D] hover:text-[#3C3630] underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
