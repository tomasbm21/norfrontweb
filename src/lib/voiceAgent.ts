/**
 * Browser → n8n "Voice Agent" webhook contract (ElevenLabs runs inside n8n only).
 *
 * Voice: POST multipart/form-data
 *   - channel: "voice"
 *   - audio: file (webm/opus typical)
 *   - mimeType: MIME string
 *
 * Text chat: POST application/json
 *   - channel: "text"
 *   - message: string
 *
 * Expected JSON response (200):
 *   - replyText?: string
 *   - replyAudioUrl?: string   (https URL to playable audio)
 *   - replyAudioBase64?: string
 *   - replyAudioMimeType?: string  (e.g. audio/mpeg)
 *
 * Or: raw audio body with Content-Type set (e.g. audio/mpeg).
 */

export type AgentJsonResponse = {
  replyText?: string;
  replyAudioUrl?: string;
  replyAudioBase64?: string;
  replyAudioMimeType?: string;
};

export function getVoiceWebhookUrl(): string | undefined {
  const url = import.meta.env.VITE_N8N_VOICE_WEBHOOK_URL;
  return typeof url === "string" && url.length > 0 ? url : undefined;
}

function pickAudioMimeType(): string {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
  ];
  for (const t of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return "audio/webm";
}

export function createVoiceRecorder(stream: MediaStream): { recorder: MediaRecorder; mimeType: string } {
  const mimeType = pickAudioMimeType();
  const recorder = new MediaRecorder(stream, { mimeType });
  return { recorder, mimeType };
}

export async function sendVoiceToAgent(webhookUrl: string, audio: Blob, mimeType: string): Promise<Response> {
  const fd = new FormData();
  fd.set("channel", "voice");
  fd.set("mimeType", mimeType);
  fd.set("audio", audio, mimeType.includes("webm") ? "recording.webm" : "recording.audio");
  return fetch(webhookUrl, {
    method: "POST",
    body: fd,
  });
}

export async function sendTextToAgent(webhookUrl: string, message: string): Promise<Response> {
  return fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channel: "text", message }),
  });
}

export async function handleAgentResponse(res: Response): Promise<{ text?: string; playedAudio: boolean }> {
  const ct = res.headers.get("Content-Type") ?? "";

  if (ct.includes("application/json")) {
    try {
      const data = (await res.json()) as AgentJsonResponse;
      let played = false;
      if (data.replyAudioBase64 && data.replyAudioMimeType) {
        await playBase64Audio(data.replyAudioBase64, data.replyAudioMimeType);
        played = true;
      } else if (data.replyAudioUrl) {
        await playUrlAudio(data.replyAudioUrl);
        played = true;
      }
      return { text: data.replyText, playedAudio: played };
    } catch {
      return { playedAudio: false };
    }
  }

  if (ct.startsWith("audio/")) {
    const buf = await res.arrayBuffer();
    await playArrayBuffer(buf, ct);
    return { playedAudio: true };
  }

  // Plain text fallback
  if (ct.startsWith("text/")) {
    const text = await res.text();
    return { text, playedAudio: false };
  }

  return { playedAudio: false };
}

export async function playBase64Audio(base64: string, mimeType: string): Promise<void> {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  await playArrayBuffer(bytes.buffer, mimeType);
}

export async function playArrayBuffer(data: ArrayBuffer, mimeType: string): Promise<void> {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  try {
    const audio = new Audio(url);
    await new Promise<void>((resolve, reject) => {
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error("Audio playback failed"));
      void audio.play().catch(reject);
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function playUrlAudio(src: string): Promise<void> {
  const audio = new Audio(src);
  await new Promise<void>((resolve, reject) => {
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error("Audio playback failed"));
    void audio.play().catch(reject);
  });
}
