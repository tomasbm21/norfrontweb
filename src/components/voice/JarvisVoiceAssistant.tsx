import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ConversationProvider,
  useConversation,
  type ConversationStatus,
} from "@elevenlabs/react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, Mic, MicOff, Volume2 } from "lucide-react";

const MADRID_TOURIST_GUIDE_AGENT_ID = "agent_2801krxdcm28e16t8xwhh6enk065";

export interface JarvisVoiceAssistantProps {
  /** Full /jarvis page vs floating widget */
  variant?: "page" | "compact";
  /** Initial speech-bubble copy (e.g. matches greeting TTS) */
  initialBubbleText?: string;
}

export function JarvisVoiceAssistant({
  variant = "page",
  initialBubbleText = "Hello! I'm your Madrid Tourist Guide. Tap the orb to start a live voice chat.",
}: JarvisVoiceAssistantProps) {
  return (
    <ConversationProvider>
      <MadridTouristGuideAssistant variant={variant} initialBubbleText={initialBubbleText} />
    </ConversationProvider>
  );
}

function MadridTouristGuideAssistant({
  variant = "page",
  initialBubbleText = "Hello! I'm your Madrid Tourist Guide. Tap the orb to start a live voice chat.",
}: JarvisVoiceAssistantProps) {
  const { toast } = useToast();
  const [bubbleText, setBubbleText] = useState(initialBubbleText);
  const [lastStatus, setLastStatus] = useState<ConversationStatus>("disconnected");

  const conversation = useConversation({
    onConnect: () => {
      setBubbleText("Connected. Ask me what to see, eat, or do in Madrid.");
      toast({ title: "Madrid Tourist Guide connected" });
    },
    onDisconnect: () => {
      setBubbleText(initialBubbleText);
    },
    onError: (message) => {
      setBubbleText("I could not connect. Please try again.");
      toast({
        title: "Voice assistant error",
        description: message || "Could not connect to ElevenLabs.",
        variant: "destructive",
      });
    },
    onModeChange: ({ mode }) => {
      setBubbleText(mode === "speaking" ? "Sharing a Madrid recommendation..." : "Listening...");
    },
    volume: 0.9,
  });

  useEffect(() => {
    if (conversation.status === lastStatus) return;
    setLastStatus(conversation.status);
    if (conversation.status === "connecting") {
      setBubbleText("Connecting to your Madrid Tourist Guide...");
    }
  }, [conversation.status, lastStatus]);

  const { endSession } = conversation;

  useEffect(() => () => endSession(), [endSession]);

  const isCompact = variant === "compact";
  const isConnecting = conversation.status === "connecting";
  const isConnected = conversation.status === "connected";
  const isUnavailable = conversation.status === "error";
  const orbActive = isConnected || isConnecting;

  const helperText = useMemo(() => {
    if (isConnecting) return "Connecting over ElevenLabs WebRTC...";
    if (conversation.isSpeaking) return "Agent is speaking";
    if (conversation.isListening) return "Agent is listening";
    if (isConnected) return "Tap again to end the live voice session";
    if (isUnavailable) return "Connection failed. Tap to retry.";
    return "Tap the orb — allow the mic when asked";
  }, [
    conversation.isListening,
    conversation.isSpeaking,
    isConnected,
    isConnecting,
    isUnavailable,
  ]);

  const startConversation = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast({
        title: "Microphone not supported",
        description: "Use a modern browser over HTTPS (or localhost).",
        variant: "destructive",
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      conversation.startSession({
        agentId: MADRID_TOURIST_GUIDE_AGENT_ID,
        connectionType: "webrtc",
      });
    } catch {
      setBubbleText("Microphone access is needed before we can talk.");
      toast({
        title: "Microphone access denied",
        description: "Allow microphone access in your browser settings to use voice.",
        variant: "destructive",
      });
    }
  }, [conversation, toast]);

  const toggleOrb = useCallback(() => {
    if (isConnecting) return;
    if (isConnected) {
      conversation.endSession();
      return;
    }
    void startConversation();
  }, [conversation, isConnected, isConnecting, startConversation]);

  const statusLabel = isConnected
    ? conversation.isSpeaking
      ? "speaking"
      : "listening"
    : conversation.status;

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        isCompact ? "max-w-full px-1 py-2" : "max-w-lg mx-auto justify-center px-4 py-16 md:py-24"
      )}
    >
      {!isCompact && (
        <p className="text-sm font-sans text-[#b8a8e8] tracking-wide mb-6">New Update</p>
      )}

      <div className={cn("relative inline-block", isCompact ? "mb-10 scale-[0.92]" : "mb-14 md:mb-16")}>
        <div
          className={cn(
            "rounded-2xl border border-white font-mono font-bold tracking-tight text-white",
            isCompact ? "px-4 py-2 text-sm" : "px-6 py-3 text-base md:text-lg"
          )}
        >
          <span className="text-[#c4b5fd]">Madrid</span> Tourist Guide
        </div>
        <div className="absolute right-4 top-[calc(100%-2px)] flex flex-col items-end pointer-events-none">
          <div className="w-0 h-0 mr-7 border-x-[8px] border-x-transparent border-b-[10px] border-b-white" aria-hidden />
          <div
            className={cn(
              "bg-white rounded-lg rounded-tr-sm shadow-md max-w-[min(260px,80vw)]",
              isCompact ? "px-2.5 py-1.5" : "px-3 py-2"
            )}
          >
            <span
              className={cn(
                "font-sans font-semibold text-[#ff3d8a] leading-snug break-words",
                isCompact ? "text-xs" : "text-sm"
              )}
              aria-live="polite"
            >
              {bubbleText}
            </span>
          </div>
        </div>
      </div>

      <div className={cn("relative flex flex-col items-center", isCompact ? "mt-1" : "mt-4")}>
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[min(280px,70vw)] h-10 rounded-[100%] bg-[#7c3aed]/25 blur-2xl pointer-events-none"
          aria-hidden
        />

        <button
          type="button"
          onClick={toggleOrb}
          disabled={isConnecting}
          className={cn(
            "relative z-10 flex items-center justify-center rounded-full outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[#c4b5fd] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            isCompact ? "h-28 w-28" : "h-44 w-44 md:h-52 md:w-52",
            orbActive && "scale-[1.02] animate-pulse"
          )}
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(180,120,255,0.45) 0%, transparent 45%), radial-gradient(circle at 70% 70%, rgba(34,197,200,0.5) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(30,40,80,0.95) 0%, #0a0a12 65%, #050508 100%)",
            boxShadow:
              "inset -12px -16px 32px rgba(0,0,0,0.65), inset 8px 10px 24px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.12)",
          }}
          aria-label={isConnected ? "End Madrid Tourist Guide session" : "Start Madrid Tourist Guide session"}
        >
          <span className={cn("flex", isCompact ? "gap-2" : "gap-3")} aria-hidden>
            <span
              className={cn(
                "rounded-full bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.5)]",
                isCompact ? "h-6 w-1.5" : "h-8 w-2"
              )}
            />
            <span
              className={cn(
                "rounded-full bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.5)]",
                isCompact ? "h-6 w-1.5" : "h-8 w-2"
              )}
            />
          </span>
          {isConnecting && (
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
              <Loader2 className={cn("text-white animate-spin", isCompact ? "h-8 w-8" : "h-10 w-10")} />
            </span>
          )}
          {isConnected && (
            <span className="absolute bottom-5 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-medium text-white/80">
              {conversation.isSpeaking ? (
                <Volume2 className="h-3 w-3" />
              ) : (
                <Mic className="h-3 w-3" />
              )}
              {statusLabel}
            </span>
          )}
        </button>

        <p
          className={cn(
            "mt-4 text-white/40 font-sans max-w-[14rem]",
            isCompact ? "text-[10px] leading-snug" : "text-xs"
          )}
        >
          {helperText}
        </p>

        {isConnected && (
          <button
            type="button"
            onClick={() => conversation.setMuted(!conversation.isMuted)}
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-sans text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4b5fd]",
              isCompact ? "text-[10px]" : "text-xs"
            )}
          >
            {conversation.isMuted ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
            {conversation.isMuted ? "Unmute mic" : "Mute mic"}
          </button>
        )}
      </div>

      <p
        className={cn(
          "flex items-center justify-center gap-2 text-white/30 font-sans leading-relaxed",
          isCompact ? "mt-6 text-[9px] max-w-full" : "mt-12 text-[10px] max-w-sm"
        )}
      >
        <Mic className={cn("shrink-0 opacity-60", isCompact ? "h-2.5 w-2.5" : "h-3 w-3")} />
        Live voice runs through ElevenLabs WebRTC. No API keys in the browser.
      </p>
    </div>
  );
}
