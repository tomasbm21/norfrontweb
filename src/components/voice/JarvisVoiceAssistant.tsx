import { ElevenLabsConvaiWidget } from "@/components/voice/ElevenLabsConvaiWidget";

export interface JarvisVoiceAssistantProps {
  variant?: "page" | "compact";
  initialBubbleText?: string;
}

export function JarvisVoiceAssistant() {
  return <ElevenLabsConvaiWidget />;
}
