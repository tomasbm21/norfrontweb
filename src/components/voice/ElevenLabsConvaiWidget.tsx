import { createElement, useEffect } from "react";

const ELEVENLABS_AGENT_ID = "agent_2801krxdcm28e16t8xwhh6enk065";
const ELEVENLABS_WIDGET_SCRIPT_ID = "elevenlabs-convai-widget-embed";
const ELEVENLABS_WIDGET_SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";

export function ElevenLabsConvaiWidget() {
  useEffect(() => {
    if (document.getElementById(ELEVENLABS_WIDGET_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = ELEVENLABS_WIDGET_SCRIPT_ID;
    script.src = ELEVENLABS_WIDGET_SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return createElement("elevenlabs-convai", { "agent-id": ELEVENLABS_AGENT_ID });
}
