'use client';

import { useSoundContext } from "@/contexts/sound-context"
import { useTheme } from "next-themes";

interface SoundToggleButtonProps {
  disabled?: boolean;
}

function SoundToggleButton({ disabled }: SoundToggleButtonProps) {
  const { soundEnabled, toggleSound } = useSoundContext();
  const { theme } = useTheme();
  
  return (
    <button
      onClick={toggleSound}
      disabled={disabled}
      className={`fixed top-6 right-6 z-50 rounded-full p-3 transition-all duration-300 ease-in-out
                 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 hover:shadow-md'} 
                 ${soundEnabled ? 'bg-opacity-90' : 'bg-opacity-80'}
                 ${theme === 'dark' ? 'bg-slate-700 text-white shadow-slate-900/20' : 'bg-white text-slate-800 shadow-lg shadow-slate-200/50 border border-slate-100'}`}
      aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
    >
      {soundEnabled ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}

// This is a server component that wraps the client component
export function SoundToggleButtonPortal({ disabled }: SoundToggleButtonProps) {
  return <SoundToggleButton disabled={disabled} />;
} 