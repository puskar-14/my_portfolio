import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20 + 15);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] p-6 text-[#3C3630] paper-grain">
      {/* Animated Sketchbook Door Illustration */}
      <div className="relative w-28 h-40 mb-6">
        <svg
          viewBox="0 0 100 140"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hand-drawn sketch door casing */}
          <path
            d="M12 136V18C12 14 15 10 20 10H80C85 10 88 14 88 18V136"
            stroke="#3C3630"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Door leaf filled with soft pastel peach */}
          <rect
            x="20"
            y="18"
            width="60"
            height="118"
            rx="4"
            fill="#FFDBC2"
            stroke="#3C3630"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Upper Door Panel with sketched dashes */}
          <rect
            x="28"
            y="26"
            width="44"
            height="42"
            rx="3"
            fill="#FFF1E6"
            stroke="#70675D"
            strokeWidth="1.8"
            strokeDasharray="4 2"
          />
          {/* Lower Door Panel */}
          <rect
            x="28"
            y="76"
            width="44"
            height="46"
            rx="3"
            fill="#FFF1E6"
            stroke="#70675D"
            strokeWidth="1.8"
          />
          {/* Brass Doorknob */}
          <circle
            cx="70"
            cy="70"
            r="4.5"
            fill="#E6A15C"
            stroke="#3C3630"
            strokeWidth="2"
          />
          {/* Little plant sketch at the doorstep */}
          <path
            d="M10 134C7 122 14 114 18 114C20 124 14 132 10 134Z"
            fill="#C4EED0"
            stroke="#3C3630"
            strokeWidth="2"
          />
        </svg>

        {/* Floating pencil sparkle */}
        <div className="absolute -top-2 -right-2 animate-bounce">
          <Sparkles className="w-6 h-6 text-[#EA580C]" />
        </div>
      </div>

      {/* Title & Tagline */}
      <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-[#2A241F] mb-1">
        Puskar.dev
      </h2>
      <p className="text-sm font-hand text-lg text-[#70675D] tracking-wider mb-6">
        “Every Door Opens a Different Story.”
      </p>

      {/* Colored-Pencil Sketch Progress Bar */}
      <div className="w-56 h-3 rounded-full bg-[#EAE1D2] border-2 border-[#3C3630] overflow-hidden p-0.5 mb-3">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C2DBFE] via-[#FFDBC2] to-[#C4EED0] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs font-mono text-[#70675D]">
        Sketching the hallway... {progress}%
      </p>
    </div>
  );
}
