import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { 
  Mail, 
  Phone,
  FileDown, 
  ArrowLeft, 
  Send, 
  Check, 
  Copy, 
  Sparkles, 
  MessageSquare, 
  MapPin, 
  Clock 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { soundManager } from '../utils/audio';

export function ContactRoom({ onBackToHallway, onNavigateRoom }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playHover();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    soundManager.playHover();
    navigator.clipboard.writeText(profileData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    soundManager.playTrophyChime();
    setSubmitted(true);
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
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FFD4E2] hover:bg-[#FBCFE8] border border-[#3C3630] sketch-btn transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hallway
          </button>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#FFF1F2] text-[#BE123C] border border-[#FECDD3]">
            Door 05 • Pastel Pink
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateRoom('achievements')}
            className="px-2.5 py-1 rounded bg-[#C4EED0] hover:bg-[#A7F3D0] border border-[#3C3630] font-medium cursor-pointer"
          >
            ← Achievements
          </button>
          <button
            onClick={() => onNavigateRoom('next-chapter')}
            className="px-2.5 py-1 rounded bg-[#FEE49B] hover:bg-[#FDE047] border border-[#3C3630] font-medium cursor-pointer"
          >
            Next Chapter ★ →
          </button>
        </div>
      </div>

      {/* Room Hero / Visual Concept: The Cozy Post Office & Mailbox Desk */}
      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFF1F5] to-[#FFE4EC] border-2 border-[#3C3630] shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#3C3630]/30 text-xs font-bold text-[#BE123C] mb-3">
              <Mail className="w-3.5 h-3.5" /> The Cozy Mailroom & Letter Desk
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#881337] tracking-tight">
              Let's Start a Conversation
            </h1>
            <p className="text-base sm:text-lg text-[#9F1239] font-medium mt-1">
              Software engineering opportunities, collaborations, or a friendly tech chat
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#BE123C] font-medium mt-3">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {profileData.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Usually responds within 24 hours
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/95 border border-[#3C3630]/30 text-center shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#FFD4E2] border border-[#3C3630] flex items-center justify-center mx-auto mb-2 text-[#BE123C]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#BE123C]">Opportunity Status</p>
            <p className="text-xs font-bold text-[#881337] mt-0.5 max-w-[150px]">Open for Full-Time Roles</p>
          </div>
        </div>
      </div>

      {/* Main Communication Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {/* Left Column: Direct Links & Mailbox Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#881337] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FB7185]" /> Direct Dispatch
          </h3>

          {/* Email Card with Copy button */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-[#BE123C] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#70675D] font-bold">Email Address</p>
                <p className="text-sm sm:text-base font-bold text-[#1E293B] font-mono mt-0.5">{profileData.email}</p>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2.5 rounded-lg bg-[#FAF7F2] hover:bg-[#FFE4EC] border border-[#3C3630] sketch-btn transition-colors cursor-pointer shrink-0"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4 text-[#3C3630]" />}
            </button>
          </div>

          {/* Phone / WhatsApp Card */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#70675D] font-bold">Phone / WhatsApp</p>
                <p className="text-sm sm:text-base font-bold text-[#1E293B] font-mono mt-0.5">{profileData.phone}</p>
              </div>
            </div>
            <button
              onClick={handleCopyPhone}
              className="p-2.5 rounded-lg bg-[#FAF7F2] hover:bg-[#D1FAE5] border border-[#3C3630] sketch-btn transition-colors cursor-pointer shrink-0"
              title="Copy Phone Number"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4 text-[#3C3630]" />}
            </button>
          </div>

          {/* LinkedIn Card */}
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card flex items-center justify-between gap-3 group hover:border-[#0077B5] transition-colors cursor-pointer block"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#70675D] font-bold">Professional Network</p>
                <p className="text-sm font-bold text-[#1E293B] group-hover:text-[#0284C7] transition-colors">
                  linkedin.com/in/puskar-kumar-prasad
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#0284C7] group-hover:underline">Connect →</span>
          </a>

          {/* GitHub Card */}
          <a
            href={profileData.github}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card flex items-center justify-between gap-3 group hover:border-[#3C3630] transition-colors cursor-pointer block"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] flex items-center justify-center shrink-0">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#70675D] font-bold">Source Code & Repositories</p>
                <p className="text-sm font-bold text-[#1E293B] group-hover:text-[#64748B] transition-colors">
                  github.com/puskar-14
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#3C3630] group-hover:underline">Explore →</span>
          </a>

          {/* Resume Download Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FFE4EC] to-[#FFD4E2] border-2 border-[#3C3630] flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#881337] font-bold">Curriculum Vitae</p>
              <h4 className="text-sm sm:text-base font-extrabold text-[#4C0519]">Official Engineering Resume</h4>
              <p className="text-xs text-[#881337] mt-0.5">Updated with Infosys & ServiceNow Internships</p>
            </div>
            <a
              href="/Puskar_Kumar_Prasad_Resume.pdf"
              download="Puskar_Kumar_Prasad_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playTrophyChime()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#881337] text-white font-bold text-xs sketch-btn hover:bg-[#4C0519] transition-colors cursor-pointer shrink-0"
            >
              <FileDown className="w-4 h-4" /> Download PDF
            </a>
          </div>
        </div>

        {/* Right Column: Mailbox Message Box */}
        <div className="p-6 rounded-2xl bg-white border-2 border-[#3C3630] sketch-card">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#881337] mb-1 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#FB7185]" /> Leave a Direct Note on the Desk
          </h3>
          <p className="text-xs text-[#70675D] mb-5">
            Send a message straight to my inbox or drop a casual greeting.
          </p>

          {submitted ? (
            <div className="p-6 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-center my-6 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#14532D]">Note Delivered!</h4>
              <p className="text-xs text-[#166534] mt-1">
                Thank you for reaching out, {formData.name}. I'll reply to {formData.email} promptly!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-4 text-xs font-bold text-[#15803D] underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF7F2] border border-[#3C3630]/30 focus:outline-none focus:border-[#BE123C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF7F2] border border-[#3C3630]/30 focus:outline-none focus:border-[#BE123C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hello Puskar, I came across your portfolio and wanted to discuss an opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF7F2] border border-[#3C3630]/30 focus:outline-none focus:border-[#BE123C] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#BE123C] text-white font-bold text-xs sm:text-sm sketch-btn hover:bg-[#9F1239] transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send Note to Puskar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
