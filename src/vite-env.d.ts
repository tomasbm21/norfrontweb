/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public n8n webhook URL for the Voice Agent workflow (no secrets). */
  readonly VITE_N8N_VOICE_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
