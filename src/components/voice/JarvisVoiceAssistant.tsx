import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  createVoiceRecorder,
  getVoiceWebhookUrl,
  handleAgentResponse,
  sendTextToAgent,
  sendVoiceToAgent,
} from "@/lib/voiceAgent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, Mic, Send } from "lucide-react";

type Phase = "idle" | "mic_prompt" | "recording" | "uploading" | "playing";

export function JarvisVoiceAssistant() {
  const { toast } = useToast();
  const webhookUrl = getVoiceWebhookUrl();
  const [phase, setPhase] = useState<Phase>("idle");
  const [bubbleText, setBubbleText] = useState("Hello!");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const mimeRef = useRef<string>("audio/webm");

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => () => stopStream(), [stopStream]);

  const ensureMic = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast({
        title: "Microphone not supported",
        description: "Use a modern browser over HTTPS (or localhost).",
        variant: "destructive",
      });
      return null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      return stream;
    } catch {
      toast({
        title: "Microphone access denied",
        description: "Allow microphone access in your browser settings to use voice.",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

  const startRecording = useCallback(async () => {
    if (!webhookUrl) {
      toast({
        title: "Voice agent not configured",
        description: "Set VITE_N8N_VOICE_WEBHOOK_URL to your n8n webhook URL.",
        variant: "destructive",
      });
      return;
    }
    setPhase("mic_prompt");
    const stream = await ensureMic();
    if (!stream) {
      setPhase("idle");
      return;
    }
    const { recorder, mimeType } = createVoiceRecorder(stream);
    mimeRef.current = mimeType;
    chunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onerror = () => {
      setPhase("idle");
      toast({ title: "Recording error", variant: "destructive" });
    };
    recorder.start(120);
    recorderRef.current = recorder;
    setPhase("recording");
    setBubbleText("Listening…");
  }, [ensureMic, toast, webhookUrl]);

  const stopRecordingAndSend = useCallback(async () => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      setPhase("idle");
      return;
    }
    if (!webhookUrl) return;

    setPhase("uploading");
    setBubbleText("Thinking…");

    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
      recorder.stop();
    });
    stopStream();
    recorderRef.current = null;

    const blob = new Blob(chunksRef.current, { type: mimeRef.current });
    chunksRef.current = [];

    if (blob.size < 64) {
      toast({ title: "Nothing recorded", description: "Hold the orb a little longer." });
      setPhase("idle");
      setBubbleText("Hello!");
      return;
    }

    try {
      const res = await sendVoiceToAgent(webhookUrl, blob, mimeRef.current);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setPhase("playing");
      try {
        const { text, playedAudio } = await handleAgentResponse(res);
        if (text) setBubbleText(text);
        else if (playedAudio) setBubbleText("…");
        else setBubbleText("Got it.");
      } catch {
        toast({
          title: "Could not play reply",
          description: "The response may not be audio or JSON. Adjust your n8n Respond node.",
          variant: "destructive",
        });
      }
    } catch {
      setBubbleText("Try again?");
      toast({
        title: "Voice request failed",
        description: "Check n8n workflow, CORS, and webhook URL.",
        variant: "destructive",
      });
    } finally {
      setPhase("idle");
    }
  }, [stopStream, toast, webhookUrl]);

  const toggleOrb = useCallback(() => {
    if (phase === "uploading" || phase === "playing") return;
    if (phase === "recording") {
      void stopRecordingAndSend();
      return;
    }
    void startRecording();
  }, [phase, startRecording, stopRecordingAndSend]);

  const sendChat = useCallback(async () => {
    const msg = chatInput.trim();
    if (!msg || !webhookUrl) {
      if (!webhookUrl) {
        toast({
          title: "Chat not configured",
          description: "Set VITE_N8N_VOICE_WEBHOOK_URL for the same n8n workflow.",
          variant: "destructive",
        });
      }
      return;
    }
    setPhase("uploading");
    try {
      const res = await sendTextToAgent(webhookUrl, msg);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      try {
        const { text, playedAudio } = await handleAgentResponse(res);
        if (text) setBubbleText(text);
        else if (playedAudio) setBubbleText("…");
      } catch {
        toast({
          title: "Could not handle reply",
          description: "Adjust n8n response format (JSON with replyText / audio).",
          variant: "destructive",
        });
      }
      setChatInput("");
    } catch {
      toast({
        title: "Chat request failed",
        description: "Check n8n workflow and CORS on the webhook.",
        variant: "destructive",
      });
    } finally {
      setPhase("idle");
    }
  }, [chatInput, toast, webhookUrl]);

  const orbActive = phase === "recording" || phase === "uploading" || phase === "playing";

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24 max-w-lg mx-auto text-center">
      <p className="text-sm font-sans text-[#b8a8e8] tracking-wide mb-6">New Update</p>

      <div className="relative inline-block mb-14 md:mb-16">
        <div className="rounded-2xl border border-white px-6 py-3 font-mono text-base md:text-lg font-bold tracking-tight text-white">
          <span className="text-[#c4b5fd]">AI</span> Voice Assistant
        </div>
        <div className="absolute right-4 top-[calc(100%-2px)] flex flex-col items-end pointer-events-none">
          <div className="w-0 h-0 mr-7 border-x-[8px] border-x-transparent border-b-[10px] border-b-white" aria-hidden />
          <div className="bg-white rounded-lg rounded-tr-sm px-3 py-2 shadow-md max-w-[min(260px,80vw)]">
            <span className="text-sm font-sans font-semibold text-[#ff3d8a] leading-snug break-words" aria-live="polite">
              {bubbleText}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex flex-col items-center">
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[min(280px,70vw)] h-10 rounded-[100%] bg-[#7c3aed]/25 blur-2xl pointer-events-none"
          aria-hidden
        />

        <button
          type="button"
          onClick={toggleOrb}
          disabled={phase === "uploading" || phase === "playing"}
          className={cn(
            "relative z-10 flex h-44 w-44 md:h-52 md:w-52 items-center justify-center rounded-full outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[#c4b5fd] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            orbActive && "scale-[1.02] animate-pulse"
          )}
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(180,120,255,0.45) 0%, transparent 45%), radial-gradient(circle at 70% 70%, rgba(34,197,200,0.5) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(30,40,80,0.95) 0%, #0a0a12 65%, #050508 100%)",
            boxShadow:
              "inset -12px -16px 32px rgba(0,0,0,0.65), inset 8px 10px 24px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.12)",
          }}
          aria-label={phase === "recording" ? "Stop recording and send" : "Start voice recording"}
        >
          <span className="flex gap-3" aria-hidden>
            <span className="h-8 w-2 rounded-full bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
            <span className="h-8 w-2 rounded-full bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
          </span>
          {phase === "uploading" && (
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
              <Loader2 className="h-10 w-10 text-white animate-spin" />
            </span>
          )}
        </button>

        <p className="mt-4 text-xs text-white/40 font-sans max-w-[14rem]">
          {phase === "recording" ? "Tap again to send" : "Tap the orb — allow the mic when asked"}
        </p>

        <button
          type="button"
          onClick={() => setChatOpen((o) => !o)}
          className="mt-6 text-xs font-sans text-[#a78bfa] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4b5fd] rounded"
        >
          Talk to Jarvis in chat
        </button>

        {chatOpen && (
          <div className="mt-4 w-full max-w-md text-left space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message for Jarvis…"
              className="min-h-[88px] bg-white/5 border-white/20 text-white placeholder:text-white/35 resize-none font-sans text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void sendChat();
                }
              }}
            />
            <Button
              type="button"
              size="sm"
              onClick={() => void sendChat()}
              disabled={phase === "uploading" || !chatInput.trim()}
              className="w-full gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20"
            >
              {phase === "uploading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send to agent
            </Button>
          </div>
        )}
      </div>

      <p className="mt-12 flex items-center justify-center gap-2 text-[10px] text-white/30 font-sans max-w-sm leading-relaxed">
        <Mic className="h-3 w-3 shrink-0 opacity-60" />
        Voice is processed by your n8n workflow (ElevenLabs stays on the server). No API keys in this page.
      </p>
    </div>
  );
}
