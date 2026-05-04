import { useCallback, useState } from "react";
import { X } from "lucide-react";
import { JarvisVoiceAssistant } from "@/components/voice/JarvisVoiceAssistant";
import {
  JARVIS_GREETING_TEXT,
  speakJarvisGreeting,
  stopJarvisGreeting,
} from "@/lib/jarvisGreeting";
import { cn } from "@/lib/utils";

/**
 * Corner launcher for the home page: opens a compact Jarvis panel and greets the user by voice when opened.
 */
export function FloatingJarvis() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        window.setTimeout(() => speakJarvisGreeting(), 100);
      } else {
        stopJarvisGreeting();
      }
      return next;
    });
  }, []);

  const close = useCallback(() => {
    stopJarvisGreeting();
    setOpen(false);
  }, []);

  return (
    <div
      className="fixed bottom-5 right-5 z-[200] flex flex-col items-end gap-3 pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto"
      aria-label="Jarvis voice assistant"
    >
      {open && (
        <div
          id="jarvis-floating-panel"
          className={cn(
            "pointer-events-auto w-[min(100vw-1.5rem,22rem)] max-h-[min(85vh,560px)] overflow-y-auto overflow-x-hidden rounded-2xl border border-white/15 bg-black/95 text-white shadow-2xl backdrop-blur-xl",
            "animate-in fade-in slide-in-from-bottom-4 duration-200"
          )}
          role="dialog"
          aria-label="AI Voice Assistant"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-white/10 bg-black/90 px-3 py-2.5 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold tracking-tight text-white/90">
              Jarvis
            </span>
            <button
              type="button"
              onClick={close}
              className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4b5fd]"
              aria-label="Close Jarvis"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-2 pb-3 pt-1">
            <JarvisVoiceAssistant variant="compact" initialBubbleText={JARVIS_GREETING_TEXT} />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        className={cn(
          "pointer-events-auto relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#c4b5fd] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
          open && "ring-2 ring-[#c4b5fd]/80"
        )}
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(180,120,255,0.55) 0%, transparent 45%), radial-gradient(circle at 70% 70%, rgba(34,197,200,0.55) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(25,35,70,0.98) 0%, #050508 100%)",
          boxShadow:
            "inset -6px -8px 16px rgba(0,0,0,0.5), inset 4px 4px 12px rgba(255,255,255,0.06), 0 4px 24px rgba(124,58,237,0.35)",
        }}
        aria-expanded={open}
        aria-controls="jarvis-floating-panel"
        title={open ? "Minimize Jarvis" : "Open Jarvis"}
      >
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-5 w-1.5 rounded-full bg-white/95 shadow-[0_0_8px_rgba(255,255,255,0.45)]" />
          <span className="h-5 w-1.5 rounded-full bg-white/95 shadow-[0_0_8px_rgba(255,255,255,0.45)]" />
        </span>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 animate-pulse rounded-full bg-[#ff3d8a]" aria-hidden />
        )}
      </button>
    </div>
  );
}
