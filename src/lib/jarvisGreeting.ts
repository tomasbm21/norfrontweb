/** Spoken + on-screen greeting (keep in sync with TTS). */
export const JARVIS_GREETING_TEXT =
  "Hello! I'm Jarvis. Tap the orb to speak, or use chat below.";

let lastAudio: HTMLAudioElement | null = null;

/**
 * Greets the user by voice. No API keys: optional `VITE_JARVIS_GREETING_AUDIO_URL` (hosted mp3/webm),
 * otherwise the browser Web Speech API (user gesture required for reliable playback).
 */
export function speakJarvisGreeting(): void {
  if (typeof window === "undefined") return;

  const raw = import.meta.env.VITE_JARVIS_GREETING_AUDIO_URL;
  const audioUrl = typeof raw === "string" && raw.length > 0 ? raw : undefined;

  window.speechSynthesis?.cancel();
  lastAudio?.pause();

  if (audioUrl) {
    const a = new Audio(audioUrl);
    lastAudio = a;
    void a.play().catch(() => speakWithWebSpeech(JARVIS_GREETING_TEXT));
    return;
  }

  speakWithWebSpeech(JARVIS_GREETING_TEXT);
}

function speakWithWebSpeech(text: string): void {
  const synth = window.speechSynthesis;
  if (!synth) return;

  const run = () => {
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = 1;

    const voices = synth.getVoices();
    const en =
      voices.find((v) => v.lang.startsWith("en") && /Google|Microsoft|Samantha/i.test(v.name)) ??
      voices.find((v) => v.lang.startsWith("en-US")) ??
      voices.find((v) => v.lang.startsWith("en"));
    if (en) utter.voice = en;

    synth.speak(utter);
  };

  if (synth.getVoices().length === 0) {
    synth.addEventListener("voiceschanged", run, { once: true });
  } else {
    run();
  }
}

/** Call when closing the widget or before a new greeting. */
export function stopJarvisGreeting(): void {
  window.speechSynthesis?.cancel();
  lastAudio?.pause();
  lastAudio = null;
}
