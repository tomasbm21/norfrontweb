/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public n8n webhook URL for the Voice Agent workflow (no secrets). */
  readonly VITE_N8N_VOICE_WEBHOOK_URL?: string;
  /** Optional URL to a short hosted greeting clip (mp3/webm). Falls back to browser speech. */
  readonly VITE_JARVIS_GREETING_AUDIO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
