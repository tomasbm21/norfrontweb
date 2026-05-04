import { Layout } from "@/components/layout/Layout";
import { JarvisVoiceAssistant } from "@/components/voice/JarvisVoiceAssistant";

export default function Jarvis() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-black text-white">
        <JarvisVoiceAssistant />
      </div>
    </Layout>
  );
}
