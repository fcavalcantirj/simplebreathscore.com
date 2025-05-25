'use client';

import ReactDOM from "react-dom"
import { useSoundContext } from "@/contexts/sound-context"

export function SoundToggleButtonPortal() {
  const { soundEnabled, toggleSound } = useSoundContext();
  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(
    <button
      onClick={toggleSound}
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 50,
        background: "rgba(30,41,59,0.8)",
        border: "none",
        borderRadius: 8,
        padding: 8,
        cursor: "pointer"
      }}
      aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
    >
      {soundEnabled ? (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19 5l-7 7 7 7" /></svg>
      ) : (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
      )}
    </button>,
    document.body
  );
} 