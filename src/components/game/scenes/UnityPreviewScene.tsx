import { useState } from "react";
import VRPanel from "../VRPanel";
import unityPreview from "@/assets/unity-prototype-preview.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface UnityPreviewSceneProps {
  totalScore: number;
  onBack: () => void;
  onMainMenu: () => void;
}

const features = [
  { icon: "🎮", label: "8 Unity Scenes", desc: "Full rescue chain in 3D" },
  { icon: "🥽", label: "Meta Quest 3", desc: "Standalone VR, 90 Hz" },
  { icon: "✋", label: "XR Interaction Toolkit", desc: "Grab, ray & poke input" },
  { icon: "🔺", label: "StVO Triangle Placement", desc: "Real 50 m spatial task" },
  { icon: "📞", label: "Diegetic 5W Phone", desc: "In-world emergency call" },
  { icon: "🩹", label: "Bimanual First Aid", desc: "Two-handed recovery position" },
];

const UnityPreviewScene = ({ totalScore, onBack, onMainMenu }: UnityPreviewSceneProps) => {
  const [zoomed, setZoomed] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const showRequestForm = totalScore >= 100;

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("prototype_access_requests").insert({
      email: email.trim(),
      score: totalScore,
      message: message.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Request sent ✅",
      description: "The prototype owner has been notified and will reach out via email.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4 py-12">
      <div className="scene-label mb-4">Bonus Scene — Unity High-Fidelity Preview</div>

      <VRPanel className="w-full max-w-3xl" sceneLabel="Next Step Unlocked">
        {/* Unlock banner */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-success/40 bg-success/10 mb-5">
          <div className="w-10 h-10 rounded-full bg-success/20 border border-success/40 flex items-center justify-center text-lg">
            🔓
          </div>
          <div className="flex-1">
            <div className="font-mono text-sm font-bold text-success">
              Unity VR Prototype Unlocked
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              You scored {totalScore}% — you are now ready to try the immersive build.
            </div>
          </div>
        </div>

        <h2 className="font-mono text-xl font-bold text-foreground mb-2 text-center">
          🥽 High-Fidelity Unity VR Prototype
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-5">
          A preview of the immersive Meta Quest 3 build you will experience next.
        </p>

        {/* Preview image */}
        <button
          onClick={() => setZoomed(true)}
          className="block w-full mb-2 group relative overflow-hidden rounded-xl border-2 border-primary/40 hover:border-primary transition-all"
        >
          <img
            src={unityPreview}
            alt="Unity VR prototype editor view of the AccidentScene with vehicles, bystanders and warning triangles"
            className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-90 pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-primary/20 border border-primary/40 text-primary">
              Unity 6 · URP · OpenXR
            </span>
            <span className="font-mono text-[10px] text-foreground/80 px-2 py-1 rounded bg-card/80 border border-border/40">
              Click to enlarge ⤢
            </span>
          </div>
        </button>
        <p className="font-mono text-[10px] text-muted-foreground text-center mb-5">
          Figure: AccidentScene in the Unity Editor — vehicles, NPC bystanders, warning-triangle prefabs and the persistent ProgressTrackerCanvas.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 bg-muted/30"
              style={{ animationDelay: `${i * 80}ms`, animation: "slideUp 0.4s ease-out both" }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm flex-shrink-0">
                {f.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-xs font-bold text-foreground truncate">{f.label}</div>
                <div className="font-mono text-[10px] text-muted-foreground truncate">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dialogue-box mb-6">
          What you mastered here on screen, you will now perform <strong>spatially</strong> — picking up
          warning triangles with your hands, dialling 112 on a virtual phone, and stabilising the victim
          in immersive 3D.
        </div>

        {/* Request prototype access (only at perfect score) */}
        {showRequestForm && (
          <div className="mb-6 rounded-xl border-2 border-success/40 bg-success/5 p-4 fade-in">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏆</span>
              <div className="font-mono text-sm font-bold text-success">
                Perfect Score — Request Build Access
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              You scored <strong className="text-success">100%</strong>. Submit your email to ask the prototype owner
              to share the high-fidelity Unity VR build for testing on your Meta Quest 3.
            </p>

            {submitted ? (
              <div className="rounded-lg border border-success/40 bg-success/10 p-3 text-center">
                <div className="font-mono text-sm font-bold text-success mb-1">
                  ✅ Request submitted
                </div>
                <div className="text-xs text-muted-foreground">
                  The owner will contact you at <span className="text-foreground font-mono">{email}</span> with build access details.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-3">
                <div>
                  <label htmlFor="req-email" className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                    Your email
                  </label>
                  <input
                    id="req-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border/60 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>
                <div>
                  <label htmlFor="req-msg" className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                    Message (optional)
                  </label>
                  <textarea
                    id="req-msg"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your testing context (HCI student, researcher, etc.)"
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border/60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting || !email.trim()}
                  className="vr-button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "📨 Request Prototype Access"}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="space-y-3">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="vr-button-primary w-full text-center block pulse-border cursor-default"
            aria-disabled="true"
            title="Launches on the Meta Quest 3 build"
          >
            🚀 Launch Unity VR Build (Meta Quest 3)
          </a>
          <button onClick={onBack} className="vr-button w-full">
            ← Back to Results
          </button>
          <button onClick={onMainMenu} className="vr-button w-full">
            ⌂ Exit to Main Menu
          </button>
        </div>
      </VRPanel>

      {/* Zoom modal */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out fade-in"
        >
          <img
            src={unityPreview}
            alt="Unity VR prototype editor view enlarged"
            className="max-w-full max-h-full rounded-xl border-2 border-primary/40 shadow-2xl"
          />
          <button
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 font-mono text-xs px-3 py-2 rounded-lg bg-card border border-border/40 hover:bg-accent"
          >
            Close ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default UnityPreviewScene;
