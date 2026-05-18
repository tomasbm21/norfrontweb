/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional URL to a short hosted greeting clip (mp3/webm). Falls back to browser speech. */
  readonly VITE_JARVIS_GREETING_AUDIO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
